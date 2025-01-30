import { Component, Input, OnChanges, ElementRef, ViewChild, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { select, Selection } from 'd3-selection';
import { scaleLinear, scaleTime, scaleBand } from 'd3-scale';
import { line, curveMonotoneX } from 'd3-shape';
import { axisBottom, axisLeft } from 'd3-axis';
// import { TeamPerformanceData } from '../models/dashboard-data.types';

import { SprintVelocityPoint, TeamPerformanceData } from '../../models/dashboard-data.types';

type D3Scale = any;  
interface D3Point {
  sprint: string;
  velocity: number;
  total: number;
  completed: number;
}

type D3Selection = Selection<any, unknown, null, undefined>;

@Component({
  selector: 'app-team-velocity',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="team-velocity-container">
      <div class="header">
        <div class="title-section">
          <h2>Team Velocity</h2>
          <div class="metrics">
            <div class="metric">
              <span class="label">Current Velocity</span>
              <span class="value">{{ data.velocity.current || 0 }} points</span>
              </div>
            <div class="metric">
              <span class="label">Average Velocity</span>
              <span class="value">{{ data.velocity.average || 0 }} points</span>
              </div>
            <div class="metric">
              <span class="label">Velocity Trend</span>
              <span class="value trend" [class.positive]="data.velocity.trend >= 0">
                <mat-icon>{{ getTrendIcon(data.velocity.trend || 0) }}</mat-icon>
                {{ formatTrend(data.velocity.trend || 0) }}
              </span>
            </div>
            <div class="metric">
              <span class="label">Completion Rate</span>
              <span class="value">{{ data.sprintCompletion.rate || 0 }}%</span>
            </div>
          </div>
        </div>
      </div>

      <div class="content">
        <div class="chart-section">
          <div #chartContainer class="chart-container">
            <!-- D3 chart will be rendered here -->
          </div>
        </div>

        <div class="task-distribution">
          <h3>Task Distribution</h3>
          <div class="distribution-grid">
            <div class="distribution-item" *ngFor="let item of getTaskDistributionItems()">
              <div class="distribution-header">
                <span class="label">{{ formatLabel(item.key) }}</span>
                <span class="value">{{ item.value }}</span>
              </div>
              <div class="progress-bar">
                <div class="progress"
                     [style.width.%]="getDistributionPercentage(item.value)"
                     [style.background-color]="getTaskColor(item.key)">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .team-velocity-container {
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

      .metrics {
        display: flex;
        gap: 24px;
        flex-wrap: wrap;

        .metric {
          .label {
            display: block;
            font-size: 12px;
            color: #666666;
            margin-bottom: 4px;
          }

          .value {
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 18px;
            font-weight: 500;
            color: #333333;

            &.trend {
              &.positive {
                color: #2e7d32;
              }

              &:not(.positive) {
                color: #d32f2f;
              }

              mat-icon {
                font-size: 18px;
                width: 18px;
                height: 18px;
              }
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

    .chart-section {
      .chart-container {
        height: 300px;
        background: #f8f9fa;
        border-radius: 8px;
        padding: 16px;
        position: relative;

        // Chart specific styles
        ::ng-deep {
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

          .velocity-line {
            stroke: #2196F3;
          }

          .data-point {
            fill: #2196F3;
            stroke: #ffffff;
          }
        }
      }
    }

    .task-distribution {
      h3 {
        margin: 0 0 16px;
        font-size: 16px;
        font-weight: 500;
        color: #333333;
      }

      .distribution-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;

        .distribution-item {
          background: #f8f9fa;
          padding: 12px;
          border-radius: 8px;

          .distribution-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;

            .label {
              font-size: 14px;
              color: #333333;
            }

            .value {
              font-weight: 500;
              color: #333333;
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
            }
          }
        }
      }
    }
  }

  // Tooltip styles
  ::ng-deep .tooltip {
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid #e0e0e0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    color: #333333;
    padding: 8px;
    border-radius: 4px;
    font-size: 12px;
  }
}
  `]
})
export class TeamVelocityComponent implements OnChanges {

  @Input() data: TeamPerformanceData = {
    velocity: {
      current: 0,
      average: 0,
      trend: 0
    },
    sprintCompletion: {
      rate: 0,
      trend: 0
    },
    taskDistribution: {},
    velocityTrend: []
  };
  @ViewChild('chartContainer', { static: true }) private chartContainer!: ElementRef;

  private svg!: D3Selection;
  private chart!: D3Selection;
  private tooltip!: D3Selection;
  private margin = { top: 20, right: 30, bottom: 30, left: 50 };

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
    if (!this.data?.velocityTrend?.length) return;
  
    const element = this.chartContainer.nativeElement;
    const width = element.clientWidth - this.margin.left - this.margin.right;
    const height = element.clientHeight - this.margin.top - this.margin.bottom;
  
    // Create scales
    const x = scaleTime()
      .range([0, width])
      .domain([
        new Date(this.data.velocityTrend[0].sprint),
        new Date(this.data.velocityTrend[this.data.velocityTrend.length - 1].sprint)
      ]);
  
    const y = scaleLinear()
      .range([height, 0])
      .domain([0, Math.max(...this.data.velocityTrend.map((d: SprintVelocityPoint) => 
        Math.max(d.velocity, d.total))) * 1.1])
      .nice();
  
    // Add gridlines
    this.addGridlines(x, y, width, height);
  
    // Add axes
    this.addAxes(x, y, height);
  
    // Add velocity line
    this.addVelocityLine(x, y);
  
    // Add average line
    this.addAverageLine(y, width);
  
    // Add velocity points
    this.addDataPoints(x, y);
  }

  private addGridlines(x: D3Scale, y: D3Scale, width: number, height: number): void {
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
      .style('fill', 'rgba(255, 255, 255, 0.6)')
      .style('font-size', '12px');

    // Add Y axis
    this.chart.append('g')
      .call(axisLeft(y))
      .selectAll('text')
      .style('fill', 'rgba(255, 255, 255, 0.6)')
      .style('font-size', '12px');
  }

  private addVelocityLine(x: D3Scale, y: D3Scale): void {
    const lineGenerator = line<SprintVelocityPoint>()
      .x(d => x(new Date(d.sprint)))
      .y(d => y(d.velocity))
      .curve(curveMonotoneX);
  
    this.chart.append('path')
      .datum(this.data.velocityTrend)
      .attr('class', 'velocity-line')
      .attr('fill', 'none')
      .attr('stroke', '#2196F3')
      .attr('stroke-width', 2)
      .attr('d', lineGenerator);
  }

  private addAverageLine(y: any, width: number): void {
    if (!this.data.velocity?.average) return;

    const averageY = y(this.data.velocity.average);

    this.chart.append('line')
      .attr('x1', 0)
      .attr('x2', width)
      .attr('y1', averageY)
      .attr('y2', averageY)
      .attr('stroke', '#FFC107')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '4,4');

    this.chart.append('text')
      .attr('x', width)
      .attr('y', averageY - 5)
      .attr('text-anchor', 'end')
      .style('fill', '#FFC107')
      .style('font-size', '12px')
      .text(`Average (${this.data.velocity.average} pts)`);
  }

  private addDataPoints(x: D3Scale, y: D3Scale): void {
    this.chart.selectAll('.data-point')
      .data<SprintVelocityPoint>(this.data.velocityTrend)
      .enter()
      .append('circle')
      .attr('class', 'data-point')
      .attr('cx', d => x(new Date(d.sprint)))
      .attr('cy', d => y(d.velocity))
      .attr('r', 4)
      .attr('fill', '#2196F3')
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 2)
      .on('mouseover', (event: MouseEvent, d: SprintVelocityPoint) => {
        select(event.currentTarget as Element).attr('r', 6);
        this.showTooltip(event, d);
      })
      .on('mouseout', (event: MouseEvent) => {
        select(event.currentTarget as Element).attr('r', 4);
        this.hideTooltip();
      });
  }

  private showTooltip(event: MouseEvent, d: SprintVelocityPoint): void {
    const content = `
      <div>
        <strong>${new Date(d.sprint).toLocaleDateString()}</strong>
        <div>Velocity: ${d.velocity} points</div>
        <div>Completed: ${d.completed} tasks</div>
        <div>Total: ${d.total} tasks</div>
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
  public getTrendIcon(trend: number): string {
    if (trend > 0) return 'trending_up';
    if (trend < 0) return 'trending_down';
    return 'trending_flat';
  }

  public formatTrend(trend: number): string {
    const sign = trend > 0 ? '+' : '';
    return `${sign}${trend.toFixed(1)}%`;
  }

  public getTaskDistributionItems(): Array<{key: string; value: number}> {
    if (!this.data?.taskDistribution) return [];
    
    const entries = Object.entries(this.data.taskDistribution);
    const items = entries.map(([key, value]) => ({
      key,
      value: Number(value)
    }));
    
    return items.sort((a, b) => b.value - a.value);
  }
  
  

  public getDistributionPercentage(value: number): number {
    if (!this.data?.taskDistribution) return 0;
    
    const values = Object.values(this.data.taskDistribution);
    const total = values.reduce((sum: number, val: number) => sum + Number(val), 0);
    
    return total ? (Number(value) / total) * 100 : 0;
  }

  // Continuing the TeamVelocityComponent...
    
  public getTaskColor(type: string): string {
    const colors: Record<string, string> = {
        story: '#2196F3',
        bug: '#F44336',
        task: '#4CAF50',
        improvement: '#FFC107',
        technical: '#9C27B0'
    };
    return colors[type.toLowerCase()] || '#757575';
}

public formatLabel(label: string): string {
    if (!label) return 'Unknown';
    return label
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

// Performance calculation methods
private calculateVelocityTrend(data: SprintVelocityPoint[]): number {
    if (data.length < 2) return 0;
  
    const recentSprints = data.slice(-3); // Last 3 sprints
    const initialVelocity = recentSprints[0].velocity;
    const currentVelocity = recentSprints[recentSprints.length - 1].velocity;
  
    return ((currentVelocity - initialVelocity) / initialVelocity) * 100;
  }

private calculateStoryPointAccuracy(data: any[]): number {
    if (data.length === 0) return 0;

    const accuracies = data.map(sprint => {
        const committed = sprint.total;
        const completed = sprint.completed;
        return committed > 0 ? (completed / committed) * 100 : 0;
    });

    return accuracies.reduce((sum, acc) => sum + acc, 0) / accuracies.length;
}

private calculatePredictedVelocity(): number {
    if (!this.data?.velocityTrend || this.data.velocityTrend.length < 3) {
      return this.data?.velocity?.current || 0;
    }
  
    const weights = [0.5, 0.3, 0.2];
    const recentSprints = this.data.velocityTrend.slice(-3).reverse();
  
    return recentSprints.reduce(
      (sum: number, sprint: SprintVelocityPoint, index: number) => 
        sum + (sprint.velocity * weights[index]), 
      0
    );
  }

private calculateSprintCapacity(currentVelocity: number, trend: number): number {
    // Adjust capacity based on trend and current velocity
    const trendFactor = 1 + (trend / 100);
    return Math.round(currentVelocity * trendFactor);
}

private getHealthIndicators(): Record<string, { status: string; value: number }> {
    return {
        velocityStability: {
            status: this.getVelocityStabilityStatus(),
            value: this.calculateVelocityStability()
        },
        sprintCompletion: {
            status: this.getCompletionStatus(),
            value: this.data?.sprintCompletion?.rate || 0
        },
        predictability: {
            status: this.getPredictabilityStatus(),
            value: this.calculatePredictability()
        }
    };
}

private getVelocityStabilityStatus(): string {
    const stability = this.calculateVelocityStability();
    if (stability >= 90) return 'excellent';
    if (stability >= 75) return 'good';
    if (stability >= 60) return 'fair';
    return 'needs_improvement';
}

private calculateVelocityStability(): number {
    if (!this.data?.velocityTrend || this.data.velocityTrend.length < 3) {
      return 0;
    }
  
    const velocities = this.data.velocityTrend.map((sprint: SprintVelocityPoint) => sprint.velocity);
    const average = velocities.reduce((sum: number, val: number) => sum + val, 0) / velocities.length;
    
    const deviations = velocities.map((val: number) => Math.abs(val - average));
    const averageDeviation = deviations.reduce((sum: number, dev: number) => sum + dev, 0) / deviations.length;
  
    return Math.max(0, 100 - (averageDeviation / average * 100));
  }
  

private getCompletionStatus(): string {
    const rate = this.data?.sprintCompletion?.rate || 0;
    if (rate >= 90) return 'excellent';
    if (rate >= 75) return 'good';
    if (rate >= 60) return 'fair';
    return 'needs_improvement';
}

private calculatePredictability(): number {
    if (!this.data?.velocityTrend || this.data.velocityTrend.length < 3) {
      return 0;
    }
  
    const predictions = this.data.velocityTrend.slice(0, -1).map((sprint: SprintVelocityPoint, index: number) => {
      const nextSprint = this.data.velocityTrend[index + 1];
      const prediction = sprint.velocity;
      const actual = nextSprint.velocity;
      return Math.abs(1 - (actual / prediction));
    });
  
    const averageDeviation = predictions.reduce((sum: number, dev: number) => sum + dev, 0) / predictions.length;
    return Math.max(0, 100 - (averageDeviation * 100));
  }
  

private getPredictabilityStatus(): string {
    const predictability = this.calculatePredictability();
    if (predictability >= 90) return 'excellent';
    if (predictability >= 75) return 'good';
    if (predictability >= 60) return 'fair';
    return 'needs_improvement';
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