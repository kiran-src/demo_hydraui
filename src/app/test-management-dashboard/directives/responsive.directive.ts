// src/app/directives/responsive.directive.ts
import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { LayoutService } from '../services/layout.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appResponsive]',
  standalone: true
})
export class ResponsiveDirective implements OnInit, OnDestroy {
  @Input() mobileClass = '';
  @Input() tabletClass = '';
  @Input() desktopClass = '';

  private subscription: Subscription | undefined;

  constructor(
    private el: ElementRef,
    private layoutService: LayoutService
  ) {}

  ngOnInit() {
    this.subscription = this.layoutService.layout$.subscribe(layout => {
      const element = this.el.nativeElement;
      
      // Remove all previous classes
      if (this.mobileClass) element.classList.remove(this.mobileClass);
      if (this.tabletClass) element.classList.remove(this.tabletClass);
      if (this.desktopClass) element.classList.remove(this.desktopClass);

      // Add appropriate class based on current layout
      if (layout.isMobile && this.mobileClass) {
        element.classList.add(this.mobileClass);
      } else if (layout.isTablet && this.tabletClass) {
        element.classList.add(this.tabletClass);
      } else if (layout.isDesktop && this.desktopClass) {
        element.classList.add(this.desktopClass);
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}