// error.service.ts
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

export interface ErrorState {
  message: string;
  type: 'error' | 'warning' | 'info';
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private errorState = new BehaviorSubject<ErrorState | null>(null);
  public error$ = this.errorState.asObservable();

  constructor(private snackBar: MatSnackBar) {}

  handleError(error: any, showSnackbar = true) {
    let errorMessage = 'An unknown error occurred';
    let errorType: 'error' | 'warning' | 'info' = 'error';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else if (error.status === 401) {
      errorMessage = 'Your session has expired. Please log in again.';
      errorType = 'warning';
    } else if (error.status === 403) {
      errorMessage = 'You do not have permission to perform this action.';
      errorType = 'warning';
    } else if (error.status === 404) {
      errorMessage = 'The requested resource was not found.';
      errorType = 'warning';
    } else if (error.status === 500) {
      errorMessage = 'A server error occurred. Please try again later.';
    } else if (error.error?.message) {
      errorMessage = error.error.message;
    }

    const errorState: ErrorState = {
      message: errorMessage,
      type: errorType,
      timestamp: new Date()
    };

    this.errorState.next(errorState);

    if (showSnackbar) {
      this.showErrorSnackbar(errorState);
    }

    return errorState;
  }

  private showErrorSnackbar(error: ErrorState) {
    this.snackBar.open(error.message, 'Close', {
      duration: 5000,
      panelClass: [`snackbar-${error.type}`],
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  clearError() {
    this.errorState.next(null);
  }
}