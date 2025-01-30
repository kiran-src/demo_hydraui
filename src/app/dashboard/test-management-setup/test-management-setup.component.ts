import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { TestManagementService } from './test-management.service';
import { ErrorService } from '../../common/error.service';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { takeUntil, finalize, map, switchMap } from 'rxjs/operators';
import { AuthType, ToolConfig, TOOL_CONFIGS } from './interfaces/auth-types';
import { QaseProject, QaseProjectCounts } from './interfaces/qase.interfaces';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-test-management-setup',
  templateUrl: './test-management-setup.component.html',
  styleUrls: ['./test-management-setup.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatCardModule,
    MatIconModule,
    MatListModule
  ]
})
export class TestManagementSetupComponent implements OnInit, OnDestroy {
  @ViewChild('stepper') stepper!: MatStepper;

  // Forms
  toolSelectionForm: FormGroup;
  authForm: FormGroup;
  projectSelectionForm: FormGroup;

  // State management
  isLoading = false;
  loadingMessage = 'Loading...';
  selectedTool: string = '';
  isAuthenticated = false;
  toolConfig?: ToolConfig;
  projects$ = new BehaviorSubject<QaseProject[]>([]);
  selectedProject: QaseProject | null = null;

  // UI state
  hideApiKey = true;
  hidePassword = true;

  // Available tools configuration
  availableTools = Object.entries(TOOL_CONFIGS).map(([key, config]) => ({
    key,
    ...config
  }));

  private unsubscribe$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private testManagementService: TestManagementService,
    private router: Router,
    private errorService: ErrorService
  ) {
    this.initializeForms();
  }

  ngOnInit() {
    this.checkAuthStatus();
    this.checkAuthAndLoadProjects();

  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private initializeForms() {
    this.toolSelectionForm = this.fb.group({
      selectedTool: ['', Validators.required]
    });

    this.authForm = this.fb.group({
      domain: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9-]+\.atlassian\.net$')
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      apiKey: ['', Validators.required],
      username: [''],  // for other tools
      password: ['']   // for other tools
    });

    this.projectSelectionForm = this.fb.group({
      projectCode: ['', Validators.required]
    });
  }

  private checkAuthAndLoadProjects() {
    this.isLoading = true;
    this.loadingMessage = 'Checking authentication status...';

    // First check auth status
    this.testManagementService.checkAuthStatus().pipe(
        takeUntil(this.unsubscribe$),
        switchMap(isAuthenticated => {
            if (isAuthenticated) {
                return this.testManagementService.getToolConfig().pipe(
                    map(config => ({ isAuthenticated, config }))
                );
            }
            return of({ isAuthenticated, config: null });
        }),
        finalize(() => this.isLoading = false)
    ).subscribe({
        next: ({ isAuthenticated, config }) => {
            this.isAuthenticated = isAuthenticated;
            if (isAuthenticated && config) {
                // Set tool selection and auto-fill form
                this.selectedTool = config.toolName;
                this.toolConfig = TOOL_CONFIGS[config.toolName];
                this.toolSelectionForm.patchValue({
                    selectedTool: config.toolName
                });
                this.onToolSelection(); // This will set up the auth form

                // Auto-fill auth form
                this.authForm.patchValue({
                    domain: config.domain,
                    email: config.email
                });

                // Skip to project selection
                setTimeout(() => {
                    this.stepper.selectedIndex = 2;
                    this.loadProjects();
                });
            }
        },
        error: (error) => {
            console.error('Error checking auth status:', error);
            this.errorService.handleError('Failed to check authentication status');
        }
    });
}

  onToolSelection() {
    this.selectedTool = this.toolSelectionForm.get('selectedTool')?.value;
    if (this.selectedTool) {
      this.toolConfig = TOOL_CONFIGS[this.selectedTool];
      
      // Reset forms and clear previous data
      this.authForm.reset();
      this.projectSelectionForm.reset();
      this.projects$.next([]);
      this.selectedProject = null;
      this.isAuthenticated = false;
      
      // Configure form validation based on tool type
      this.configureFormValidation();
    }
  }
  

  private getCredentials(): any {
    const credentials: any = {};
    
    switch (this.selectedTool) {
      case 'xray':
        credentials.domain = this.authForm.get('domain')?.value;
        credentials.email = this.authForm.get('email')?.value;
        credentials.apiKey = this.authForm.get('apiKey')?.value;
        break;
        
      case 'qase':
        credentials.apiKey = this.authForm.get('apiKey')?.value;
        break;
        
      case 'testrail':
        credentials.username = this.authForm.get('username')?.value;
        credentials.password = this.authForm.get('password')?.value;
        break;
    }
    
    return credentials;
  }

  authenticate() {
    if (!this.selectedTool || !this.authForm.valid) {
      this.errorService.handleWarning('Please fill in all required fields');
      return;
    }

    const credentials = this.getCredentials();
    
    this.isLoading = true;
    this.updateLoadingMessage('auth');
    
    this.testManagementService.configureAuth(this.selectedTool, credentials)
      .pipe(
        takeUntil(this.unsubscribe$),
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.isAuthenticated = true;
            this.errorService.handleSuccess(
              `Successfully authenticated with ${this.toolConfig?.displayName}`
            );
            this.loadProjects();
          } else {
            this.handleAuthError(response.message);
          }
        },
        error: (error) => {
          this.handleAuthError(error.message);
        }
      });
  }

  private configureFormValidation() {
    // Reset all validators
    Object.keys(this.authForm.controls).forEach(key => {
      this.authForm.get(key)?.clearValidators();
      this.authForm.get(key)?.updateValueAndValidity();
    });

    if (this.toolConfig) {
      switch (this.selectedTool) {
        case 'xray':
          this.authForm.get('domain')?.setValidators([
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9-]+\.atlassian\.net$')
          ]);
          this.authForm.get('email')?.setValidators([
            Validators.required,
            Validators.email
          ]);
          this.authForm.get('apiKey')?.setValidators([Validators.required]);
          break;
        case 'qase':
          this.authForm.get('apiKey')?.setValidators([Validators.required]);
          break;
        case 'testrail':
          this.authForm.get('username')?.setValidators([Validators.required]);
          this.authForm.get('password')?.setValidators([Validators.required]);
          break;
      }
    }

    this.authForm.updateValueAndValidity();
  }

  loadProjects() {
    this.updateLoadingMessage('projects');
    this.isLoading = true;

    this.testManagementService.getProjects()
      .pipe(
        takeUntil(this.unsubscribe$),
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (projects) => {
          this.projects$.next(projects);
          if (projects.length === 0) {
            this.errorService.handleInfo('No projects found. Please create a project first.');
          } else {
            this.errorService.handleSuccess(`Found ${projects.length} projects`);
          }
        },
        error: (error) => {
          console.error('Error loading projects:', error);
          this.errorService.handleError('Failed to load projects: ' + (error.message || 'Unknown error'));
        }
      });
  }

  onProjectSelection() {
    const projectCode = this.projectSelectionForm.get('projectCode')?.value;
    if (projectCode) {
      this.selectedProject = this.projects$.value.find(p => p.code === projectCode) || null;
      
      if (this.selectedProject) {
        this.loadProjectDetails(projectCode);
        this.projectSelectionForm.markAsTouched();
        this.projectSelectionForm.updateValueAndValidity();
      }
    }
  }

  loadProjectDetails(projectCode: string) {
    this.updateLoadingMessage('details');
    this.isLoading = true;

    this.testManagementService.getProjectDetails(projectCode)
      .pipe(
        takeUntil(this.unsubscribe$),
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (details) => {
          if (this.selectedProject) {
            this.selectedProject = {
              ...details,
              counts: this.processProjectCounts(details.counts)
            };
            this.errorService.handleSuccess('Project details loaded successfully');
          }
        },
        error: (error) => {
          console.error('Error loading project details:', error);
          this.errorService.handleError('Failed to load project details');
          this.resetProjectCounts();
        }
      });
  }

  private processProjectCounts(counts: any): QaseProjectCounts {
    return {
      cases: counts.cases || 0,
      suites: counts.suites || 0,
      milestones: counts.milestones || 0,
      runs: {
        total: counts.runs?.total || 0,
        active: counts.runs?.active || 0
      },
      defects: {
        total: counts.defects?.total || 0,
        open: counts.defects?.open || 0
      }
    };
  }

  private resetProjectCounts() {
    if (this.selectedProject) {
      this.selectedProject = {
        ...this.selectedProject,
        counts: {
          cases: 0,
          suites: 0,
          milestones: 0,
          runs: { total: 0, active: 0 },
          defects: { total: 0, open: 0 }
        }
      };
    }
  }

  getProjectCount(type: keyof QaseProjectCounts, subType?: 'total' | 'active' | 'open'): number {
    if (!this.selectedProject?.counts) return 0;
    
    const counts = this.selectedProject.counts;
    
    try {
      switch (type) {
        case 'cases':
        case 'suites':
        case 'milestones':
          return counts[type] || 0;
        
        case 'runs':
          if (!counts.runs) return 0;
          if (subType === 'active') return counts.runs.active || 0;
          return counts.runs.total || 0;
        
        case 'defects':
          if (!counts.defects) return 0;
          if (subType === 'open') return counts.defects.open || 0;
          return counts.defects.total || 0;
        
        default:
          return 0;
      }
    } catch (error) {
      console.error('Error getting project count:', error);
      return 0;
    }
  }

  startSync() {
    if (!this.selectedProject) {
      this.errorService.handleWarning('Please select a project to sync');
      return;
    }

    const config = {
      projectCode: this.selectedProject.code,
      toolName: this.selectedTool
    };

    this.isLoading = true;
    this.updateLoadingMessage('sync');

    this.testManagementService.setProjectConfig(this.selectedTool, config)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.syncData();
        },
        error: (error) => {
          console.error('Error setting project config:', error);
          this.errorService.handleError('Failed to set project configuration');
          this.isLoading = false;
        }
      });
  }

  syncData() {
    this.testManagementService.syncTestData()
      .pipe(
        takeUntil(this.unsubscribe$),
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (response) => {
          console.log('Data synced successfully:', response);
          this.errorService.handleSuccess('Data synced successfully!');
          this.router.navigate(['/summary-dashboard']);
        },
        error: (error) => {
          console.error('Error syncing data:', error);
          this.errorService.handleError(`Failed to sync data: ${error.message}`);
        }
      });
  }

  private checkAuthStatus() {
    this.testManagementService.checkAuthStatus()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (isAuthenticated: boolean) => {
          this.isAuthenticated = isAuthenticated;
          if (isAuthenticated && this.selectedTool) {
            this.errorService.handleSuccess(
              `Already authenticated with ${this.toolConfig?.displayName}`
            );
            this.loadProjects();
          }
        },
        error: (error) => {
          console.error('Error checking auth status:', error);
        }
      });
  }

  private handleAuthError(message: string) {
    this.isAuthenticated = false;
    this.errorService.handleError(
      `Authentication failed: ${message || 'Unknown error'}`
    );
    
    // Clear sensitive fields
    if (this.selectedTool === 'xray') {
      this.authForm.patchValue({ apiKey: '' });
    } else if (this.selectedTool === 'testrail') {
      this.authForm.patchValue({ password: '' });
    }
  }

  private updateLoadingMessage(action: string) {
    switch (action) {
      case 'auth':
        this.loadingMessage = `Authenticating with ${this.toolConfig?.displayName}...`;
        break;
      case 'projects':
        this.loadingMessage = 'Loading projects...';
        break;
      case 'details':
        this.loadingMessage = 'Loading project details...';
        break;
      case 'sync':
        this.loadingMessage = 'Syncing project data...';
        break;
      default:
        this.loadingMessage = 'Loading...';
    }
  }
}