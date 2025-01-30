import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class JenkinsService {
    private baseUrl = 'http://localhost:8080';
    private username = 'Moeketsi_L';
    private apiToken = '11741a7b5f0422de87df1209cb614548e9';

    constructor(private http: HttpClient) {}

    triggerPipelineWeb(): Observable<any> {
        return this.triggerPipeline('Pipeline1');
    }

    triggerPipelineMobile(): Observable<any> {
        return this.triggerPipeline('Mobile-Tests');
    }

    triggerPipelineApi(): Observable<any> {
        return this.triggerPipeline('API-Tests');
    }

    triggerPipeline(jobName: string): Observable<any> {
        const url = `${this.baseUrl}/job/${jobName}/build`;
        console.log("String new change");
        const headers = new HttpHeaders({
            Authorization: 'Basic ' + btoa(this.username + ':' + this.apiToken),
            // 'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': '*',
            // 'Access-Control-Allow-Methods' : 'GET, POST, PUT, DELETE, OPTIONS',
            // 'Access-Control-Allow-Headers' : 'Content-Type, Authorization'
        });
        headers.set('Content-Type', 'application/json');
        headers.set('Access-Control-Allow-Origin', '*');
        headers.set('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, OPTIONS' );
        headers.set('Access-Control-Allow-Headers','Content-Type, Authorization' )
console.log(headers.getAll("Access-Control-Allow-Origin"));
console.log('Request Headers:', headers);
        return this.http.post(url, null, { headers, withCredentials: true }).pipe(catchError(this.handleError));
        
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
