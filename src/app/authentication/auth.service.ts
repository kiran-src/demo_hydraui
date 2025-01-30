import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

interface User {
  userId: string;
  name: string;
  email: string;
  confirmed: boolean;
  userType: string;
  clientId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;
  private tokenSubject: BehaviorSubject<string | null>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || this.tokenSubject.value;
    // console.log(token+"Tokening")
    if (token) {
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      });
    } else {
      const credentials = btoa(`${environment.apiUsername}:${environment.apiPassword}`);
      return new HttpHeaders({
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      });
    }
  }

  private getUserFromStorage(): User | null {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  signUpWithEmailAndPassword(name: string, email: string, password: string): Observable<User> {
    return this.http.post<{ token: string, user: User }>(
      `${environment.apiUrl}/api/client/register`,
      { name, email, password },
      { headers: this.getAuthHeaders() }
    ).pipe(
      tap(response => this.handleAuthResponse(response)),
      map(response => response.user),
      catchError(this.handleError)
    );
  }

  signInWithEmailAndPassword(email: string, password: string): Observable<User> {
    return this.http.post<{ token: string, user: User }>(
      `${environment.apiUrl}/api/client/login`,
      { email, password },
      { headers: this.getAuthHeaders() }
    ).pipe(
      tap(response => this.handleAuthResponse(response)),
      map(response => response.user),
      catchError(this.handleError)
    );
  }

  private handleAuthResponse(response: { token: string, user: User }) {
    localStorage.setItem('token', response.token);
    localStorage.setItem('currentUser', JSON.stringify(response.user));
    this.tokenSubject.next(response.token);
    this.currentUserSubject.next(response.user);
  }

  signOut(): Observable<void> {
    return new Observable(observer => {
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
      this.tokenSubject.next(null);
      this.router.navigate(['/login']);
      observer.next();
      observer.complete();
    });
  }

  isAuthenticated(): boolean {
    return !!this.tokenSubject.value;
  }

  isEmailVerified(): Observable<boolean> {
    return this.http.get<boolean>(`${environment.apiUrl}/api/client/is-email-verified`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(error => {
        console.error('Email verification check failed:', error);
        return throwError(() => new Error(`Email verification check failed: ${error.message}`));
      })
    );
  }

  sendVerificationEmail(): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/client/send-verification-email`, {}, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      console.error('Client side error:', error.error.message);
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      console.error(`Backend returned code ${error.status}, body was:`, error.error);
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message || error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}