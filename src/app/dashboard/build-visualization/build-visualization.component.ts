import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import * as d3 from 'd3';
import { BuildDataService, BuildData } from './build-data.service';
import { Selection } from 'd3-selection';
import { Line, line } from 'd3-shape';
 
@Component({
  selector: 'app-build-visualization',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './build-visualization.component.html',
  styleUrls: ['./build-visualization.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BuildVisualizationComponent implements OnInit, OnDestroy {
  private svg!: Selection<SVGSVGElement, unknown, HTMLElement, any>;
  private margin = { top: 60, right: 100, bottom: 80, left: 120 };
  private width = 1000;
  private height = 600;
  private resizeListener: () => void;
  private currentData: BuildData[] = [];
  selectedBuild: BuildData | null = null;
 
  constructor(private buildDataService: BuildDataService) {
    this.resizeListener = () => this.makeResponsive();
  }
 
  ngOnInit(): void {
    // Wait for Angular to create the chart container
    setTimeout(() => {
      this.buildDataService.getBuildData().subscribe((data: BuildData[]) => {
        const recentData = data.slice(0, 50);
        this.currentData = recentData;
        this.createChart(recentData); // Create the chart when data arrives
      });
    });
   
    window.addEventListener('resize', this.resizeListener);
  }
 
  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeListener);
  }
 
  private createChart(data: BuildData[]): void {
    if (!data || data.length === 0) return;
   
    this.updateChartDimensions();
    d3.select('.chart-container svg').remove();
 
    this.svg = d3.select('.chart-container')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('viewBox', `0 0 ${this.width} ${this.height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet');
 
// Add a light grey background
this.svg.append('rect')
  .attr('width', this.width)
  .attr('height', this.height)
  .attr('fill', '#f0f0f0'); // Light grey color
 
  // Add chart title
const title = this.svg.append('text')
.attr('x', this.width / 2)
.attr('y', this.margin.top / 2)
.attr('text-anchor', 'middle')
.style('font-size', '20px')
.style('font-family', `'Quicksand', sans-serif`)
.style('font-weight', 'bold') // Ensure bold
.text('Build History Timeline');
 
 
    const xScale = d3.scaleTime()
      .domain(d3.extent(data, (d: BuildData) => new Date(d.startTime)) as [Date, Date])
      .range([this.margin.left, this.width - this.margin.right]);
 
    const yScale = d3.scaleLinear()
      .domain([0, data.length - 1])
      .range([this.height - this.margin.bottom, this.margin.top]);
 
    const lineGenerator = line<BuildData>()
      .x((d: BuildData) => xScale(new Date(d.startTime)))
      .y((_: BuildData, i: number) => yScale(i))
      .curve(d3.curveMonotoneX);
 
    // Add line with animation
    const path = this.svg.append('path')
      .datum(data)
      .attr('class', 'build-line')
      .attr('fill', 'none')
      .attr('stroke', '#ccc')
      .attr('stroke-width', '2')
      .attr('d', lineGenerator);
 
    const pathLength = path.node()?.getTotalLength() || 0;
    path
      .attr('stroke-dasharray', pathLength)
      .attr('stroke-dashoffset', pathLength)
      .transition()
      .duration(1000)
      .attr('stroke-dashoffset', 0);
 
    // Add circles for each build
    const circles = this.svg.selectAll<SVGCircleElement, BuildData>('.build-circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'build-circle')
      .attr('cx', (d: BuildData) => xScale(new Date(d.startTime)))
      .attr('cy', (_: BuildData, i: number) => yScale(i))
      .attr('r', 0)
      .attr('fill', (d: BuildData) => this.getStatusColor(d.result))
      .style('filter', 'drop-shadow(2px 2px 3px rgba(0,0,0,0.2))')
      .on('click', (event: Event, d: BuildData) => {
        event.stopPropagation();
        this.selectedBuild = d;
        this.highlightSelectedBuild(d);
      });
 
    // Animate circles
    circles.transition()
      .duration(1000)
      .attr('r', 8);
 
    // Add tooltips
    circles.append('title')
      .text((d: BuildData) =>
        `Build: ${d.buildNumber}\n` +
        `Status: ${d.result}\n` +
        `Priority: ${d.priority}\n` +
        `Start: ${new Date(d.startTime).toLocaleString()}\n` +
        `Duration: ${this.calculateBuildDuration(d)}`
      );
 
    // Add axes
    const xAxis = d3.axisBottom(xScale)
      .ticks(10)
      .tickFormat(d3.timeFormat('%b %d, %H:%M') as any);
 
    const yAxis = d3.axisLeft(yScale)
      .ticks(Math.min(data.length, 20))
      .tickFormat((_: number, i: number) => data[i].buildNumber);
 
    // Add X axis with styling
    this.svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${this.height - this.margin.bottom})`)
      .call(xAxis)
      .selectAll('text')
      .style('font-size', '12px')
      .attr('transform', 'rotate(-45)')
      .attr('text-anchor', 'end');
 
    // Add Y axis with styling
    this.svg.append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${this.margin.left},0)`)
      .call(yAxis)
      .selectAll('text')
      .style('font-size', '12px');
 
    // Add axis labels
    this.svg.append('text')
      .attr('x', this.width / 2)
      .attr('y', this.height - 0)
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .text('Build Time');
 
    this.svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -(this.height / 2))
      .attr('y', 25)
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .text('Build Number');
 
    // Add legend
    const legend = this.svg.append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${this.width - this.margin.right + 40}, ${this.margin.top})`);
 
    const statuses = ['succeeded', 'failed', 'cancelled'];
    statuses.forEach((status, i) => {
      const legendItem = legend.append('g')
        .attr('transform', `translate(0, ${i * 25})`);
 
      legendItem.append('circle')
        .attr('r', 10)
        .attr('fill', this.getStatusColor(status));
 
      legendItem.append('text')
        .attr('x', 15)
        .attr('y', 5)
        .style('font-size', '12px')
        .text(status.charAt(0).toUpperCase() + status.slice(1));
    });
 
    // Add click handler to clear selection when clicking outside
    this.svg.on('click', () => {
      this.clearSelection();
    });
 
    this.makeResponsive();
  }
 
  private updateChartDimensions(): void {
    const container = d3.select('.chart-container').node() as HTMLElement;
    if (container) {
      this.width = container.clientWidth - 32; // 32px for padding
      this.height = container.clientHeight - 32;
    }
  }
 
  private highlightSelectedBuild(build: BuildData): void {
    // Reset all circles to normal state
    this.svg.selectAll('.build-circle')
      .attr('r', 8)
      .style('stroke-width', '0')
      .style('filter', 'drop-shadow(2px 2px 3px rgba(0,0,0,0.2))');
 
    // Highlight selected build
    this.svg.selectAll('.build-circle')
      .filter((d: any) => d.id === build.id)
      .attr('r', 12)
      .style('stroke', '#000')
      .style('stroke-width', '2')
      .style('filter', 'drop-shadow(3px 3px 5px rgba(0,0,0,0.3))');
  }
 
  private clearSelection(): void {
    this.selectedBuild = null;
    this.svg.selectAll('.build-circle')
      .attr('r', 8)
      .style('stroke-width', '0')
      .style('filter', 'drop-shadow(2px 2px 3px rgba(0,0,0,0.2))');
  }
 
  private getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'succeeded':
        return '#28a745';
      case 'failed':
        return '#dc3545';
      case 'cancelled':
        return '#ffc107';
      default:
        return '#ffc107';
    }
  }
 
  getStatusIcon(status: string): string {
    switch (status.toLowerCase()) {
      case 'succeeded':
        return 'check_circle';
      case 'failed':
        return 'error';
      case 'cancelled':
        return 'cancel';
      default:
        return 'help';
    }
  }
 
  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString();
  }
 
  calculateQueueDuration(build: BuildData): string {
    const queueTime = new Date(build.queueTime);
    const startTime = new Date(build.startTime);
    return this.formatDuration(queueTime, startTime);
  }
 
  calculateBuildDuration(build: BuildData): string {
    const startTime = new Date(build.startTime);
    const finishTime = new Date(build.finishTime);
    return this.formatDuration(startTime, finishTime);
  }
 
  private formatDuration(start: Date, end: Date): string {
    const duration = end.getTime() - start.getTime();
    const minutes = Math.floor(duration / 60000);
    const seconds = Math.floor((duration % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  }
 
  openBuildUrl(build: BuildData): void {
    window.open(build.url, '_blank');
  }
 
  closeDetails(): void {
    this.clearSelection();
  }
 
  private makeResponsive(): void {
    this.updateChartDimensions();
   
    if (this.svg && this.currentData.length > 0) { // Add check for data
      this.svg
        .attr('width', this.width)
        .attr('height', this.height)
        .attr('viewBox', `0 0 ${this.width} ${this.height}`);
     
     
      this.updateChartPositions();
    }
  }
  private updateChartPositions(): void {
    if (!this.svg || this.currentData.length === 0) return;
 
    const xScale = d3.scaleTime()
      .domain(d3.extent(this.currentData, (d: BuildData) => new Date(d.startTime)) as [Date, Date])
      .range([this.margin.left, this.width - this.margin.right]);
 
    const yScale = d3.scaleLinear()
      .domain([0, this.currentData.length - 1])
      .range([this.height - this.margin.bottom, this.margin.top]);
 
    // Update line position
    const lineGenerator = line<BuildData>()
      .x((d: BuildData) => xScale(new Date(d.startTime)))
      .y((_: BuildData, i: number) => yScale(i))
      .curve(d3.curveMonotoneX);
 
    this.svg.select('.build-line')
      .datum(this.currentData)
      .attr('d', lineGenerator);
 
    // Update circles position
    this.svg.selectAll('.build-circle')
      .data(this.currentData)
      .attr('cx', (d: BuildData) => xScale(new Date(d.startTime)))
      .attr('cy', (_: BuildData, i: number) => yScale(i));
 
    // Update axes
    const xAxis = d3.axisBottom(xScale)
      .ticks(10)
      .tickFormat(d3.timeFormat('%b %d, %H:%M') as any);
 
    const yAxis = d3.axisLeft(yScale)
      .ticks(Math.min(this.currentData.length, 20))
      .tickFormat((_: number, i: number) => this.currentData[i].buildNumber);
 
    this.svg.select('.x-axis')
      .attr('transform', `translate(0,${this.height - this.margin.bottom})`)
      .call(xAxis);
 
    this.svg.select('.y-axis')
      .attr('transform', `translate(${this.margin.left},0)`)
      .call(yAxis);
 
    // Update legend position
    this.svg.select('.legend')
      .attr('transform', `translate(${this.width - this.margin.right + 0.5}, ${this.margin.top})`);
  }
}