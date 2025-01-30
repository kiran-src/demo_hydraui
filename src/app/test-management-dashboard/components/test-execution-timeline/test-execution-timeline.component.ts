import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { Subject, takeUntil } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';
import * as d3 from 'd3';
import { Selection } from 'd3-selection';
import { Bisector } from 'd3-array';


interface TimelineData {
  date: Date;
  passed: number;
  failed: number;
  skipped: number;
  total: number;
}

type MetricKey = keyof Omit<TimelineData, 'date'>;

@Component({
  selector: 'app-test-execution-timeline',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonToggleModule,
    MatCardModule
  ],
  templateUrl: './test-execution-timeline.component.html',
  styleUrls: ['./test-execution-timeline.component.scss']
})
export class TestExecutionTimelineComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private svg: Selection<SVGSVGElement, unknown, null, undefined> | null = null;
  private chart: Selection<SVGGElement, unknown, null, undefined> | null = null;
  private tooltip: Selection<HTMLDivElement, unknown, null, undefined> | null = null;
  private data: TimelineData[] = [];
  private width = 0;
  private height = 0;
  private margin = { top: 20, right: 30, bottom: 30, left: 40 };
  private cleanup?: () => void;
  private readonly colors: Record<MetricKey, string> = {
    total: '#2196f3',
    passed: '#4caf50',
    failed: '#f44336',
    skipped: '#ff9800'
  };

  @ViewChild('chart', { static: true }) private chartContainer!: ElementRef<HTMLDivElement>;
  timeframe: 'daily' | 'weekly' | 'monthly' = 'daily';
  loading = false;
  error: string | null = null;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.loadData();
    this.initializeChart();
  }

  ngOnDestroy() {
    if (this.cleanup) {
      this.cleanup();
    }
    this.destroy$.next();
    this.destroy$.complete();
  }

  onTimeframeChange(timeframe: 'daily' | 'weekly' | 'monthly') {
    this.timeframe = timeframe;
    this.loadData();
  }

  private loadData() {
    this.loading = true;
    this.dashboardService.getMetricTrends('executions', this.timeframe)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (trends) => {
          this.data = trends.data.map(item => ({
            date: new Date(item.date),
            passed: item.passed,
            failed: item.failed,
            skipped: item.skipped,
            total: item.total
          }));
          this.updateChart();
          this.loading = false;
        },
        error: (err) => {
          this.error = err.message;
          this.loading = false;
        }
      });
  }

  private initializeChart() {
    const element = this.chartContainer.nativeElement;

    // Create SVG
    this.svg = d3.select(element)
      .append('svg')
      .attr('class', 'timeline-chart')
      .style('width', '100%')
      .style('height', '100%') as Selection<SVGSVGElement, unknown, null, undefined>;

    // Add clip path
    this.svg.append('defs')
      .append('clipPath')
      .attr('id', 'clip')
      .append('rect');

    // Create chart group
    this.chart = this.svg.append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`) as Selection<SVGGElement, unknown, null, undefined>;

    // Create axes groups
    this.chart.append('g').attr('class', 'x-axis');
    this.chart.append('g').attr('class', 'y-axis');

    // Create tooltip
    this.tooltip = d3.select(element)
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', '0') as Selection<HTMLDivElement, unknown, null, undefined>;

    // Set up destroy function
    this.cleanup = () => {
      this.svg?.remove();
      this.tooltip?.remove();
    };

    if (this.data.length > 0) {
      this.updateChart();
    }
  }

  private updateChart() {
    if (!this.svg || !this.chart || !this.tooltip) return;

    const element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;

    // Update SVG dimensions
    this.svg
      .attr('viewBox', `0 0 ${this.width + this.margin.left + this.margin.right} ${this.height + this.margin.top + this.margin.bottom}`);

    // Update clip path
    this.svg.select('clipPath rect')
      .attr('width', `${this.width}`)
      .attr('height', `${this.height}`);

    // Create scales
    const x = d3.scaleTime()
      .domain(d3.extent(this.data, (d: { date: any; }) => d.date) || [new Date(), new Date()])
      .range([0, this.width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(this.data, (d: { total: number; passed: any; failed: any; skipped: any; }) => Math.max(d.total, d.passed + d.failed + d.skipped)) || 0])
      .range([this.height, 0])
      .nice();

    // Create lines
    const metrics: MetricKey[] = ['total', 'passed', 'failed', 'skipped'];
    metrics.forEach(metric => {
      // Create line generator without generic type parameter
      const lineGen = d3.line()
        .defined((d: TimelineData) => !isNaN(d[metric]))
        .x((d: TimelineData) => x(d.date))
        .y((d: TimelineData) => y(d[metric]))
        .curve(d3.curveMonotoneX);

      const line = this.chart!.selectAll(`.line-${metric}`)
        .data([this.data]);

      line.enter()
        .append('path')
        .merge(line as any)
        .attr('class', `line-${metric}`)
        .attr('fill', 'none')
        .attr('stroke', this.colors[metric])
        .attr('stroke-width', metric === 'total' ? 2 : 1.5)
        .attr('d', lineGen)
        .style('opacity', '0')
        .transition()
        .duration(1000)
        .style('opacity', '1');

      line.exit().remove();
    });

    // Update axes
    if (this.chart) {
      const xAxis = d3.axisBottom(x)
        .ticks(this.width > 600 ? 10 : 5)
        .tickFormat(d3.timeFormat("%b %d") as any);

      const yAxis = d3.axisLeft(y)
        .ticks(5);

      this.chart.select('.x-axis')
        .attr('transform', `translate(0,${this.height})`)
        .call(xAxis);

      this.chart.select('.y-axis')
        .call(yAxis);
    }

    this.addHoverEffects(x, y);
  }

  private addHoverEffects(
    x: ReturnType<typeof d3.scaleTime>,
    y: ReturnType<typeof d3.scaleLinear>
  ) {    if (!this.chart || !this.tooltip) return;

    const focus = this.chart.append('g')
        .attr('class', 'focus')
        .style('display', 'none');

    focus.append('line')
        .attr('class', 'x-hover-line hover-line')
        .attr('y1', 0)
        .attr('y2', this.height);

    // Fix the bisector declaration
    const bisect = d3.bisector((d: TimelineData) => d.date);

    const overlay = this.chart.append('rect')
        .attr('class', 'overlay')
        .attr('width', this.width)
        .attr('height', this.height)
        .style('fill', 'none')
        .style('pointer-events', 'all');

    const mousemove = (event: MouseEvent) => {
        const [xPos] = d3.pointer(event);
        const x0 = x.invert(xPos);
        const i = bisect.left(this.data, x0);  // Update this line
        const d0 = this.data[i - 1];
        const d1 = this.data[i];
        if (!d0 || !d1) return;

        const d = x0.valueOf() - d0.date.valueOf() > d1.date.valueOf() - x0.valueOf() ? d1 : d0;

        focus.attr('transform', `translate(${x(d.date)},0)`);
        focus.select('.x-hover-line').attr('y2', this.height);

        this.tooltip?.transition()
            .duration(200)
            .style('opacity', '0.9');

        this.tooltip?.html(this.formatTooltip(d))
            .style('left', `${event.pageX + 10}px`)
            .style('top', `${event.pageY - 28}px`);
    };

    overlay
        .on('mouseover', () => focus.style('display', null))
        .on('mouseout', () => {
            focus.style('display', 'none');
            this.tooltip?.transition().duration(500).style('opacity', '0');
        })
        .on('mousemove', mousemove);
}
  private formatDate(date: Date): string {
    switch (this.timeframe) {
      case 'daily':
        return d3.timeFormat('%b %d')(date);
      case 'weekly':
        return d3.timeFormat('Week %V')(date);
      case 'monthly':
        return d3.timeFormat('%b %Y')(date);
    }
  }

  private formatTooltip(d: TimelineData): string {
    return `
      <div class="tooltip-content">
        <div class="tooltip-date">${this.formatDate(d.date)}</div>
        <div class="tooltip-metric" style="color: ${this.colors.total}">Total: ${d.total}</div>
        <div class="tooltip-metric" style="color: ${this.colors.passed}">Passed: ${d.passed}</div>
        <div class="tooltip-metric" style="color: ${this.colors.failed}">Failed: ${d.failed}</div>
        <div class="tooltip-metric" style="color: ${this.colors.skipped}">Skipped: ${d.skipped}</div>
      </div>
    `;
  }

  onResize({ width, height }: { width: number; height: number }) {
    this.width = width - this.margin.left - this.margin.right;
    this.height = height - this.margin.top - this.margin.bottom;
    this.updateChart();
  }
}