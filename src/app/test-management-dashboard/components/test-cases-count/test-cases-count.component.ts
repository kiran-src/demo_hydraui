// components/test-cases-count/test-cases-count.component.ts
import { Component, Input, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Subject } from 'rxjs';
import { TestCasesData } from '../../models/dashboard.model';
import { ChartService } from '../../services/chart.service';

@Component({
  selector: 'app-test-cases-count',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    <mat-card class="metric-card">
      <mat-card-header>
        <mat-card-title>Test Cases Count</mat-card-title>
        <div class="project-selector">
          <span>{{data?.projectCount || 0}} Projects</span>
          <mat-icon>expand_more</mat-icon>
        </div>
      </mat-card-header>
      <mat-card-content>
        <div class="metric-content">
          <div class="metric-value">
            {{data?.count || 0}}
            <span class="trend" 
                  [class.positive]="data?.trend! > 0" 
                  [class.negative]="data?.trend! < 0">
              {{data?.trend}}% vs last {{data?.timeframe}}
            </span>
          </div>
          <div #chartContainer class="chart-container"></div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .metric-card {
      height: 100%;
      background: #2d2d2d;
      color: white;
    }

    mat-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .project-selector {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;

      span {
        font-size: 0.9rem;
        color: rgba(255, 255, 255, 0.7);
      }
    }

    .metric-content {
      padding: 1rem;
    }

    .metric-value {
      font-size: 2.5rem;
      font-weight: 500;
      margin-bottom: 1rem;

      .trend {
        font-size: 0.9rem;
        margin-left: 1rem;
        
        &.positive {
          color: #4caf50;
        }
        
        &.negative {
          color: #f44336;
        }
      }
    }

    .metrics-breakdown {
      display: flex;
      gap: 2rem;
      margin: 1rem 0;

      .metric-item {
        display: flex;
        flex-direction: column;

        .label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .value {
          font-size: 1.2rem;
          font-weight: 500;
        }
      }
    }

    .chart-container {
      height: 100px;
      margin-top: 1rem;
    }
  `]
})
export class TestCasesCountComponent implements OnInit, OnDestroy {
  @Input() data?: TestCasesData;
  
  private destroy$ = new Subject<void>();
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

  constructor(private chartService: ChartService) {}

  ngOnInit() {
    this.updateChart();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateChart() {
    if (!this.chartContainer) return;
   
    this.chartService.createLineChart(
      this.chartContainer.nativeElement,
      [], 
      {
        width: this.chartContainer.nativeElement.offsetWidth,
        height: 100,
        color: '#2196f3',
        area: true,
        showAxis: false
      }
    );
  }
}