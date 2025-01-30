// src/app/common/global-error-handler.ts

import { ErrorHandler, Injectable } from '@angular/core';
import { ErrorService } from './error.service';
import { environment } from '../../environments/environment';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(private errorService: ErrorService) {}

    handleError(error: any) {
        this.errorService.handleError('An unexpected error occurred');
        // Optionally log to an error tracking service here

        // You can also log to console in development mode if needed
        if (!environment.production) {
            console.error('Global error:', error);
        }
    }
}
