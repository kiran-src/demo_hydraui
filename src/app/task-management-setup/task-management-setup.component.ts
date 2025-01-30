import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil, finalize, distinctUntilChanged } from 'rxjs/operators';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { TaskManagementService } from './task-management.service';
import { ErrorService } from '../common/error.service';
import { 
  TaskProject, 
  AuthCredentials, 
  ProjectStats,
  TASK_TOOL_CONFIGS, 
  ToolConfig, 
  JiraAuthCredentials,
  AzureAuthCredentials
} from './task-management.types';
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
  selector: 'app-task-management-setup',
  templateUrl: './task-management-setup.component.html',
  styleUrls: ['./task-management-setup.component.scss'],
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
export class TaskManagementSetupComponent implements OnInit {
  @ViewChild('stepper') private stepper!: MatStepper;

  isLoading = false;
  loadingMessage = '';
  hideApiKey = true;
  selectedTool = '';
  isAuthenticated = false;
  toolConfig: ToolConfig | null = null;
  selectedProject: TaskProject | null = null;

  projects$ = new BehaviorSubject<TaskProject[]>([]);
  private destroy$ = new Subject<void>();

  toolSelectionForm: FormGroup;
  authForm: FormGroup;
  projectSelectionForm: FormGroup;

  readonly availableTools = Object.entries(TASK_TOOL_CONFIGS).map(([key, config]) => ({
    ...config,
    key
  }));

  constructor(
    private fb: FormBuilder,
    private taskManagementService: TaskManagementService,
    private errorService: ErrorService,
    private router: Router
  ) {
    this.initializeForms();
  }

  private initializeForms() {
    this.toolSelectionForm = this.fb.group({
      selectedTool: ['', Validators.required]
    });

    this.authForm = this.fb.group({
      apiKey: ['', [Validators.required, Validators.minLength(8)]],
      organization: [''],
      username: ['']
    });

    this.projectSelectionForm = this.fb.group({
      projectCode: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Subscribe to tool selection changes
    this.toolSelectionForm.get('selectedTool')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        this.onToolSelection(value);
      });

    // Subscribe to project selection changes
    this.projectSelectionForm.get('projectCode')?.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged()
      )
      .subscribe(value => {
        if (value) {
          this.onProjectSelection(value);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onToolSelection(toolKey: string) {
    if (!toolKey) return;

    this.selectedTool = toolKey;
    this.toolConfig = TASK_TOOL_CONFIGS[toolKey];
    this.updateAuthFormValidation(toolKey);
  }

private updateAuthFormValidation(tool: string) {
  if (tool === 'jira') {
    this.authForm = this.fb.group({
      domain: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9-]+(?:\.atlassian\.net)?$')
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      apiKey: ['', [
        Validators.required,
        Validators.minLength(8)
      ]]
    });
  } else if (tool === 'azure') {
    this.authForm = this.fb.group({
      organization: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9-]+$')
      ]],
      apiKey: ['', [
        Validators.required,
        Validators.minLength(8)
      ]]
    });
  }
}
authenticate() {
  if (this.authForm.invalid) {
    this.showFormErrors();
    return;
  }

  let credentials: JiraAuthCredentials | AzureAuthCredentials;

  if (this.selectedTool === 'jira') {
    credentials = {
      domain: this.authForm.get('domain')?.value,
      email: this.authForm.get('email')?.value,
      apiKey: this.authForm.get('apiKey')?.value
    };
  } else {
    credentials = {
      organization: this.authForm.get('organization')?.value,
      apiKey: this.authForm.get('apiKey')?.value
    };
  }

  this.isLoading = true;
  this.loadingMessage = 'Authenticating...';

  this.taskManagementService.configureAuth(this.selectedTool, credentials)
    .pipe(
      finalize(() => {
        this.isLoading = false;
        this.loadingMessage = '';
      })
    )
    .subscribe({
      next: (response) => {
        if (response.success) {
          this.isAuthenticated = true;
          this.errorService.handleSuccess(
            `Successfully authenticated with ${this.toolConfig?.displayName}`
          );
          this.loadProjects();
          this.stepper.next();
        } else {
          this.handleAuthError(response.message);
        }
      },
      error: (error) => {
        this.handleAuthError(error.message || 'Authentication failed');
        this.authForm.get('apiKey')?.reset();
      }
    });
}




  private handleAuthError(error: any) {
    this.isAuthenticated = false;
    this.errorService.handleError(`Authentication failed: ${error.message || error}`);
    this.authForm.patchValue({ apiKey: '' });
  }

  loadProjects() {
    this.isLoading = true;
    this.loadingMessage = 'Loading projects...';
  
    this.taskManagementService.getProjects()
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.loadingMessage = '';
        })
      )
      .subscribe({
        next: (response) => {
          console.log('Projects response:', response);
          
          if (!response.success) {
            this.errorService.handleError(response.message || 'Failed to load projects');
            return;
          }
  
          // Clear project selection
          this.projectSelectionForm.patchValue({ projectCode: '' });
          this.selectedProject = null;
          
          // Update projects list with empty array if no entities
          const entities = response.result?.entities || [];
          this.projects$.next(entities);
          
          if (entities.length === 0) {
            this.errorService.handleWarning('No projects found');
          }
        },
        error: (error) => {
          console.error('Error loading projects:', error);
          this.errorService.handleError(
            error.message || 'Error loading projects'
          );
          // Set empty projects list on error
          this.projects$.next([]);
        }
      });
  }


  onProjectSelection(projectCode: string) {
    console.log('Project selected:', projectCode);
    
    if (!projectCode) {
      this.selectedProject = null;
      return;
    }

    this.isLoading = true;
    this.loadingMessage = 'Loading project details...';

    this.taskManagementService.getProjectDetails(projectCode)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.loadingMessage = '';
        })
      )
      .subscribe({
        next: (response) => {
          console.log('Project details loaded:', response);
          if (response.success) {
            const project = this.projects$.value.find(p => p.code === projectCode);
            if (project) {
              this.selectedProject = {
                ...project,
                counts: {
                  epics: response.result.counts?.epics || 0,
                  sprints: response.result.counts?.sprints || 0,
                  releases: response.result.counts?.releases || 0,
                  resources: response.result.counts?.resources || 0,
                  tasks: {
                    total: response.result.counts?.tasks?.total || 0,
                    active: response.result.counts?.tasks?.active || 0
                  }
                }
              };
            }
          } else {
            this.errorService.handleError('Failed to load project details');
            this.selectedProject = null;
          }
        },
        error: (error) => {
          console.error('Error loading project details:', error);
          this.errorService.handleError('Error loading project details: ' + error.message);
          this.selectedProject = null;
        }
      });
  }

  private mapProjectCounts(counts: any): ProjectStats {
    return {
      epics: this.safeNumber(counts?.epics),
      sprints: this.safeNumber(counts?.sprints),
      releases: this.safeNumber(counts?.releases),
      resources: this.safeNumber(counts?.resources),
      tasks: {
        total: this.safeNumber(counts?.tasks?.total),
        active: this.safeNumber(counts?.tasks?.active)
      }
    };
  }

  private safeNumber(value: any): number {
    return typeof value === 'number' && !isNaN(value) ? value : 0;
  }

  private loadProjectDetails(projectCode: string) {
    this.isLoading = true;
    this.loadingMessage = 'Loading project details...';

    this.taskManagementService.getProjectDetails(projectCode)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (details) => {
          this.selectedProject = details;
          this.errorService.handleSuccess('Project details loaded');
        },
        error: (error) => {
          this.errorService.handleError('Failed to load project details');
        }
      });
  }

  startSync() {
    if (!this.selectedProject) {
      this.errorService.handleWarning('Please select a project');
      return;
    }

    this.isLoading = true;
    this.loadingMessage = 'Syncing project data...';

    this.taskManagementService.syncData(this.selectedProject.code)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: () => {
          this.errorService.handleSuccess('Data synced successfully');
          this.router.navigate(['/task-dashboard']);
        },
        error: (error) => {
          this.errorService.handleError('Failed to sync data: ' + error.message);
        }
      });
  }

  private resetForms() {
    this.authForm.reset();
    this.projectSelectionForm.reset();
    this.projects$.next([]);
    this.selectedProject = null;
    this.isAuthenticated = false;
  }

  private buildAuthCredentials(): JiraAuthCredentials | AzureAuthCredentials {
    const formValues = this.authForm.value;
    
    if (this.selectedTool === 'jira') {
      return {
        domain: formValues.domain,
        email: formValues.email,
        apiKey: formValues.apiKey
      };
    } else {
      return {
        organization: formValues.organization,
        apiKey: formValues.apiKey
      };
    }
  }

  // private handleAuthError(error: string) {
  //   this.isAuthenticated = false;
  //   this.errorService.handleError('Authentication failed: ' + error);
  // }

  // private updateAuthFormValidation(toolKey: string) {
  //   const controls: { [key: string]: any[] } = {
  //     apiKey: ['', [Validators.required, Validators.minLength(8)]]
  //   };

  //   if (toolKey === 'azure') {
  //     controls['organization'] = ['', [
  //       Validators.required,
  //       Validators.pattern('^[a-zA-Z0-9-]+$')
  //     ]];
  //   } else if (toolKey === 'jira') {
  //     controls['username'] = ['', [Validators.required, Validators.email]];
  //     controls['url'] = ['', [
  //       Validators.required,
  //       Validators.pattern('^https?://.*')
  //     ]];
  //   }

  //   this.authForm = this.fb.group(controls);
  // }

  private showFormErrors() {
    Object.keys(this.authForm.controls).forEach(key => {
      const control = this.authForm.get(key);
      if (control?.errors) {
        this.errorService.handleError(
          `${key}: ${Object.keys(control.errors).map(err => 
            this.getErrorMessage(key, err)
          ).join(', ')}`
        );
      }
    });
  }

  get isFormValid(): boolean {
    return this.authForm.valid && !this.isLoading;
  }

  get showOrganizationField(): boolean {
    return this.selectedTool === 'azure';
  }

  get showUsernameField(): boolean {
    return this.selectedTool === 'jira';
  }

  get apiKeyLabel(): string {
    return this.selectedTool === 'azure' ? 'Personal Access Token' : 'API Key';
  }
  get canProceedToSync(): boolean {
    return !this.isLoading && 
           this.selectedProject !== null && 
           this.projectSelectionForm.valid;
  }

  private getErrorMessage(field: string, error: string): string {
    switch (error) {
      case 'required':
        return `${field} is required`;
      case 'minlength':
        return `${field} must be at least ${this.authForm.get(field)?.errors?.[error].requiredLength} characters`;
      case 'pattern':
        return `${field} format is invalid`;
      case 'email':
        return `${field} must be a valid email address`;
      default:
        return `${field} is invalid`;
    }
  }

  private formatFieldName(field: string): string {
    return field
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  }

  private getPatternErrorMessage(field: string): string {
    switch (field) {
      case 'organization':
        return 'Organization name can only contain letters, numbers, and hyphens';
      case 'url':
        return 'URL must start with http:// or https://';
      default:
        return `Invalid ${this.formatFieldName(field)} format`;
    }
  }
}