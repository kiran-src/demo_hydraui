import { Component, OnInit, ViewEncapsulation, HostListener, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuildDataService, BuildData } from './build-data.service';
import * as d3 from 'd3';
 
@Component({
  selector: 'app-global-prediction',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="prediction-container">
      <div class="chart-container" #chartContainer>
        <h2 class="chart-title">Test Coverage Prediction</h2>
        <svg #chart></svg>
      </div>
      <div class="insights-container">
        <h3 class="insights-title">Insights</h3>
        <button (click)="showInsights()" class="insights-button">Show Insights</button>
        <div *ngIf="insights" class="insights-content">{{ insights }}</div>
        <button (click)="toggleShowAll()" class="insights-button">{{ showAll ? 'Show Less' : 'Show More' }}</button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
      width: 100vw;
    }
    .prediction-container {
      display: flex;
      flex-direction: column;
      padding: 20px;
      background-color: #f8f9fa;
      height: 100%;
    }
    .chart-container {
      flex: 1;
      position: relative;
      text-align: center;
      background-color: #ffffff;
      border-radius: 8px;
      border: 1px solid #d1d3e2;
      padding: 20px;
    }
    .chart-title {
      font-size: 28px;
      font-weight: bold;
      color: #4e73df;
      margin-bottom: 20px;
    }
    svg {
      width: 100%;
      height: 100%;
    }
    .insights-container {
      margin-top: 20px;
      background-color: #ffffff;
      border-radius: 8px;
      border: 1px solid #d1d3e2;
      padding: 20px;
    }
    .insights-title {
      font-size: 24px;
      font-weight: bold;
      color: #4e73df;
    }
    .insights-button {
      margin-top: 10px;
      padding: 10px 20px;
      background-color: #4e73df;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    .insights-button:hover {
      background-color: #3e5bbf;
    }
    .insights-content {
      margin-top: 10px;
      font-size: 16px;
      color: #333;
    }
  `]
})
export class GlobalPredictionComponent implements OnInit {
  @ViewChild('chart') chartRef!: ElementRef<SVGSVGElement>;
  private builds: BuildData[] = [];
  insights: string | null = null;
  showAll: boolean = false;
 
  constructor(private buildDataService: BuildDataService) {}
 
  ngOnInit() {
    this.buildDataService.getBuildData().subscribe((builds: BuildData[]) => {
      this.builds = builds;
      this.createTestCoverageBarChart();
    });
  }
 
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.createTestCoverageBarChart();
  }
 
  toggleShowAll() {
    this.showAll = !this.showAll;
    this.createTestCoverageBarChart();
  }
 
  public showInsights() {
    this.insights = 'Showing some insights about the builds...';
  }
 
  private createTestCoverageBarChart() {
    const container = d3.select(this.chartRef.nativeElement);
    container.selectAll('*').remove();
 
    const containerWidth = container.node()?.clientWidth || window.innerWidth;
    const containerHeight = container.node()?.clientHeight || window.innerHeight;
 
    const margin = { top: 50, right: 50, bottom: 120, left: 50 };
    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;
 
    const svg = container
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
 
    // Split builds into two groups: above threshold and below threshold
    const aboveThreshold = this.builds.filter(build => this.calculateDuration(build) > this.calculateAverageDuration());
    const belowThreshold = this.builds.filter(build => this.calculateDuration(build) <= this.calculateAverageDuration());
 
    // Display builds based on the showAll flag
    let displayedBuilds = [];
    if (this.showAll) {
      displayedBuilds = [...aboveThreshold, ...belowThreshold];
    } else {
      displayedBuilds = [...aboveThreshold.slice(0, 20), ...belowThreshold.slice(0, 10)];
    }
 
    const buildDurations = displayedBuilds.map(build => this.calculateDuration(build));
 
    const colorScale = d3.scaleOrdinal()
      .domain(['passed', 'failed', 'canceled'])
      .range(['green', 'red', 'yellow']);
 
    // X-axis scale
    const x = d3.scaleBand()
      .domain(displayedBuilds.map((_, i) => i + 1)) // Display numbers 1, 2, 3, ..., 30
      .range([0, width])
      .padding(0.1);
 
    // Y-axis scale
    const y = d3.scaleLinear()
      .domain([0, d3.max(buildDurations) || 100])
      .range([height, 0]);
 
    // Define the threshold (e.g., average duration or other)
    const threshold = this.calculateAverageDuration(); // Using the average as the threshold
 
    // Add the threshold line
    svg.append('line')
      .attr('x1', 0)
      .attr('y1', y(threshold))
      .attr('x2', width)
      .attr('y2', y(threshold))
      .attr('stroke', '#8B0000')  // Darker red color
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '4');
 
    // Add a label for the threshold line
    svg.append('text')
      .attr('x', width - 10)
      .attr('y', y(threshold) - 10)
      .attr('fill', '#8B0000')
      .style('text-anchor', 'end')
      .text(`Threshold: ${threshold.toFixed(2)} mins`);
 
    // Create bars with color logic based on threshold
    svg.selectAll('.bar')
      .data(displayedBuilds)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (_: any, i: number) => x(i + 1) || 0)
      .attr('y', (_: any, i: number) => y(buildDurations[i]))
      .attr('width', x.bandwidth())
      .attr('height', (_: any, i: number) => height - y(buildDurations[i]))
      .attr('fill', (d: { status: any; }, i: number) => {
        // Highlight builds above the threshold in red (danger zone)
        return buildDurations[i] > threshold ? 'red' : colorScale(d.status);
      })
      .on('click', (event: any, d: any) => this.onBarClick(d));
 
    // Create x-axis with rotated labels for readability
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text') // Rotate x-axis labels
      .style('text-anchor', 'middle')
      .attr('transform', 'rotate(-45)')  // Rotate x-axis labels
      .style('font-size', '12px')
      .style('alignment-baseline', 'middle');
 
    // Create y-axis
    svg.append('g')
      .call(d3.axisLeft(y)) // Create the y-axis with our y scale
      .selectAll('text') // Style y-axis labels
      .style('font-size', '12px')
      .style('fill', '#333');
  }
 
  private calculateAverageDuration(): number {
    const durations = this.builds.map(build => this.calculateDuration(build));
    return d3.mean(durations) || 0;
  }
 
  private calculateDuration(build: BuildData): number {
    const start = new Date(build.startTime).getTime();
    const finish = new Date(build.finishTime).getTime();
    return (finish - start) / 1000 / 60; // Duration in minutes
  }
 
  private onBarClick(build: BuildData) {
    const duration = this.calculateDuration(build);
    this.insights = `Build ${build.id} clicked! Duration: ${duration} minutes.`;
  }
}