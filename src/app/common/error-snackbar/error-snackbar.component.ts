import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon'; // Import here if needed
import { ErrorDetailsDialogComponent } from '../error-details-dialog/error-details-dialog.component';

@Component({
  selector: 'app-error-snackbar',
  standalone: true,
  imports: [MatIconModule], // Include MatIconModule here
  templateUrl: './error-snackbar.component.html',
  styleUrls: ['./error-snackbar.component.scss']
})
export class ErrorSnackbarComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    private dialog: MatDialog
  ) {}

  showDetails() {
    this.dialog.open(ErrorDetailsDialogComponent, {
      data: this.data.error,
      width: '600px'
    });
  }
}