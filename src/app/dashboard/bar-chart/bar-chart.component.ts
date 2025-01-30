import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { BuildData, BuildDataService } from './bar-data.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styles: [`
    .chart-wrapper {
      padding: 20px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .chart-header {
      text-align: center;
      margin-bottom: 20px;
    }
    .chart-title {
      font-size: 24px;
      font-weight: bold;
      color: #333;
      margin-bottom: 8px;
    }
    .chart-description {
      font-size: 16px;
      color: #666;
      margin-bottom: 20px;
    }
    .chart-container {
      width: 100%;
      height: 400px;
      position: relative;
      margin-bottom: 20px;
    }
    .chart-legend {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-top: 20px;
    }
    .legend-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .legend-color {
      width: 16px;
      height: 16px;
      border-radius: 4px;
    }
    .bar {
      cursor: pointer;
    }
    .tooltip {
      position: absolute;
      text-align: center;
      width: auto;
      padding: 8px;
      background: rgba(0, 0, 0, 0.7);
      color: #fff;
      border-radius: 4px;
      pointer-events: none;
      font-size: 12px;
      opacity: 0; /* Initially hidden */
    }
    .bar:hover {
      opacity: 0.8;
      fill: #f39c12;
    }
  `],
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatSidenavModule, 
    MatListModule, 
    MatIconModule,
    MatButtonModule
  ],
})
export class BarChartComponent implements OnInit {
  private svg: any;
  private margin = { top: 20, right: 30, bottom: 30, left: 40 };
  private width = 800 - this.margin.left - this.margin.right;
  private height = 400 - this.margin.top - this.margin.bottom;
  private tooltip: any;

  constructor(private buildDataService: BuildDataService) {}

  ngOnInit(): void {
    this.buildDataService.getBuildData().subscribe((data: BuildData[]) => {
      const groupedData = d3.groups(data, (d: BuildData) => d.requestedBy.displayName)
        .map(([name, builds]: [string, BuildData[]]) => ({
          requestedBy: name,
          successCount: builds.filter((b: BuildData) => b.result === 'succeeded').length,
          failedCount: builds.filter((b: BuildData) => b.result === 'failed').length
        }));
      
      this.createSvg();
      this.createTooltip();
      this.drawBars(groupedData);
    });
  }

  private createSvg(): void {
    this.svg = d3.select('figure#bar-chart')
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);
  }

  private createTooltip(): void {
    this.tooltip = d3.select('figure#bar-chart')
      .append('div')
      .attr('class', 'tooltip');
  }

  private drawBars(data: any[]): void {
    const x0 = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.requestedBy))
      .padding(0.2);
  
    const x1 = d3.scaleBand()
      .domain(['successCount', 'failedCount'])
      .range([0, x0.bandwidth()])
      .padding(0.05);
  
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, (d: { successCount: number; failedCount: number; }) => Math.max(d.successCount, d.failedCount)) as number])
      .range([this.height, 0]);
  
    const color = d3.scaleOrdinal()
      .domain(['successCount', 'failedCount'])
      .range(['#69b3a2', '#ff6347']);
  
    this.svg.append('g')
      .selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .attr('transform', (d: any) => `translate(${x0(d.requestedBy)},0)`)
      .selectAll('rect')
      .data((d: any) => [
        { key: 'successCount', value: d.successCount },
        { key: 'failedCount', value: d.failedCount }
      ])
      .enter()
      .append('rect')
      .attr('x', (d: any) => x1(d.key)!)
      .attr('y', (d: any) => y(d.value))
      .attr('width', x1.bandwidth())
      .attr('height', (d: any) => this.height - y(d.value))
      .attr('fill', (d: any) => color(d.key)!)
      .on('mouseenter', (event: MouseEvent, d: { key: string; value: number }) => {
        d3.select(event.target).attr('fill', d.key === 'successCount' ? '#4DA8A3' : '#e94b3c'); 
        this.tooltip
          .style('opacity', 1)
          .html(`${d.key === 'successCount' ? 'Success' : 'Failed'}: ${d.value}`)
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY - 10}px`);
      })
      .on('mouseleave', (event: MouseEvent, d: { key: string }) => {
        d3.select(event.target).attr('fill', color(d.key)!);
        this.tooltip.style('opacity', 0);
      });
  
    this.svg.append('g')
      .attr('transform', `translate(0, ${this.height})`)
      .call(d3.axisBottom(x0));
  
    this.svg.append('g')
      .call(d3.axisLeft(y));
  }
}
