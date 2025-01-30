import { Component, Input, OnChanges, ElementRef, ViewChild, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { select, Selection } from 'd3-selection';
import { scaleLinear, scaleTime, scaleBand } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { line, area, curveMonotoneX } from 'd3-shape';
import { timeFormat } from 'd3-time-format';

interface ResourceCapacityData {
  resourceName: string;
  avgCapacity: number;
  avgAllocated: number;
  avgUtilization: number;
  capacityTrends: Array<{
    date: string;
    totalCapacity: number;
    allocatedHours: number;
    utilizationRate: number;
  }>;
}

@Component({
  selector: 'app-resource-capacity',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    <div class="resource-capacity-container">
      <div class="header">
        <h2>Resource Capacity</h2>
        <div class="metrics">
          <div class="metric">
            <span class="label">Average Capacity</span>
            <span class="value">{{ avgCapacity | number:'1.0-0' }} hrs</span>
          </div>
          <div class="metric">
            <span class="label">Average Utilization</span>
            <span class="value">{{ avgUtilization | number:'1.0-1' }}%</span>
          </div>
        </div>
      </div>

      <div class="content">
        <div #chartContainer class="chart-container"></div>
        <div class="capacity-details">
          <div class="detail-grid">
            <div class="detail-item" 
                 *ngFor="let resource of resourceDetails"
                 [class.overutilized]="resource.utilization > 100">
              <div class="resource-info">
                <span class="name">{{ resource.name }}</span>
                <div class="utilization-bar">
                  <div class="bar" 
                       [style.width.%]="resource.utilization"
                       [style.background-color]="getUtilizationColor(resource.utilization)">
                  </div>
                </div>
                <span class="percentage">{{ resource.utilization }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .resource-capacity-container {
      height: 100%;
      padding: 16px;
      background: #2d2d2d;
      border-radius: 8px;
      color: #ffffff;

      .header {
        margin-bottom: 24px;

        h2 {
          margin: 0 0 16px;
          font-size: 20px;
          font-weight: 500;
        }

        .metrics {
          display: flex;
          gap: 24px;

          .metric {
            .label {
              display: block;
              font-size: 12px;
              color: rgba(255, 255, 255, 0.6);
              margin-bottom: 4px;
            }

            .value {
              font-size: 18px;
              font-weight: 500;
            }
          }
        }
      }

      .content {
        display: grid;
        grid-template-rows: 1fr auto;
        gap: 24px;
        height: calc(100% - 100px);

        .chart-container {
          height: 100%;
          min-height: 200px;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 8px;
          padding: 16px;
        }

        .capacity-details {
          .detail-grid {
            display: grid;
            gap: 12px;

            .detail-item {
              background: rgba(255, 255, 255, 0.05);
              padding: 12px;
              border-radius: 4px;

              &.overutilized {
                background: rgba(244, 67, 54, 0.1);
              }

              .resource-info {
                display: flex;
                align-items: center;
                gap: 16px;

                .name {
                  width: 120px;
                  font-weight: 500;
                }

                .utilization-bar {
                  flex: 1;
                  height: 8px;
                  background: rgba(255, 255, 255, 0.1);
                  border-radius: 4px;
                  overflow: hidden;

                  .bar {
                    height: 100%;
                    transition: width 0.3s ease;
                  }
                }

                .percentage {
                  width: 60px;
                  text-align: right;
                  font-weight: 500;
                }
              }
            }
          }
        }
      }
    }
  `]
})
export class ResourceCapacityComponent implements OnChanges {
  @Input() data?: ResourceCapacityData;
  @ViewChild('chartContainer', { static: true }) private chartContainer!: ElementRef;

  avgCapacity = 0;
  avgUtilization = 0;
  resourceDetails: Array<{ name: string; utilization: number }> = [];

  private svg: Selection<SVGGElement, unknown, null, undefined> | null = null;
  private margin = { top: 20, right: 20, bottom: 30, left: 50 };
  private width = 0;
  private height = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.updateMetrics();
      this.initializeChart();
      this.updateChart();
    }
  }

  private updateMetrics(): void {
    if (this.data) {
      this.avgCapacity = this.data.avgCapacity;
      this.avgUtilization = this.data.avgUtilization;
      // Transform resource details...
    }
  }

  private initializeChart(): void {
    const element = this.chartContainer.nativeElement;
    select(element).selectAll('*').remove();

    const rect = element.getBoundingClientRect();
    this.width = rect.width - this.margin.left - this.margin.right;
    this.height = rect.height - this.margin.top - this.margin.bottom;

    this.svg = select(element)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);
  }

  private updateChart(): void {
    if (!this.svg || !this.data?.capacityTrends) return;

    const parseDate = (dateStr: string) => new Date(dateStr);

    // Create scales
    const x = scaleTime()
      .range([0, this.width])
      .domain([
        parseDate(this.data.capacityTrends[0].date),
        parseDate(this.data.capacityTrends[this.data.capacityTrends.length - 1].date)
      ]);

    const y = scaleLinear()
      .range([this.height, 0])
      .domain([0, Math.max(...this.data.capacityTrends.map(d => d.totalCapacity))])
      .nice();

    // Create line generators
    const capacityLine = line<any>()
      .x(d => x(parseDate(d.date)))
      .y(d => y(d.totalCapacity))
      .curve(curveMonotoneX);

    const allocatedLine = line<any>()
      .x(d => x(parseDate(d.date)))
      .y(d => y(d.allocatedHours))
      .curve(curveMonotoneX);

    // Add gridlines
    this.svg.append('g')
      .attr('class', 'grid')
      .call(axisLeft(y)
        .tickSize(-this.width)
        .tickFormat(() => '')
      )
      .style('stroke', 'rgba(255, 255, 255, 0.1)');

    // Add axes
    this.svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${this.height})`)
      .call(axisBottom(x).ticks(5))
      .selectAll('text')
      .style('fill', 'rgba(255, 255, 255, 0.6)');

    this.svg.append('g')
      .attr('class', 'y-axis')
      .call(axisLeft(y))
      .selectAll('text')
      .style('fill', 'rgba(255, 255, 255, 0.6)');

    // Add capacity line
    this.svg.append('path')
      .datum(this.data.capacityTrends)
      .attr('class', 'capacity-line')
      .attr('fill', 'none')
      .attr('stroke', '#4CAF50')
      .attr('stroke-width', 2)
      .attr('d', capacityLine);

    // Add allocated line
    this.svg.append('path')
      .datum(this.data.capacityTrends)
      .attr('class', 'allocated-line')
      .attr('fill', 'none')
      .attr('stroke', '#2196F3')
      .attr('stroke-width', 2)
      .attr('d', allocatedLine);
  }

  getUtilizationColor(utilization: number): string {
    if (utilization > 100) return '#f44336';
    if (utilization > 80) return '#ff9800';
    return '#4caf50';
  }
}