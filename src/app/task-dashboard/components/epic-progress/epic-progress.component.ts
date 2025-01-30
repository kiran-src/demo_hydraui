import { Component, Input, OnChanges, ElementRef, ViewChild, SimpleChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { select, Selection } from 'd3-selection';
import { pie, arc } from 'd3-shape';
// import { EpicProgressData } from '../models/dashboard-data.types';
import { EpicProgressData } from '../../models/dashboard-data.types';

type D3Selection = Selection<any, unknown, null, undefined>;

@Component({
  selector: 'app-epic-progress',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    <div class="epic-progress-container">
    <div class="header">
      <h2>Epic Progress</h2>
      <div class="metrics">
        <div class="metric">
          <span class="label">Total Epics</span>
          <span class="value">{{ data.total || 0 }}</span>
        </div>
        <div class="metric">
          <span class="label">In Progress</span>
          <span class="value">{{ data.inProgress || 0 }}</span>
        </div>
        <div class="metric">
          <span class="label">Completed</span>
          <span class="value">{{ data.completed || 0 }}</span>
        </div>
        <div class="metric completion">
          <span class="label">Completion Rate</span>
          <span class="value">{{ data.completion || 0 }}%</span>
        </div>
      </div>
    </div>

      <div class="content">
        <div class="chart-section">
          <div #chartContainer class="chart"></div>
          <div class="chart-legend">
            <div class="legend-item">
              <span class="color-dot completed"></span>
              <span>Completed</span>
            </div>
            <div class="legend-item">
              <span class="color-dot in-progress"></span>
              <span>In Progress</span>
            </div>
            <div class="legend-item">
              <span class="color-dot remaining"></span>
              <span>Remaining</span>
            </div>
          </div>
        </div>

        <div class="epics-list">
          <div class="epic-item" *ngFor="let epic of data?.epics">
            <div class="epic-info">
              <div class="epic-header">
                <span class="epic-title">{{ epic.title }}</span>
                <span class="epic-status" [class]="epic.status.toLowerCase()">
                  {{ formatStatus(epic.status) }}
                </span>
              </div>
              <div class="epic-progress">
                <div class="progress-bar">
                  <div class="progress" 
                       [style.width.%]="epic.progress"
                       [style.background-color]="getProgressColor(epic.progress)">
                  </div>
                </div>
                <span class="progress-text">{{ epic.progress }}%</span>
              </div>
              <div class="epic-metrics">
                <span class="metric">
                  <mat-icon>task</mat-icon>
                  {{ epic.completedTasks }}/{{ epic.totalTasks }} tasks
                </span>
                <span class="metric">
                  <mat-icon>calendar_today</mat-icon>
                  {{ formatDate(epic.startDate) }} - {{ formatDate(epic.endDate) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .epic-progress-container {
  height: 100%;
  padding: 16px;
  background: #ffffff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  color: #333333;

  .header {
    margin-bottom: 24px;

    h2 {
      margin: 0 0 16px;
      font-size: 20px;
      font-weight: 500;
      color: #333333;
    }

    .metrics {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;

      .metric {
        background: #f8f9fa;
        padding: 12px;
        border-radius: 8px;
        text-align: center;

        &.completion {
          background: rgba(25, 118, 210, 0.1);
        }

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

  .content {
    flex: 1;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 24px;
    min-height: 0;

    .chart-section {
      width: 240px;
      display: flex;
      flex-direction: column;
      gap: 16px;

      .chart {
        width: 100%;
        height: 240px;
        position: relative;
      }

      .chart-legend {
        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
          color: #666666;

          .color-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;

            &.completed { background: #4CAF50; }
            &.in-progress { background: #2196F3; }
            &.remaining { background: #9E9E9E; }
          }
        }
      }
    }

    .epics-list {
      overflow-y: auto;
      padding-right: 8px;

      .epic-item {
        background: #f8f9fa;
        border-radius: 8px;
        padding: 16px;
        margin-bottom: 8px;

        .epic-info {
          .epic-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;

            .epic-title {
              font-weight: 500;
              color: #333333;
            }

            .epic-status {
              padding: 4px 8px;
              border-radius: 4px;
              font-size: 12px;

              &.completed { background: rgba(76, 175, 80, 0.1); color: #2e7d32; }
              &.in_progress { background: rgba(33, 150, 243, 0.1); color: #1976d2; }
              &.blocked { background: rgba(244, 67, 54, 0.1); color: #d32f2f; }
              &.planned { background: rgba(158, 158, 158, 0.1); color: #616161; }
            }
          }

          .epic-progress {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 12px;

            .progress-bar {
              flex: 1;
              height: 4px;
              background: rgba(0, 0, 0, 0.1);
              border-radius: 2px;
              overflow: hidden;

              .progress {
                height: 100%;
                transition: width 0.3s ease;
              }
            }

            .progress-text {
              font-size: 14px;
              min-width: 48px;
              text-align: right;
              color: #333333;
            }
          }

          .epic-metrics {
            display: flex;
            gap: 16px;

            .metric {
              display: flex;
              align-items: center;
              gap: 4px;
              font-size: 12px;
              color: #666666;

              mat-icon {
                font-size: 16px;
                width: 16px;
                height: 16px;
                color: #666666;
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
export class EpicProgressComponent implements OnChanges, OnDestroy {
  @Input() data: EpicProgressData = {
    total: 0,
    completed: 0,
    inProgress: 0,
    completion: 0,
    epics: []
  };
  @ViewChild('chartContainer', { static: true }) private chartContainer!: ElementRef;

  private svg!: D3Selection;
  private chart!: D3Selection;
  private tooltip!: D3Selection;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.initializeChart();
      this.updateChart();
    }
  }

  private initializeChart(): void {
    const element = this.chartContainer.nativeElement;
    select(element).selectAll('*').remove();

    const containerRect = element.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;

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
    const radius = Math.min(
      this.chartContainer.nativeElement.clientWidth,
      this.chartContainer.nativeElement.clientHeight
    ) / 2 * 0.8;

    const pieData = [
      { name: 'Completed', value: this.data.completed },
      { name: 'In Progress', value: this.data.inProgress },
      { name: 'Remaining', value: this.data.total - this.data.completed - this.data.inProgress }
    ].filter(d => d.value > 0);

    const arcGenerator = arc<any>()
      .innerRadius(radius * 0.75)
      .outerRadius(radius);

    const pieGenerator = pie<any>()
      .value(d => d.value)
      .sort(null);

    // Generate the pie chart
    const arcs = this.chart.selectAll('.arc')
      .data(pieGenerator(pieData))
      .enter()
      .append('g')
      .attr('class', 'arc');

    // Add the paths (slices)
    arcs.append('path')
      .attr('d', arcGenerator)
      .attr('fill', d => this.getChartColor(d.data.name))
      .style('stroke', '#2d2d2d')
      .style('stroke-width', '2px')
      .style('transition', 'opacity 0.3s')
      .on('mouseover', (event: MouseEvent, d: any) => {
        select(event.currentTarget as Element)
          .style('opacity', 0.8);
        this.showTooltip(event, d);
      })
      .on('mouseout', (event: MouseEvent) => {
        select(event.currentTarget as Element)
          .style('opacity', 1);
        this.hideTooltip();
      });

    // Add center text
    const centerText = this.chart.append('g')
      .attr('class', 'center-text')
      .attr('text-anchor', 'middle');

    centerText.append('text')
      .attr('dy', '-0.2em')
      .style('font-size', '24px')
      .style('font-weight', '500')
      .style('fill', '#ffffff')
      .text(`${Math.round(this.data.completion)}%`);

    centerText.append('text')
      .attr('dy', '1.2em')
      .style('font-size', '14px')
      .style('fill', 'rgba(255, 255, 255, 0.6)')
      .text('Complete');
  }

  private getChartColor(name: string): string {
    switch (name.toLowerCase()) {
      case 'completed':
        return '#4CAF50';
      case 'in progress':
        return '#2196F3';
      default:
        return '#757575';
    }
  }

  private showTooltip(event: MouseEvent, d: any): void {
    const percentage = (d.data.value / this.data.total) * 100;
    const content = `
      <div>
        <strong>${d.data.name}</strong>
        <div>${d.data.value} epics</div>
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

  public formatStatus(status: string): string {
    return status
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  public getProgressColor(progress: number): string {
    if (progress >= 75) return '#4CAF50';
    if (progress >= 50) return '#FFC107';
    return '#F44336';
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