import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ErrorService, ErrorState } from '../../services/error.service';
import { Subscription } from 'rxjs';
import { fadeInOut } from '../../shared/animations/dashboard.animations';

@Component({
  selector: 'app-error-display',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  animations: [fadeInOut],
  template: `
    <div class="error-container" *ngIf="error" [@fadeInOut]>
      <mat-card [ngClass]="'error-card-' + error.type">
        <mat-card-content>
          <mat-icon>{{ getIconForType(error.type) }}</mat-icon>
          <span class="error-message">{{ error.message }}</span>
          <button mat-icon-button (click)="dismissError()">
            <mat-icon>close</mat-icon>
          </button>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .error-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
      max-width: 400px;
    }

    mat-card {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      margin-bottom: 10px;

      &.error-card-error {
        background-color: #f44336;
        color: white;
      }

      &.error-card-warning {
        background-color: #ff9800;
        color: white;
      }

      &.error-card-info {
        background-color: #2196f3;
        color: white;
      }
    }

    mat-card-content {
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 0;
    }

    .error-message {
      flex: 1;
    }
  `]
})
export class ErrorDisplayComponent implements OnDestroy {
  error: ErrorState | null = null;
  private subscription: Subscription;

  constructor(private errorService: ErrorService) {
    this.subscription = this.errorService.error$.subscribe(
      error => this.error = error
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  dismissError() {
    this.errorService.clearError();
  }

  getIconForType(type: string): string {
    switch (type) {
      case 'error': return 'error';
      case 'warning': return 'warning';
      case 'info': return 'info';
      default: return 'error';
    }
  }
}