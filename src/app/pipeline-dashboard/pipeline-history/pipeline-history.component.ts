import { CommonModule } from "@angular/common";
import { Component, OnInit, AfterViewInit, ViewChild, Inject } from "@angular/core";
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatPaginatorModule, MatPaginator } from "@angular/material/paginator";
import { MatSortModule, MatSort } from "@angular/material/sort";
import { MatTableModule, MatTableDataSource } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { ActivatedRoute } from "@angular/router";
import { PipelineDashboardService } from "../pipeline-dashboard.service";

@Component({
 selector: 'app-pipeline-history',
 standalone: true,
 imports: [
   CommonModule, 
   MatTableModule,
   MatPaginatorModule, 
   MatSortModule,
   MatDialogModule,
   MatButtonModule,
   MatIconModule
 ],
  template: `
    <div class="history-container">
      <h2>Pipeline Run History</h2>
 
      <mat-table [dataSource]="dataSource" matSort>
        <ng-container matColumnDef="buildNumber">
          <mat-header-cell *matHeaderCellDef mat-sort-header>Build</mat-header-cell>
          <mat-cell *matCellDef="let run">{{run.buildNumber}}</mat-cell>
        </ng-container>
 
        <ng-container matColumnDef="startTime">
          <mat-header-cell *matHeaderCellDef mat-sort-header>Started</mat-header-cell>
          <mat-cell *matCellDef="let run">{{run.startTime | date:'medium'}}</mat-cell>
        </ng-container>
 
        <ng-container matColumnDef="duration">
          <mat-header-cell *matHeaderCellDef mat-sort-header>Duration</mat-header-cell>
          <mat-cell *matCellDef="let run">{{formatDuration(run.duration)}}</mat-cell>
        </ng-container>
 
        <ng-container matColumnDef="status">
          <mat-header-cell *matHeaderCellDef mat-sort-header>Status</mat-header-cell>
          <mat-cell *matCellDef="let run">
            <span class="status-badge" [class]="run.status.toLowerCase()">
              {{run.status}}
            </span>
          </mat-cell>
        </ng-container>
 
        <ng-container matColumnDef="triggerSource">
          <mat-header-cell *matHeaderCellDef mat-sort-header>Trigger</mat-header-cell>
          <mat-cell *matCellDef="let run">{{run.triggerSource}}</mat-cell>
        </ng-container>
 
        <ng-container matColumnDef="actions">
          <mat-header-cell *matHeaderCellDef>Actions</mat-header-cell>
          <mat-cell *matCellDef="let run">
            <button mat-icon-button color="primary" (click)="viewLogs(run)">
              <mat-icon>assessment</mat-icon>
            </button>
          </mat-cell>
        </ng-container>
 
        <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
        <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
      </mat-table>
 
      <mat-paginator [pageSizeOptions]="[10, 25, 50]"></mat-paginator>
    </div>
  `,
  styles: [`
    .history-container {
      padding: 20px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
 
    .mat-table {
      width: 100%;
    }
 
    .status-badge {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
 
      &.success { background: #e6f4ea; color: #1e8e3e; }
      &.failed { background: #fce8e6; color: #d93025; }
      &.running { background: #e8f0fe; color: #1a73e8; }
      &.canceled { background: #f1f3f4; color: #5f6368; }
    }
 
    .mat-column-actions {
      max-width: 80px;
    }
  `]
 })
 export class PipelineHistoryComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns = ['buildNumber', 'startTime', 'duration', 'status', 'triggerSource', 'actions'];
  dataSource: MatTableDataSource<any>;
 
  constructor(
    private pipelineService: PipelineDashboardService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource();
  }
 
  ngOnInit() {
    const pipelineId = parseInt(this.route.snapshot.paramMap.get('id') || '0');
    this.loadPipelineHistory(pipelineId);
  }
 
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
 
  private loadPipelineHistory(pipelineId: number) {
    this.pipelineService.getPipelineRuns(pipelineId).subscribe({
      next: (runs) => {
        this.dataSource.data = runs;
      },
      error: (error) => {
        console.error('Error loading pipeline history:', error);
      }
    });
  }
 
  formatDuration(milliseconds: number): string {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  }
 
  viewLogs(run: any) {
    this.dialog.open(PipelineLogsDialog, {
      data: run,
      width: '80vw',
      height: '80vh'
    });
  }
 }
 
 @Component({
  selector: 'pipeline-logs-dialog',
  standalone: true, // Add standalone
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  template: `
    <h2 mat-dialog-title>Build #{{data.buildNumber}} Logs</h2>
    <mat-dialog-content>
      <div class="logs-container">
        <pre>{{data.logs}}</pre>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Close</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .logs-container {
      background: #1e1e1e;
      color: #fff;
      padding: 16px;
      border-radius: 4px;
      height: calc(100% - 32px);
      overflow: auto;
      font-family: monospace;
 
      pre {
        margin: 0;
        white-space: pre-wrap;
      }
    }
  `]
 })
 export class PipelineLogsDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
 }