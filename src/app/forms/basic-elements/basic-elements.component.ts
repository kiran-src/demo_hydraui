// import { Component, OnInit } from '@angular/core';
// import { MatCardModule } from '@angular/material/card';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';
// import { RouterLink } from '@angular/router';
// import { BasicFormComponent } from './basic-form/basic-form.component';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { MatButton } from '@angular/material/button';
// import { catchError, throwError } from 'rxjs';
// import { JenkinsService } from './jenkins';
// import { CommonModule } from '@angular/common';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// @Component({
//     selector: 'app-basic-elements',
//     standalone: true,
//     imports: [
//         RouterLink,
//         MatCardModule,
//         MatButton,
//         MatInputModule,
//         MatFormFieldModule,
//         MatSelectModule,
//         FormsModule,
//         BasicFormComponent,
//     ],
//     templateUrl: './basic-elements.component.html',
//     styleUrl: './basic-elements.component.scss',
// })
// export class BasicElementsComponent implements OnInit {
//     buildNumbers: { [key: string]: number } = {
//         mobile: 2,
//         web: 26,
//         api: 2,
//     };
 
//     constructor(private http: HttpClient, private jenkinsService: JenkinsService) {}
 
//     ngOnInit(): void {
//         this.loadBuildNumbers();
//     }
 
//     loadBuildNumbers(): void {
//         const storedBuildNumbers = localStorage.getItem('buildNumbers');
//         if (storedBuildNumbers) {
//             this.buildNumbers = JSON.parse(storedBuildNumbers);
//         }
//     }
 
//     saveBuildNumbers(): void {
//         localStorage.setItem('buildNumbers', JSON.stringify(this.buildNumbers));
//     }
 
//     incrementBuildNumber(type: string): void {
//         this.buildNumbers[type]++;
//         this.saveBuildNumbers();
//     }
 
//     runPipelineMobile(): void {
//         this.incrementBuildNumber('mobile');
//         this.jenkinsService.triggerPipelineMobile().subscribe({
//             next: (response: any) => {
//                 console.log('Mobile Pipeline triggered successfully', response);
//                 // const buildNumber = this.buildNumbers['mobile'];
//                 // const url = `http://localhost:8080/view/all/job/Mobile-Tests/${buildNumber}/allure/`;
//                 // window.open(url, '_blank');
//             },
//             error: (error: any) => {
//                 console.error('Error triggering Mobile pipeline', error);
//             },
//         });
//     }
 
//     viewReportMobile(): void {
//         const buildNumber = this.buildNumbers['mobile'];
//         const url = `http://localhost:8080/view/all/job/Mobile-Tests/${buildNumber}/allure/`;
//         window.open(url, '_blank');
//     }
 
//     runPipelineWeb(): void {
//         this.incrementBuildNumber('web');
//         this.jenkinsService.triggerPipelineWeb().subscribe({
//             next: (response: any) => {
//                 console.log('Web Pipeline triggered successfully', response);
//                 // const buildNumber = this.buildNumbers['web'];
//                 // const url = `http://localhost:8080/view/all/job/Web-Tests/${buildNumber}/allure/`;
//                 // window.open(url, '_blank');
//             },
//             error: (error: any) => {
//                 console.error('Error triggering Web pipeline', error);
//             },
//         });
//     }
 
//     viewReportWeb(): void {
//         const buildNumber = this.buildNumbers['web'];
//         const url = `http://localhost:8080/view/all/job/Web-Tests/${buildNumber}/allure/`;
//         window.open(url, '_blank');
//     }
 
//     runPipelineApi(): void {
//         this.incrementBuildNumber('api');
//         this.jenkinsService.triggerPipelineApi().subscribe({
//             next: (response: any) => {
//                 console.log('API Pipeline triggered successfully', response);
//                 // const buildNumber = this.buildNumbers['api'];
//                 // const url = `http://localhost:8080/view/all/job/API-Tests/${buildNumber}/allure/`;
//                 // window.open(url, '_blank');
//             },
//             error: (error: any) => {
//                 console.error('Error triggering API pipeline', error);
//             },
//         });
//     }
 
//     viewReportApi(): void {
//         const buildNumber = this.buildNumbers['api'];
//         const url = `http://localhost:8080/view/all/job/API-Tests/${buildNumber}/allure/`;
//         window.open(url, '_blank');
//     }
 
//     private handleError(error: any) {
//         let errorMessage = '';
//         if (error.error instanceof ErrorEvent) {
//             // Client-side error
//             errorMessage = `Error: ${error.error.message}`;
//         } else {
//             // Server-side error
//             errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
//         }
//         console.error(errorMessage);
//         return throwError(errorMessage);
//     }
// }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { JenkinsService } from './jenkins';
// import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { BasicFormComponent } from './basic-form/basic-form.component';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatButton } from '@angular/material/button';
import { catchError, throwError } from 'rxjs';
// import { JenkinsService } from './jenkins';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-basic-elements',
    standalone: true,
    imports: [
        RouterLink,
        MatCardModule,
        MatButton,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        CommonModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule, // Added ReactiveFormsModule
        BasicFormComponent,
    ],
    templateUrl: './basic-elements.component.html',
    styleUrls: ['./basic-elements.component.scss'],
})
export class BasicElementsComponent implements OnInit {
    buildNumbers: { [key: string]: number } = {
        mobile: 2,
        web: 26,
        api: 2,
    };

    // FormGroup for dropdowns
    dropdownForm: FormGroup;

    // Dropdown options
    deviceOptions = [1, 2, 3];
    browserOptions = ['Chrome', 'Edge', 'Firefox'];
    osOptions = ['Windows', 'Mac', 'Linux'];
    environmentOptions = ['Pre Prod', 'QA', 'Development'];
    runOptions = ['Scheduled', 'Headless', 'On the Spot'];

    constructor(
        private http: HttpClient,
        private jenkinsService: JenkinsService,
        private fb: FormBuilder // Inject FormBuilder
    ) {
        // Initialize the form group
        this.dropdownForm = this.fb.group({
            devices: [1],
            browser: ['Chrome'],
            os: ['Windows'],
            environment: ['Pre Prod'],
            runMethod: ['Scheduled'],
        });
    }

    ngOnInit(): void {
        this.loadBuildNumbers();
    }

    loadBuildNumbers(): void {
        const storedBuildNumbers = localStorage.getItem('buildNumbers');
        if (storedBuildNumbers) {
            this.buildNumbers = JSON.parse(storedBuildNumbers);
        }
    }

    saveBuildNumbers(): void {
        localStorage.setItem('buildNumbers', JSON.stringify(this.buildNumbers));
    }

    incrementBuildNumber(type: string): void {
        this.buildNumbers[type]++;
        this.saveBuildNumbers();
    }

    // Triggering pipelines and viewing reports can use dropdown values
    runPipelineMobile(): void {
        const deviceCount = this.dropdownForm.get('devices')?.value;
        console.log(`Running mobile pipeline on ${deviceCount} devices.`);
        this.incrementBuildNumber('mobile');
        this.jenkinsService.triggerPipelineMobile().subscribe({
            next: (response: any) => {
                console.log('Mobile Pipeline triggered successfully', response);
            },
            error: (error: any) => {
                console.error('Error triggering Mobile pipeline', error);
            },
        });
    }

    viewReportMobile(): void {
        const buildNumber = this.buildNumbers['mobile'];
        const url = `http://localhost:8080/view/all/job/Mobile-Tests/${buildNumber}/allure/`;
        window.open(url, '_blank');
    }

    // Similar functions for Web and API pipelines

    runPipelineWeb(): void {
                this.incrementBuildNumber('web');
                this.jenkinsService.triggerPipelineWeb().subscribe({
                    next: (response: any) => {
                        console.log('Web Pipeline triggered successfully', response);
                        // const buildNumber = this.buildNumbers['web'];
                        // const url = `http://localhost:8080/view/all/job/Web-Tests/${buildNumber}/allure/`;
                        // window.open(url, '_blank');
                    },
                    error: (error: any) => {
                        console.error('Error triggering Web pipeline', error);
                    },
                });
            }
         
            viewReportWeb(): void {
                const buildNumber = this.buildNumbers['web'];
                // const url = `http://localhost:8080/view/all/job/Pipeline1/${buildNumber}/allure/`;
                const url = `http://localhost:8080/job/Pipeline1/39/allure/#`;
                
                window.open(url, '_blank');
            }
         
            runPipelineApi(): void {
                this.incrementBuildNumber('api');
                this.jenkinsService.triggerPipelineApi().subscribe({
                    next: (response: any) => {
                        console.log('API Pipeline triggered successfully', response);
                        // const buildNumber = this.buildNumbers['api'];
                        // const url = `http://localhost:8080/view/all/job/API-Tests/${buildNumber}/allure/`;
                        // window.open(url, '_blank');
                    },
                    error: (error: any) => {
                        console.error('Error triggering API pipeline', error);
                    },
                });
            }
         
            viewReportApi(): void {
                const buildNumber = this.buildNumbers['api'];
                const url = `http://localhost:8080/view/all/job/API-Tests/${buildNumber}/allure/`;
                window.open(url, '_blank');
            }
         
            private handleError(error: any) {
                let errorMessage = '';
                if (error.error instanceof ErrorEvent) {
                    // Client-side error
                    errorMessage = `Error: ${error.error.message}`;
                } else {
                    // Server-side error
                    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                }
                console.error(errorMessage);
                return throwError(errorMessage);
            }
        }
