import { Component, Input, OnChanges, ElementRef, ViewChild, SimpleChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { select, Selection } from 'd3-selection';
import { pie, arc } from 'd3-shape';
import { scaleOrdinal } from 'd3-scale';
// import { TaskStatusData } from '../models/dashboard-data.types';
import { TaskStatusData } from '../../models/dashboard-data.types';

type D3Selection = Selection<any, unknown, null, undefined>;

@Component({
  selector: 'app-task-distribution',
  standalone: true,
  imports: [CommonModule, MatButtonToggleModule, MatIconModule, FormsModule],
  template: `
    <div class="task-distribution-container">
      <div class="header">
        <div class="title-section">
          <h2>Task Distribution</h2>
          <div class="metrics">
            <span class="metric">
              <span class="label">Total Tasks</span>
              <span class="value">{{ getTotalTasks() }}</span>
            </span>
            <span class="metric">
              <span class="label">Completion Rate</span>
              <span class="value">{{ getCompletionRate() }}%</span>
            </span>
          </div>
        </div>
        <mat-button-toggle-group [(ngModel)]="selectedView" (change)="onViewChange()">
          <mat-button-toggle value="status">
            <mat-icon>pie_chart</mat-icon>
            Status
          </mat-button-toggle>
          <mat-button-toggle value="priority">
            <mat-icon>bar_chart</mat-icon>
            Priority
          </mat-button-toggle>
          <mat-button-toggle value="assignee">
            <mat-icon>people</mat-icon>
            Assignee
          </mat-button-toggle>
        </mat-button-toggle-group>
      </div>

      <div class="content">
        <div #chartContainer class="chart-container">
          <!-- D3 chart will be rendered here -->
        </div>

        <div class="metrics-grid">
          <ng-container [ngSwitch]="selectedView">
            <!-- Status View -->
            <ng-container *ngSwitchCase="'status'">
              <div class="metric-item" *ngFor="let item of getStatusMetrics()">
                <div class="metric-header">
                  <span class="label">{{ formatLabel(item.name) }}</span>
                  <span class="value">{{ item.value }}</span>
                </div>
                <div class="progress-bar">
                  <div class="progress"
                       [style.width.%]="getPercentage(item.value)"
                       [style.background-color]="getStatusColor(item.name)">
                  </div>
                </div>
              </div>
            </ng-container>

            <!-- Priority View -->
            <ng-container *ngSwitchCase="'priority'">
              <div class="metric-item" *ngFor="let item of getPriorityMetrics()">
                <div class="metric-header">
                  <span class="label">{{ formatLabel(item.name) }}</span>
                  <span class="value">{{ item.value }}</span>
                </div>
                <div class="progress-bar">
                  <div class="progress"
                       [style.width.%]="getPercentage(item.value)"
                       [style.background-color]="getPriorityColor(item.name)">
                  </div>
                </div>
              </div>
            </ng-container>

            <!-- Assignee View -->
            <ng-container *ngSwitchCase="'assignee'">
              <div class="metric-item" *ngFor="let item of getAssigneeMetrics()">
                <div class="metric-header">
                  <span class="label">{{ item.name || 'Unassigned' }}</span>
                  <span class="value">{{ item.value }}</span>
                </div>
                <div class="progress-bar">
                  <div class="progress"
                       [style.width.%]="getPercentage(item.value)"
                       [style.background-color]="'#2196F3'">
                  </div>
                </div>
              </div>
            </ng-container>
          </ng-container>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .task-distribution-container {
  height: 100%;
  padding: 16px;
  background: #ffffff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  color: #333333;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
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

        .metric {
          .label {
            display: block;
            font-size: 12px;
            color: #666666;
            margin-bottom: 4px;
          }

          .value {
            font-size: 16px;
            font-weight: 500;
            color: #333333;
          }
        }
      }
    }

    ::ng-deep .mat-button-toggle-group {
      background: #f8f9fa;
      border: none;
      border-radius: 8px;
      overflow: hidden;

      .mat-button-toggle {
        background: transparent;
        color: #666666;
        border: none;

        &.mat-button-toggle-checked {
          background: #2196F3;
          color: #ffffff;
        }

        .mat-button-toggle-label-content {
          line-height: 36px;
          padding: 0 16px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        mat-icon {
          font-size: 18px;
          width: 18px;
          height: 18px;
        }
      }
    }
  }

  .content {
    display: flex;
    gap: 24px;
    height: calc(100% - 80px);

    .chart-container {
      flex: 1;
      min-height: 300px;
      max-width: 50%;
      background: #f8f9fa;
      border-radius: 8px;
      padding: 24px;
      position: relative;
    }

    .metrics-grid {
      width: 300px;
      overflow-y: auto;
      padding-right: 8px;

      .metric-item {
        background: #f8f9fa;
        border-radius: 8px;
        padding: 12px;
        margin-bottom: 8px;

        .metric-header {
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

  // Status colors
  .status-color {
    &.done, &.completed { background: #4CAF50; }
    &.in_progress { background: #2196F3; }
    &.blocked { background: #F44336; }
    &.to_do { background: #FFC107; }
  }

  // Priority colors
  .priority-color {
    &.high { background: #F44336; }
    &.medium { background: #FFC107; }
    &.low { background: #4CAF50; }
  }

  // Chart colors
  ::ng-deep {
    .arc path {
      stroke: #ffffff;
      stroke-width: 2px;
    }

    .arc text {
      fill: #ffffff;
      font-weight: 500;
    }

    .tooltip {
      background: rgba(255, 255, 255, 0.95);
      border: 1px solid #e0e0e0;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      color: #333333;
    }
  }
}
  `]
})
export class TaskDistributionComponent implements OnChanges, OnDestroy {
  @Input() data: TaskStatusData = {
    status: [],
    priority: {},
    assignee: {},
    statusDistribution: [],
    priorityDistribution: {},
    assigneeDistribution: {}
  };
  @ViewChild('chartContainer', { static: true }) private chartContainer!: ElementRef;

  selectedView: 'status' | 'priority' | 'assignee' = 'status';
  private svg!: D3Selection;
  private chart!: D3Selection;
  private tooltip!: D3Selection;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.initializeChart();
      this.updateChart();
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
      .attr('transform', `translate(${width / 2},${height / 2})`);

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

  private updateChart(): void {
  const data = this.getCurrentData();
  if (!data.length) return;

  // Get container dimensions
  const element = this.chartContainer.nativeElement;
  const width = element.clientWidth;
  const height = 300; // Fixed height for better visibility

  // Clear previous SVG
  select(element).selectAll('svg').remove();

  // Create new SVG with fixed dimensions
  this.svg = select(element)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${width / 2},${height / 2})`);

  // Calculate radius
  const radius = Math.min(width, height) / 3;

  const arcGenerator = arc<any>()
    .innerRadius(radius * 0.6)
    .outerRadius(radius);

  const pieGenerator = pie<any>()
    .value(d => d.value)
    .sort(null);

  // Create pie chart
  const arcs = this.svg.selectAll('.arc')
    .data(pieGenerator(data))
    .enter()
    .append('g')
    .attr('class', 'arc');

  // Add slices
  arcs.append('path')
    .attr('d', arcGenerator)
    .attr('fill', d => this.getColorForView(d.data.name))
    .style('stroke', '#2d2d2d')
    .style('stroke-width', '2px')
    .style('transition', 'opacity 0.3s')
    .on('mouseover', (event: MouseEvent, d: any) => {
      select(event.currentTarget as Element)
        .style('opacity', 0.8)
        .style('cursor', 'pointer');
      this.showTooltip(event, d);
    })
    .on('mouseout', (event: MouseEvent) => {
      select(event.currentTarget as Element)
        .style('opacity', 1);
      this.hideTooltip();
    });

  // Add labels
  arcs.append('text')
    .attr('transform', d => `translate(${arcGenerator.centroid(d)})`)
    .attr('dy', '.35em')
    .style('text-anchor', 'middle')
    .style('fill', '#ffffff')
    .style('font-size', '14px')
    .style('font-weight', 'bold')
    .text(d => {
      const percentage = this.getPercentage(d.data.value);
      return percentage > 5 ? `${Math.round(percentage)}%` : '';
    });
}

  public getStatusMetrics(): Array<{name: string; value: number}> {
    return this.data?.statusDistribution?.map(item => ({
      name: item.status,
      value: item.count
    })) || [];
  }

  public getPriorityMetrics(): Array<{name: string; value: number}> {
    return Object.entries(this.data?.priority || {}).map(([key, value]) => ({
      name: key,
      value: value
    }));
  }

  public getAssigneeMetrics(): Array<{name: string; value: number}> {
    return Object.entries(this.data?.assignee || {})
      .map(([key, value]) => ({
        name: key || 'Unassigned',
        value: value
      }))
      .sort((a, b) => b.value - a.value);
  }

  public getTotalTasks(): number {
    return this.data?.metrics?.total || 0;
  }

  public getCompletedTasks(): number {
    return this.data?.metrics?.completed || 0;
  }
  
  public getInProgressTasks(): number {
    return this.data?.metrics?.inProgress || 0;
  }


  public getCompletionRate(): number {
    const total = this.getTotalTasks();
    const completed = this.getCompletedTasks();
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  }

  public getPercentage(value: number): number {
    const total = this.getTotalValueForCurrentView();
    return total ? (value / total) * 100 : 0;
  }

  private getTotalValueForCurrentView(): number {
    const data = this.getCurrentData();
    return data.reduce((sum, item) => sum + item.value, 0);
  }
  private getCurrentData(): Array<{name: string; value: number}> {
    switch (this.selectedView) {
      case 'status':
        return this.getStatusMetrics();
      case 'priority':
        return Object.entries(this.data?.priorityDistribution || {}).map(([key, value]) => ({
          name: key,
          value
        }));
      case 'assignee':
        return Object.entries(this.data?.assigneeDistribution || {}).map(([key, value]) => ({
          name: key || 'Unassigned',
          value
        }));
    }
  }

  private getColorForView(name: string): string {
    switch (this.selectedView) {
      case 'status':
        return this.getStatusColor(name);
      case 'priority':
        return this.getPriorityColor(name);
      case 'assignee':
        return '#2196F3';
    }
  }

  public getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'done':
      case 'completed':
        return '#4CAF50';
      case 'in_progress':
        return '#2196F3';
      case 'blocked':
        return '#F44336';
      case 'to_do':
      case 'todo':
        return '#FFC107';
      default:
        return '#757575';
    }
  }

  public getPriorityColor(priority: string): string {
    switch (priority.toLowerCase()) {
      case 'high':
        return '#F44336';
      case 'medium':
        return '#FFC107';
      case 'low':
        return '#4CAF50';
      default:
        return '#757575';
    }
  }

  public formatLabel(label: string): string {
    if (!label) return 'Unknown';
    return label
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  private showTooltip(event: MouseEvent, d: any): void {
    const percentage = this.getPercentage(d.data.value);
    const content = `
      <div>
        <strong>${this.formatLabel(d.data.name)}</strong>
        <div>${d.data.value} tasks</div>
        <div>${percentage.toFixed(1)}%</div>
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

  public onViewChange(): void {
    this.updateChart();
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