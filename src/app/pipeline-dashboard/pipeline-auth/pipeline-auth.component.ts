
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PipelineDashboardService, PipelineConfig } from '../pipeline-dashboard.service';
import { firstValueFrom } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

export interface PipelineAuthFormData {
  versionManager: string;
  organization?: string;
  project: string;
  pipelineId: string;
  personalAccessToken: string;
}

@Component({
  selector: 'app-pipeline-auth',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressBarModule,
    MatIconModule
  ],
  template: `

<!-- Tabs -->
<!-- <div class="tabs">
  <a href="/pipeline-manage" class="tab">Recent Runs</a>
</div> -->

    <div class="auth-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Pipeline Configuration</mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="configForm" (ngSubmit)="onSubmit()">
            <!-- Version Control Selection -->
            <mat-form-field appearance="fill" class="full-width">
              <mat-label>Version Control System</mat-label>
              <mat-select formControlName="versionManager" (selectionChange)="onVersionControlChange()">
                <mat-option value="azure">Azure DevOps</mat-option>
                <mat-option value="gitlab">GitLab</mat-option>
              </mat-select>
            </mat-form-field>

            <!-- Azure DevOps Fields -->
            <ng-container *ngIf="configForm.get('versionManager')?.value === 'azure'">
              <mat-form-field appearance="fill" class="full-width">
                <mat-label>Organization</mat-label>
                <input matInput formControlName="organization" placeholder="your-organization">
                <mat-hint>Your Azure DevOps organization name</mat-hint>
              </mat-form-field>

              <mat-form-field appearance="fill" class="full-width">
                <mat-label>Personal Access Token (PAT)</mat-label>
                <input matInput type="password" formControlName="personalAccessToken">
                <mat-hint>Your Azure DevOps PAT with Build and Pipeline permissions</mat-hint>
              </mat-form-field>
            </ng-container>

            <!-- Project Selection -->
            <div class="actions-row">
              <button mat-stroked-button 
                      type="button"
                      [disabled]="!isAuthValid()" 
                      (click)="fetchProjects()">
                <mat-icon>refresh</mat-icon>
                Fetch Projects
              </button>
            </div>

            
            <!-- After project selection -->
<ng-container *ngIf="projects.length > 0">
  <mat-form-field appearance="fill" class="full-width">
    <mat-label>Project</mat-label>
    <mat-select formControlName="project" (selectionChange)="onProjectSelect()">
      <mat-option *ngFor="let project of projects" [value]="project.id">
        {{project.name}}
      </mat-option>
    </mat-select>
  </mat-form-field>

  <!-- Add button here, after project selection -->
  <div class="actions-row">
    <button mat-raised-button 
            color="primary" 
            (click)="goToPipelineManagement()"
            [disabled]="!configForm.get('project')?.value">
      <mat-icon>build</mat-icon>
      View & Manage Pipelines
    </button>
  </div>
</ng-container>
            <!-- Pipeline Selection -->
            <ng-container *ngIf="pipelines.length > 0">
              <mat-form-field appearance="fill" class="full-width">
                <mat-label>Pipeline</mat-label>
                <mat-select formControlName="pipelineId">
                  <mat-option *ngFor="let pipeline of pipelines" [value]="pipeline.id">
                    {{pipeline.name}}
                  </mat-option>
                </mat-select>
              </mat-form-field>

              <div class="actions-row" *ngIf="configForm.get('pipelineId')?.value">
                <!-- <button mat-raised-button 
                        color="primary" 
                        type="button"
                        (click)="triggerPipeline()">
                  <mat-icon>play_arrow</mat-icon>
                  Trigger Pipeline
                </button> -->
              </div>
            </ng-container>

            <div class="form-actions">
              <button mat-flat-button 
                      color="primary" 
                      type="submit" 
                      [disabled]="!configForm.valid">
                Save Configuration
              </button>
              <!-- <a href="/dashboard">
              <button color="primary" 
              > Back
             </button>
</a> -->
            </div>
          </form>
        </mat-card-content>

        <mat-progress-bar *ngIf="loading" mode="indeterminate"></mat-progress-bar>
      </mat-card>
    </div>
  `,
  styles: [`
    .auth-container {
      max-width: 800px;
      margin: 20px auto;
      padding: 0 20px;
    }

    .full-width {
      width: 100%;
      margin-bottom: 16px;
    }

    .form-actions {
      display: flex;
      gap: 16px;
      justify-content: flex-end;
      margin-top: 24px;
    }

    mat-card {
      padding: 24px;
    }

    mat-card-title {
      margin-bottom: 24px;
    }

    .actions-row {
      display: flex;
      justify-content: flex-end;
      margin: 16px 0;
    }

    .actions-row {
      margin-top: 20px;
      display: flex;
      justify-content: center;
    }

    // Tabs Styling
    .tabs {
    display: flex;
    background-color: #fff;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    width: fit-content;
}
.tab {
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    margin-right: 5px;
    background-color: #f2f2f2;
}

.tab.active {
    background-color: #005c8f;
    color: white;
}
  `]
})
export class PipelineAuthComponent implements OnInit {
  projects: any[] = [];
  pipelines: any[] = [];
  loading = false;
  configForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private pipelineService: PipelineDashboardService,
    private snackBar: MatSnackBar,
    private router: Router

  ) {
    this.configForm = this.fb.group({
      versionManager: ['', Validators.required],
      organization: [''],
      project: ['', Validators.required],
      pipelineId: ['', Validators.required],
      personalAccessToken: ['', Validators.required],
      // active: [true]
    });
  }

  ngOnInit() {
    // If editing existing config, load it here
  }
  
  

  onVersionControlChange() {
    const versionManager = this.configForm.get('versionManager')?.value;
    if (versionManager === 'azure') {
      this.configForm.get('organization')?.setValidators([Validators.required]);
    } else {
      this.configForm.get('organization')?.clearValidators();
    }
    this.configForm.get('organization')?.updateValueAndValidity();
    
    // Reset selections
    this.projects = [];
    this.pipelines = [];
    this.configForm.patchValue({
      project: '',
      pipelineId: ''
    });
  }

  isAuthValid(): boolean {
    const versionManager = this.configForm.get('versionManager')?.value;
    const pat = this.configForm.get('personalAccessToken')?.value;
    const org = this.configForm.get('organization')?.value;

    if (!versionManager || !pat) return false;
    if (versionManager === 'azure' && !org) return false;

    return true;
  }

  

  async fetchProjects() {
    if (!this.isAuthValid()) return;

    this.loading = true;
    try {
        const versionManager = this.configForm.get('versionManager')?.value;
        const config = {
            versionManager,
            organization: this.configForm.get('organization')?.value,
            personalAccessToken: this.configForm.get('personalAccessToken')?.value
        };

        this.projects = await firstValueFrom(this.pipelineService.fetchProjects(config));
        this.snackBar.open('Projects fetched successfully', 'Close', { duration: 3000 });
    } catch (error: any) {
        const message = error.message?.includes('expired') ? 
            'Your Personal Access Token has expired. Please generate a new one.' :
            error.message || 'Failed to fetch projects';
            
        this.snackBar.open(message, 'Close', { 
            duration: 5000,
            panelClass: ['error-snackbar']
        });
    } finally {
        this.loading = false;
    }
}

async goToPipelineManagement() {
  const projectId = this.configForm.get('project')?.value;
  if (!projectId) return;
 
  try {
    const config = {
      ...this.configForm.value,
      project: projectId
    };
 
    const response = await firstValueFrom(this.pipelineService.fetchPipelines(config));
    console.log('Response:', response); // Debug log
    
    this.pipelines = response; // Direct assignment since response is already an array
 
    if (this.pipelines && this.pipelines.length > 0) {
      await this.router.navigate(['/pipeline-manage'], { 
        state: { 
          pipelines: this.pipelines,
          config: config 
        }
      });
    } else {
      this.snackBar.open('No pipelines found', 'Close', { duration: 3000 });
    }
  } catch (error: any) {
    console.error('Error:', error);
    this.snackBar.open(error.message || 'Failed to load pipelines', 'Close', { duration: 5000 });
  }
 }

 async onProjectSelect() {
  const projectId = this.configForm.get('project')?.value;
  if (!projectId) return;

  this.loading = true;
  try {
    const config = {
      versionManager: this.configForm.get('versionManager')?.value,
      organization: this.configForm.get('organization')?.value,
      project: projectId,
      personalAccessToken: this.configForm.get('personalAccessToken')?.value
    };

    const response = await firstValueFrom(this.pipelineService.fetchPipelines(config));
    console.log('Raw API Response:', response); // Debug log

    this.pipelines = Array.isArray(response) ? response : [];
    
    if (this.pipelines.length === 0) {
      this.snackBar.open('No pipelines found for this project', 'Close', { duration: 3000 });
    }
  } catch (error: any) {
    console.error('Pipeline fetch error:', error);
    this.snackBar.open(error.message || 'Failed to fetch pipelines', 'Close', { duration: 5000 });
  } finally {
    this.loading = false;
  }
}
async triggerPipeline() {
  const pipelineId = this.configForm.get('pipelineId')?.value;
  if (!pipelineId) return;

  this.loading = true;
  try {
    await firstValueFrom(this.pipelineService.triggerPipeline(pipelineId));
    this.snackBar.open('Pipeline triggered successfully', 'Close', { duration: 3000 });
  } catch (error: any) {
    this.snackBar.open(error.message || 'Failed to trigger pipeline', 'Close', { duration: 5000 });
  } finally {
    this.loading = false;
  }
}

  async onSubmit() {
    if (this.configForm.invalid) return;

    this.loading = true;
    try {
      const config = this.configForm.value;
      await firstValueFrom(this.pipelineService.createPipelineConfig(config));
      this.snackBar.open('Pipeline configuration saved successfully', 'Close', { duration: 3000 });
    } catch (error: any) {
      this.snackBar.open(error.message || 'Failed to save configuration', 'Close', { duration: 5000 });
    } finally {
      this.loading = false;
    }
  }
}