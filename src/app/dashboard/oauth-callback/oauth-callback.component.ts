import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestManagementService } from '../project-creation/test-management.service'; 
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-oauth-callback',
  standalone: true,
  template: '<p>Processing authentication, please wait...</p>',
  imports: []
})
export class OAuthCallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private testManagementService: TestManagementService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      const toolName = params['state']; // Assuming you pass the tool name in the state parameter
      if (code && toolName) {
        this.testManagementService.handleCallback(code, toolName).subscribe(
          () => {
            this.snackBar.open('Successfully authenticated with ' + toolName, 'Close', { duration: 3000 });
            this.router.navigate(['/create-project']);
          },
          error => {
            console.error('Error during OAuth callback:', error);
            this.snackBar.open('Failed to authenticate. Please try again.', 'Close', { duration: 5000 });
            this.router.navigate(['/create-project']);
          }
        );
      } else {
        this.snackBar.open('Invalid callback. Please try again.', 'Close', { duration: 5000 });
        this.router.navigate(['/create-project']);
      }
    });
  }
}