import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-test-management',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './test-management.component.html',
  styleUrl: './test-management.component.scss'
})
export class TestManagementComponent {
  constructor(private router: Router) {}

  createNewProject() {
    this.router.navigate(['/test-management'])
  }
}