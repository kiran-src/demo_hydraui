import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog'; // Import here if needed

@Component({
  selector: 'app-error-details-dialog',
  standalone: true,
  imports: [MatDialogModule], // Include MatDialogModule if using standalone
  templateUrl: './error-details-dialog.component.html',
  styleUrls: ['./error-details-dialog.component.scss']
})
export class ErrorDetailsDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Error,
    private snackBar: MatSnackBar
  ) {}

  getErrorDetails(): string {
    return JSON.stringify(this.data, null, 2);
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.getErrorDetails());
    this.snackBar.open('Error details copied to clipboard', 'Close', {
      duration: 2000
    });
  }
}