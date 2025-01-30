// components/defect-analytics/defect-analytics.component.ts
import { Component, Input, OnChanges, ElementRef, ViewChild, SimpleChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { select, Selection } from 'd3-selection';
import { scaleLinear, scaleTime, scaleBand } from 'd3-scale';
import { line, curveMonotoneX, arc, pie } from 'd3-shape';
import { axisBottom, axisLeft } from 'd3-axis';
import { timeFormat } from 'd3-time-format';


interface TrendData {
  date: string;
  total: number;
  opened: number;
  resolved: number;
}

interface SeverityData {
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  count: number;
}

interface StatusData {
  status: string;
  count: number;
}

interface DefectAnalytics {
  severityDistribution: SeverityData[];
  priorityDistribution: Array<{ priority: string; count: number }>;
  statusDistribution: StatusData[];
  trends: TrendData[];
}

@Component({
  selector: 'app-defect-analytics',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    <div class="defect-analytics-container">
      <div class="header">
        <div class="title-section">
          <h2>Defect Analytics</h2>
          <div class="metrics">
            <div class="metric">
              <span class="label">Total Defects</span>
              <span class="value">{{ getTotalDefects() }}</span>
            </div>
            <div class="metric">
              <span class="label">Resolution Rate</span>
              <span class="value">{{ getResolutionRate() }}%</span>
            </div>
            <div class="metric">
              <span class="label">Critical Defects</span>
              <span class="value critical">{{ getCriticalDefects() }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="content">
        <div class="charts-container">
          <div class="trend-chart">
            <h3>Defect Trends</h3>
            <div #trendChartContainer class="chart-container">
              <!-- Trend chart will be rendered here -->
            </div>
          </div>
          <div class="distribution-charts">
            <div class="severity-chart">
              <h3>Severity Distribution</h3>
              <div #severityChartContainer class="chart-container">
                <!-- Severity pie chart will be rendered here -->
              </div>
            </div>
            <div class="status-chart">
              <h3>Status Distribution</h3>
              <div class="status-grid">
                <div class="status-item" 
                     *ngFor="let status of getStatusDistribution()"
                     [class]="status.status.toLowerCase()">
                  <div class="status-content">
                    <span class="count">{{ status.count }}</span>
                    <span class="label">{{ formatLabel(status.status) }}</span>
                  </div>
                  <div class="progress-bar">
                    <div class="progress" 
                         [style.width.%]="getStatusPercentage(status.count)">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .defect-analytics-container {
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

                &.critical {
                  color: #F44336;
                }
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

        .charts-container {
          display: grid;
          grid-template-rows: 1fr 1fr;
          gap: 24px;

          h3 {
            margin: 0 0 16px;
            font-size: 16px;
            font-weight: 500;
            color: #333333;
          }

          .trend-chart {
            .chart-container {
              height: 200px;
              background: #f8f9fa;
              border-radius: 8px;
              padding: 16px;
              position: relative;
            }
          }

          .distribution-charts {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;

            .chart-container {
              height: 200px;
              background: #f8f9fa;
              border-radius: 8px;
              padding: 16px;
              position: relative;
            }

            .status-grid {
              display: flex;
              flex-direction: column;
              gap: 12px;

              .status-item {
                background: #f8f9fa;
                border-radius: 8px;
                padding: 12px;

                .status-content {
                  display: flex;
                  justify-content: space-between;
                  margin-bottom: 8px;

                  .count {
                    font-size: 16px;
                    font-weight: 500;
                    color: #333333;
                  }

                  .label {
                    font-size: 14px;
                    color: #666666;
                  }
                }

                .progress-bar {
                  height: 4px;
                  background: rgba(0, 0, 0, 0.1);
                  border-radius: 2px;
                  overflow: hidden;

                  .progress {
                    height: 100%;
                    transition: width 0.3s ease;
                    background: currentColor;
                  }
                }

                &.open {
                  color: #F44336;
                }

                &.in_progress {
                  color: #2196F3;
                }

                &.resolved {
                  color: #4CAF50;
                }

                &.closed {
                  color: #9E9E9E;
                }
              }
            }
          }
        }
      }
    }
  `]
})
export class DefectAnalyticsComponent implements OnChanges, OnDestroy {
  @Input() data?: DefectAnalytics;
  @ViewChild('trendChartContainer', { static: true }) private trendChartContainer!: ElementRef;
  @ViewChild('severityChartContainer', { static: true }) private severityChartContainer!: ElementRef;

  private trendSvg!: Selection<any, unknown, null, undefined>;
  private severitySvg!: Selection<any, unknown, null, undefined>;
  private tooltip!: Selection<any, unknown, null, undefined>;
  private margin = { top: 20, right: 30, bottom: 30, left: 40 };

  private readonly colors: {
    severity: { [K in SeverityData['severity']]: string };
  } = {
    severity: {
      'CRITICAL': '#F44336',
      'HIGH': '#FF5722',
      'MEDIUM': '#FFC107',
      'LOW': '#4CAF50'
    }
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.initializeCharts();
      this.updateCharts();
    }
  }

  private initializeCharts(): void {
    this.initializeTrendChart();
    this.initializeSeverityChart();
    this.setupTooltip();
  }

  private initializeTrendChart(): void {
    const element = this.trendChartContainer.nativeElement;
    select(element).selectAll('*').remove();

    const width = element.clientWidth;
    const height = element.clientHeight;

    this.trendSvg = select(element)
      .append('svg')
      .attr('width', width)
      .attr('height', height);
  }

  private initializeSeverityChart(): void {
    const element = this.severityChartContainer.nativeElement;
    select(element).selectAll('*').remove();

    const width = element.clientWidth;
    const height = element.clientHeight;

    this.severitySvg = select(element)
      .append('svg')
      .attr('width', width)
      .attr('height', height);
  }

  private addTrendLines(chart: Selection<any, unknown, null, undefined>, x: any, y: any): void {
    if (!this.data?.trends) return;
  
    const openedLine = line<TrendData>()
      .x(d => x(new Date(d.date)))
      .y(d => y(d.opened))
      .curve(curveMonotoneX);
  
    const resolvedLine = line<TrendData>()
      .x(d => x(new Date(d.date)))
      .y(d => y(d.resolved))
      .curve(curveMonotoneX);
  
    chart.append('path')
      .datum(this.data.trends)
      .attr('class', 'line opened')
      .attr('fill', 'none')
      .attr('stroke', '#F44336')
      .attr('stroke-width', 2)
      .attr('d', openedLine);
  
    chart.append('path')
      .datum(this.data.trends)
      .attr('class', 'line resolved')
      .attr('fill', 'none')
      .attr('stroke', '#4CAF50')
      .attr('stroke-width', 2)
      .attr('d', resolvedLine);
  }

  private setupTooltip(): void {
    this.tooltip = select(this.trendChartContainer.nativeElement)
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

  private updateCharts(): void {
    this.updateTrendChart();
    this.updateSeverityChart();
  }

  private updateTrendChart(): void {
    if (!this.data?.trends?.length) return;

    const width = this.trendChartContainer.nativeElement.clientWidth - this.margin.left - this.margin.right;
    const height = this.trendChartContainer.nativeElement.clientHeight - this.margin.top - this.margin.bottom;

    const chart = this.trendSvg.append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

    // Create scales
    const x = scaleTime()
      .range([0, width])
      .domain([
        new Date(this.data.trends[0].date),
        new Date(this.data.trends[this.data.trends.length - 1].date)
      ]);

    const y = scaleLinear()
      .range([height, 0])
      .domain([0, Math.max(...this.data.trends.map(d => Math.max(d.opened, d.resolved)))])
      .nice();

    // Add gridlines
    this.addGridlines(chart, x, y, width, height);

    // Add axes
    this.addAxes(chart, x, y, height);

    // Add lines
    this.addTrendLines(chart, x, y);

    // Add data points
    this.addTrendPoints(chart, x, y);
  }

  private updateSeverityChart(): void {
    if (!this.data?.severityDistribution?.length) return;
  
    const width = this.severityChartContainer.nativeElement.clientWidth;
    const height = this.severityChartContainer.nativeElement.clientHeight;
    const radius = Math.min(width, height) / 2 * 0.8;
  
    const chart = this.severitySvg
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);
  
    const pieGenerator = pie<SeverityData>()
      .value(d => d.count)
      .sort(null);
  
    const arcGenerator = arc<any>()
      .innerRadius(radius * 0.6)
      .outerRadius(radius);
  
    const arcs = chart.selectAll('.arc')
      .data(pieGenerator(this.data.severityDistribution))
      .enter()
      .append('g')
      .attr('class', 'arc');
  
    arcs.append('path')
      .attr('d', arcGenerator)
      .attr('fill', d => this.colors.severity[d.data.severity])
      .style('stroke', '#ffffff')
      .style('stroke-width', '2px')
      .on('mouseover', (event: MouseEvent, d: any) => {
        this.showSeverityTooltip(event, d);
      })
      .on('mouseout', () => {
        this.hideTooltip();
      });
  }

  
  
  private addGridlines(chart: Selection<any, unknown, null, undefined>, x: any, y: any, width: number, height: number): void {
    chart.append('g')
      .attr('class', 'grid')
      .attr('opacity', 0.1)
      .call(axisLeft(y)
        .tickSize(-width)
        .tickFormat(() => ''));

    chart.append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(0,${height})`)
      .attr('opacity', 0.1)
      .call(axisBottom(x)
        .tickSize(-height)
        .tickFormat(() => ''));
  }

  private addAxes(chart: Selection<any, unknown, null, undefined>, x: any, y: any, height: number): void {
    chart.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(axisBottom(x).ticks(5))
      .selectAll('text')
      .style('fill', '#666666')
      .style('font-size', '12px');

    chart.append('g')
      .call(axisLeft(y))
      .selectAll('text')
      .style('fill', '#666666')
      .style('font-size', '12px');
  }

  private addTrendPoints(chart: Selection<any, unknown, null, undefined>, x: any, y: any): void {
    type TrendKey = keyof Pick<TrendData, 'opened' | 'resolved'>;
    
    const addPoints = (key: TrendKey, color: string) => {
      chart.selectAll(`.point-${key}`)
        .data(this.data!.trends)
        .enter()
        .append('circle')
        .attr('class', `point-${key}`)
        .attr('cx', d => x(new Date(d.date)))
        .attr('cy', d => y(d[key]))
        .attr('r', 4)
        .attr('fill', color)
        .attr('stroke', '#ffffff')
        .attr('stroke-width', 2)
        .on('mouseover', (event: MouseEvent, d: TrendData) => {
          this.showTrendTooltip(event, d, key);
        })
        .on('mouseout', () => {
          this.hideTooltip();
        });
    };
  
    addPoints('opened', '#F44336');
    addPoints('resolved', '#4CAF50');
  }

  private showTrendTooltip(event: MouseEvent, d: TrendData, type: 'opened' | 'resolved'): void {
    const formatDate = timeFormat('%B %d, %Y');
    const content = `
      <div>
        <strong>${formatDate(new Date(d.date))}</strong>
        <div>${type === 'opened' ? 'Opened' : 'Resolved'}: ${d[type]}</div>
        <div>Total: ${d.total}</div>
      </div>
    `;
  
    this.showTooltip(event, content);
  }

  private showSeverityTooltip(event: MouseEvent, d: { data: SeverityData }): void {
    const percentage = (d.data.count / this.getTotalDefects()) * 100;
    const content = `
      <div>
        <strong>${this.formatLabel(d.data.severity)}</strong>
        <div>${d.data.count} defects</div>
        <div>${percentage.toFixed(1)}%</div>
      </div>
    `;
  
    this.showTooltip(event, content);
  }

  private showTooltip(event: MouseEvent, content: string): void {
    this.tooltip
      .html(content)
      .style('opacity', 1)
      .style('left', `${event.pageX + 10}px`)
      .style('top', `${event.pageY - 10}px`);
  }

  private hideTooltip(): void {
    this.tooltip.style('opacity', 0);
  }

  public getTotalDefects(): number {
    return this.data?.statusDistribution.reduce((sum, status) => sum + status.count, 0) || 0;
  }

  public getResolutionRate(): number {
    if (!this.data?.statusDistribution) return 0;
    const total = this.getTotalDefects();
    if (total === 0) return 0;

    const resolved = this.data.statusDistribution
      .filter(s => ['RESOLVED', 'CLOSED'].includes(s.status))
      .reduce((sum, status) => sum + status.count, 0);

    return Math.round((resolved / total) * 100);
  }

  public getCriticalDefects(): number {
    return this.data?.severityDistribution
      .find(s => s.severity === 'CRITICAL')?.count || 0;
  }

  public getStatusDistribution(): Array<{ status: string; count: number }> {
    return this.data?.statusDistribution || [];
  }

  public getStatusPercentage(count: number): number {
    const total = this.getTotalDefects();
    if (total === 0) return 0;
    return (count / total) * 100;
  }

  public formatLabel(label: string): string {
    return label
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  ngOnDestroy(): void {
    if (this.trendSvg) {
      this.trendSvg.selectAll('*').remove();
    }
    if (this.severitySvg) {
      this.severitySvg.selectAll('*').remove();
    }
    if (this.tooltip) {
      this.tooltip.remove();
    }
  }
}