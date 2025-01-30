import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { TestManagementService } from './test-management.service';
import { ErrorService } from '../../common/error.service';
import { Subject, interval } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-project-creation',
  templateUrl: './project-creation.component.html',
  styleUrls: ['./project-creation.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatSnackBarModule
  ]
})
export class ProjectCreationComponent implements OnInit, OnDestroy {
  projectInfoForm: FormGroup;
  servicesForm: FormGroup;
  selectedTools: string[] = [];
  availableServices: string[] = [
    'Data analytics', 'Security testing', 'AI Scripting',
    'Centralize test data', 'Reporting', 'Chat bot test triggers',
    'Execute test automation', 'Test case generation', 'Test Management'
  ];
  testManagementTools = [
    { name: 'TestRail', description: 'Manage, track, and organize your test cases and results.', logo: 'assets/images/testrail-logo.png' },
    { name: 'Jira', description: 'Manage test plans and track testing progress effectively.', logo: 'assets/images/xray-logo.png' },
    { name: 'Qase', description: 'Test case management, reporting, and CI tools.', logo: 'assets/images/qase-logo.png' }
  ];

  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  isLoading = false;
  selectedTool: string = '';
  isImporting = false;
  backgroundSync = false;

  private unsubscribe$ = new Subject<void>();
  private syncInterval$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private testManagementService: TestManagementService,
    private router: Router,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.initializeForms();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.syncInterval$.next();
    this.syncInterval$.complete();
  }

  private initializeForms() {
    this.projectInfoForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      type: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });

    this.servicesForm = this.fb.group({
      selectedServices: [[], Validators.required]
    });
  }

  addProjectTool(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.selectedTools.push(value);
    }
    event.chipInput!.clear();
  }

  removeProjectTool(tool: string): void {
    const index = this.selectedTools.indexOf(tool);
    if (index >= 0) {
      this.selectedTools.splice(index, 1);
    }
  }

  
  connectTool(toolName: string) {
    this.isLoading = true;
    this.testManagementService.getAuthorizationUrl(toolName)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (url: string) => {
          const authWindow = window.open(url, '_blank', 'width=800,height=600');
          if (authWindow) {
            const pollTimer = setInterval(() => {
              if (authWindow.closed) {
                clearInterval(pollTimer);
                this.checkAuthStatus(toolName);
              }
            }, 500);
          } else {
            this.errorService.handleError('Popup blocked. Please allow popups and try again.');
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error getting auth URL:', error);
          this.errorService.handleError('Failed to start authentication process');
          this.isLoading = false;
        }
      });
  }

  checkAuthStatus(toolName: string) {
    this.testManagementService.checkAuthStatus()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (isAuthenticated: boolean) => {
          if (isAuthenticated) {
            this.errorService.handleSuccess(`Successfully connected to ${toolName}`);
            this.selectedTool = toolName;
            this.syncData();
          } else {
            this.errorService.handleError(`Failed to connect to ${toolName}. Please try again.`);
          }
        },
        error: (error) => {
          console.error('Error checking auth status:', error);
          this.errorService.handleError('Failed to verify authentication status');
        }
      });
  }

  syncData() {
    if (!this.selectedTool) {
      this.errorService.handleError('Please select a test management tool first.');
      return;
    }
  
    this.isImporting = true;
    this.testManagementService.syncTestData().subscribe({
      next: (response) => {
        console.log('Data synced successfully:', response);
        this.errorService.handleSuccess('Data synced successfully!');
        this.isImporting = false;
      },
      error: (error) => {
        console.error('Error syncing data:', error);
        this.errorService.handleError('Failed to sync data. Please try again.');
        this.isImporting = false;
      }
    });
  }

  toggleBackgroundSync() {
    if (this.backgroundSync) {
      this.startBackgroundSync();
    } else {
      this.stopBackgroundSync();
    }
  }

  startBackgroundSync() {
    interval(300000) // 5 minutes
      .pipe(
        takeUntil(this.syncInterval$),
        switchMap(() => this.testManagementService.syncTestData())
      )
      .subscribe({
        next: (response) => {
          console.log('Background sync successful:', response);
        },
        error: (error) => {
          console.error('Error in background sync:', error);
        }
      });
  }

  stopBackgroundSync() {
    this.syncInterval$.next();
  }

  finishProjectCreation() {
    if (this.projectInfoForm.invalid || this.servicesForm.invalid) {
      this.errorService.handleError('Please fill in all required fields');
      return;
    }

    this.isLoading = true;
    const projectData = {
      ...this.projectInfoForm.value,
      tools: this.selectedTools,
      services: this.servicesForm.value.selectedServices,
      testManagementTool: this.selectedTool
    };

    this.testManagementService.createProject(projectData)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (response) => {
          console.log('Project created successfully:', response);
          this.errorService.handleSuccess('Project created successfully!');
          this.router.navigate(['/dashboard'], { queryParams: { newProject: 'true' } });
        },
        error: (error) => {
          console.error('Error creating project:', error);
          this.errorService.handleError('Failed to create project. Please try again.');
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }
}