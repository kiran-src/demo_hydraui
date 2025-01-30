import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ErrorService } from '../../common/error.service';

@Component({
    selector: 'app-verify-email',
    standalone: true,
    imports: [RouterLink, MatButtonModule],
    templateUrl: './verify-email.component.html',
    styleUrl: './verify-email.component.scss',
})
export class VerifyEmailComponent implements OnInit {
    // isToggled
    isToggled = false;

    constructor(
        public themeService: CustomizerSettingsService,
        private authService: AuthService,
        private router: Router,
        private errorService: ErrorService
    ) {
        this.themeService.isToggled$.subscribe((isToggled) => {
            this.isToggled = isToggled;
        });
    }

    async ngOnInit() {
        // if (await this.authService.isEmailVerified()) {
        //     this.router.navigate(['/profile']);
        // }
        await this.checkEmailVerification();
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

    async recheckVerification() {
        await this.checkEmailVerification();
    }

    private async checkEmailVerification() {
        try {
            if (await this.authService.isEmailVerified()) {
                this.errorService.handleError('Email verified successfully!');
                this.router.navigate(['/profile']);
            } else {
                this.errorService.handleError('Email is not yet verified. Please check your inbox.');
            }
        } catch (error) {
            this.errorService.handleError('Error checking email verification status');
        }
    }

    async resendVerificationEmail() {
        try {
            await this.authService.sendVerificationEmail().toPromise();
            console.log('Verification email resent');
        } catch (error) {
            console.error('Error sending verification email', error);
        }
    }

    logout() {
        this.authService.signOut();
    }
}
