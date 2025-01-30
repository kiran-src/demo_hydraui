import { Component, Input, OnChanges, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ChartService } from '../../services/chart.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { ChartOptions } from '../../models/chart.model';

@Component({
  selector: 'app-test-case-automation',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatIconModule, 
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  animations: [
    trigger('numberChange', [
      transition(':increment', [
        style({ transform: 'translateY(-20px)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':decrement', [
        style({ transform: 'translateY(20px)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ])
  ],
  template: `
    <mat-card class="metric-card">
      <mat-card-header>
        <mat-card-title>Test Case Automation</mat-card-title>
        <mat-icon class="info-icon" [matTooltip]="'Percentage of automated test cases'">info</mat-icon>
      </mat-card-header>
      <mat-card-content>
        <div class="metric-content">
          <div class="gauge-container">
            <div class="progress-circle">
              <mat-progress-spinner
                mode="determinate"
                [value]="ratio"
                [diameter]="150"
                class="progress-background">
              </mat-progress-spinner>
              <div class="progress-value" [@numberChange]="ratio">
                {{ratio.toFixed(1)}}%
              </div>
            </div>
          </div>
          <div class="metrics-breakdown">
            <div class="metric-item">
              <span class="label">Automated</span>
              <span class="value">{{automatedCount}}</span>
            </div>
            <div class="metric-item">
              <span class="label">Manual</span>
              <span class="value">{{manualCount}}</span>
            </div>
          </div>
          <div #trendChart class="trend-chart"></div>
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

    .metric-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1rem;
    }

    .gauge-container {
      position: relative;
      width: 150px;
      height: 150px;
      margin: 1rem 0;
    }

    .progress-circle {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;

      ::ng-deep .mat-progress-spinner circle {
        stroke: #4caf50;
      }
    }

    .progress-value {
      position: absolute;
      font-size: 2rem;
      font-weight: 500;
    }

    .metrics-breakdown {
      display: flex;
      justify-content: space-around;
      width: 100%;
      margin: 1rem 0;

      .metric-item {
        text-align: center;

        .label {
          display: block;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .value {
          display: block;
          font-size: 1.2rem;
          font-weight: 500;
          margin-top: 0.25rem;
        }
      }
    }

    .trend-chart {
      width: 100%;
      height: 60px;
      margin-top: 1rem;
    }

    .info-icon {
      color: rgba(255, 255, 255, 0.5);
      font-size: 18px;
      cursor: pointer;
    }
  `]
})
export class TestCaseAutomationComponent implements OnChanges {
  @Input() ratio: number = 0;
  @Input() automatedCount: number = 0;
  @Input() manualCount: number = 0;
  @Input() trendData: { date: string; value: number; }[] = [];

  @ViewChild('trendChart', { static: true }) trendChart!: ElementRef;

  constructor(private chartService: ChartService) {}

  ngOnChanges() {
    this.updateTrendChart();
  }

  private updateTrendChart() {
    if (this.trendData.length > 0) {
      const chartOptions: ChartOptions = {
        width: this.trendChart.nativeElement.offsetWidth,
        height: 60,
        color: '#4caf50',
        showAxis: false,
        area: true,
        smoothing: 0.3
      };

      this.chartService.createLineChart(
        this.trendChart.nativeElement,
        this.trendData,
        chartOptions
      );
    }
  }
}