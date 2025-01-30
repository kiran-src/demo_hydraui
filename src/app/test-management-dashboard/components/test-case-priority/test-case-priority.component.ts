// components/test-case-priority/test-case-priority.component.ts
import { Component, Input, OnChanges, ViewChild, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import * as d3 from 'd3';
import { TestPriorityData } from '../../models/dashboard.model';
import { Subject, takeUntil } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';
// import { Selection } from 'd3-selection';
import { select, Selection, BaseType } from 'd3-selection';
import { scaleOrdinal, scaleBand, scaleLinear, ScaleOrdinal, ScaleBand, ScaleLinear } from 'd3-scale';
import { arc, pie, Arc, Pie } from 'd3-shape';
import { max } from 'd3-array';


interface PriorityData {
  neutral: number;
  mustTest: number;
  high: number;
  medium: number;
}

@Component({
  selector: 'app-test-case-priority',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule,MatMenuModule,MatProgressSpinnerModule],
  template: `
    <mat-card class="priority-card">
      <mat-card-header>
        <mat-card-title>Test Case Priority Distribution</mat-card-title>
        <div class="action-buttons">
          <button mat-icon-button (click)="toggleView()">
            <mat-icon>{{ isBarView ? 'pie_chart' : 'bar_chart' }}</mat-icon>
          </button>
          <button mat-icon-button [matMenuTriggerFor]="menu">
            <mat-icon>more_vert</mat-icon>
          </button>
        </div>
      </mat-card-header>

      <mat-card-content>
        <div class="chart-wrapper">
          <div #chartContainer class="chart-container"></div>
          
          <div class="metrics-list">
            <div class="metric-item" *ngFor="let item of priorityItems"
                [class]="item.class"
                (mouseenter)="highlightSegment(item.key)"
                (mouseleave)="resetHighlight()">
              <div class="metric-info">
                <span class="label">{{item.label}}</span>
                <span class="value">{{getValue(item.key)}}</span>
              </div>
              <div class="progress-bar">
                <div class="progress" [style.width]="getPercentage(item.key) + '%'"></div>
              </div>
            </div>
          </div>
        </div>
      </mat-card-content>
    </mat-card>

    <<mat-menu #menu="matMenu">
  <ng-container>
    <button mat-menu-item (click)="exportData('pdf')">
      <mat-icon>picture_as_pdf</mat-icon>
      <span>Export as PDF</span>
    </button>
    <button mat-menu-item (click)="exportData('csv')">
      <mat-icon>table_chart</mat-icon>
      <span>Export as CSV</span>
    </button>
  </ng-container>
</mat-menu>
  `,
  styles: [`
    .priority-card {
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

    .action-buttons {
      display: flex;
      gap: 0.5rem;
    }

    .chart-wrapper {
      display: flex;
      gap: 2rem;
      height: calc(100% - 48px);
    }

    .chart-container {
      flex: 1;
      min-height: 300px;
    }

    .metrics-list {
      width: 250px;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem 0;
    }

    .metric-item {
      &.neutral { --priority-color: #64b5f6; }
      &.must-test { --priority-color: #f44336; }
      &.high { --priority-color: #ff9800; }
      &.medium { --priority-color: #4caf50; }

      .metric-info {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;

        .label {
          color: rgba(255, 255, 255, 0.7);
        }

        .value {
          font-weight: 500;
        }
      }

      .progress-bar {
        height: 4px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 2px;
        overflow: hidden;

        .progress {
          height: 100%;
          background: var(--priority-color);
          transition: width 0.3s ease;
        }
      }

      &:hover {
        .progress-bar .progress {
          filter: brightness(1.2);
        }
      }
    }

    :host ::ng-deep {
      .chart-segment {
        transition: opacity 0.3s ease;

        &.dimmed {
          opacity: 0.3;
        }

        &.highlighted {
          opacity: 1;
          transform: scale(1.02);
        }
      }
    }
  `]
})
export class TestCasePriorityComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  data: TestPriorityData | null = null;
  isBarView = false;
  totalCount = 0;
  private svg!: Selection<SVGGElement, unknown, null, undefined>;
  @ViewChild('chartContainer') chartContainer!: ElementRef<HTMLDivElement>;

  readonly priorityItems = [
    { key: 'mustTest', label: 'Must Test', class: 'must-test' },
    { key: 'high', label: 'High', class: 'high' },
    { key: 'medium', label: 'Medium', class: 'medium' },
    { key: 'neutral', label: 'Neutral', class: 'neutral' }
  ] as const;

  constructor(private dashboardService: DashboardService) {
    this.svg = d3.select('g');
  }

  ngOnInit() {
    this.dashboardService.getTestPriority()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.data = data;
        this.totalCount = Object.values(data).reduce((a, b) => a + b, 0);
        this.updateChart();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateChart() {
    if (!this.chartContainer || !this.data) return;

    const element = this.chartContainer.nativeElement;
    d3.select(element).selectAll('*').remove();

    const width = element.offsetWidth;
    const height = element.offsetHeight;
    const radius = Math.min(width, height) / 2;

    this.svg = d3.select(element)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    if (this.isBarView) {
      this.createBarChart(width, height);
    } else {
      this.createPieChart(radius);
    }
  }

  private createPieChart(radius: number) {
    if (!this.data) return;

    interface PieDataType {
      key: keyof PriorityData;
      value: number;
    }

    const pieGenerator = pie<PieDataType>()
      .value(d => d.value);

    const arcGenerator = arc<any>()
      .innerRadius(radius * 0.6)
      .outerRadius(radius);

    const colors = scaleOrdinal<string, string>()
      .domain(['mustTest', 'high', 'medium', 'neutral'])
      .range(['#f44336', '#ff9800', '#4caf50', '#64b5f6']);

    const data = this.priorityItems.map(item => ({
      key: item.key,
      value: this.data![item.key]
    }));

    const arcs = this.svg.selectAll<SVGGElement, PieDataType>('arc')
      .data(pieGenerator(data))
      .enter()
      .append('g')
      .attr('class', 'chart-segment');

    arcs.append('path')
      .attr('d', arcGenerator)
      .attr('fill', d => colors(d.data.key))
      .attr('class', d => `priority-${d.data.key}`)
      .style('transition', 'all 0.3s ease');
  }


  private createBarChart(width: number, height: number) {
    if (!this.data) return;

    interface BarDataType {
      key: keyof PriorityData;
      value: number;
    }

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const xScale = scaleBand()
      .range([0, chartWidth])
      .padding(0.1);

    const yScale = scaleLinear()
      .range([chartHeight, 0]);

    const data = this.priorityItems.map(item => ({
      key: item.key,
      value: this.data![item.key]
    }));

    xScale.domain(data.map(d => d.key));
    yScale.domain([0, max(data, d => d.value) || 0]);

    const colors = scaleOrdinal<string, string>()
      .domain(['mustTest', 'high', 'medium', 'neutral'])
      .range(['#f44336', '#ff9800', '#4caf50', '#64b5f6']);

    this.svg.selectAll<SVGRectElement, BarDataType>('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'chart-segment')
      .attr('x', d => xScale(d.key) || 0)
      .attr('width', xScale.bandwidth())
      .attr('y', d => yScale(d.value))
      .attr('height', d => chartHeight - yScale(d.value))
      .attr('fill', d => colors(d.key));
  }


  // For null checks
  getValue(key: keyof TestPriorityData): number {
    return this.data?.[key] ?? 0;
  }


  getPercentage(key: keyof TestPriorityData): number {
    if (!this.data || !this.totalCount) return 0;
    return (this.getValue(key) / this.totalCount) * 100;
  }

  toggleView(): void {
    this.isBarView = !this.isBarView;
    this.updateChart();
  }
  highlightSegment(key: keyof TestPriorityData): void {
    d3.selectAll('.chart-segment')
      .classed('dimmed', true);
    d3.select(`.priority-${key}`)
      .classed('dimmed', false)
      .classed('highlighted', true);
  }

  resetHighlight(): void {
    d3.selectAll('.chart-segment')
      .classed('dimmed', false)
      .classed('highlighted', false);
  }

  exportData(format: 'pdf' | 'csv'): void {
    // Implementation for exporting data
  }
}