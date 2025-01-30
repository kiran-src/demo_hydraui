import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { TimelineData, ChartOptions, PieChartData } from '../models/chart.model';

// D3 imports
import * as d3 from 'd3';
import { BaseType, Selection } from 'd3-selection';
import { ScaleTime, ScaleLinear } from 'd3-scale';
import { Line, Area, Arc, Pie } from 'd3-shape';
import { Axis } from 'd3-axis';

type D3SVGSelection = Selection<SVGGElement, unknown, null, undefined>;
type D3Selection = Selection<BaseType, unknown, null, undefined>;

interface ChartDataPoint {
  date: Date;
  value: number;
}

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private apiUrl = `${environment.apiUrl}/api/client/charts`;
  private defaultMargin = { top: 20, right: 20, bottom: 30, left: 50 };
  private defaultColors = ['#2196f3', '#4caf50', '#ff4081', '#ff9800', '#7c4dff'];

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }


  createLineChart(
    element: HTMLElement,
    data: Array<{ date: string; value: number }>,
    options: ChartOptions
  ): void {
    const margin = options.margin || this.defaultMargin;
    const width = (options.width || 600) - margin.left - margin.right;
    const height = (options.height || 400) - margin.top - margin.bottom;

   // Clear existing SVG
   d3.select(element).selectAll("*").remove();

   // Create SVG
   const svg = d3.select(element)
     .append("svg")
     .attr("width", width + margin.left + margin.right)
     .attr("height", height + margin.top + margin.bottom)
     .append("g")
     .attr("transform", `translate(${margin.left},${margin.top})`);

    // Parse dates
    const parsedData = data.map(d => ({
      date: new Date(d.date),
      value: d.value
    }));

    // Create scales
    const xScale = d3.scaleTime()
      .domain(d3.extent(parsedData, (d: { date: any; }) => d.date) as [Date, Date])
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(parsedData, (d: { value: any; }) => d.value) || 0])
      .range([height, 0]);

    // Create line generator
    const lineGenerator = d3.line()
      .defined((d: any) => !isNaN(d.value))
      .x((d: any) => xScale(d.date))
      .y((d: any) => yScale(d.value));

    if (options.smoothing !== undefined) {
      lineGenerator.curve(d3.curveBasis);
    }

    // Create area generator if needed
    if (options.area) {
      const areaGenerator = d3.area()
        .x((d: any) => xScale(d.date))
        .y0(height)
        .y1((d: any) => yScale(d.value));

      if (options.smoothing !== undefined) {
        areaGenerator.curve(d3.curveBasis);
      }

      svg.append("path")
        .datum(parsedData)
        .attr("class", "area")
        .attr("fill", options.color || this.defaultColors[0])
        .attr("fill-opacity", 0.1)
        .attr("d", areaGenerator);
    }

    // Add line path
    svg.append("path")
      .datum(parsedData)
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", options.color || this.defaultColors[0])
      .attr("stroke-width", 1.5)
      .attr("d", lineGenerator);

    // Add axes if needed
    if (options.showAxis) {
      const xAxis = d3.axisBottom(xScale)
        .ticks(width > 500 ? 10 : 5)
        .tickFormat(d3.timeFormat("%b %d"));

      const yAxis = d3.axisLeft(yScale)
        .ticks(height > 300 ? 10 : 5);

      svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height})`)
        .style("color", "rgba(255,255,255,0.5)")
        .call(xAxis);

      svg.append("g")
        .attr("class", "y-axis")
        .style("color", "rgba(255,255,255,0.5)")
        .call(yAxis);
    }

    // Add hover effects
    const focus = svg.append("g")
      .attr("class", "focus")
      .style("display", "none");

    focus.append("circle")
      .attr("r", 4.5)
      .attr("fill", options.color || this.defaultColors[0]);

    focus.append("text")
      .attr("x", 9)
      .attr("dy", ".35em")
      .attr("fill", "white");

    const bisect = d3.bisector((d: ChartDataPoint) => d.date).left;

    const overlay = svg.append("rect")
      .attr("class", "overlay")
      .attr("width", width)
      .attr("height", height)
      .style("opacity", 0);

    overlay
      .on("mouseover", () => focus.style("display", null))
      .on("mouseout", () => focus.style("display", "none"))
      .on("mousemove", (event: MouseEvent) => {
        const [mouseX] = d3.pointer(event);
        const x0 = xScale.invert(mouseX);
        const i = bisect(parsedData, x0, 1);
        const d0 = parsedData[i - 1];
        const d1 = parsedData[i];
        if (!d0 || !d1) return;
        
        const d = x0.getTime() - d0.date.getTime() > d1.date.getTime() - x0.getTime() ? d1 : d0;
        focus.attr("transform", `translate(${xScale(d.date)},${yScale(d.value)})`);
        focus.select("text").text(d.value.toFixed(2));
      });
  }
  getChartData(chartType: string, params: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${chartType}`, {
      headers: this.getAuthHeaders(),
      params
    }).pipe(
      catchError(this.handleError)
    );
  }

  saveChartData(chartType: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${chartType}`, data, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    let errorMessage = 'An unknown error occurred';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message || error.message}`;
    }
    
    return throwError(() => new Error(errorMessage));
  }

  async exportChart(element: HTMLElement, format: 'png' | 'svg'): Promise<string> {
    const svg = d3.select(element).select('svg');
    if (svg.empty()) {
      throw new Error('No chart found to export');
    }

    try {
      if (format === 'svg') {
        return await this.exportToSVG(svg as D3Selection);
      } else {
        return await this.exportToPNG(svg as D3Selection);
      }
    } catch (error) {
      throw new Error(`Failed to export chart: ${error}`);
    }
  }

  private async exportToSVG(svg: D3Selection): Promise<string> {
    const serializer = new XMLSerializer();
    const node = svg.node();
    if (!node || !(node instanceof SVGElement)) {
      throw new Error('Invalid SVG element');
    }
    return serializer.serializeToString(node);
  }

  private async exportToPNG(svg: D3Selection): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const node = svg.node();
      if (!node || !(node instanceof SVGElement)) {
        reject(new Error('Invalid SVG element'));
        return;
      }

      const serializer = new XMLSerializer();
      const svgString = serializer.serializeToString(node);
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      if (!context) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };

      img.onerror = () => {
        reject(new Error('Failed to load SVG image'));
      };

      img.src = 'data:image/svg+xml;base64,' + btoa(svgString);
    });
  }



  createPieChart(
    element: HTMLElement,
    data: PieChartData[],
    options: ChartOptions
  ): void {
    const width = options.width || 400;
    const height = options.height || 400;
    const radius = Math.min(width, height) / 2;
    const colors = options.colors || this.defaultColors;

    d3.select(element).selectAll("*").remove();

    const svg = d3.select(element)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const colorScale = d3.scaleOrdinal()
      .domain(data.map(d => d.label))
      .range(colors);

    const pieGenerator = d3.pie()
      .value((d: any) => d.value)
      .sort(null);

    const arcGenerator = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    const labelArc = d3.arc()
      .innerRadius(radius * 0.6)
      .outerRadius(radius * 0.6);

    // Add slices
    const arcs = svg.selectAll("path")
      .data(pieGenerator(data))
      .enter()
      .append("path")
      .attr("d", arcGenerator)
      .style("fill", (d: any) => colorScale(d.data.label))
      .style("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 0.7);

    // Add hover effects
    arcs
      .on("mouseover", function(this: SVGPathElement) {
        d3.select(this)
          .style("opacity", 1)
          .attr("transform", "scale(1.05)");
      })
      .on("mouseout", function(this: SVGPathElement) {
        d3.select(this)
          .style("opacity", 0.7)
          .attr("transform", "scale(1)");
      });

    // Add labels if needed
    if (options.showLabels) {
      svg.selectAll("text")
        .data(pieGenerator(data))
        .enter()
        .append("text")
        .attr("transform", (d: any) => `translate(${labelArc.centroid(d)})`)
        .style("text-anchor", "middle")
        .style("font-size", "12px")
        .style("fill", "white")
        .text((d: any) => `${d.data.label} (${d.data.value})`);
    }

    // Add legend
    const legend = svg.selectAll(".legend")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("transform", (d: any, i: number) => `translate(${radius + 30},${i * 20 - radius + 20})`);

    legend.append("rect")
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", (d: { label: any; }) => colorScale(d.label));

    legend.append("text")
      .attr("x", 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("fill", "white")
      .text((d: { label: any; value: any; }) => `${d.label} (${d.value})`);
  }
}

