// components/quality-metrics/quality-metrics.component.ts
import { Component, Input, OnChanges, ElementRef, ViewChild, SimpleChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { select, Selection } from 'd3-selection';
import { scaleLinear, scaleTime } from 'd3-scale';
import { line, curveMonotoneX } from 'd3-shape';
import { axisBottom, axisLeft } from 'd3-axis';
import { timeFormat } from 'd3-time-format';

interface QualityTrendPoint {
  date: string;
  successRate: number;
  defectDensity: number;
}

interface QualityMetrics {
  executionSuccessRate: number;
  defectDensity: number;
  criticalDefects: number;
  qualityTrend?: QualityTrendPoint[];
}

interface QualityMetrics {
  executionSuccessRate: number;
  defectDensity: number;
  criticalDefects: number;
  qualityTrend?: Array<{
    date: string;
    successRate: number;
    defectDensity: number;
  }>;
}

@Component({
  selector: 'app-quality-metrics',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    <div class="quality-metrics-container">
      <div class="header">
        <div class="title-section">
          <h2>Quality Metrics</h2>
          <div class="metrics-summary">
            <div class="metric">
              <span class="label">Success Rate</span>
              <div class="value-container">
                <span class="value" [class.success]="isSuccessRateGood()">
                  {{ data?.executionSuccessRate?.toFixed(1) || 0 }}%
                </span>
                <mat-icon [class.success]="isSuccessRateGood()">
                  {{ getSuccessRateIcon() }}
                </mat-icon>
              </div>
            </div>
            <div class="metric">
              <span class="label">Defect Density</span>
              <div class="value-container">
                <span class="value" [class.warning]="isDefectDensityHigh()">
                  {{ data?.defectDensity?.toFixed(2) || 0 }}
                </span>
                <mat-icon [class.warning]="isDefectDensityHigh()">
                  {{ getDefectDensityIcon() }}
                </mat-icon>
              </div>
            </div>
            <div class="metric">
              <span class="label">Critical Defects</span>
              <div class="value-container">
                <span class="value" [class.critical]="hasCriticalDefects()">
                  {{ data?.criticalDefects || 0 }}
                </span>
                <mat-icon [class.critical]="hasCriticalDefects()">
                  {{ getCriticalDefectsIcon() }}
                </mat-icon>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="content">
        <div class="charts-container">
          <div class="trend-chart">
            <h3>Quality Trends</h3>
            <div #trendChartContainer class="chart-container">
              <!-- Trend chart will be rendered here -->
            </div>
          </div>

          <div class="metrics-grid">
            <div class="metric-card success-rate">
              <div class="metric-header">
                <h4>Test Execution Success</h4>
                <span class="indicator" [class.success]="isSuccessRateGood()">
                  {{ getSuccessRateStatus() }}
                </span>
              </div>
              <div class="metric-body">
                <div class="progress-container">
                  <div class="progress-ring">
                    <!-- SVG progress ring will be added here -->
                  </div>
                  <div class="metric-value">
                    {{ data?.executionSuccessRate?.toFixed(1) || 0 }}%
                  </div>
                </div>
                <div class="metric-description">
                  {{ getSuccessRateDescription() }}
                </div>
              </div>
            </div>

            <div class="metric-card defect-density">
              <div class="metric-header">
                <h4>Defect Density</h4>
                <span class="indicator" [class.warning]="isDefectDensityHigh()">
                  {{ getDefectDensityStatus() }}
                </span>
              </div>
              <div class="metric-body">
                <div class="metric-value">
                  {{ data?.defectDensity?.toFixed(2) || 0 }}
                </div>
                <div class="metric-label">
                  defects per test case
                </div>
                <div class="metric-description">
                  {{ getDefectDensityDescription() }}
                </div>
              </div>
            </div>

            <div class="metric-card critical-defects">
              <div class="metric-header">
                <h4>Critical Defects</h4>
                <span class="indicator" [class.critical]="hasCriticalDefects()">
                  {{ getCriticalDefectsStatus() }}
                </span>
              </div>
              <div class="metric-body">
                <div class="metric-value">
                  {{ data?.criticalDefects || 0 }}
                </div>
                <div class="metric-label">
                  open critical defects
                </div>
                <div class="metric-description">
                  {{ getCriticalDefectsDescription() }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .quality-metrics-container {
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

          .metrics-summary {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;

            .metric {
              background: #f8f9fa;
              padding: 12px;
              border-radius: 8px;

              .label {
                display: block;
                font-size: 12px;
                color: #666666;
                margin-bottom: 4px;
              }

              .value-container {
                display: flex;
                align-items: center;
                gap: 8px;

                .value {
                  font-size: 24px;
                  font-weight: 500;
                  color: #333333;

                  &.success { color: #4CAF50; }
                  &.warning { color: #FFC107; }
                  &.critical { color: #F44336; }
                }

                mat-icon {
                  font-size: 20px;
                  width: 20px;
                  height: 20px;

                  &.success { color: #4CAF50; }
                  &.warning { color: #FFC107; }
                  &.critical { color: #F44336; }
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
          grid-template-columns: 1fr auto;
          gap: 24px;

          .trend-chart {
            h3 {
              margin: 0 0 16px;
              font-size: 16px;
              font-weight: 500;
              color: #333333;
            }

            .chart-container {
              height: 300px;
              background: #f8f9fa;
              border-radius: 8px;
              padding: 16px;
              position: relative;
            }
          }

          .metrics-grid {
            width: 300px;
            display: grid;
            gap: 16px;

            .metric-card {
              background: #f8f9fa;
              border-radius: 8px;
              padding: 16px;

              .metric-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 16px;

                h4 {
                  margin: 0;
                  font-size: 14px;
                  font-weight: 500;
                  color: #333333;
                }

                .indicator {
                  font-size: 12px;
                  padding: 4px 8px;
                  border-radius: 4px;
                  background: rgba(0, 0, 0, 0.05);

                  &.success {
                    color: #4CAF50;
                    background: rgba(76, 175, 80, 0.1);
                  }

                  &.warning {
                    color: #FFC107;
                    background: rgba(255, 193, 7, 0.1);
                  }

                  &.critical {
                    color: #F44336;
                    background: rgba(244, 67, 54, 0.1);
                  }
                }
              }

              .metric-body {
                text-align: center;

                .metric-value {
                  font-size: 32px;
                  font-weight: 500;
                  color: #333333;
                  margin-bottom: 4px;
                }

                .metric-label {
                  font-size: 12px;
                  color: #666666;
                  margin-bottom: 16px;
                }

                .metric-description {
                  font-size: 12px;
                  color: #666666;
                  line-height: 1.5;
                }

                .progress-container {
                  position: relative;
                  width: 120px;
                  height: 120px;
                  margin: 0 auto 16px;

                  .progress-ring {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                  }

                  .metric-value {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 24px;
                    font-weight: 500;
                  }
                }
              }
            }
          }
        }
      }
    }
  `]
})
export class QualityMetricsComponent implements OnChanges, OnDestroy {
  @Input() data?: QualityMetrics;
  @ViewChild('trendChartContainer', { static: true }) private trendChartContainer!: ElementRef;

  private svg!: Selection<any, unknown, null, undefined>;
  private tooltip!: Selection<any, unknown, null, undefined>;
  private margin = { top: 20, right: 30, bottom: 30, left: 40 };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.initializeChart();
      this.updateChart();
    }
  }

  private initializeChart(): void {
    const element = this.trendChartContainer.nativeElement;
    select(element).selectAll('*').remove();

    const width = element.clientWidth;
    const height = element.clientHeight;

    this.svg = select(element)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    this.setupTooltip();
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

  private updateChart(): void {
    if (!this.data?.qualityTrend?.length) return;

    const width = this.trendChartContainer.nativeElement.clientWidth - this.margin.left - this.margin.right;
    const height = this.trendChartContainer.nativeElement.clientHeight - this.margin.top - this.margin.bottom;

    const chart = this.svg.append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

    // Create scales
    const x = scaleTime()
      .range([0, width])
      .domain([
        new Date(this.data.qualityTrend[0].date),
        new Date(this.data.qualityTrend[this.data.qualityTrend.length - 1].date)
      ]);

    const y = scaleLinear()
      .range([height, 0])
      .domain([0, 100])
      .nice();

    this.addGridlines(chart, x, y, width, height);
    this.addAxes(chart, x, y, height);
    this.addLines(chart, x, y);
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

  private addLines(chart: Selection<SVGGElement, unknown, null, undefined>, x: any, y: any): void {
    if (!this.data?.qualityTrend) return;
  
    const successLine = line<QualityTrendPoint>()
      .x(d => x(new Date(d.date)))
      .y(d => y(d.successRate))
      .curve(curveMonotoneX);
  
    chart.append('path')
      .datum(this.data.qualityTrend)
      .attr('class', 'line success')
      .attr('fill', 'none')
      .attr('stroke', '#4CAF50')
      .attr('stroke-width', 2)
      .attr('d', successLine as any); // Type assertion needed for D3 compatibility
  
    // Add success rate points
    chart.selectAll('.point-success')
      .data(this.data.qualityTrend)
      .enter()
      .append('circle')
      .attr('class', 'point-success')
      .attr('cx', d => x(new Date(d.date)))
      .attr('cy', d => y(d.successRate))
      .attr('r', 4)
      .attr('fill', '#4CAF50')
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 2)
      .on('mouseover', (event: MouseEvent, d: QualityTrendPoint) => {
        this.showTooltip(event, d);
      })
      .on('mouseout', () => {
        this.hideTooltip();
      });
  }

  private showTooltip(event: MouseEvent, d: QualityTrendPoint): void {
    const formatDate = timeFormat('%B %d, %Y');
    const content = `
      <div>
        <strong>${formatDate(new Date(d.date))}</strong>
        <div>Success Rate: ${d.successRate.toFixed(1)}%</div>
        <div>Defect Density: ${d.defectDensity.toFixed(2)}</div>
      </div>
    `;
  
    this.tooltip
      .html(content)
      .style('opacity', '1')
      .style('left', `${event.pageX + 10}px`)
      .style('top', `${event.pageY - 10}px`);
  }

  private hideTooltip(): void {
    this.tooltip.style('opacity', 0);
  }

  // Helper methods for template
  public isSuccessRateGood(): boolean {
    return (this.data?.executionSuccessRate || 0) >= 90;
  }

  public isDefectDensityHigh(): boolean {
    return (this.data?.defectDensity || 0) > 0.5;
  }

  public hasCriticalDefects(): boolean {
    return (this.data?.criticalDefects || 0) > 0;
  }

  public getSuccessRateIcon(): string {
    return this.isSuccessRateGood() ? 'trending_up' : 'trending_down';
  }

  public getDefectDensityIcon(): string {
    return this.isDefectDensityHigh() ? 'warning' : 'check_circle';
  }

  public getCriticalDefectsIcon(): string {
    return this.hasCriticalDefects() ? 'error' : 'check_circle';
  }

  public getSuccessRateStatus(): string {
    const rate = this.data?.executionSuccessRate || 0;
    if (rate >= 95) return 'Excellent';
    if (rate >= 90) return 'Good';
    if (rate >= 80) return 'Fair';
    return 'Needs Improvement';
  }

  public getDefectDensityStatus(): string {
    const density = this.data?.defectDensity || 0;
    if (density <= 0.2) return 'Excellent';
    if (density <= 0.5) return 'Good';
    if (density <= 1.0) return 'Fair';
    return 'High';
  }

  public getCriticalDefectsStatus(): string {
    const count = this.data?.criticalDefects || 0;
    if (count === 0) return 'No Issues';
    if (count <= 2) return 'Low';
    if (count <= 5) return 'Medium';
    return 'High';
  }

  public getSuccessRateDescription(): string {
    const rate = this.data?.executionSuccessRate || 0;
    if (rate >= 95) {
      return 'Excellent test execution with very high pass rate. Keep maintaining the quality standards.';
    }
    if (rate >= 90) {
      return 'Good test execution rate. Minor improvements could help achieve excellence.';
    }
    if (rate >= 80) {
      return 'Fair pass rate. Consider investigating common failure patterns and implementing fixes.';
    }
    return 'Test execution needs attention. Review test cases and implementation for potential issues.';
  }

  public getDefectDensityDescription(): string {
    const density = this.data?.defectDensity || 0;
    if (density <= 0.2) {
      return 'Very low defect density indicating high quality code and effective testing processes.';
    }
    if (density <= 0.5) {
      return 'Acceptable defect density. Continue monitoring for any increasing trends.';
    }
    if (density <= 1.0) {
      return 'Moderate defect density. Consider reviewing quality processes and test coverage.';
    }
    return 'High defect density. Immediate attention needed to improve code quality and testing.';
  }

  public getCriticalDefectsDescription(): string {
    const count = this.data?.criticalDefects || 0;
    if (count === 0) {
      return 'No critical defects. Product is stable and performing well.';
    }
    if (count <= 2) {
      return 'Low number of critical defects. Prioritize resolution to maintain stability.';
    }
    if (count <= 5) {
      return 'Moderate number of critical defects. Immediate attention required to prevent issues.';
    }
    return 'High number of critical defects. Urgent action needed to address quality concerns.';
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