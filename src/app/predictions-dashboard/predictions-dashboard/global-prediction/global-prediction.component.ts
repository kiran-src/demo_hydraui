import { Component, Input, Output, EventEmitter, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-test-coverage-prediction',
  template: `
    <div class="test-coverage-prediction">
      <h2 *ngIf="title" class="chart-title">{{ title }}</h2>
      <div #chartContainer class="chart-container"></div>
      <div class="tooltip" style="display: none; position: absolute; background: white; border: 1px solid #ccc; padding: 5px; border-radius: 4px;"></div>
      <div *ngIf="alertMessage" class="alert-banner">
        <p>{{ alertMessage }}</p>
      </div>
    </div>
  `,
  styles: [`
    .test-coverage-prediction {
      padding: 20px;
      background-color: #f8f9fa;
      border: 1px solid #d1d3e2;
      border-radius: 8px;
      width: 100%;
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
      width: 100%;
    }
    .alert-banner {
      margin-top: 20px;
      background-color: #f8d7da;
      color: #721c24;
      padding: 10px;
      border: 1px solid #f5c6cb;
      border-radius: 4px;
      text-align: center;
    }
  `]
})
export class TestCoveragePredictionComponent implements OnInit {
  @Input() data: { date: Date; coverage: number }[] = [];
  @Input() title: string = 'Test Coverage Prediction';
  @Input() coverageThreshold: number = 70; // Alert threshold
  @Output() notify = new EventEmitter<string>(); // Event for notifications
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef<HTMLDivElement>;

  alertMessage: string | null = null; // Stores the alert message

  private svg: any; // Holds the D3 chart
  private width = 600; // Default chart width
  private height = 400; // Default chart height
  private margin = { top: 20, right: 20, bottom: 50, left: 50 };

  ngOnInit(): void {
    this.checkCoverageThreshold(this.data);
    this.createChart(this.data);
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.redrawChart();
  }

  private createChart(data: { date: Date; coverage: number }[]): void {
    const chartContainer = this.chartContainer.nativeElement;
    this.width = chartContainer.clientWidth - this.margin.left - this.margin.right;
    this.height = chartContainer.clientHeight - this.margin.top - this.margin.bottom;

    // Remove existing chart if any
    d3.select(chartContainer).select('svg').remove();

    this.svg = d3.select(chartContainer)
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

    const x = d3.scaleBand()
      .domain(data.map(d => d.date.toDateString()))
      .range([0, this.width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, 100])
      .range([this.height, 0]);

    this.svg.append('g')
      .attr('transform', `translate(0,${this.height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end');

    this.svg.append('g')
      .call(d3.axisLeft(y));

    const tooltip = d3.select('.tooltip');

    // Bars for actual data
    this.svg.selectAll('.bar')
      .data(data.filter(d => d.date <= new Date()))
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d: { date: { toDateString: () => any; }; }) => x(d.date.toDateString()) || 0)
      .attr('y', (d: { coverage: any; }) => y(d.coverage))
      .attr('width', x.bandwidth()) 
      .attr('height', (d: { coverage: any; }) => this.height - y(d.coverage))
      .attr('fill', '#4e73df')
      .on('mouseover', (event: { pageX: number; pageY: number; }, d: { date: { toDateString: () => any; }; coverage: any; }) => {
        tooltip.style('display', 'block')
          .html(`Date: ${d.date.toDateString()}<br>Coverage: ${d.coverage}%`)
          .style('left', `${event.pageX + 5}px`)
          .style('top', `${event.pageY - 28}px`);
      })
      .on('mouseout', () => {
        tooltip.style('display', 'none');
      });

    // Bars for predicted data
    this.svg.selectAll('.predicted-bar')
      .data(data.filter(d => d.date > new Date()))
      .enter()
      .append('rect')
      .attr('class', 'predicted-bar')
      .attr('x', (d: { date: { toDateString: () => any; }; }) => x(d.date.toDateString()) || 0)
      .attr('y', (d: { coverage: any; }) => y(d.coverage))
      .attr('width', x.bandwidth())
      .attr('height', (d: { coverage: any; }) => this.height - y(d.coverage))
      .attr('fill', '#f6c23e')
      .attr('opacity', 0.7)
      .on('mouseover', (event: { pageX: number; pageY: number; }, d: { date: { toDateString: () => any; }; coverage: any; }) => {
        tooltip.style('display', 'block')
          .html(`Predicted Date: ${d.date.toDateString()}<br>Predicted Coverage: ${d.coverage}%`)
          .style('left', `${event.pageX + 5}px`)
          .style('top', `${event.pageY - 28}px`);
      })
      .on('mouseout', () => {
        tooltip.style('display', 'none');
      });
  }

  private checkCoverageThreshold(data: { date: Date; coverage: number }[]): void {
    const lowCoverage = data.filter(d => d.coverage < this.coverageThreshold);
    if (lowCoverage.length) {
      this.alertMessage = `Warning: ${lowCoverage.length} builds have coverage below ${this.coverageThreshold}%.`;
      this.notify.emit(this.alertMessage); // Emit notification event
    }
  }

  private redrawChart(): void {
    if (this.data.length) {
      this.createChart(this.data);
    }
  }
}
