import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BuildDataService, BuildData } from './build-data.service';
import * as d3 from 'd3';
 
@Component({
  selector: 'app-daily-build-trend',
  template: `
 <div class="tabs">
  <a href="/daily-build-trend" class="tab active">Daily Build Trend</a>
  <a href="/global-prediction" class="tab">Global Prediction</a>
  <a href="/pipeline-predictive" class="tab">Pipeline Analytics</a>
</div> 

    <div class="daily-build-trend">
      <h2 class="chart-title">Daily Build Count Trend</h2>
      <div #chartContainer class="chart-container"></div>
      <div class="tooltip" style="display: none; position: absolute; background: white; border: 1px solid #ccc; padding: 5px; border-radius: 4px;"></div>
    </div>
  `,
  styles: [`
    .daily-build-trend {
      padding: 20px;
      background-color: #f8f9fa;
      border: 1px solid #d1d3e2;
      border-radius: 8px;
    }
    .chart-title {
      font-size: 24px;
      font-weight: bold;
      text-align: center;
      color: #4e73df;
      margin-bottom: 20px;
    }
    .chart-container {
      height: 400px;
    }
    .tabs {
  display: flex;
  background-color: #fff;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  width: fit-content;
}
.tab {
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  margin-right: 5px;
  background-color: #f2f2f2;
}

.tab.active {
  background-color: #005c8f;
  color: white;
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
 
    // Generate future predictions
    const lastDate = data[data.length - 1]?.date || new Date();
    const predictedData = Array.from({ length: 7 }, (_, i) => ({
      date: new Date(lastDate.getTime() + (i + 1) * 24 * 60 * 60 * 1000),
      count: Math.round(d3.mean(data.map(d => d.count)) || 0)
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