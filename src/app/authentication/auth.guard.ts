import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/authentication/sign-in']);
      return of(false);
    }
    return this.authService.isEmailVerified().pipe(
      map(isVerified => {
        if (isVerified) {
          return true;
        } else {
          this.router.navigate(['/authentication/verify-email']);
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['/authentication/sign-in']);
        return of(false);
      })
    );
  }
}