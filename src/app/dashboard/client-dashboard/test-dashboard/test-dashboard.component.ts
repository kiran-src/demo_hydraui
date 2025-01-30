import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { TestDataService } from '../test-data.service';
import * as d3 from 'd3';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
  selector: 'app-test-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './test-dashboard.component.html',
  styleUrls: ['./test-dashboard.component.scss']
})
export class TestDashboardComponent implements OnInit {
  private dashboardData: any;

  constructor(
    private testDataService: TestDataService,
    public themeService: CustomizerSettingsService,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.testDataService.getDashboardStats().subscribe(
      data => {
        this.dashboardData = data;
        this.createCharts();
      },
      error => console.error('Error fetching dashboard data:', error)
    );
  }

  private createCharts() {
    this.createStatCard('testCaseStats', 'Total Test Cases', this.dashboardData.totalTestCases);
    this.createStatCard('executionStats', 'Active Executions', this.dashboardData.activeExecutions);
    this.createStatCard('defectStats', 'Defect Resolution Rate', `${(this.dashboardData.defectResolutionRate * 100).toFixed(1)}%`);
    this.createStatCard('buildStats', 'Test Case Success Rate', `${(this.dashboardData.testCaseSuccessRate * 100).toFixed(1)}%`);

    this.createPieChart('testCaseDistribution', this.dashboardData.testCaseDistribution, 'Test Case Distribution');
    this.createLineChart('executionTrend', this.dashboardData.testExecutionTrends, 'Test Execution Trend');
    this.createLineChart('defectTrend', this.dashboardData.defectTrends, 'Defect Trend');
    this.createBarChart('recentBuilds', this.dashboardData.recentBuildRuns, 'Recent Build Runs');
  }

  private createStatCard(elementId: string, title: string, value: string | number) {
    const card = d3.select(`#${elementId}`);
    card.append('h5').text(title).style('margin-bottom', '10px');
    card.append('div').attr('class', 'number').text(value).style('font-size', '24px');
  }

  private createPieChart(elementId: string, data: { [key: string]: number }, title: string) {
    const containerWidth = document.getElementById(elementId)?.offsetWidth || 400;
    const width = containerWidth - 60;
    const height = 300;
    const titleHeight = 40;
    const radius = Math.min(width, height - titleHeight) / 2.5;
    const legendWidth = width * 0.4;

    // Create title SVG
    const titleSvg = d3.select(`#${elementId}`)
      .append('svg')
      .attr('width', width + legendWidth)
      .attr('height', titleHeight)
      .append('g')
      .attr('transform', `translate(${(width + legendWidth) / 2}, ${titleHeight / 2})`);

    titleSvg.append('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .text(title)
      .style('font-size', '18px')
      .style('font-weight', 'bold');

    // Create main chart SVG
    const svg = d3.select(`#${elementId}`)
      .append('svg')
      .attr('width', width + legendWidth)
      .attr('height', height - titleHeight)
      .append('g')
      .attr('transform', `translate(${width / 2},${(height - titleHeight) / 2})`);

    const color = d3.scaleOrdinal()
      .domain(Object.keys(data))
      .range(["#00cae3", "#0e7aee", "#796df6", "#ffb264"]);

    const pie = d3.pie().value((d: any) => d[1]);
    const data_ready = pie(Object.entries(data));

    const arcGenerator = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    svg.selectAll('mySlices')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', arcGenerator as any)
      .attr('fill', (d: any) => color(d.data[0]))
      .attr('stroke', '#ffffff')
      .style('stroke-width', '2px')
      .style('opacity', 0.7);

    // Create legend
    const legend = svg.append('g')
      .attr('transform', `translate(${radius + 30}, ${-radius + 20})`);

    const legendItems = legend.selectAll('.legend-item')
      .data(data_ready)
      .enter()
      .append('g')
      .attr('class', 'legend-item')
      .attr('transform', (d: any, i: number) => `translate(0, ${i * 25})`);

    legendItems.append('rect')
      .attr('width', 18)
      .attr('height', 18)
      .attr('fill', (d: any) => color(d.data[0]));

    legendItems.append('text')
      .attr('x', 24)
      .attr('y', 9)
      .attr('dy', '0.35em')
      .text((d: any) => `${d.data[0]}: ${d.data[1]}`)
      .style('font-size', '12px')
      .style('fill', '#333');
  }

  private createLineChart(elementId: string, data: any[], title: string) {
    const containerWidth = document.getElementById(elementId)?.offsetWidth || 400;
    const margin = {top: 10, right: 30, bottom: 50, left: 60};
    const width = containerWidth - margin.left - margin.right - 40;
    const height = 300 - margin.top - margin.bottom;
    const titleHeight = 40;

    // Create title SVG
    const titleSvg = d3.select(`#${elementId}`)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', titleHeight)
      .append('g')
      .attr('transform', `translate(${(width + margin.left + margin.right) / 2}, ${titleHeight / 2})`);

    titleSvg.append('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .text(title)
      .style('font-size', '18px')
      .style('font-weight', 'bold');

    // Create main chart SVG
    const svg = d3.select(`#${elementId}`)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleTime()
      .domain(d3.extent(data, (d: any) => new Date(d.date)) as [Date, Date])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, (d: any) => d.count) as number])
      .range([height, 0]);

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(5).tickFormat(d3.timeFormat('%b %d') as any))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-45)');

    svg.append('g')
      .call(d3.axisLeft(y));

    const line = d3.line()
      .x((d: any) => x(new Date(d.date)))
      .y((d: any) => y(d.count));

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#0e7aee')
      .attr('stroke-width', 2)
      .attr('d', line);

    svg.selectAll('.dot')
      .data(data)
      .enter().append('circle')
      .attr('class', 'dot')
      .attr('cx', (d: any) => x(new Date(d.date)))
      .attr('cy', (d: any) => y(d.count))
      .attr('r', 4)
      .attr('fill', '#0e7aee');
  }

  private createBarChart(elementId: string, data: any[], title: string) {
    const containerWidth = document.getElementById(elementId)?.offsetWidth || 400;
    const margin = {top: 10, right: 30, bottom: 70, left: 60};
    const width = containerWidth - margin.left - margin.right - 40;
    const height = 300 - margin.top - margin.bottom;
    const titleHeight = 40;

    // Create title SVG
    const titleSvg = d3.select(`#${elementId}`)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', titleHeight)
      .append('g')
      .attr('transform', `translate(${(width + margin.left + margin.right) / 2}, ${titleHeight / 2})`);

    titleSvg.append('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .text(title)
      .style('font-size', '18px')
      .style('font-weight', 'bold');

    // Create main chart SVG
    const svg = d3.select(`#${elementId}`)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .range([0, width])
      .domain(data.map((d: any) => d.buildRunId.toString()))
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, (d: any) => d.buildRunId) as number])
      .range([height, 0]);

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');

    svg.append('g')
      .call(d3.axisLeft(y));

    svg.selectAll('mybar')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d: any) => x(d.buildRunId.toString()) as number)
      .attr('y', (d: any) => y(d.buildRunId))
      .attr('width', x.bandwidth())
      .attr('height', (d: any) => height - y(d.buildRunId))
      .attr('fill', '#0e7aee');
  }
}