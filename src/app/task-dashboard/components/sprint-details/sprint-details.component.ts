import { Component, Input, OnChanges, ElementRef, ViewChild, SimpleChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { select, Selection, BaseType } from 'd3-selection';

// import { 
//     select, Selection,
//     scaleLinear, scaleTime,
//     line, area, curveMonotoneX,
//     axisLeft, axisBottom,
//     max, min, extent,
//     timeFormat
// } from 'd3';

export interface SprintDetailsData {
    sprintId: string;
    name: string;
    status: string;
    startDate: string;
    endDate: string;
    goal: string;
    metrics: {
        totalPoints: number;
        completedPoints: number;
        totalTasks: number;
        completedTasks: number;
        remainingDays: number;
        completionRate: number;
        predictedCompletion?: string;
    };
    burndown: {
        ideal: Array<{
            date: string;
            points: number;
        }>;
        actual: Array<{
            date: string;
            points: number;
            completed: number;
            added: number;
        }>;
    };
    velocity: {
        current: number;
        average: number;
        trend: number;
    };
}

type D3Selection = Selection<any, unknown, null, undefined>;

@Component({
    selector: 'app-sprint-details',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule
    ],
    template: `
        <div class="sprint-details-container">
            <div class="header">
                <div class="title-section">
                    <div class="sprint-info">
                        <h2>{{ data?.name }}</h2>
                        <span class="sprint-status" [class]="data?.status.toLowerCase()">
                            {{ formatStatus(data?.status) }}
                        </span>
                    </div>
                    <div class="sprint-dates">
                        <span class="date">{{ formatDate(data?.startDate) }}</span>
                        <span class="separator">→</span>
                        <span class="date">{{ formatDate(data?.endDate) }}</span>
                        <span class="days-left" [class.urgent]="isUrgent()">
                            {{ data?.metrics?.remainingDays }} days left
                        </span>
                    </div>
                    <div class="sprint-goal" *ngIf="data?.goal">
                        <mat-icon>flag</mat-icon>
                        <span>{{ data?.goal }}</span>
                    </div>
                </div>

                <div class="actions">
                    <button mat-icon-button [matMenuTriggerFor]="menu">
                        <mat-icon>more_vert</mat-icon>
                    </button>
                    <mat-menu #menu="matMenu">
                        <button mat-menu-item (click)="toggleIdealLine()">
                            <mat-icon>{{ showIdealLine ? 'visibility_off' : 'visibility' }}</mat-icon>
                            <span>{{ showIdealLine ? 'Hide' : 'Show' }} Ideal Line</span>
                        </button>
                        <button mat-menu-item (click)="togglePrediction()">
                            <mat-icon>{{ showPrediction ? 'visibility_off' : 'visibility' }}</mat-icon>
                            <span>{{ showPrediction ? 'Hide' : 'Show' }} Prediction</span>
                        </button>
                    </mat-menu>
                </div>
            </div>

            <div class="content">
                <div class="metrics-grid">
                    <div class="metric-item">
                        <span class="label">Story Points</span>
                        <div class="value-group">
                            <span class="value">{{ data?.metrics?.completedPoints || 0 }}</span>
                            <span class="total">/ {{ data?.metrics?.totalPoints || 0 }}</span>
                        </div>
                    </div>
                    <div class="metric-item">
                        <span class="label">Tasks</span>
                        <div class="value-group">
                            <span class="value">{{ data?.metrics?.completedTasks || 0 }}</span>
                            <span class="total">/ {{ data?.metrics?.totalTasks || 0 }}</span>
                        </div>
                    </div>
                    <div class="metric-item">
                        <span class="label">Completion Rate</span>
                        <span class="value">{{ data?.metrics?.completionRate || 0 }}%</span>
                    </div>
                    <div class="metric-item">
                        <span class="label">Current Velocity</span>
                        <div class="value-group">
                            <span class="value">{{ data?.velocity?.current || 0 }}</span>
                            <span class="trend" [class.positive]="data?.velocity?.trend || 0 >= 0">
                                <mat-icon>
                                    {{ getTrendIcon(data?.velocity?.trend || 0) }}
                                </mat-icon>
                                {{ formatTrend(data?.velocity?.trend || 0) }}
                            </span>
                        </div>
                    </div>
                </div>

                <div class="chart-container" #chartContainer>
                    <!-- D3 chart will be rendered here -->
                </div>

                <div class="prediction" *ngIf="data?.metrics?.predictedCompletion">
                    <mat-icon>analytics</mat-icon>
                    <span>Predicted completion: {{ formatDate(data?.metrics?.predictedCompletion) }}</span>
                    <span class="prediction-status" [class.delayed]="isPredictedDelay()">
                        {{ getPredictionStatus() }}
                    </span>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .sprint-details-container {
            height: 100%;
            padding: 16px;
            background: #2d2d2d;
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            color: #ffffff;

            .header {
                margin-bottom: 24px;

                .title-section {
                    .sprint-info {
                        display: flex;
                        align-items: center;
                        gap: 12px;
                        margin-bottom: 8px;

                        h2 {
                            margin: 0;
                            font-size: 20px;
                            font-weight: 500;
                        }

                        .sprint-status {
                            padding: 4px 8px;
                            border-radius: 4px;
                            font-size: 12px;

                            &.active { background: rgba(76, 175, 80, 0.1); color: #4CAF50; }
                            &.planned { background: rgba(33, 150, 243, 0.1); color: #2196F3; }
                            &.completed { background: rgba(158, 158, 158, 0.1); color: #9E9E9E; }
                        }
                    }

                    .sprint-dates {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        font-size: 14px;
                        color: rgba(255, 255, 255, 0.6);
                        margin-bottom: 8px;

                        .separator {
                            color: rgba(255, 255, 255, 0.3);
                        }

                        .days-left {
                            margin-left: auto;
                            padding: 2px 8px;
                            border-radius: 4px;
                            background: rgba(255, 255, 255, 0.1);

                            &.urgent {
                                background: rgba(244, 67, 54, 0.1);
                                color: #F44336;
                            }
                        }
                    }

                    .sprint-goal {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        font-size: 14px;
                        color: rgba(255, 255, 255, 0.8);

                        mat-icon {
                            font-size: 18px;
                            width: 18px;
                            height: 18px;
                            color: #FFC107;
                        }
                    }
                }
            }

            .content {
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 24px;
                min-height: 0;

                .metrics-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 16px;

                    .metric-item {
                        background: rgba(255, 255, 255, 0.05);
                        padding: 12px;
                        border-radius: 8px;
                        text-align: center;

                        .label {
                            display: block;
                            font-size: 12px;
                            color: rgba(255, 255, 255, 0.6);
                            margin-bottom: 4px;
                        }

                        .value-group {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            gap: 4px;

                            .value {
                                font-size: 24px;
                                font-weight: 500;
                            }

                            .total {
                                font-size: 16px;
                                color: rgba(255, 255, 255, 0.6);
                            }

                            .trend {
                                display: flex;
                                align-items: center;
                                gap: 2px;
                                font-size: 14px;

                                &.positive {
                                    color: #4CAF50;
                                }

                                &:not(.positive) {
                                    color: #F44336;
                                }

                                mat-icon {
                                    font-size: 16px;
                                    width: 16px;
                                    height: 16px;
                                }
                            }
                        }
                    }
                }

                .chart-container {
                    flex: 1;
                    min-height: 300px;
                    background: rgba(255, 255, 255, 0.02);
                    border-radius: 8px;
                    padding: 16px;
                    position: relative;
                }

                .prediction {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 12px;
                    border-radius: 8px;
                    background: rgba(33, 150, 243, 0.1);
                    color: rgba(255, 255, 255, 0.9);

                    mat-icon {
                        font-size: 18px;
                        width: 18px;
                        height: 18px;
                        color: #2196F3;
                    }

                    .prediction-status {
                        margin-left: auto;
                        padding: 2px 8px;
                        border-radius: 4px;
                        font-size: 12px;
                        background: rgba(76, 175, 80, 0.1);
                        color: #4CAF50;

                        &.delayed {
                            background: rgba(244, 67, 54, 0.1);
                            color: #F44336;
                        }
                    }
                }
            }
        }
    `]
})