import { Component, ViewChild } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

import {
    ChartComponent,
    ApexAxisChartSeries,
    ApexChart,
    ApexXAxis,
    ApexDataLabels,
    ApexStroke,
    ApexYAxis,
    ApexGrid,
    ApexMarkers,
    ApexFill,
    ApexLegend,
    NgApexchartsModule
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    stroke: ApexStroke;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    markers: ApexMarkers;
    grid: ApexGrid;
    colors: string[];
    fill: ApexFill;
    legend: ApexLegend;
};

@Component({
    selector: 'app-total-sales',
    standalone: true,
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, NgApexchartsModule],
    templateUrl: './total-sales.component.html',
    styleUrl: './total-sales.component.scss'
})
export class TotalSalesComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [
                {
                    type: "area",
                    name: "Orders",
                    data: [
                        {
                            x: "Jan",
                            y: 1500
                        },
                        {
                            x: "Feb",
                            y: 1700
                        },
                        {
                            x: "Mar",
                            y: 1900
                        },
                        {
                            x: "Apr",
                            y: 2200
                        },
                        {
                            x: "May",
                            y: 3000
                        },
                        {
                            x: "Jun",
                            y: 1000
                        },
                        {
                            x: "Jul",
                            y: 2100
                        },
                        {
                            x: "Aug",
                            y: 1200
                        }
                    ]
                },
                {
                    type: "area",
                    name: "Sales",
                    data: [
                        {
                            x: "Jan",
                            y: 3300
                        },
                        {
                            x: "Feb",
                            y: 4900
                        },
                        {
                            x: "Mar",
                            y: 4300
                        },
                        {
                            x: "Apr",
                            y: 3700
                        },
                        {
                            x: "May",
                            y: 5500
                        },
                        {
                            x: "Jun",
                            y: 5900
                        },
                        {
                            x: "Jul",
                            y: 4500
                        },
                        {
                            x: "Aug",
                            y: 2400
                        }
                    ]
                }
            ],
            chart: {
                height: 282,
                type: "area",
                animations: {
                    speed: 500
                },
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#796df6", "#00cae3"
            ],
            dataLabels: {
                enabled: false
            },
            fill: {
                opacity: 0.24
            },
            xaxis: {
                axisBorder: {
                    show: false,
                    color: '#e0e0e0'
                },
                axisTicks: {
                    show: true,
                    color: '#e0e0e0'
                },
                labels: {
                    style: {
                        colors: "#919aa3",
                        fontSize: "14px"
                    }
                }
            },
            yaxis: {
                tickAmount: 3,
                labels: {
                    style: {
                        colors: "#919aa3",
                        fontSize: "14px"
                    }
                }
            },
            stroke: {
                curve: "smooth",
                width: 2
            },
            legend: {
                position: "top",
                fontSize: "14px",
                customLegendItems: ["Orders", "Sales"],
                labels: {
                    colors: "#919aa3",
                },
                itemMargin: {
                    horizontal: 12,
                    vertical: 0
                }
            },
            markers: {
                hover: {
                    sizeOffset: 5
                }
            },
            grid: {
                strokeDashArray: 5,
                borderColor: "#e0e0e0"
            }
        };
    }
}