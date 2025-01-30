import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';

export interface FilterDialogData {
  currentFilters: Array<{ key: string; label: string; value: any }>;
  availableFilters: {
    status: string[];
    priority: string[];
    assignee: string[];
  };
}

@Component({
  selector: 'app-filter-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDividerModule
  ],
  template: `
    <h2 mat-dialog-title>Filter Dashboard</h2>
    <mat-dialog-content>
      <div class="filter-sections">
        <!-- Status Filters -->
        <div class="filter-section">
          <h3>Status</h3>
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Select Status</mat-label>
            <mat-select [(ngModel)]="selectedFilters.status" multiple>
              <mat-option *ngFor="let status of data.availableFilters.status" [value]="status">
                {{ status }}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </div>

        <!-- Priority Filters -->
        <div class="filter-section">
          <h3>Priority</h3>
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Select Priority</mat-label>
            <mat-select [(ngModel)]="selectedFilters.priority" multiple>
              <mat-option *ngFor="let priority of data.availableFilters.priority" [value]="priority">
                {{ priority }}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </div>

        <!-- Assignee Filters -->
        <div class="filter-section">
          <h3>Assignee</h3>
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Select Assignee</mat-label>
            <mat-select [(ngModel)]="selectedFilters.assignee" multiple>
              <mat-option *ngFor="let assignee of data.availableFilters.assignee" [value]="assignee">
                {{ assignee }}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </div>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onClear()">Clear All</button>
      <button mat-button (click)="dialogRef.close()">Cancel</button>
      <button mat-raised-button color="primary" (click)="onApply()">Apply Filters</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .filter-sections {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 16px 0;
    }

    .filter-section {
      h3 {
        margin: 0 0 8px 0;
        font-size: 14px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.6);
      }
    }

    .full-width {
      width: 100%;
    }

    @media (prefers-color-scheme: dark) {
      .filter-section h3 {
        color: rgba(255, 255, 255, 0.6);
      }
    }
  `]
})
export class FilterDialogComponent {
  selectedFilters: {
    status: string[];
    priority: string[];
    assignee: string[];
  } = {
    status: [],
    priority: [],
    assignee: []
  };

  constructor(
    public dialogRef: MatDialogRef<FilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FilterDialogData
  ) {
    // Initialize selectedFilters from currentFilters
    this.initializeFilters();
  }

  private initializeFilters() {
    this.data.currentFilters.forEach(filter => {
      if (Array.isArray(filter.value)) {
        this.selectedFilters[filter.key as keyof typeof this.selectedFilters] = [...filter.value];
      }
    });
  }

  onClear() {
    this.selectedFilters = {
      status: [],
      priority: [],
      assignee: []
    };
  }

  onApply() {
    // Convert selected filters back to the format expected by the dashboard
    const appliedFilters = Object.entries(this.selectedFilters)
      .filter(([_, values]) => values.length > 0)
      .map(([key, values]) => ({
        key,
        label: `${key}: ${values.join(', ')}`,
        value: values
      }));

    this.dialogRef.close(appliedFilters);
  }
}