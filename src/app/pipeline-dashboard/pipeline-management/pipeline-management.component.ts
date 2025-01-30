import { CommonModule } from "@angular/common";
import { Component, OnInit, OnDestroy, ElementRef, ViewChild, ChangeDetectorRef } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from '@angular/router';
import { Subject, takeUntil, firstValueFrom } from "rxjs";
import { PipelineDashboardService, PipelineUpdate } from "../pipeline-dashboard.service";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";


interface PipelineLog {
  timestamp: Date;
  level: string;
  message: string;
}

interface PipelineStatus {
  pipelineId: string;
  buildRunId?: number;
  status: string;
  isRunning: boolean;
  lastRun?: Date | null;
  logs: PipelineLog[];
}

@Component({
  selector: 'app-pipeline-management',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatProgressBarModule,MatProgressSpinnerModule  ],
  template: `
    <div class="pipeline-dashboard">
  <div class="pipelines-grid">
    <mat-card *ngFor="let pipeline of pipelines" class="pipeline-card">
      <!-- Card Header -->
      <mat-card-header>
        <mat-card-title>{{ pipeline.name }}</mat-card-title>
        <mat-card-subtitle>ID: {{ pipeline.id }}</mat-card-subtitle>
      </mat-card-header>

      <mat-card-content>
        <!-- Status Section -->
        <div class="status-section" *ngIf="pipelineStatus[pipeline.id]">
          <div class="status-item">
            <span class="label">Status:</span>
            <div class="status-content">
              <span class="value" [ngClass]="getStatusClass(pipelineStatus[pipeline.id].status)">
                {{ pipelineStatus[pipeline.id].status }}
              </span>
              <mat-progress-bar 
                *ngIf="pipelineStatus[pipeline.id].isRunning"
                mode="indeterminate"
                class="status-progress">
              </mat-progress-bar>
            </div>
          </div>
          
          <div class="status-item" *ngIf="pipelineStatus[pipeline.id].lastRun">
            <span class="label">Last Run:</span>
            <span class="value">{{ pipelineStatus[pipeline.id].lastRun | date:'medium' }}</span>
          </div>
        </div>

        <!-- Logs Section -->
        <div class="logs-section" *ngIf="pipelineStatus[pipeline.id]?.isRunning">
          <div class="logs-header">
            <div class="header-content">
              <mat-icon class="status-icon">fiber_manual_record</mat-icon>
              <span class="header-text">Live Pipeline Logs</span>
            </div>
          </div>
          
          <div #logsContainer class="logs-container">
  <ng-container *ngIf="(pipelineStatus[pipeline.id]?.logs || []).length > 0; else noLogs">
    <div *ngFor="let log of pipelineStatus[pipeline.id]?.logs || []" 
         class="log-entry"
         [ngClass]="log.level?.toLowerCase()">
      <span class="timestamp">{{ log.timestamp | date:'HH:mm:ss' }}</span>
      <span class="message">{{ log.message }}</span>
    </div>
  </ng-container>
  
  <ng-template #noLogs>
    <div class="no-logs">
      <mat-spinner diameter="20"></mat-spinner>
      <span>Waiting for logs...</span>
    </div>
  </ng-template>
</div>
        </div>
      </mat-card-content>

      <!-- Card Actions -->
      <mat-card-actions>
        <button mat-button 
                color="primary" 
                [disabled]="pipelineStatus[pipeline.id]?.isRunning"
                (click)="triggerPipeline(pipeline)">
          <mat-icon>play_arrow</mat-icon>
          Run Pipeline
        </button>
        <button mat-button 
                color="accent" 
                (click)="viewDetails(pipeline)">
          <mat-icon>timeline</mat-icon>
          View History
        </button>
      </mat-card-actions>
    </mat-card>
  </div>
</div>
  `,
  styles: [`
.pipeline-dashboard {
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.pipelines-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 24px;
  max-width: 1920px;
  margin: 0 auto;
}

.pipeline-card {
  border-radius: 8px;
  overflow: hidden;
}

.status-section {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
}

.status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
}

.status-content {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

.status-progress {
  width: 100px;
  margin-top: 4px;
}

.label {
  color: #666;
  font-size: 14px;
}

.value {
  font-weight: 500;
}

.value.running { color: #2196f3; }
.value.success { color: #4caf50; }
.value.failed { color: #f44336; }
.value.idle { color: #757575; }
.value.unknown { color: #ff9800; }

.logs-section {
  background: #1e1e1e;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 16px;
}

.logs-header {
  background: #2d2d2d;
  padding: 12px;
  border-bottom: 1px solid #3d3d3d;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-icon {
  color: #4caf50;
  font-size: 12px;
  height: 12px;
  width: 12px;
  animation: pulse 2s infinite;
}

.header-text {
  color: #fff;
  font-size: 14px;
  font-weight: 500;
}

.logs-container {
  max-height: 300px;
  overflow-y: auto;
  padding: 12px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 13px;
}

.log-entry {
  display: flex;
  padding: 4px 8px;
  border-radius: 4px;
  margin-bottom: 2px;
}

.log-entry:hover {
  background: rgba(255, 255, 255, 0.05);
}

.log-entry .timestamp {
  color: #666;
  margin-right: 12px;
  flex-shrink: 0;
}

.log-entry .message {
  color: #d4d4d4;
  word-break: break-word;
}

.log-entry.info .message { color: #4fc3f7; }
.log-entry.error .message { color: #ef5350; }
.log-entry.warning .message { color: #ffb74d; }
.log-entry.success .message { color: #4caf50; }

.no-logs {
  color: #666;
  text-align: center;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.4; }
  100% { opacity: 1; }
}

mat-card-actions {
  display: flex;
  padding: 8px 16px;
  gap: 8px;
}
  `]
})
  export class PipelineManagementComponent implements OnInit, OnDestroy {
    pipelines: any[] = [];
    pipelineStatus: { [key: string]: PipelineStatus } = {};
    private destroy$ = new Subject<void>();
    @ViewChild('logsContainer') private logsContainer?: ElementRef;
  
    constructor(
      private pipelineService: PipelineDashboardService,
      private snackBar: MatSnackBar,
      private router: Router,
      private cdr: ChangeDetectorRef
    ) {
      const navigation = this.router.getCurrentNavigation();
      const state = navigation?.extras?.state as { pipelines: any[] };
      
      if (state?.pipelines) {
        this.pipelines = state.pipelines;
        this.initializePipelineStatus();
      }
    }
  
    ngOnInit() {
      this.pipelineService.pipelineUpdates$
          .pipe(takeUntil(this.destroy$))
          .subscribe({
              next: (update: PipelineUpdate) => {
                  console.log('Component received pipeline update:', update);
                  
                  if (update.pipelineId) {
                      const currentStatus = this.pipelineStatus[update.pipelineId];
                      const existingLogs = new Map(
                          (currentStatus?.logs || []).map(log => [
                              this.createLogKey(log),
                              log
                          ])
                      );
                      
                      // Process new logs
                      const newLogs = (update.logs || []).filter(log => {
                          const key = this.createLogKey(log);
                          return !existingLogs.has(key);
                      });

                      // Update pipeline status
                      this.pipelineStatus[update.pipelineId] = {
                          pipelineId: update.pipelineId,
                          buildRunId: update.buildRunId,
                          status: update.status || currentStatus?.status || 'RUNNING',
                          isRunning: update.status === 'RUNNING',
                          lastRun: update.endTime ? new Date(update.endTime) : new Date(update.runTime),
                          logs: [
                              ...(currentStatus?.logs || []),
                              ...newLogs.map(log => ({
                                  ...log,
                                  timestamp: new Date(log.timestamp)
                              }))
                          ].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
                      };

                      this.scrollLogsToBottom();
                      this.cdr.detectChanges();
                  }
              },
              error: (error) => {
                  console.error('Pipeline updates error:', error);
                  this.snackBar.open('Lost connection to pipeline updates', 'Close', { duration: 5000 });
              }
          });
  }

  private createLogKey(log: PipelineLog): string {
      return `${log.timestamp}-${log.level}-${log.message}`;
  }
    private scrollLogsToBottom() {
      if (this.logsContainer) {
        setTimeout(() => {
          const element = this.logsContainer?.nativeElement;
          if (element) {
            element.scrollTop = element.scrollHeight;
          }
        });
      }
    }
  
    getStatusClass(status: string): string {
      if (!status) return 'unknown';
      return status.toLowerCase();
    }
  
    private initializePipelineStatus() {
      this.pipelines.forEach(pipeline => {
        this.pipelineStatus[pipeline.id] = {
          pipelineId: pipeline.id,
          status: 'IDLE',
          isRunning: false,
          lastRun: null,
          logs: []
        };
      });
    }
  
    async triggerPipeline(pipeline: any) {
  try {
    const response = await firstValueFrom(this.pipelineService.triggerPipeline(pipeline.id));
    console.log('Pipeline trigger response:', response);

    if (!response?.buildRunId) {
      throw new Error('No build run ID received');
    }

    // Initialize pipeline status with empty logs array
    this.pipelineStatus[pipeline.id] = {
      pipelineId: pipeline.id,
      buildRunId: response.buildRunId,
      status: 'RUNNING',
      isRunning: true,
      logs: [],
      lastRun: new Date()
    };

    // Initialize WebSocket connection
    this.pipelineService.initializeWebSocket(response.buildRunId, pipeline.id);
    
    this.cdr.detectChanges();
    this.snackBar.open('Pipeline triggered successfully', 'Close', { duration: 3000 });
  } catch (error: any) {
    console.error('Pipeline trigger error:', error);
    this.snackBar.open(error.message || 'Failed to trigger pipeline', 'Close', { duration: 5000 });
  }
}
  
    viewDetails(pipeline: any) {
      void this.router.navigate(['/', pipeline.id, 'history']);
    }
  
    ngOnDestroy() {
      this.destroy$.next();
      this.destroy$.complete();
    }
  }