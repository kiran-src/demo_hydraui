// import { Component } from '@angular/core';
// import { PipelineService } from './progress-status.component.service';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-progress-status',
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule
//   ],
//   template: `
//    <div class="progress-status">
//       <!-- Initial Input Screen -->
//       <div *ngIf="pipelineStatus === 'Not Started'" class="input-screen">
//         <h2>Trigger Azure DevOps Pipeline</h2>
//         <div class="input-container">
//           <label for="repoUrl">Repository URL:</label>
//           <input 
//             id="repoUrl" 
//             type="text" 
//             [(ngModel)]="repositoryUrl" 
//             placeholder="https://github.com/YourRepo/YourProject"
//           >
//           <button (click)="triggerPipeline()" [disabled]="!repositoryUrl">
//             Start Pipeline
//           </button>
//         </div>
//       </div>

//       <!-- Progress Screen -->
//       <div *ngIf="pipelineStatus === 'In Progress'" class="progress-screen">
//         <h2>Azure Pipeline In Progress</h2>
//         <div class="progress-indicator">
//           <div class="spinner"></div>
//           <div class="progress-bar-container">
//             <div class="progress-bar"></div>
//           </div>
//           <p>Build ID: {{currentBuildId}}</p>
//           <p>Processing your pipeline request...</p>
//         </div>
//       </div>

//       <!-- Completion Screen -->
//       <div *ngIf="pipelineStatus === 'Completed'" class="completion-screen">
//         <div class="success-icon">✓</div>
//         <h2>Pipeline Completed Successfully!</h2>
//         <p>Build ID: {{currentBuildId}}</p>
//         <button (click)="resetPipeline()" class="reset-button">
//           Start New Pipeline
//         </button>
//       </div>

//       <!-- Error Screen -->
//       <div *ngIf="pipelineStatus === 'Error'" class="error-screen">
//         <div class="error-icon">!</div>
//         <h2>Pipeline Error</h2>
//         <p>{{ errorMessage }}</p>
//         <p>Build ID: {{currentBuildId}}</p>
//         <button (click)="resetPipeline()" class="reset-button">
//           Try Again
//         </button>
//       </div>
//     </div>
//   `,
//   styles: [`
//     .progress-status {
//       font-family: Arial, sans-serif;
//       max-width: 600px;
//       margin: 40px auto;
//       padding: 20px;
//       text-align: center;
//     }

//     .input-container {
//       display: flex;
//       flex-direction: column;
//       gap: 15px;
//       margin-top: 20px;
//     }

//     label {
//       font-weight: bold;
//       margin-bottom: 5px;
//     }

//     input[type="text"] {
//       padding: 10px;
//       font-size: 16px;
//       border: 2px solid #ddd;
//       border-radius: 4px;
//       width: 100%;
//     }

//     button {
//       padding: 12px 24px;
//       font-size: 16px;
//       background-color: #2196F3;
//       color: white;
//       border: none;
//       border-radius: 4px;
//       cursor: pointer;
//       transition: background-color 0.3s ease;
//     }

//     button:hover:not(:disabled) {
//       background-color: #1976D2;
//     }

//     button:disabled {
//       background-color: #cccccc;
//       cursor: not-allowed;
//     }

//     .progress-indicator {
//       display: flex;
//       flex-direction: column;
//       align-items: center;
//       gap: 20px;
//     }

//     .spinner {
//       width: 50px;
//       height: 50px;
//       border: 5px solid #f3f3f3;
//       border-top: 5px solid #2196F3;
//       border-radius: 50%;
//       animation: spin 1s linear infinite;
//     }

//     .progress-bar-container {
//       width: 100%;
//       height: 4px;
//       background-color: #f0f0f0;
//       border-radius: 2px;
//       overflow: hidden;
//       margin: 20px 0;
//     }

//     .progress-bar {
//       height: 100%;
//       width: 30%;
//       background-color: #2196F3;
//       animation: progress 1.5s ease-in-out infinite;
//     }

//     .completion-screen {
//       display: flex;
//       flex-direction: column;
//       align-items: center;
//       gap: 20px;
//     }

//     .success-icon {
//       width: 80px;
//       height: 80px;
//       border-radius: 50%;
//       background-color: #4CAF50;
//       color: white;
//       font-size: 40px;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//     }

//     .error-icon {
//       width: 80px;
//       height: 80px;
//       border-radius: 50%;
//       background-color: #F44336;
//       color: white;
//       font-size: 40px;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//     }

//     .reset-button {
//       background-color: #4CAF50;
//     }

//     .reset-button:hover {
//       background-color: #388E3C;
//     }

//     .error-screen {
//       color: #F44336;
//     }

//     @keyframes spin {
//       0% { transform: rotate(0deg); }
//       100% { transform: rotate(360deg); }
//     }

//     @keyframes progress {
//       0% { transform: translateX(-100%); }
//       100% { transform: translateX(400%); }
//     }
//   `]
// })
// export class ProgressStatusComponent {
//   pipelineStatus: string = 'Not Started';
//   repositoryUrl: string = '';
//   errorMessage: string = '';
//   currentBuildId: number | null = null;
//   private statusCheckInterval: any;

//   constructor(private pipelineService: PipelineService) {}

//   triggerPipeline() {
//     if (!this.repositoryUrl) {
//       return;
//     }

//     this.pipelineStatus = 'In Progress';
    
//     this.pipelineService.triggerPipeline(this.repositoryUrl).subscribe({
//       next: (response) => {
//         this.currentBuildId = response.id;
//         this.startStatusCheck(response.id);
//       },
//       error: (error) => {
//         this.pipelineStatus = 'Error';
//         this.errorMessage = 'Failed to start Azure pipeline. Please verify your repository URL and try again.';
//         console.error('Error triggering pipeline:', error);
//       }
//     });
//   }

//   private startStatusCheck(buildId: number) {
//     if (this.statusCheckInterval) {
//       clearInterval(this.statusCheckInterval);
//     }

//     this.statusCheckInterval = setInterval(() => {
//       this.checkPipelineStatus(buildId);
//     }, 10000); // Check every 10 seconds
//   }

//   private checkPipelineStatus(buildId: number) {
//     this.pipelineService.getPipelineStatus(buildId).subscribe({
//       next: (response) => {
//         // Check if all records are completed
//         const records = response.records || [];
//         const allCompleted = records.every((record: any) => 
//           record.state === 'completed'
//         );
        
//         const hasFailed = records.some((record: any) => 
//           record.result === 'failed'
//         );

//         if (allCompleted) {
//           this.pipelineStatus = hasFailed ? 'Error' : 'Completed';
//           if (hasFailed) {
//             this.errorMessage = 'Pipeline execution failed. Check Azure DevOps for details.';
//           }
//           this.stopStatusCheck();
//         }
//       },
//       error: (error) => {
//         this.pipelineStatus = 'Error';
//         this.errorMessage = 'Error checking Azure pipeline status.';
//         this.stopStatusCheck();
//         console.error('Error checking status:', error);
//       }
//     });
//   }

//   private stopStatusCheck() {
//     if (this.statusCheckInterval) {
//       clearInterval(this.statusCheckInterval);
//       this.statusCheckInterval = null;
//     }
//   }

//   resetPipeline() {
//     this.pipelineStatus = 'Not Started';
//     this.repositoryUrl = '';
//     this.errorMessage = '';
//     this.currentBuildId = null;
//     this.stopStatusCheck();
//   }

//   ngOnDestroy() {
//     this.stopStatusCheck();
//   }
// }