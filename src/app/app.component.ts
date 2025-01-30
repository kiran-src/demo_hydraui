declare let $: any;
import { Component } from '@angular/core';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { ToggleService } from '../app/common/sidebar/toggle.service';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { CommonModule, Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { CustomizerSettingsComponent } from './customizer-settings/customizer-settings.component';
import { RouterOutlet, Router, NavigationCancel, NavigationEnd, RouterLink } from '@angular/router';
import { CustomizerSettingsService } from './customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        SidebarComponent,
        HeaderComponent,
        FooterComponent,
        RouterLink,
        CustomizerSettingsComponent,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    providers: [
        Location,
        {
            provide: LocationStrategy,
            useClass: PathLocationStrategy,
        },
    ],
})
export class AppComponent {
    title = 'QoT';
    routerSubscription: any;
    location: any;
    inAuthPage: boolean = false

    // isSidebarToggled
    isSidebarToggled = false;

    // isToggled
    isToggled = false;

    constructor(
        public router: Router,
        private toggleService: ToggleService,
        public themeService: CustomizerSettingsService
    ) {
        this.toggleService.isSidebarToggled$.subscribe((isSidebarToggled) => {
            this.isSidebarToggled = isSidebarToggled;
        });
        this.themeService.isToggled$.subscribe((isToggled) => {
            this.isToggled = isToggled;
        });
    }

    // ngOnInit
    ngOnInit() {
        this.recallJsFuntions();
    }

    testFirebase() {
        // const auth = getAuth();
        // const firestore = getFirestore();
        // console.log('Firebase Auth:', auth);
        // console.log('Firebase Firestore:', firestore);
    }

    // recallJsFuntions
    recallJsFuntions() {
        this.routerSubscription = this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd || event instanceof NavigationCancel))
            .subscribe((event) => {
                this.location = this.router.url;
                if (event instanceof NavigationEnd) {
                    window.scrollTo(0, 0);
                    this.inAuthPage = this.checkIfAuthPage(this.location);
                }
            });
    }

     // Check if current page is an auth page
     checkIfAuthPage(url: string): boolean {
        const authRoutes = ['/login', '/authentication/sign-up', '/authentication/forgot-password', '/authentication/verify-email', '/authentication/reset-password','/authentication/logout','/authentication/'];
        return authRoutes.some(route => url.includes(route));
    }

    // Dark Mode
    toggleTheme() {
        this.themeService.toggleTheme();
    }

    // Sidebar Dark
    toggleSidebarTheme() {
        this.themeService.toggleSidebarTheme();
    }

    // Right Sidebar
    toggleRightSidebarTheme() {
        this.themeService.toggleRightSidebarTheme();
    }

    // Hide Sidebar
    toggleHideSidebarTheme() {
        this.themeService.toggleHideSidebarTheme();
    }

    // Header Dark Mode
    toggleHeaderTheme() {
        this.themeService.toggleHeaderTheme();
    }

    // Card Border
    toggleCardBorderTheme() {
        this.themeService.toggleCardBorderTheme();
    }

    // Card Border Radius
    toggleCardBorderRadiusTheme() {
        this.themeService.toggleCardBorderRadiusTheme();
    }

    // RTL Mode
    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }
}
