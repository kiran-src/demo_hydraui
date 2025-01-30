import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatSnackBarModule],
  template: `
    <div class="error-container mat-elevation-z4">
      <mat-icon color="warn">error_outline</mat-icon>
      <span class="error-text">{{ message }}</span>
      <button mat-icon-button class="close-button" (click)="onClose()">
        <mat-icon>close</mat-icon>
      </button>
    </div>
  `,
  styles: [`
    .error-container {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 24px;
      background: #2a2a2a;
      border: 1px solid #f44336;
      border-radius: 4px;
      color: white;
    }

    .error-text {
      margin: 0 12px;
    }

    .close-button {
      margin-left: auto;
      color: rgba(255, 255, 255, 0.7);

      &:hover {
        color: white;
      }
    }
  `]
})
export class ErrorMessageComponent {
  @Input() message = 'An error occurred';

  onClose() {
    // Emit event to parent to handle closing
  }
}