import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { BuildDataService, BuildData } from './build-data.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-daily-build-trend',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule
  ],
  template: `
    <mat-card class="daily-build-trend">
      <mat-card-header>
        <mat-card-title>Daily Build Count Trend</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div #chartContainer class="chart-container"></div>
        <div class="tooltip" style="display: none; position: absolute; background: white; border: 1px solid #ccc; padding: 5px; border-radius: 4px;"></div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .daily-build-trend {
      padding: 20px;
      background-color: #f8f9fa;
      border: 1px solid #d1d3e2;
      border-radius: 8px;
      height: 100%;
    }

    mat-card-title {
      font-size: 24px;
      font-weight: bold;
      color: #4e73df;
      margin-bottom: 20px;
      text-align: center;
    }

    .chart-container {
      height: 400px;
      width: 100%;
    }

    .tooltip {
      position: absolute;
      background-color: white;
      border: 1px solid #ccc;
      padding: 8px;
      border-radius: 4px;
      font-size: 12px;
      pointer-events: none;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class DailyBuildTrendComponent implements OnInit {
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef<HTMLDivElement>;
 
  constructor(private buildDataService: BuildDataService) {}
 
  ngOnInit(): void {
    this.buildDataService.getBuildData().subscribe((builds: BuildData[]) => {
      this.createDailyBuildTrend(builds);
    });
  }
 
  private createDailyBuildTrend(builds: BuildData[]): void {
    const chartContainer = this.chartContainer.nativeElement;
    const containerWidth = chartContainer.clientWidth || 600;
    const containerHeight = chartContainer.clientHeight || 400;
 
    const margin = { top: 20, right: 20, bottom: 50, left: 50 };
    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;
 
    const svg = d3.select(chartContainer)
      .append('svg')
      .attr('width', containerWidth)
      .attr('height', containerHeight)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
 
    // Process data to calculate daily build counts
    const dailyBuilds = d3.rollup(
      builds,
      (v: string | any[]) => v.length,
      (build: { queueTime: string | number | Date; }) => new Date(build.queueTime).toDateString()
    );
 
    const data = Array.from(dailyBuilds, ([date, count]) => ({ date: new Date(date), count }));
    data.sort((a, b) => a.date.getTime() - b.date.getTime());
 
 // Generate predictions up to today's date
const today = new Date();
const lastDate = data[data.length - 1]?.date || new Date();
const missingDays = Math.ceil((today.getTime() - lastDate.getTime()) / (24 * 60 * 60 * 1000));

// Fill in predictions for missing days
const predictedData = Array.from({ length: missingDays }, (_, i) => ({
  date: new Date(lastDate.getTime() + (i + 1) * 24 * 60 * 60 * 1000),
  count: Math.round(d3.mean(data.map(d => d.count)) || 0) // Example prediction: mean of existing counts
}));

const combinedData = [...data, ...predictedData];


 
    // Scales
    const x = d3.scaleBand()
      .domain(combinedData.map(d => d.date.toDateString()))
      .range([0, width])
      .padding(0.1);
 
    const y = d3.scaleLinear()
      .domain([0, d3.max(combinedData, (d: { count: any; }) => d.count) || 10])
      .nice()
      .range([height, 0]);
 
    // X-axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end');
 
    // Y-axis
    svg.append('g').call(d3.axisLeft(y));
 
    // Create tooltip
    const tooltip = d3.select('.tooltip');
 
    // Bars for actual data
    svg.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d: { date: { toDateString: () => string; }; }) => x(d.date.toDateString()) || 0)
      .attr('y', (d: { count: any; }) => y(d.count))
      .attr('width', x.bandwidth())
      .attr('height', (d: { count: any; }) => height - y(d.count))
      .attr('fill', '#4e73df') // Blue for actual data
      .on('mouseover', (event: { pageX: number; pageY: number; }, d: { date: { toDateString: () => any; }; count: any; }) => {
        tooltip.style('display', 'block')
          .html(`Date: ${d.date.toDateString()}<br>Count: ${d.count}`)
          .style('left', `${event.pageX + 5}px`)
          .style('top', `${event.pageY - 28}px`);
      })
      .on('mouseout', () => {
        tooltip.style('display', 'none');
      });
 
    // Bars for predicted data
    svg.selectAll('.predicted-bar')
      .data(predictedData)
      .enter()
      .append('rect')
      .attr('class', 'predicted-bar')
      .attr('x', (d: { date: { toDateString: () => any; }; }) => x(d.date.toDateString()) || 0)
      .attr('y', (d: { count: any; }) => y(d.count))
      .attr('width', x.bandwidth())
      .attr('height', (d: { count: any; }) => height - y(d.count))
      .attr('fill', '#f6c23e') // Yellow for predictions
      .attr('opacity', 0.7)
      .on('mouseover', (event: { pageX: number; pageY: number; }, d: { date: { toDateString: () => any; }; count: any; }) => {
        tooltip.style('display', 'block')
          .html(`Predicted Date: ${d.date.toDateString()}<br>Predicted Count: ${d.count}`)
          .style('left', `${event.pageX + 5}px`)
          .style('top', `${event.pageY - 28}px`);
      })
      .on('mouseout', () => {
        tooltip.style('display', 'none');
      });
 
    // Add labels
    svg.selectAll('.label')
      .data(combinedData)
      .enter()
      .append('text')
      .attr('x', (d: { date: { toDateString: () => any; }; }) => (x(d.date.toDateString()) || 0) + x.bandwidth() / 2)
      .attr('y', (d: { count: any; }) => y(d.count) - 5)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('fill', '#333')
      .text((d: { count: any; }) => d.count);
  }
}