import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router'; // Add Router import
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  loginError: string | null = null;
  isToggled = false;
  
  constructor(
    private fb: FormBuilder,
    public themeService: CustomizerSettingsService,
    private authService: AuthService,
    private router: Router // Inject Router
  ) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
    this.themeService.isToggled$.subscribe((isToggled) => {
      this.isToggled = isToggled;
    });
  }

  hide = true;
  authForm: FormGroup;

  onSubmit() {
    if (this.authForm.valid) {
      const { email, password } = this.authForm.value;
      this.authService.signInWithEmailAndPassword(email, password).subscribe(
        (user) => {
          console.log('Login successful', user);
          
          this.router.navigate(['/landing-page']); // Now this will work
        },
        (error) => {
          console.error('Login failed', error);
          this.loginError = error.message || 'An error occurred during sign in. Please try again.';
        }
      );
    } else {
      console.log('Form is invalid. Please check the fields.');
      this.loginError = 'Please fill in all required fields correctly.';
    }
  }

  // Dark Mode
  toggleTheme() {
    this.themeService.toggleTheme();
  }

  // Card Border
  toggleCardBorderTheme() {
    this.themeService.toggleCardBorderTheme();
  }

  // RTL Mode
  toggleRTLEnabledTheme() {
    this.themeService.toggleRTLEnabledTheme();
  }
}