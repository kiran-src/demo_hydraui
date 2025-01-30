import { Component, Input, OnChanges, ElementRef, ViewChild, SimpleChanges, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { select, Selection } from 'd3-selection';
import { scaleLinear, scaleTime } from 'd3-scale';
import { line, curveMonotoneX } from 'd3-shape';
import { axisBottom, axisLeft } from 'd3-axis';
import { timeFormat } from 'd3-time-format';
import { PipelineDashboardService } from './pipeline-dashboard.service';

interface TrendDataPoint {
  date: string;
  passed: number;
  failed: number;
  total: number;
  [key: string]: any; 
}

interface StatusDistributionItem {
  status: string;
  count: number;
}

@Component({
  selector: 'app-pipeline-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './pipeline-dashboard.component.html',
  styleUrls: ['./pipeline-dashboard.component.scss']
})
export class PipelineDashboardComponent implements OnInit, OnChanges, OnDestroy {
  @Input() pipelineId?: number;
  @ViewChild('chartContainer', { static: true }) private chartContainer!: ElementRef;

  data?: any;
  private svg!: Selection<any, unknown, null, undefined>;
  private chart!: Selection<any, unknown, null, undefined>;
  private tooltip!: Selection<any, unknown, null, undefined>;
  private margin = { top: 20, right: 30, bottom: 30, left: 40 };

  constructor(private pipelineService: PipelineDashboardService) {}

  ngOnInit(): void {
    if (this.pipelineId) {
      this.loadPipelineData();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pipelineId'] && !changes['pipelineId'].firstChange) {
      this.loadPipelineData();
    }
  }

  private loadPipelineData(): void {
    if (!this.pipelineId) return;

    this.pipelineService.getPipelineMetrics(this.pipelineId)
      .subscribe({
        next: (metrics) => {
          this.data = metrics;
          this.initializeChart();
          this.updateChart();
        },
        error: (error) => {
          console.error('Error loading pipeline metrics:', error);
        }
      });
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
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

    this.setupTooltip();
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
    if (!this.data?.trends?.length) return;

    const width = this.chartContainer.nativeElement.clientWidth - this.margin.left - this.margin.right;
    const height = this.chartContainer.nativeElement.clientHeight - this.margin.top - this.margin.bottom;

    // Create scales
    const x = scaleTime()
      .range([0, width])
      .domain([
        new Date(this.data.trends[0].date),
        new Date(this.data.trends[this.data.trends.length - 1].date)
      ]);

    const y = scaleLinear()
      .range([height, 0])
      .domain([0, Math.max(...this.data.trends.map((d: any) => d.total))])
      .nice();

    this.addGridlines(x, y, width, height);
    this.addAxes(x, y, height);
    this.addExecutionLines(x, y);
    this.addDataPoints(x, y);
  }

  private addGridlines(x: any, y: any, width: number, height: number): void {
    this.chart.append('g')
      .attr('class', 'grid')
      .attr('opacity', 0.1)
      .call(axisLeft(y)
        .tickSize(-width)
        .tickFormat(() => ''));

    this.chart.append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(0,${height})`)
      .attr('opacity', 0.1)
      .call(axisBottom(x)
        .tickSize(-height)
        .tickFormat(() => ''));
  }

  private addAxes(x: any, y: any, height: number): void {
    this.chart.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(axisBottom(x).ticks(5))
      .selectAll('text')
      .style('fill', '#666666')
      .style('font-size', '12px');

    this.chart.append('g')
      .call(axisLeft(y))
      .selectAll('text')
      .style('fill', '#666666')
      .style('font-size', '12px');
  }

  private addExecutionLines(x: any, y: any): void {
    const addLine = (key: string, color: string) => {
      const lineFn = line<any>()
        .x(d => x(new Date(d.date)))
        .y(d => y(d[key]))
        .curve(curveMonotoneX);

      this.chart.append('path')
        .datum(this.data.trends)
        .attr('class', `line ${key}`)
        .attr('fill', 'none')
        .attr('stroke', color)
        .attr('stroke-width', 2)
        .attr('d', lineFn);
    };

    addLine('passed', '#4CAF50');  // Success line
    addLine('failed', '#F44336');  // Failed line
  }

  private addDataPoints(x: any, y: any): void {
    const addPoints = (key: string, color: string) => {
      this.chart.selectAll(`.point-${key}`)
        .data<TrendDataPoint>(this.data.trends)
        .enter()
        .append('circle')
        .attr('class', `point-${key}`)
        .attr('cx', (d: TrendDataPoint) => x(new Date(d.date)))
        .attr('cy', (d: TrendDataPoint) => y(d[key]))
        .attr('r', 4)
        .attr('fill', color)
        .attr('stroke', '#ffffff')
        .attr('stroke-width', 2)
        .on('mouseover', (event: MouseEvent, d: TrendDataPoint) => {
          this.showTooltip(event, d, key);
        })
        .on('mouseout', () => {
          this.hideTooltip();
        });
    };
  
    addPoints('passed', '#4CAF50');
    addPoints('failed', '#F44336');
  }

  private showTooltip(event: MouseEvent, d: any, type: string): void {
    const formatDate = timeFormat('%B %d, %Y');
    const content = `
      <div>
        <strong>${formatDate(new Date(d.date))}</strong>
        <div>${type}: ${d[type]}</div>
        <div>Total: ${d.total}</div>
        <div>Success Rate: ${((d.passed / d.total) * 100).toFixed(1)}%</div>
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

  public getStatusDistribution(): Array<{ status: string; count: number }> {
    return this.data?.statusDistribution || [];
  }

  public getSuccessRate(): number {
    if (!this.data?.statusDistribution) return 0;
    
    const total = this.getTotalExecutions();
    if (total === 0) return 0;
  
    const passed = this.data.statusDistribution
      .find((s: StatusDistributionItem) => s.status === 'SUCCESS')?.count || 0;
    return Math.round((passed / total) * 100);
  }

  public getTotalExecutions(): number {
    if (!this.data?.statusDistribution) return 0;
    return this.data.statusDistribution.reduce((sum: number, status: any) => sum + status.count, 0);
  }

  public getStatusPercentage(status: { status: string; count: number }): number {
    const total = this.getTotalExecutions();
    if (total === 0) return 0;
    return Math.round((status.count / total) * 100);
  }

  public formatStatus(status: string): string {
    return status
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
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