import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutService } from '../../services/layout.service';
import { ResponsiveDirective } from '../../directives/responsive.directive';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-grid',
  standalone: true,
  imports: [
    CommonModule, 
    ResponsiveDirective  // Make sure ResponsiveDirective is imported
  ],
  template: `
    <div class="dashboard-grid"
         appResponsive
         mobileClass="mobile-grid"
         tabletClass="tablet-grid"
         desktopClass="desktop-grid"
         [style.grid-gap.px]="layout.gridGap">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .dashboard-grid {
      display: grid;
      padding: 16px;
      width: 100%;
      box-sizing: border-box;
    }

    .mobile-grid {
      grid-template-columns: 1fr;
      gap: 12px;
    }

    .tablet-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }

    .desktop-grid {
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;
    }

    @media (max-width: 767px) {
      .dashboard-grid {
        padding: 8px;
      }
    }

    @media (min-width: 768px) and (max-width: 1023px) {
      .dashboard-grid {
        padding: 12px;
      }
    }
  `]
})
export class DashboardGridComponent implements OnInit, OnDestroy {
  @Input() layout = this.layoutService.currentLayout;
  private subscription: Subscription | undefined;

  constructor(private layoutService: LayoutService) {}

  ngOnInit() {
    this.subscription = this.layoutService.layout$.subscribe(layout => {
      this.layout = layout;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}