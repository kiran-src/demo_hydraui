import { Component, Input, OnChanges, ElementRef, ViewChild, SimpleChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { select, Selection } from 'd3-selection';
import { scaleLinear, scaleTime } from 'd3-scale';
import { line, curveMonotoneX } from 'd3-shape';
import { axisBottom, axisLeft } from 'd3-axis';
// import { SprintData } from '../models/dashboard-data.types';
import { SprintData } from '../../models/dashboard-data.types'; 

type D3Selection = Selection<any, unknown, null, undefined>;

@Component({
  selector: 'app-sprint-burndown',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    <div class="sprint-burndown-container">
      <div class="header">
        <div class="title-section">
          <h2>Sprint Burndown</h2>
          <ng-container *ngIf="data?.activeSprint">
            <div class="sprint-info">
              <div class="sprint-header">
                <span class="sprint-name">{{ data?.activeSprint?.name || '' }}</span>
                <div class="sprint-status" 
                     [class.behind]="isBehindSchedule()"
                     [class.ahead]="isAheadOfSchedule()">
                  <mat-icon>{{ getStatusIcon() }}</mat-icon>
                  <span>{{ getStatusText() }}</span>
                </div>
              </div>
              <div class="sprint-dates">
                <span class="date">{{ formatDate(data?.activeSprint?.startDate || '') }}</span>
                <span class="separator">→</span>
                <span class="date">{{ formatDate(data?.activeSprint?.endDate || '') }}</span>
                <span class="days-left">{{ getRemainingDays() }} days left</span>
              </div>
            </div>
          </ng-container>
        </div>
      </div>

      <div class="content">
        <ng-container *ngIf="data?.activeSprint">
          <div class="metrics-grid">
            <div class="metric-item">
              <span class="label">Completion</span>
              <span class="value">{{ data?.activeSprint?.completion || 0 }}%</span>
            </div>
            <div class="metric-item">
              <span class="label">Total Points</span>
              <span class="value">{{ getTotalPoints() }}</span>
            </div>
            <div class="metric-item">
              <span class="label">Remaining</span>
              <span class="value">{{ getRemainingPoints() }}</span>
            </div>
            <div class="metric-item">
              <span class="label">Burn Rate</span>
              <span class="value">{{ calculateBurnRate() }} pts/day</span>
            </div>
          </div>
        </ng-container>

        <div #chartContainer class="chart-container"></div>

        <div class="legend">
          <div class="legend-item">
            <span class="line ideal"></span>
            <span>Ideal Burndown</span>
          </div>
          <div class="legend-item">
            <span class="line actual"></span>
            <span>Actual Burndown</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .sprint-burndown-container {
  height: 100%;
  padding: 16px;
  background: #ffffff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  color: #333333;

  .header {
    margin-bottom: 24px;

    .title-section {
      h2 {
        margin: 0 0 8px;
        font-size: 20px;
        font-weight: 500;
        color: #333333;
      }

      .sprint-info {
        .sprint-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 8px;

          .sprint-name {
            font-size: 16px;
            font-weight: 500;
            color: #333333;
          }

          .sprint-status {
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 14px;
            padding: 4px 8px;
            border-radius: 4px;
            background: #f8f9fa;

            &.behind {
              color: #d32f2f;
              background: rgba(244, 67, 54, 0.1);
            }

            &.ahead {
              color: #2e7d32;
              background: rgba(76, 175, 80, 0.1);
            }

            mat-icon {
              font-size: 18px;
              width: 18px;
              height: 18px;
            }
          }
        }

        .sprint-dates {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #666666;

          .separator {
            color: #9e9e9e;
          }

          .days-left {
            margin-left: auto;
            padding: 2px 8px;
            border-radius: 4px;
            background: #f8f9fa;
            color: #333333;
          }
        }
      }
    }
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 24px;
    min-height: 0;

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;

      .metric-item {
        background: #f8f9fa;
        padding: 12px;
        border-radius: 8px;
        text-align: center;

        .label {
          display: block;
          font-size: 12px;
          color: #666666;
          margin-bottom: 4px;
        }

        .value {
          font-size: 24px;
          font-weight: 500;
          color: #333333;
        }
      }
    }

    .chart-container {
      flex: 1;
      min-height: 300px;
      background: #f8f9fa;
      border-radius: 8px;
      padding: 16px;
      position: relative;

      // Chart specific styles for light theme
      .domain,
      .tick line {
        stroke: #e0e0e0;
      }

      .tick text {
        fill: #666666;
      }

      .grid line {
        stroke: #eeeeee;
      }
    }

    .legend {
      display: flex;
      justify-content: center;
      gap: 24px;

      .legend-item {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        color: #666666;

        .line {
          width: 20px;
          height: 2px;

          &.ideal {
            border: 1px dashed #9e9e9e;
          }

          &.actual {
            background: #2196F3;
          }
        }
      }
    }
  }

  // Tooltip styles
  ::ng-deep .tooltip {
    background: rgba(255, 255, 255, 0.95) !important;
    border: 1px solid #e0e0e0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    color: #333333 !important;
    padding: 8px;
    border-radius: 4px;
    font-size: 12px;
  }
}
  `]
})
export class SprintBurndownComponent implements OnChanges, OnDestroy {
  @Input() data: SprintData = {
    activeSprint: {
      name: '',
      startDate: '',
      endDate: '',
      completion: 0,
      burndown: {
        ideal: [],
        actual: []
      }
    },
    velocityTrend: [],
    completionRate: 0
  };  
  @ViewChild('chartContainer', { static: true }) private chartContainer!: ElementRef;

  private svg!: D3Selection;
  private chart!: D3Selection;
  private tooltip!: D3Selection;
  private margin = { top: 20, right: 30, bottom: 30, left: 40 };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data?.activeSprint) {
      this.initializeChart();
      this.renderChart();
    }
  }

  private initializeChart(): void {
    const element = this.chartContainer.nativeElement;
    select(element).selectAll('*').remove();

    const width = element.clientWidth;
    const height = element.clientHeight;

    this.svg = select(element)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    this.chart = this.svg
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

    this.tooltip = select(element)
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
      .style('position', 'absolute')
      .style('pointer-events', 'none')
      .style('background', 'rgba(0, 0, 0, 0.8)')
      .style('padding', '8px')
      .style('border-radius', '4px')
      .style('font-size', '12px')
      .style('color', '#ffffff');
  }

  private renderChart(): void {
    if (!this.data?.activeSprint?.burndown) return;

    const { ideal, actual } = this.data.activeSprint.burndown;
    const width = this.chartContainer.nativeElement.clientWidth - this.margin.left - this.margin.right;
    const height = this.chartContainer.nativeElement.clientHeight - this.margin.top - this.margin.bottom;

    // Create scales
    const x = scaleTime()
      .range([0, width])
      .domain([new Date(ideal[0].date), new Date(ideal[ideal.length - 1].date)]);

    const y = scaleLinear()
      .range([height, 0])
      .domain([0, Math.max(...ideal.map(d => d.remaining), ...actual.map(d => d.remaining))])
      .nice();

    // Add gridlines
    this.addGridlines(x, y, width, height);

    // Add axes
    this.addAxes(x, y, height);

    // Add ideal line
    this.addLine(ideal, x, y, true);

    // Add actual line
    this.addLine(actual, x, y, false);

    // Add data points for actual line
    this.addDataPoints(actual, x, y);
  }

  private addGridlines(x: any, y: any, width: number, height: number): void {
    this.chart.append('g')
      .attr('class', 'grid')
      .attr('opacity', 0.1)
      .call(axisLeft(y)
        .tickSize(-width)
        .tickFormat(() => ''));

    this.chart.append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(0,${height})`)
      .attr('opacity', 0.1)
      .call(axisBottom(x)
        .tickSize(-height)
        .tickFormat(() => ''));
  }

  private addAxes(x: any, y: any, height: number): void {
    this.chart.append('g')
      .attr('transform', `translate(0,${height})`)
      .style('color', 'rgba(255, 255, 255, 0.6)')
      .call(axisBottom(x)
        .ticks(5)
        .tickFormat((d: any) => this.formatDateTick(d)));

    this.chart.append('g')
      .style('color', 'rgba(255, 255, 255, 0.6)')
      .call(axisLeft(y)
        .ticks(5)
        .tickFormat((d: any) => `${d} pts`));
  }

  private addLine(data: any[], x: any, y: any, isIdeal: boolean): void {
    const lineGenerator = line<any>()
      .x(d => x(new Date(d.date)))
      .y(d => y(d.remaining))
      .curve(curveMonotoneX);

    this.chart.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', isIdeal ? 'rgba(255, 255, 255, 0.5)' : '#2196F3')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', isIdeal ? '4,4' : '0')
      .attr('d', lineGenerator);
  }

  private addDataPoints(data: any[], x: any, y: any): void {
    this.chart.selectAll('.data-point')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'data-point')
      .attr('cx', d => x(new Date(d.date)))
      .attr('cy', d => y(d.remaining))
      .attr('r', 4)
      .attr('fill', '#2196F3')
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 2)
      .on('mouseover', (event: MouseEvent, d: any) => {
        this.showTooltip(event, d);
      })
      .on('mouseout', () => {
        this.hideTooltip();
      });
  }

  private formatDateTick(date: Date): string {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  private showTooltip(event: MouseEvent, d: any): void {
    const content = `
      <div>
        <strong>${new Date(d.date).toLocaleDateString()}</strong>
        <div>${d.remaining} points remaining</div>
      </div>
    `;

    this.tooltip
      .html(content)
      .style('opacity', 1)
      .style('left', `${event.pageX + 10}px`)
      .style('top', `${event.pageY - 10}px`);
  }

  private hideTooltip(): void {
    this.tooltip.style('opacity', 0);
  }

  public formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  }

  public getRemainingDays(): number {
    if (!this.data?.activeSprint?.endDate) return 0;
    const end = new Date(this.data.activeSprint.endDate);
    const now = new Date();
    return Math.max(0, Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
  }

  public getTotalPoints(): number {
    if (!this.data?.activeSprint?.burndown?.ideal[0]) return 0;
    return this.data.activeSprint.burndown.ideal[0].remaining;
  }

  public getRemainingPoints(): number {
    if (!this.data?.activeSprint?.burndown?.actual) return 0;
    const actual = this.data.activeSprint.burndown.actual;
    return actual[actual.length - 1].remaining;
  }

  public calculateBurnRate(): number {
    if (!this.data?.activeSprint?.burndown?.actual) return 0;
    const actual = this.data.activeSprint.burndown.actual;
    if (actual.length < 2) return 0;

    const firstPoint = actual[0];
    const lastPoint = actual[actual.length - 1];
    const daysDiff = this.getDaysDifference(new Date(firstPoint.date), new Date(lastPoint.date));
    
    if (daysDiff === 0) return 0;
    return Number(((firstPoint.remaining - lastPoint.remaining) / daysDiff).toFixed(1));
  }

  public getStatusIcon(): string {
    if (this.isAheadOfSchedule()) return 'trending_up';
    if (this.isBehindSchedule()) return 'trending_down';
    return 'trending_flat';
  }

  public getStatusText(): string {
    if (this.isAheadOfSchedule()) return 'Ahead of Schedule';
    if (this.isBehindSchedule()) return 'Behind Schedule';
    return 'On Track';
  }

  public isAheadOfSchedule(): boolean {
    return this.getSprintDeviation() > 10; // More than 10% ahead
  }

  public isBehindSchedule(): boolean {
    return this.getSprintDeviation() < -10; // More than 10% behind
  }

  private getSprintDeviation(): number {
    if (!this.data?.activeSprint?.burndown) return 0;
    const { ideal, actual } = this.data.activeSprint.burndown;
    
    if (!ideal.length || !actual.length) return 0;
    
    const latestIdeal = ideal[ideal.length - 1].remaining;
    const latestActual = actual[actual.length - 1].remaining;
    
    if (latestIdeal === 0) return 0;
    return ((latestIdeal - latestActual) / latestIdeal) * 100;
  }

  private getDaysDifference(date1: Date, date2: Date): number {
    return Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24));
  }

  private getPredictedCompletionDate(): Date | null {
    if (!this.data?.activeSprint?.burndown?.actual) return null;
    
    const burnRate = this.calculateBurnRate();
    if (burnRate <= 0) return null;

    const actual = this.data.activeSprint.burndown.actual;
    const remainingPoints = actual[actual.length - 1].remaining;
    const daysNeeded = remainingPoints / burnRate;
    
    const lastDate = new Date(actual[actual.length - 1].date);
    return new Date(lastDate.setDate(lastDate.getDate() + Math.ceil(daysNeeded)));
  }

  ngOnDestroy(): void {
    if (this.svg) {
      this.svg.selectAll('*').remove();
    }
    if (this.tooltip) {
      this.tooltip.remove();
    }
  }
}