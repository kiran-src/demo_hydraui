import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ResponsiveDirective } from '../../directives/responsive.directive';
import { cardAnimation } from '../../shared/animations/dashboard.animations';

@Component({
  selector: 'app-dashboard-widget',
  standalone: true,
  imports: [CommonModule, MatCardModule, ResponsiveDirective],
  animations: [cardAnimation],
  template: `
    <mat-card class="widget-card"
              [@cardAnimation]
              appResponsive
              mobileClass="mobile-widget"
              tabletClass="tablet-widget"
              desktopClass="desktop-widget">
      <mat-card-header>
        <mat-card-title>{{ title }}</mat-card-title>
        <ng-content select="[widget-actions]"></ng-content>
      </mat-card-header>
      <mat-card-content>
        <ng-content></ng-content>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .widget-card {
      height: 100%;
      box-sizing: border-box;
      background: #2d2d2d;
      color: white;
    }

    .mobile-widget {
      margin: 8px 0;
    }

    .tablet-widget {
      margin: 12px 0;
    }

    .desktop-widget {
      margin: 16px 0;
    }

    mat-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    mat-card-content {
      margin-top: 16px;
      height: calc(100% - 56px);
    }
  `]
})
export class DashboardWidgetComponent {
  @Input() title = '';
}