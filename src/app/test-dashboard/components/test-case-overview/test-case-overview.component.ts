import { Component, Input, OnChanges, ElementRef, ViewChild, SimpleChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { select, Selection } from 'd3-selection';
import { pie, arc } from 'd3-shape';
import { scaleOrdinal } from 'd3-scale';

interface TestCaseStatus {
  status: string;
  count: number;
}

type StatusType = 'PASSED' | 'FAILED' | 'BLOCKED' | 'NOT_EXECUTED';
type PriorityType = 'HIGH' | 'MEDIUM' | 'LOW';
type ViewType = 'status' | 'priority' | 'automation';

interface ColorSchemes {
  status: Record<StatusType, string>;
  priority: Record<PriorityType, string>;
}

interface ChartDataPoint {
  name: string;
  value: number;
}

interface TestCaseOverviewData {
  statusDistribution: TestCaseStatus[];
  priorityDistribution: Record<string, number>;
  automationStats: {
    total: number;
    automated: number;
    automationRate: number;
  };
}


@Component({
  selector: 'app-test-case-overview',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonToggleModule,
    MatIconModule,
    FormsModule
  ],
  template: `
    <div class="test-case-overview-container">
      <div class="header">
        <div class="title-section">
          <h2>Test Case Overview</h2>
          <div class="view-controls">
            <mat-button-toggle-group [(ngModel)]="selectedView" (change)="onViewChange()">
              <mat-button-toggle value="status">
                <mat-icon>pie_chart</mat-icon>
                Status
              </mat-button-toggle>
              <mat-button-toggle value="priority">
                <mat-icon>bar_chart</mat-icon>
                Priority
              </mat-button-toggle>
              <mat-button-toggle value="automation">
                <mat-icon>smart_toy</mat-icon>
                Automation
              </mat-button-toggle>
            </mat-button-toggle-group>
          </div>
        </div>
        <div class="metrics">
          <div class="metric">
            <span class="label">Total Test Cases</span>
            <span class="value">{{ data?.automationStats?.total || 0 }}</span>
          </div>
          <div class="metric">
            <span class="label">Automated Tests</span>
            <span class="value">{{ data?.automationStats?.automated || 0 }}</span>
          </div>
          <div class="metric">
            <span class="label">Automation Coverage</span>
            <span class="value">{{ data?.automationStats?.automationRate || 0 }}%</span>
          </div>
        </div>
      </div>

      <div class="content">
        <div class="chart-section">
          <div #chartContainer class="chart-container">
            <!-- D3 chart will be rendered here -->
          </div>
          <div class="chart-legend" *ngIf="selectedView !== 'automation'">
            <div class="legend-item" *ngFor="let item of getLegendItems()">
              <span class="color-dot" [style.background-color]="item.color"></span>
              <span class="label">{{ formatLabel(item.label) }}</span>
              <span class="value">{{ item.value }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .test-case-overview-container {
      height: 100%;
      padding: 16px;
      background: #ffffff;
      border-radius: 8px;
      display: flex;
      flex-direction: column;

      .header {
        margin-bottom: 24px;

        .title-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;

          h2 {
            margin: 0;
            font-size: 20px;
            font-weight: 500;
            color: #333333;
          }

          ::ng-deep .mat-button-toggle-group {
            border: none;
            border-radius: 8px;
            background: #f8f9fa;

            .mat-button-toggle {
              background: transparent;
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
            }
          }
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

      .content {
        flex: 1;
        display: grid;
        grid-template-columns: 1fr;
        gap: 24px;
        min-height: 0;

        .chart-section {
          display: flex;
          flex-direction: column;
          gap: 16px;

          .chart-container {
            flex: 1;
            min-height: 300px;
            background: #f8f9fa;
            border-radius: 8px;
            padding: 16px;
            position: relative;
          }

          .chart-legend {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 12px;

            .legend-item {
              display: flex;
              align-items: center;
              gap: 8px;

              .color-dot {
                width: 12px;
                height: 12px;
                border-radius: 50%;
              }

              .label {
                flex: 1;
                font-size: 14px;
                color: #666666;
              }

              .value {
                font-weight: 500;
                color: #333333;
              }
            }
          }
        }
      }
    }
  `]
})
export class TestCaseOverviewComponent implements OnChanges, OnDestroy {
  @Input() data?: TestCaseOverviewData;
  @ViewChild('chartContainer', { static: true }) private chartContainer!: ElementRef;

  selectedView: 'status' | 'priority' | 'automation' = 'status';
  private svg!: Selection<any, unknown, null, undefined>;
  private chart!: Selection<any, unknown, null, undefined>;
  private tooltip!: Selection<any, unknown, null, undefined>;

  // Color schemes for different views
  private readonly colors: ColorSchemes = {
    status: {
      'PASSED': '#4CAF50',
      'FAILED': '#F44336',
      'BLOCKED': '#FFC107',
      'NOT_EXECUTED': '#9E9E9E'
    },
    priority: {
      'HIGH': '#F44336',
      'MEDIUM': '#FFC107',
      'LOW': '#4CAF50'
    }
  };

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
      .attr('transform', `translate(${width / 2},${height / 2})`);

    this.setupTooltip();
  }

  private getCurrentViewData(): ChartDataPoint[] {
    if (!this.data) return [];
  
    switch (this.selectedView) {
      case 'status':
        return (this.data.statusDistribution || []).map(item => ({
          name: item.status || 'UNKNOWN',
          value: item.count || 0
        }));
  
      case 'priority':
        return Object.entries(this.data.priorityDistribution || {}).map(([key, value]) => ({
          name: key || 'UNKNOWN',
          value: value || 0
        }));
  
      case 'automation':
        const automationStats = this.data.automationStats || { total: 0, automated: 0 };
        return [
          {
            name: 'Automated',
            value: automationStats.automated
          },
          {
            name: 'Manual',
            value: automationStats.total - automationStats.automated
          }
        ];
  
      default:
        return [];
    }
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
    if (!this.data) return;
  
    const data = this.getCurrentViewData();
    if (data.length === 0) return;
  
    const element = this.chartContainer.nativeElement;
    const width = element.clientWidth;
    const height = element.clientHeight;
    const radius = Math.min(width, height) / 2 * 0.8;
  
    // Clear previous content
    this.chart.selectAll('*').remove();
  
    const pieGenerator = pie<ChartDataPoint>()
      .value(d => d.value)
      .sort(null);
  
    const arcGenerator = arc<any>()
      .innerRadius(radius * 0.6)
      .outerRadius(radius);
  
    const arcs = this.chart
      .selectAll('.arc')
      .data(pieGenerator(data))
      .enter()
      .append('g')
      .attr('class', 'arc');
  
    arcs.append('path')
      .attr('d', arcGenerator)
      .attr('fill', d => this.getColor(d.data.name))
      .style('stroke', '#ffffff')
      .style('stroke-width', '2px')
      .on('mouseover', (event: MouseEvent, d: any) => {
        this.showTooltip(event, d);
      })
      .on('mouseout', () => {
        this.hideTooltip();
      });
  
    // Add labels if there's enough space
    arcs.append('text')
      .attr('transform', d => `translate(${arcGenerator.centroid(d)})`)
      .attr('dy', '.35em')
      .style('text-anchor', 'middle')
      .style('fill', '#ffffff')
      .style('font-size', '14px')
      .style('font-weight', 'bold')
      .text(d => {
        const total = data.reduce((sum, item) => sum + item.value, 0);
        const percentage = total > 0 ? (d.data.value / total) * 100 : 0;
        return percentage > 5 ? `${Math.round(percentage)}%` : '';
      });
  }

  private getChartData(): Array<{name: string; value: number}> {
    switch (this.selectedView) {
      case 'status':
        return (this.data?.statusDistribution || []).map(item => ({
          name: item.status,
          value: item.count
        }));
      case 'priority':
        return Object.entries(this.data?.priorityDistribution || {}).map(([key, value]) => ({
          name: key,
          value
        }));
      case 'automation':
        return [
          { name: 'Automated', value: this.data?.automationStats?.automated || 0 },
          { 
            name: 'Manual', 
            value: (this.data?.automationStats?.total || 0) - (this.data?.automationStats?.automated || 0) 
          }
        ];
      default:
        return [];
    }
  }


  private getTotalValue(): number {
    return this.getChartData().reduce((sum, item) => sum + item.value, 0);
  }

  private showTooltip(event: MouseEvent, d: any): void {
    const percentage = (d.data.value / this.getTotalValue()) * 100;
    const content = `
      <div>
        <strong>${this.formatLabel(d.data.name)}</strong>
        <div>${d.data.value} test cases</div>
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

  private getColor(name: string): string {
    if (this.selectedView === 'automation') {
      return name.toLowerCase() === 'automated' ? '#4CAF50' : '#FFC107';
    }
  
    if (this.selectedView === 'status') {
      const normalizedName = name.toUpperCase() as StatusType;
      return this.colors.status[normalizedName] || '#9E9E9E';
    }
  
    if (this.selectedView === 'priority') {
      const normalizedName = name.toUpperCase() as PriorityType;
      return this.colors.priority[normalizedName] || '#9E9E9E';
    }
  
    return '#9E9E9E';
  }

  public getLegendItems(): Array<{label: string; value: number; color: string}> {
    const data = this.getCurrentViewData();
    return data.map(item => ({
      label: item.name,
      value: item.value,
      color: this.getColor(item.name)
    }));
  }

  public formatLabel(label: string): string {
    return label
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
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