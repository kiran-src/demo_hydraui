import { Component } from '@angular/core';
import { TestDashboardComponent } from './test-dashboard/test-dashboard.component';
@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [TestDashboardComponent],
  templateUrl: './client-dashboard.component.html',
  styleUrl: './client-dashboard.component.scss'
})
export class ClientDashboardComponent {

}
