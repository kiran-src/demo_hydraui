// layout.service.ts
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

export interface LayoutConfig {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  columns: number;
  gridGap: number;
}

@Injectable({
  providedIn: 'root'
})
export class LayoutService implements OnDestroy {
  private layoutSubject = new BehaviorSubject<LayoutConfig>(this.getLayoutConfig());
  private resizeSubscription: any;

  constructor() {
    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(150))
      .subscribe(() => {
        this.layoutSubject.next(this.getLayoutConfig());
      });
  }

  get layout$(): Observable<LayoutConfig> {
    return this.layoutSubject.asObservable();
  }

  get currentLayout(): LayoutConfig {
    return this.layoutSubject.value;
  }

  private getLayoutConfig(): LayoutConfig {
    const width = window.innerWidth;
    return {
      isMobile: width < 768,
      isTablet: width >= 768 && width < 1024,
      isDesktop: width >= 1024,
      columns: this.getColumnCount(width),
      gridGap: this.getGridGap(width)
    };
  }

  private getColumnCount(width: number): number {
    if (width < 768) return 1;
    if (width < 1024) return 2;
    if (width < 1440) return 3;
    return 4;
  }

  private getGridGap(width: number): number {
    if (width < 768) return 12;
    if (width < 1024) return 16;
    return 24;
  }

  updateLayout(config: Partial<LayoutConfig>) {
    this.layoutSubject.next({
      ...this.currentLayout,
      ...config
    });
  }

  ngOnDestroy() {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }
}