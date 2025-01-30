import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DashboardService } from '../../services/dashboard.service';
import * as d3 from 'd3';
import { Selection } from 'd3-selection';
import { Subject, takeUntil } from 'rxjs';
import { MetricTrend } from '../../models/dashboard.model';
import { ScaleTime, ScaleLinear } from 'd3-scale';

interface TimelineData {
  date: Date;
  passed: number;
  failed: number;
  skipped: number;
  total: number;
}

@Component({
  selector: 'app-test-runs-timeline',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  template: `
    <mat-card class="timeline-card">
      <mat-card-header>
        <mat-card-title>Test Runs Timeline</mat-card-title>
        <div class="timeline-controls">
          <mat-form-field>
            <mat-select [formControl]="timeframeControl">
              <mat-option value="7d">Last 7 days</mat-option>
              <mat-option value="30d">Last 30 days</mat-option>
              <mat-option value="90d">Last 90 days</mat-option>
            </mat-select>
          </mat-form-field>
          <button mat-icon-button (click)="refresh()">
            <mat-icon>refresh</mat-icon>
          </button>
        </div>
      </mat-card-header>
      <mat-card-content>
        <div #chartContainer class="chart-container"></div>
        <div class="legend">
          <div class="legend-item">
            <div class="color-box passed"></div>
            <span>Passed</span>
          </div>
          <div class="legend-item">
            <div class="color-box failed"></div>
            <span>Failed</span>
          </div>
          <div class="legend-item">
            <div class="color-box skipped"></div>
            <span>Skipped</span>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .timeline-card {
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

    .timeline-controls {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .chart-container {
      height: 300px;
      width: 100%;
      margin: 1rem 0;
    }

    .legend {
      display: flex;
      justify-content: center;
      gap: 2rem;
      margin-top: 1rem;

      .legend-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        .color-box {
          width: 12px;
          height: 12px;
          border-radius: 2px;

          &.passed {
            background-color: #4caf50;
          }

          &.failed {
            background-color: #f44336;
          }

          &.skipped {
            background-color: #ff9800;
          }
        }
      }
    }

    ::ng-deep {
      .mat-form-field {
        width: 120px;
      }

      .tooltip {
        position: absolute;
        padding: 8px;
        background: rgba(0, 0, 0, 0.8);
        border-radius: 4px;
        pointer-events: none;
        font-size: 12px;
        z-index: 100;
      }
    }
  `]
})
export class TestRunsTimelineComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private svg!: Selection<SVGGElement, unknown, null, undefined>;
  private xScale!: ReturnType<typeof d3.scaleTime>;
  private yScale!: ReturnType<typeof d3.scaleLinear>;
  private margin = { top: 20, right: 20, bottom: 30, left: 40 };
  private width = 0;
  private height = 0;

  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;
  timeframeControl = new FormControl('30d');
  data: MetricTrend | null = null;
  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.loadData();
    
    this.timeframeControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.loadData());
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  refresh() {
    this.loadData();
  }

  private loadData() {
    const timeframe = this.timeframeControl.value || '30d';
    this.dashboardService.getMetricTrends('runs', timeframe)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.data = data;
        this.updateChart();
      });
  }

  private updateChart() {
    if (!this.data) return;

    const element = this.chartContainer.nativeElement;
    d3.select(element).selectAll('*').remove();

    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;

    this.initializeSvg();
    this.createScales();
    this.addAxes();
    this.addLines();
    this.addTooltip();
  }

  private initializeSvg() {
    this.svg = d3.select(this.chartContainer.nativeElement)
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`) as Selection<SVGGElement, unknown, null, undefined>;
  }

  private createScales() {
    if (!this.data) return;

    this.xScale = d3.scaleTime()
      .domain(d3.extent(this.data.data, (d: { date: string | number | Date; }) => new Date(d.date)) as [Date, Date])
      .range([0, this.width]);

    this.yScale = d3.scaleLinear()
      .domain([0, d3.max(this.data.data, (d: { total: any; }) => d.total) || 0])
      .range([this.height, 0]);
  }

  private addAxes() {
    if (!this.svg || !this.xScale || !this.yScale) return;

    this.svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${this.height})`)
      .call(d3.axisBottom(this.xScale));

    this.svg.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(this.yScale));
  }

  private addLines() {
    if (!this.svg || !this.data?.data || !this.xScale || !this.yScale) return;

    type MetricKey = 'passed' | 'failed' | 'skipped';
    const metrics: MetricKey[] = ['passed', 'failed', 'skipped'];
    
    const colors: Record<MetricKey, string> = {
        passed: '#4caf50',
        failed: '#f44336',
        skipped: '#ff9800'
    };

    metrics.forEach(metric => {
        // Create line generator without generic type parameter
        const line = d3.line()
            .defined((d: any) => !isNaN(d[metric]))
            .x((d: any) => this.xScale(new Date(d.date)))
            .y((d: any) => this.yScale(d[metric]))
            .curve(d3.curveMonotoneX);

        this.svg!.append('path')
            .datum(this.data!.data)
            .attr('class', `line-${metric}`)
            .attr('fill', 'none')
            .attr('stroke', colors[metric])
            .attr('stroke-width', 2)
            .attr('d', line);
    });
}

  private addTooltip() {
    if (!this.svg || !this.data || !this.xScale || !this.yScale) return;

    const tooltip = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('opacity', '0');

    const bisect = d3.bisector((d: any) => new Date(d.date)).left;

    const overlay = this.svg.append('rect')
      .attr('class', 'overlay')
      .attr('width', this.width)
      .attr('height', this.height)
      .style('opacity', '0')
      .style('pointer-events', 'all');

    overlay.on('mousemove', (event: MouseEvent) => {
      const mouseX = d3.pointer(event)[0];
      const x0 = this.xScale.invert(mouseX);
      const i = bisect(this.data!.data, x0, 1);
      const d0 = this.data!.data[i - 1];
      const d1 = this.data!.data[i];
      
      if (!d0 || !d1) return;

      const d = x0.getTime() - new Date(d0.date).getTime() > new Date(d1.date).getTime() - x0.getTime() ? d1 : d0;

      tooltip
        .style('opacity', '0.9')
        .style('left', `${event.pageX + 10}px`)
        .style('top', `${event.pageY - 28}px`)
        .html(`
          Date: ${new Date(d.date).toLocaleDateString()}<br/>
          Passed: ${d.passed}<br/>
          Failed: ${d.failed}<br/>
          Skipped: ${d.skipped}<br/>
          Total: ${d.total}
        `);
    });

    overlay
      .on('mouseout', () => {
        tooltip.style('opacity', '0');
      });
  }
}