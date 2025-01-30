import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as d3 from 'd3';
import { BuildDataService, BuildData } from './build-data.service';

@Component({
  selector: 'app-build-prediction',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="tabs">
  <a href="/daily-build-trend" class="tab active">Daily Build Trend</a>
  <a href="/global-prediction" class="tab">Global Prediction</a>
  <a href="/pipeline-predictive" class="tab">Pipeline Analytics</a>
</div> 

    <div class="prediction-container">
      <div class="chart-container" #chartContainer>
        <h2>Build Duration Prediction</h2>
      </div>
      <div class="prediction-insights">
        <h3>Build Prediction Insights</h3>
        <div *ngIf="predictionInsights">
          <p>Predicted Average Build Duration: {{predictionInsights.averageDuration}}</p>
          <p>Estimated Success Probability: {{predictionInsights.successProbability}}%</p>
          <p>Predicted Next Build Time: {{predictionInsights.nextBuildTime}}</p>
        </div>
        <button (click)="refreshPredictions()">Refresh Predictions</button>
      </div>
    </div>
  `,
  styles: [`
    .prediction-container {
      display: flex;
      width: 100%;
      height: 500px;
    }
    .chart-container {
      flex: 2;
      position: relative;
      text-align: center;
    }
    .prediction-insights {
      flex: 1;
      padding: 20px;
      background-color: #f4f4f4;
    }
    .tooltip {
      position: absolute;
      background-color: #fff;
      border: 1px solid #ccc;
      padding: 5px;
      border-radius: 5px;
      font-size: 12px;
      pointer-events: none;
    }
    button {
      margin-top: 20px;
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      border: none;
      cursor: pointer;
      border-radius: 5px;
    }
    button:hover {
      background-color: #0056b3;
    }
    @media (max-width: 768px) {
      .prediction-container {
        flex-direction: column;
      }
      .chart-container {
        margin-bottom: 20px;
      }
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
export class BuildPredictionComponent implements OnInit {
  private builds: BuildData[] = [];
  predictionInsights: any = null;
  private containerWidth: number = 0;
  private containerHeight: number = 0;

  constructor(private buildDataService: BuildDataService) {}

  ngOnInit() {
    this.buildDataService.getBuildData().subscribe(builds => {
      this.builds = builds;
      this.processBuilds();
      this.createPredictionLineChart();
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.createPredictionLineChart();
  }

  private processBuilds() {
    if (!this.builds || this.builds.length === 0) {
      this.predictionInsights = {
        averageDuration: 'No data available',
        successProbability: 'N/A',
        nextBuildTime: 'N/A'
      };
      return;
    }

    const buildDurations = this.builds.map(build => {
      const start = new Date(build.startTime).getTime();
      const finish = new Date(build.finishTime).getTime();
      return (finish - start) / 1000 / 60;
    });

    const successBuilds = this.builds.filter(build => build.result === 'succeeded');

    this.predictionInsights = {
      averageDuration: `${this.calculateMean(buildDurations).toFixed(2)} minutes`,
      successProbability: ((successBuilds.length / this.builds.length) * 100).toFixed(2),
      nextBuildTime: this.predictNextBuildTime()
    };
  }

  private createPredictionLineChart() {
    const container = d3.select('.chart-container');
    container.selectAll('*').remove();

    this.containerWidth = container.node()?.clientWidth || 600;
    this.containerHeight = container.node()?.clientHeight || 400;

    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const width = this.containerWidth - margin.left - margin.right;
    const height = this.containerHeight - margin.top - margin.bottom;

    const svg = container
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const buildDurations = this.builds.map(build => {
      const start = new Date(build.startTime).getTime();
      const finish = new Date(build.finishTime).getTime();
      return (finish - start) / 1000 / 60;
    });

    const x = d3.scaleLinear()
      .domain([0, this.builds.length - 1])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(buildDurations) || 0])
      .range([height, 0]);

    const line = d3.line()
      .x((_: any, i: number) => x(i))
      .y((d: number) => y(d));

    // Add line
    svg.append('path')
      .datum(buildDurations)
      .attr('class', 'build-duration-line')
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('d', line);

    // Add data points
    svg.selectAll('.data-point')
    .data(this.builds)
    .enter()
    .append('circle')
    .attr('class', 'data-point')
    .attr('cx', (_: any, i: number) => x(i))
    .attr('cy', (_: any, i: number) => y(buildDurations[i]))
    .attr('r', 5)
    .attr('fill', (d: { result: string; }) => this.getColor(d.result))
    .on('mouseover', (event: MouseEvent, d: BuildData) => this.showTooltip(event, d))
    .on('mouseout', () => this.hideTooltip());  

    // Add axes
    svg.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(x));
    svg.append('g').call(d3.axisLeft(y));
  }

  private calculateMean(arr: number[]): number {
    return arr.reduce((a, b) => a + b, 0) / arr.length;
  }

  private predictNextBuildTime(): string {
    const buildTimes = this.builds.map(build => new Date(build.startTime).getTime());
    const sortedTimes = buildTimes.sort((a, b) => a - b);
    const timeDiffs = sortedTimes.slice(1).map((time, i) => time - sortedTimes[i]);
    const avgTimeBetweenBuilds = this.calculateMean(timeDiffs);

    const lastBuildTime = new Date(this.builds[this.builds.length - 1].startTime);
    const predictedNextBuild = new Date(lastBuildTime.getTime() + avgTimeBetweenBuilds);

    return predictedNextBuild.toLocaleString();
  }

  private getColor(result: string): string {
    return result === 'succeeded' ? 'green' : result === 'failed' ? 'red' : 'orange';
  }

  private showTooltip(event: MouseEvent, build: BuildData) {
    const tooltip = d3.select('.chart-container').append('div')
      .attr('class', 'tooltip')
      .style('left', `${event.pageX}px`)
      .style('top', `${event.pageY - 28}px`)
      .html(`
        <strong>Build #:</strong> ${build.buildNumber}<br>
        <strong>Result:</strong> ${build.result}<br>
        <strong>Duration:</strong> ${(new Date(build.finishTime).getTime() - new Date(build.startTime).getTime()) / 1000 / 60} minutes
      `);
  }

  private hideTooltip() {
    d3.select('.tooltip').remove();
  }

  refreshPredictions() {
    this.buildDataService.getBuildData().subscribe(builds => {
      this.builds = builds;
      this.processBuilds();
      this.createPredictionLineChart();
    });
  }
}
