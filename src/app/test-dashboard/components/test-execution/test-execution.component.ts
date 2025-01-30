import { Component, Input, OnChanges, ElementRef, ViewChild, SimpleChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { select, Selection } from 'd3-selection';
import { scaleLinear, scaleTime } from 'd3-scale';
import { line, curveMonotoneX } from 'd3-shape';
import { axisBottom, axisLeft } from 'd3-axis';
import { timeFormat } from 'd3-time-format';

interface ExecutionMetrics {
  statusDistribution: Array<{ status: string; count: number }>;
  activeRuns: number;
  trends: Array<{
    date: string;
    total: number;
    passed: number;
    failed: number;
    skipped: number;
  }>;
}

@Component({
  selector: 'app-test-execution',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    <div class="test-execution-container">
      <div class="header">
        <div class="title-section">
          <h2>Test Execution</h2>
          <div class="metrics">
            <div class="metric">
              <span class="label">Pass Rate</span>
              <span class="value">{{ getPassRate() }}%</span>
            </div>
            <div class="metric">
              <span class="label">Active Runs</span>
              <span class="value">{{ data?.activeRuns || 0 }}</span>
            </div>
            <div class="metric">
              <span class="label">Total Executions</span>
              <span class="value">{{ getTotalExecutions() }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="content">
        <div #chartContainer class="chart-container">
          <!-- D3 chart will be rendered here -->
        </div>

        <div class="status-summary">
          <div class="summary-item" 
               *ngFor="let status of getStatusDistribution()"
               [class]="status.status.toLowerCase()">
            <span class="value">{{ status.count }}</span>
            <span class="label">{{ formatStatus(status.status) }}</span>
            <span class="percentage">{{ getStatusPercentage(status) }}%</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .test-execution-container {
      height: 100%;
      padding: 16px;
      background: #ffffff;
      border-radius: 8px;
      display: flex;
      flex-direction: column;

      .header {
        margin-bottom: 24px;

        .title-section {
          h2 {
            margin: 0 0 16px;
            font-size: 20px;
            font-weight: 500;
            color: #333333;
          }

          .metrics {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;

            .metric {
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
        }
      }

      .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 24px;
        min-height: 0;

        .chart-container {
          flex: 1;
          min-height: 300px;
          background: #f8f9fa;
          border-radius: 8px;
          padding: 16px;
          position: relative;
        }

        .status-summary {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 16px;

          .summary-item {
            padding: 16px;
            border-radius: 8px;
            text-align: center;
            color: #ffffff;

            &.passed {
              background: #4CAF50;
            }

            &.failed {
              background: #F44336;
            }

            &.skipped {
              background: #FFC107;
              color: #333333;
            }

            &.blocked {
              background: #9E9E9E;
            }

            .value {
              display: block;
              font-size: 24px;
              font-weight: 500;
              margin-bottom: 4px;
            }

            .label {
              display: block;
              font-size: 14px;
              margin-bottom: 4px;
            }

            .percentage {
              font-size: 12px;
              opacity: 0.8;
            }
          }
        }
      }
    }
  `]
})
export class TestExecutionComponent implements OnChanges, OnDestroy {
  @Input() data?: ExecutionMetrics;
  @ViewChild('chartContainer', { static: true }) private chartContainer!: ElementRef;

  private svg!: Selection<any, unknown, null, undefined>;
  private chart!: Selection<any, unknown, null, undefined>;
  private tooltip!: Selection<any, unknown, null, undefined>;
  private margin = { top: 20, right: 30, bottom: 30, left: 40 };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.initializeChart();
      this.updateChart();
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

    this.setupTooltip();
  }

  private setupTooltip(): void {
    this.tooltip = select(this.chartContainer.nativeElement)
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
      .style('position', 'absolute')
      .style('pointer-events', 'none')
      .style('background', 'rgba(0, 0, 0, 0.8)')
      .style('color', '#ffffff')
      .style('padding', '8px')
      .style('border-radius', '4px')
      .style('font-size', '12px');
  }

  private updateChart(): void {
    if (!this.data?.trends?.length) return;

    const width = this.chartContainer.nativeElement.clientWidth - this.margin.left - this.margin.right;
    const height = this.chartContainer.nativeElement.clientHeight - this.margin.top - this.margin.bottom;

    // Create scales
    const x = scaleTime()
      .range([0, width])
      .domain([
        new Date(this.data.trends[0].date),
        new Date(this.data.trends[this.data.trends.length - 1].date)
      ]);

    const y = scaleLinear()
      .range([height, 0])
      .domain([0, Math.max(...this.data.trends.map(d => d.total))])
      .nice();

    // Add gridlines
    this.addGridlines(x, y, width, height);

    // Add axes
    this.addAxes(x, y, height);

    // Add lines
    this.addExecutionLines(x, y);

    // Add data points
    this.addDataPoints(x, y);
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
    // Add X axis
    this.chart.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(axisBottom(x).ticks(5))
      .selectAll('text')
      .style('fill', '#666666')
      .style('font-size', '12px');

    // Add Y axis
    this.chart.append('g')
      .call(axisLeft(y))
      .selectAll('text')
      .style('fill', '#666666')
      .style('font-size', '12px');
  }

  private addExecutionLines(x: any, y: any): void {
    // Add passed line
    const passedLine = line<any>()
      .x(d => x(new Date(d.date)))
      .y(d => y(d.passed))
      .curve(curveMonotoneX);

    this.chart.append('path')
      .datum(this.data!.trends)
      .attr('class', 'line passed')
      .attr('fill', 'none')
      .attr('stroke', '#4CAF50')
      .attr('stroke-width', 2)
      .attr('d', passedLine);

    // Add failed line
    const failedLine = line<any>()
      .x(d => x(new Date(d.date)))
      .y(d => y(d.failed))
      .curve(curveMonotoneX);

    this.chart.append('path')
      .datum(this.data!.trends)
      .attr('class', 'line failed')
      .attr('fill', 'none')
      .attr('stroke', '#F44336')
      .attr('stroke-width', 2)
      .attr('d', failedLine);
  }

  private addDataPoints(x: any, y: any): void {
    // Add points for passed tests
    const addPoints = (key: string, color: string) => {
      this.chart.selectAll(`.point-${key}`)
        .data(this.data!.trends)
        .enter()
        .append('circle')
        .attr('class', `point-${key}`)
        .attr('cx', d => x(new Date(d.date)))
        .attr('cy', d => y(d[key as keyof typeof d]))
        .attr('r', 4)
        .attr('fill', color)
        .attr('stroke', '#ffffff')
        .attr('stroke-width', 2)
        .on('mouseover', (event: MouseEvent, d: any) => {
          this.showTooltip(event, d, key);
        })
        .on('mouseout', () => {
          this.hideTooltip();
        });
    };

    addPoints('passed', '#4CAF50');
    addPoints('failed', '#F44336');
  }

  private showTooltip(event: MouseEvent, d: any, type: string): void {
    const formatDate = timeFormat('%B %d, %Y');
    const content = `
      <div>
        <strong>${formatDate(new Date(d.date))}</strong>
        <div>${type}: ${d[type]}</div>
        <div>Total: ${d.total}</div>
        <div>Rate: ${((d[type] / d.total) * 100).toFixed(1)}%</div>
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

  public getStatusDistribution(): Array<{ status: string; count: number }> {
    return this.data?.statusDistribution || [];
  }

  public getPassRate(): number {
    if (!this.data?.statusDistribution) return 0;
    
    const total = this.getTotalExecutions();
    if (total === 0) return 0;

    const passed = this.data.statusDistribution.find(s => s.status === 'PASSED')?.count || 0;
    return Math.round((passed / total) * 100);
  }

  public getTotalExecutions(): number {
    if (!this.data?.statusDistribution) return 0;
    return this.data.statusDistribution.reduce((sum, status) => sum + status.count, 0);
  }

  public getStatusPercentage(status: { status: string; count: number }): number {
    const total = this.getTotalExecutions();
    if (total === 0) return 0;
    return Math.round((status.count / total) * 100);
  }

  public formatStatus(status: string): string {
    return status
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
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