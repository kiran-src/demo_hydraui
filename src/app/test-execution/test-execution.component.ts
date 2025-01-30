// test-execution.component.ts
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { TestExecutionService } from './test-execution.service';
import { WebSocketService } from './websocket.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { MatStepper } from '@angular/material/stepper';
import { 
  BuildRun, BuildRunLog, PipelineConfig, BuildStatus,
  AzureOrganization, AzureProject, AzurePipeline 
} from './pipeline.interface';

// Material Imports
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { ErrorSnackbarComponent } from '../common/error-snackbar/error-snackbar.component';

@Component({
  selector: 'app-test-execution',
  templateUrl: './test-execution.component.html',
  styleUrls: ['./test-execution.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSnackBarModule,
    MatStepperModule,
    RouterModule
  ]
})
export class TestExecutionComponent implements OnInit, OnDestroy {
  @ViewChild('stepper') stepper!: MatStepper;
  @ViewChild('logsContainer') logsContainer!: ElementRef;

  // Forms
  patForm: FormGroup;
  configSelectionForm: FormGroup;
  configDetailsForm: FormGroup;

  // Azure DevOps data
  organizations: AzureOrganization[] = [];
  projects: AzureProject[] = [];
  pipelines: AzurePipeline[] = [];
  selectedPipeline: AzurePipeline | null = null;

  // UI state
  hideToken = true;
  currentStep = 1;
  isLoading = false;
  loadingMessage = '';
  patValidated = false;
  websocketConnected$: Observable<boolean>;

  // Build state
  buildRun: BuildRun | null = null;
  buildRunLogs: BuildRunLog[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private testExecutionService: TestExecutionService,
    private webSocketService: WebSocketService,
    private snackBar: MatSnackBar
  ) {
    this.createForms();
    this.websocketConnected$ = this.webSocketService.connectionStatus$;
  }

  ngOnInit() {
    this.setupWebSocketSubscriptions();
    this.setupFormSubscriptions();
  }

  private createForms() {
    // PAT Form
    this.patForm = this.fb.group({
      personalAccessToken: ['', [Validators.required, Validators.minLength(32)]]
    });

    // Config Selection Form
    this.configSelectionForm = this.fb.group({
      organization: ['', Validators.required],
      project: ['', Validators.required],
      pipeline: ['', Validators.required]
    });

    // Config Details Form
    this.configDetailsForm = this.fb.group({
      pipelineName: ['', Validators.required],
      versionManager: ['npm', Validators.required]
    });
  }

  private setupFormSubscriptions() {
    // Handle organization selection
    this.configSelectionForm.get('organization')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(org => {
        if (org) {
          this.loadProjects(org);
        }
      });

    // Handle project selection
    this.configSelectionForm.get('project')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(project => {
        if (project) {
          this.loadPipelines(
            this.configSelectionForm.get('organization')?.value,
            project
          );
        }
      });

    // Handle pipeline selection
    this.configSelectionForm.get('pipeline')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(pipelineId => {
        if (pipelineId) {
          this.loadPipelineDetails(
            this.configSelectionForm.get('organization')?.value,
            this.configSelectionForm.get('project')?.value,
            pipelineId
          );
        }
      });
  }

  validatePAT() {
    if (!this.patForm.valid) {
      this.markFormGroupTouched(this.patForm);
      return;
    }

    this.isLoading = true;
    this.loadingMessage = 'Validating token...';
    this.patValidated = false;
    this.organizations = [];

    const pat = this.patForm.get('personalAccessToken')?.value;

    this.testExecutionService.validateAndSetPAT(pat)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isLoading = false;
          this.loadingMessage = '';
        })
      )
      .subscribe({
        next: (response) => {
          if (response.organizations && response.organizations.length > 0) {
            this.patValidated = true;
            this.organizations = response.organizations;
            this.snackBar.open('Token validation successful', 'Close', {
              duration: 3000,
              panelClass: ['success-snackbar']
            });
            
            // Auto-select organization if there's only one
            if (this.organizations.length === 1) {
              this.configSelectionForm.patchValue({
                organization: this.organizations[0].accountName
              });
            }
          } else {
            this.handleError('No organizations found', new Error('No organizations available for this token'));
          }
        },
        error: (error: Error) => {
          this.patValidated = false;
          this.handleError('Token validation failed', error);
          this.patForm.get('personalAccessToken')?.setErrors({ invalidPat: true });
        }
      });
  }

  private loadProjects(organization: string) {
    if (!organization) return;

    this.isLoading = true;
    this.loadingMessage = 'Loading projects...';
    this.projects = [];
    this.configSelectionForm.get('project')?.setValue('');
    this.configSelectionForm.get('pipeline')?.setValue('');

    this.testExecutionService.getProjects(organization)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isLoading = false;
          this.loadingMessage = '';
        })
      )
      .subscribe({
        next: (projects) => {
          if (projects.length > 0) {
            this.projects = projects;
            // Auto-select project if there's only one
            if (projects.length === 1) {
              this.configSelectionForm.patchValue({
                project: projects[0].name
              });
            }
          } else {
            this.showWarning('No projects found', 'No projects available in this organization');
          }
        },
        error: (error: Error) => {
          this.handleError('Failed to load projects', error);
          this.configSelectionForm.get('project')?.setErrors({ loadError: true });
        }
      });
  }

  private loadPipelines(organization: string, project: string) {
    if (!organization || !project) return;

    this.isLoading = true;
    this.loadingMessage = 'Loading pipelines...';
    this.pipelines = [];
    this.configSelectionForm.get('pipeline')?.setValue('');

    this.testExecutionService.getPipelines(organization, project)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isLoading = false;
          this.loadingMessage = '';
        })
      )
      .subscribe({
        next: (pipelines) => {
          if (pipelines.length > 0) {
            this.pipelines = pipelines;
            // Auto-select pipeline if there's only one
            if (pipelines.length === 1) {
              this.configSelectionForm.patchValue({
                pipeline: pipelines[0].id
              });
            }
          } else {
            this.showWarning('No pipelines found', 'No pipelines available in this project');
          }
        },
        error: (error: Error) => {
          this.handleError('Failed to load pipelines', error);
          this.configSelectionForm.get('pipeline')?.setErrors({ loadError: true });
        }
      });
  }

  private loadPipelineDetails(organization: string, project: string, pipelineId: string) {
    this.isLoading = true;
    this.loadingMessage = 'Loading pipeline details...';

    this.testExecutionService.getPipelineDetails(organization, project, pipelineId)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isLoading = false;
          this.loadingMessage = '';
        })
      )
      .subscribe({
        next: (pipeline) => {
          this.selectedPipeline = pipeline;
          this.configDetailsForm.patchValue({
            pipelineName: pipeline.name
          });
        },
        error: (error) => this.handleError('Failed to load pipeline details', error)
      });
  }

  runPipeline() {
    if (!this.selectedPipeline || !this.configSelectionForm.valid || !this.configDetailsForm.valid) {
      this.snackBar.open('Please complete all required fields', 'Close', { duration: 3000 });
      return;
    }

    this.isLoading = true;
    this.loadingMessage = 'Saving pipeline configuration...';
    this.buildRunLogs = [];

    const config: PipelineConfig = {
      pipelineName: this.configDetailsForm.get('pipelineName')?.value,
      repositoryName: this.selectedPipeline.repository?.name || '',
      repositoryUrl: this.selectedPipeline.repository?.url || '',
      branch: this.selectedPipeline.repository?.defaultBranch || 'main',
      organization: this.configSelectionForm.get('organization')?.value,
      project: this.configSelectionForm.get('project')?.value,
      pipelineId: this.selectedPipeline.id,
      definitionId: this.selectedPipeline.revision.toString(),
      personalAccessToken: this.patForm.get('personalAccessToken')?.value,
      versionManager: this.configDetailsForm.get('versionManager')?.value,
      platform: "Default",
      deviceName: "Default",
      projectName: "Default"
    };

    this.testExecutionService.savePipelineConfig(config)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (savedConfig) => {
          if (savedConfig.id) {
            this.executePipeline(savedConfig.id);
          } else {
            this.handleError('Failed to execute pipeline', new Error('No configuration ID received'));
          }
        },
        error: (error) => {
          this.handleError('Failed to save pipeline configuration', error);
          this.isLoading = false;
          this.loadingMessage = '';
        }
      });
  }

  private executePipeline(configId: number) {
    this.loadingMessage = 'Executing pipeline...';
    
    this.testExecutionService.executePipeline(configId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (buildRun) => {
          this.buildRun = buildRun;
          this.stepper.selectedIndex = 2;
          this.currentStep = 3;
        },
        error: (error) => {
          this.handleError('Failed to execute pipeline', error);
          this.isLoading = false;
          this.loadingMessage = '';
        }
      });
  }

  cancelBuild() {
    if (!this.buildRun?.buildRunId) return;

    this.isLoading = true;
    this.loadingMessage = 'Cancelling build...';

    this.testExecutionService.cancelBuild(this.buildRun.buildRunId)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isLoading = false;
          this.loadingMessage = '';
        })
      )
      .subscribe({
        next: (buildRun) => {
          this.buildRun = buildRun;
          this.snackBar.open('Build cancelled successfully', 'Close', { duration: 3000 });
        },
        error: (error) => this.handleError('Failed to cancel build', error)
      });
  }

  private setupWebSocketSubscriptions() {
    this.webSocketService.buildStatus$
      .pipe(takeUntil(this.destroy$))
      .subscribe(buildRun => {
        if (buildRun) {
          this.buildRun = buildRun;
          if (this.isCompletedStatus(buildRun.status)) {
            this.isLoading = false;
          }
        }
      });

    this.webSocketService.buildLogs$
      .pipe(takeUntil(this.destroy$))
      .subscribe(logs => {
        if (logs.length > 0) {
          this.buildRunLogs = [...this.buildRunLogs, ...logs];
          this.scrollToLatestLog();
        }
      });
  }

  private scrollToLatestLog(): void {
    setTimeout(() => {
      if (this.logsContainer) {
        const container = this.logsContainer.nativeElement;
        container.scrollTop = container.scrollHeight;
      }
    });
  }

  isCompletedStatus(status: string): boolean {
    return [
      BuildStatus.COMPLETED,
      BuildStatus.FAILED,
      BuildStatus.CANCELLED,
      BuildStatus.TIMEOUT
    ].includes(status as BuildStatus);
  }

  getLogClass(level: string): string {
    switch (level.toLowerCase()) {
      case 'error': return 'log-level-error';
      case 'warning': return 'log-level-warning';
      default: return 'log-level-info';
    }
  }

  private handleError(title: string, error: Error) {
    console.error(title, error);
    this.snackBar.openFromComponent(ErrorSnackbarComponent, {
      data: {
        title: title,
        message: error.message,
        error: error
      },
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }

  private showWarning(title: string, message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['warning-snackbar']
    });
  }

  getErrorMessage(control: AbstractControl | null): string {
    if (!control) return '';
    
    if (control.hasError('required')) {
      return 'This field is required';
    }
    if (control.hasError('minlength')) {
      return 'Must be at least 32 characters';
    }
    if (control.hasError('invalidPat')) {
      return 'Invalid Personal Access Token';
    }
    if (control.hasError('loadError')) {
      return 'Failed to load data. Please try again.';
    }
    if (control.hasError('pattern')) {
      return 'Invalid format';
    }
    return 'Invalid input';
  }


  ngOnDestroy() {
    this.testExecutionService.disconnectWebSocket();
    this.destroy$.next();
    this.destroy$.complete();
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}