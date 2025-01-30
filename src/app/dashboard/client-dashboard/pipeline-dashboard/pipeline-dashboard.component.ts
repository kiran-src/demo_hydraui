// import { Component, OnInit, NgZone } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { MatCardModule } from '@angular/material/card';
// import { TestDataService } from '../test-data.service';
// import * as d3 from 'd3';
// import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
// import { data } from '../../../charts/apexcharts/datetime-area-chart/series-data';


// @Component({
//   selector: 'app-pipeline-dashboard',
//   standalone: true,
//   imports: [CommonModule, MatCardModule],
//   templateUrl: './pipeline-dashboard.component.html',
//   styleUrl: './pipeline-dashboard.component.scss'
// })
// export class PipelineDashboardComponent implements OnInit{
//   private pipelineData: any;
  
//   constructor(
//     private testDataService: TestDataService,
//     public themeService: CustomizerSettingsService,
//     private ngZone: NgZone
//   ){}

//   ngOnInit(): void {
//       this.testDataService.getPipelineStats().subscribe(
//         data => {
//           this.pipelineData = data;
//           this.createCharts();
//         },
//         error => console.error('Error fetching dashboard data:', error)
//       )
//   };

//   private createCharts(){
//     // Declare the chart dimensions and margins.
//   const width = 928;
//   const height = 500;
//   const marginTop = 30;
//   const marginRight = 0;
//   const marginBottom = 30;
//   const marginLeft = 40;
  
//   // Create the SVG container.
//   const svg = d3.select("buildruns")
//       .append('svg')
//       .attr("width", width)
//       .attr("height", height)

//       const g = svg.append('g')
//       .attr('transform', `translate(${marginLeft}, ${marginTop})`);

//       const x = d3.scaleBand()
//       .range([0, width])
//       .domain(data.map((d: any) => d.buildNumber))
//       .padding(0.1);

//     const y = d3.scaleLinear()
//       .domain([0,1])
//       .range([height, 0]);


//     g.selectAll("mybar")
//     .data(data)
//     .enter()
//     .append('rect')
//     .attr('x', (d: any) => x(d.buildNumber))
//     .attr('y', 0)
//     .attr('width', x.bandwidth())
  
//     .attr('height', (d: any) => d.result === 'succeeded' ? '0e7aee': '0e7aea'))
    
//       // .attr("viewBox", [0, 0, width, height])
//       // .attr("style", "max-width: 100%; height: auto;");

      
//   }

// }
