import { Component, Input, OnChanges, ElementRef, ViewChild, SimpleChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { select, Selection } from 'd3-selection';
import { scaleLinear, scaleTime } from 'd3-scale';
import { line, curveMonotoneX, area } from 'd3-shape';
import { axisBottom, axisLeft } from 'd3-axis';
// import { ResourceUtilizationData } from '../models/dashboard-data.types';
import { ResourceUtilizationData } from '../../models/dashboard-data.types';

type D3Selection = Selection<any, unknown, null, undefined>;

@Component({
  selector: 'app-resource-workload',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    <div class="resource-workload-container">
      <div class="header">
        <div class="title-section">
          <h2>Resource Workload</h2>
          <div class="metrics">
            <div class="metric">
              <span class="label">Total Resources</span>
              <span class="value">{{ data?.totalResources || 0 }}</span>
            </div>
            <div class="metric">
              <span class="label">Avg. Utilization</span>
              <span class="value">{{ data?.averageUtilization || 0 }}%</span>
            </div>
          </div>
        </div>
        <div class="legend">
          <div class="legend-item">
            <span class="color-dot optimal"></span>
            <span>Optimal</span>
          </div>
          <div class="legend-item">
            <span class="color-dot high"></span>
            <span>High</span>
          </div>
          <div class="legend-item">
            <span class="color-dot over"></span>
            <span>Overallocated</span>
          </div>
        </div>
      </div>

      <div class="content">
        <div class="chart-section">
          <div #chartContainer class="chart-container">
            <!-- D3 chart will be rendered here -->
          </div>
        </div>

        <div class="resource-list">
          <div class="resource-item" 
               *ngFor="let resource of data?.resources"
               [class.overloaded]="resource.utilization > 100">
            <div class="resource-info">
              <span class="name">{{ resource.name }}</span>
              <div class="utilization-section">
                <div class="utilization-bar">
                  <div class="bar" 
                       [style.width.%]="getUtilizationWidth(resource.utilization)"
                       [style.background-color]="getUtilizationColor(resource.utilization)">
                  </div>
                </div>
                <span class="percentage">{{ resource.utilization }}%</span>
              </div>
            </div>
            <div class="task-count">
              <mat-icon>assignment</mat-icon>
              {{ resource.taskCount }}
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .resource-workload-container {
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
      margin-bottom: 16px;

      h2 {
        margin: 0 0 8px;
        font-size: 20px;
        font-weight: 500;
        color: #333333;
      }

      .metrics {
        display: flex;
        gap: 24px;

        .metric {
          .label {
            display: block;
            font-size: 12px;
            color: #666666;
            margin-bottom: 4px;
          }

          .value {
            font-size: 18px;
            font-weight: 500;
            color: #333333;
          }
        }
      }
    }

    .legend {
      display: flex;
      gap: 16px;

      .legend-item {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 12px;
        color: #666666;

        .color-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;

          &.optimal { background: #4CAF50; }
          &.high { background: #FFC107; }
          &.over { background: #F44336; }
        }
      }
    }
  }

  .content {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
    min-height: 0;

    .chart-section {
      height: 200px;

      .chart-container {
        height: 100%;
        background: #f8f9fa;
        border-radius: 8px;
        padding: 16px;
        position: relative;
      }
    }

    .resource-list {
      overflow-y: auto;
      padding-right: 8px;

      .resource-item {
        background: #f8f9fa;
        border-radius: 8px;
        padding: 12px 16px;
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        transition: transform 0.2s ease;

        &:hover {
          transform: translateX(4px);
        }

        &.overloaded {
          background: rgba(244, 67, 54, 0.1);
        }

        .resource-info {
          flex: 1;

          .name {
            display: block;
            font-weight: 500;
            margin-bottom: 8px;
            color: #333333;
          }

          .utilization-section {
            display: flex;
            align-items: center;
            gap: 16px;

            .utilization-bar {
              flex: 1;
              height: 4px;
              background: rgba(0, 0, 0, 0.1);
              border-radius: 2px;
              overflow: hidden;

              .bar {
                height: 100%;
                transition: width 0.3s ease;
              }
            }

            .percentage {
              font-size: 14px;
              font-weight: 500;
              width: 48px;
              text-align: right;
              color: #333333;
            }
          }
        }

        .task-count {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #666666;

          mat-icon {
            font-size: 16px;
            width: 16px;
            height: 16px;
          }
        }
      }
    }
  }
}
  `]
})
export class ResourceWorkloadComponent implements OnChanges, OnDestroy {
  @Input() data: ResourceUtilizationData = {
    totalResources: 0,
    averageUtilization: 0,
    resources: [],
    weeklyData: []
  };
    @ViewChild('chartContainer', { static: true }) private chartContainer!: ElementRef;

  private svg!: D3Selection;
  private chart!: D3Selection;
  private tooltip!: D3Selection;
  private margin = { top: 20, right: 30, bottom: 30, left: 40 };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.initializeChart();
      this.renderChart();
    }
  }

  private initializeChart(): void {
    const element = this.chartContainer.nativeElement;
    select(element).selectAll('*').remove();

    const rect = element.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    this.svg = select(element)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    this.chart = this.svg
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

    this.setupTooltip(element);
  }

  private setupTooltip(element: HTMLElement): void {
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
    if (!this.data?.weeklyData?.length) return;

    const element = this.chartContainer.nativeElement;
    const width = element.clientWidth - this.margin.left - this.margin.right;
    const height = element.clientHeight - this.margin.top - this.margin.bottom;

    // Create scales
    const x = scaleTime()
      .range([0, width])
      .domain([
        new Date(this.data.weeklyData[0].week),
        new Date(this.data.weeklyData[this.data.weeklyData.length - 1].week)
      ]);

    const y = scaleLinear()
      .range([height, 0])
      .domain([0, Math.max(100, ...this.data.weeklyData.map(d => d.utilization))])
      .nice();

    // Add gridlines
    this.addGridlines(x, y, width, height);

    // Add axes
    this.addAxes(x, y, height);

    // Add utilization area and line
    this.addUtilizationGraph(x, y, height);

    // Add threshold lines
    this.addThresholdLines(x, y, width);
  }

  private addGridlines(x: any, y: any, width: number, height: number): void {
    // Add Y gridlines
    this.chart.append('g')
      .attr('class', 'grid')
      .attr('opacity', 0.1)
      .call(axisLeft(y)
        .tickSize(-width)
        .tickFormat(() => '')
      );

    // Add X gridlines
    this.chart.append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(0,${height})`)
      .attr('opacity', 0.1)
      .call(axisBottom(x)
        .tickSize(-height)
        .tickFormat(() => '')
      );
  }

  private addAxes(x: any, y: any, height: number): void {
    // Add X axis
    this.chart.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(axisBottom(x)
        .ticks(5)
        .tickFormat((d: any) => {
          const date = new Date(d);
          return `${date.getMonth() + 1}/${date.getDate()}`;
        }))
      .selectAll('text')
      .style('fill', 'rgba(255, 255, 255, 0.6)')
      .style('font-size', '12px');

    // Add Y axis
    this.chart.append('g')
      .call(axisLeft(y)
        .ticks(5)
        .tickFormat(d => `${d}%`))
      .selectAll('text')
      .style('fill', 'rgba(255, 255, 255, 0.6)')
      .style('font-size', '12px');
  }

  private addUtilizationGraph(x: any, y: any, height: number): void {
    // Create area generator
    const areaGenerator = area<any>()
      .x(d => x(new Date(d.week)))
      .y0(height)
      .y1(d => y(d.utilization))
      .curve(curveMonotoneX);

    // Create line generator
    const lineGenerator = line<any>()
      .x(d => x(new Date(d.week)))
      .y(d => y(d.utilization))
      .curve(curveMonotoneX);

    // Add gradient
    const gradient = this.svg.append('defs')
      .append('linearGradient')
      .attr('id', 'utilization-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');

    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#2196F3')
      .attr('stop-opacity', 0.4);

    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#2196F3')
      .attr('stop-opacity', 0.1);

    // Add area
    this.chart.append('path')
      .datum(this.data.weeklyData)
      .attr('class', 'utilization-area')
      .attr('fill', 'url(#utilization-gradient)')
      .attr('d', areaGenerator);

    // Add line
    this.chart.append('path')
      .datum(this.data.weeklyData)
      .attr('class', 'utilization-line')
      .attr('fill', 'none')
      .attr('stroke', '#2196F3')
      .attr('stroke-width', 2)
      .attr('d', lineGenerator);

    // Add data points
    this.chart.selectAll('.data-point')
      .data(this.data.weeklyData)
      .enter()
      .append('circle')
      .attr('class', 'data-point')
      .attr('cx', d => x(new Date(d.week)))
      .attr('cy', d => y(d.utilization))
      .attr('r', 4)
      .attr('fill', '#2196F3')
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 2)
      .on('mouseover', (event: MouseEvent, d: any) => {
        select(event.currentTarget as Element).attr('r', 6);
        this.showTooltip(event, d);
      })
      .on('mouseout', (event: MouseEvent) => {
        select(event.currentTarget as Element).attr('r', 4);
        this.hideTooltip();
      });
  }

  private addThresholdLines(x: any, y: any, width: number): void {
    // Add optimal threshold line (80%)
    this.addThresholdLine(x, y, width, 80, '#FFC107', 'High Utilization');

    // Add over-allocation threshold line (100%)
    this.addThresholdLine(x, y, width, 100, '#F44336', 'Over-allocated');
  }

  private addThresholdLine(x: any, y: any, width: number, threshold: number, color: string, label: string): void {
    const thresholdGroup = this.chart.append('g')
      .attr('class', 'threshold');

    // Add line
    thresholdGroup.append('line')
      .attr('x1', 0)
      .attr('x2', width)
      .attr('y1', y(threshold))
      .attr('y2', y(threshold))
      .attr('stroke', color)
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '4,4');

    // Add label
    thresholdGroup.append('text')
      .attr('x', width)
      .attr('y', y(threshold))
      .attr('dy', -5)
      .attr('text-anchor', 'end')
      .style('fill', color)
      .style('font-size', '10px')
      .text(`${label} (${threshold}%)`);
  }

  private showTooltip(event: MouseEvent, d: any): void {
    const content = `
      <div>
        <strong>${new Date(d.week).toLocaleDateString()}</strong>
        <div>Utilization: ${d.utilization}%</div>
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

  // Helper methods for template
  public getUtilizationWidth(utilization: number): number {
    return Math.min(utilization, 100);
  }

  public getUtilizationColor(utilization: number): string {
    if (utilization > 100) return '#F44336';
    if (utilization > 80) return '#FFC107';
    return '#4CAF50';
  }

  public getUtilizationStatus(utilization: number): { icon: string; color: string } {
    if (utilization > 100) {
      return { icon: 'warning', color: '#F44336' };
    }
    if (utilization > 80) {
      return { icon: 'info', color: '#FFC107' };
    }
    return { icon: 'check_circle', color: '#4CAF50' };
  }

  public formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
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