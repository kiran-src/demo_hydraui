import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import * as d3 from 'd3';
import { BuildDataService, BuildData } from '../build-visualization/build-data.service';

@Component({
  selector: 'app-pie-visualization', // Ensure this matches how you're using the component
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './pie-visualization.component.html',
  styleUrls: ['./pie-visualization.component.scss']
})
export class PieVisualizationComponent implements OnInit, OnDestroy { 
  selectedBuild: BuildData | null = null;
  private currentData: BuildData[] = [];
  private resizeListener: () => void;
  
  selectedSlice: {
    type: string; // Store the type of rate: success, failure, or canceled
    percentage: string; // Store percentage for display
  } = { type: 'Success', percentage: '0.00' }; // Default to 0.00%

  constructor(private buildDataService: BuildDataService) {
    this.resizeListener = () => this.makeResponsive();
    window.addEventListener('resize', this.resizeListener);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeListener);
  }

  makeResponsive(): void {
    // Logic to make charts responsive if needed
  }

  ngOnInit(): void {
    this.buildDataService.getBuildData().subscribe((data: BuildData[]) => {
      this.currentData = data.slice(0, 50); // Limit to the first 50 builds
      this.createGaugeChart('gauge-chart-id', this.currentData, 'Build Success Rate');
    });
  }

  closeDetails(): void {
    this.selectedBuild = null;
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'succeeded':
        return 'check_circle';
      case 'failed':
        return 'error';
      case 'inProgress':
        return 'hourglass_empty';
      default:
        return 'help_outline';
    }
  }

  formatDate(date: string | Date): string {
    return new Date(date).toLocaleString();
  }

  calculateQueueDuration(build: BuildData): string {
    const queueTime = new Date(build.queueTime);
    const now = new Date();
    const duration = Math.floor((now.getTime() - queueTime.getTime()) / 1000);
    return `${Math.floor(duration / 60)} min ${duration % 60} sec`;
  }

  calculateBuildDuration(build: BuildData): string {
    const startTime = new Date(build.startTime);
    const finishTime = new Date(build.finishTime);
    const duration = Math.floor((finishTime.getTime() - startTime.getTime()) / 1000);
    return `${Math.floor(duration / 60)} min ${duration % 60} sec`;
  }

  openBuildUrl(build: BuildData): void {
    window.open(build.url, '_blank');
  }

  createGaugeChart(elementId: string, currentData: BuildData[], title: string) {
    const successCount = currentData.filter(b => b.result === 'succeeded').length;
    const failureCount = currentData.filter(b => b.result === 'failed').length;
    const canceledCount = currentData.filter(b => b.result === 'canceled').length;
    const totalCount = currentData.length;

    const successRate = (successCount / totalCount) * 100;
    const failureRate = (failureCount / totalCount) * 100;
    const canceledRate = (canceledCount / totalCount) * 100;

    d3.select(`#${elementId}`).selectAll('*').remove();

    const width = 400;
    const height = 400;
    const svg = d3.select(`#${elementId}`)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const gaugeGroup = svg.append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const arcSuccess = d3.arc()
      .innerRadius(100)
      .outerRadius(150)
      .startAngle(-Math.PI / 2)
      .endAngle(-Math.PI / 2 + (Math.PI * successRate / 100));

    const arcFailure = d3.arc()
      .innerRadius(100)
      .outerRadius(150)
      .startAngle(-Math.PI / 2 + (Math.PI * successRate / 100))
      .endAngle(-Math.PI / 2 + (Math.PI * (successRate + failureRate) / 100));

    const arcCanceled = d3.arc()
      .innerRadius(100)
      .outerRadius(150)
      .startAngle(-Math.PI / 2 + (Math.PI * (successRate + failureRate) / 100))
      .endAngle(Math.PI / 2);

    gaugeGroup.append('path')
      .attr('d', arcSuccess)
      .attr('fill', '#69b3a2') // Updated color for success
      .on('click', () => {
        this.selectedSlice = { type: 'Success', percentage: successRate.toFixed(2) };
      });

    gaugeGroup.append('path')
      .attr('d', arcFailure)
      .attr('fill', '#ff6347') // Updated color for failure
      .on('click', () => {
        this.selectedSlice = { type: 'Failure', percentage: failureRate.toFixed(2) };
      });

    gaugeGroup.append('path')
      .attr('d', arcCanceled)
      .attr('fill', '#fcfa77')
      .on('click', () => {
        this.selectedSlice = { type: 'Canceled', percentage: canceledRate.toFixed(2) };
      });
  }
}
