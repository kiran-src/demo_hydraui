import { Injectable } from '@angular/core';
import { Observable, Subject, timer } from 'rxjs';
import { retryWhen, delay, take, tap } from 'rxjs/operators';
import * as Stomp from '@stomp/stompjs';
import { IFrame } from '@stomp/stompjs';
import { environment } from '../../environments/environment';

export interface PipelineWebSocketConfig {
  buildRunId: number;
}

export interface WebSocketMessage {
  type: string;
  data: unknown;
  timestamp: string;
}

export interface PipelineLog {
  timestamp: Date;
  level: string;
  message: string;
}

export interface BuildUpdate {
  buildRunId: number;
  buildStatus: string;
  runTime: string;
  endTime?: string;
  logs: PipelineLog[];
}

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient: Stomp.Client | null = null;
  private messageSubject = new Subject<WebSocketMessage>();
  private readonly WS_URL = `${environment.wsUrl}`;

  connect(config: PipelineWebSocketConfig): Observable<WebSocketMessage> {
    console.log('Connecting WebSocket for buildRunId:', config.buildRunId);
    
    if (this.stompClient) {
      this.disconnect();
    }

    this.stompClient = new Stomp.Client({
      brokerURL: this.WS_URL,
      connectHeaders: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      debug: (str) => {
        console.log('STOMP Debug:', str);
      }
    });

    this.stompClient.onWebSocketError = (error: Event) => {
      console.error('WebSocket Error:', error);
    };

    this.stompClient.onStompError = (frame: IFrame) => {
      console.error('STOMP Error:', frame);
    };

    this.stompClient.onConnect = (frame: IFrame) => {
      console.log('WebSocket Connected:', frame);
      
      const subscription = this.stompClient?.subscribe(
        `/topic/pipeline/${config.buildRunId}`,
        (message) => {
          console.log('Received WebSocket Message:', message);
          try {
            const buildUpdate = JSON.parse(message.body);
            console.log('Parsed BuildRun:', buildUpdate);

            if (buildUpdate.logs) {
              console.log('Received logs:', buildUpdate.logs);
            }

            const formattedLogs = (buildUpdate.logs || []).map((log: any) => ({
              timestamp: new Date(log.timestamp),
              level: log.level || 'INFO',
              message: log.message
            }));

            console.log('Formatted logs:', formattedLogs);

            const webSocketMessage: WebSocketMessage = {
              type: 'PIPELINE_UPDATE',
              data: {
                buildRunId: buildUpdate.buildRunId,
                pipelineId: config.buildRunId.toString(),
                status: buildUpdate.buildStatus,
                isRunning: buildUpdate.buildStatus === 'RUNNING',
                runTime: buildUpdate.runTime,
                endTime: buildUpdate.endTime,
                logs: formattedLogs
              },
              timestamp: new Date().toISOString()
            };

            console.log('Emitting message:', webSocketMessage);
            this.messageSubject.next(webSocketMessage);
          } catch (error) {
            console.error('Error processing message:', error, message.body);
          }
        },
        {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          id: `pipeline-${config.buildRunId}`
        }
      );

      console.log('Subscription created:', subscription);
    };

    console.log('Activating STOMP client...');
    this.stompClient.activate();
    
    return this.messageSubject.asObservable();
  }

  disconnect(): void {
    console.log('Disconnecting WebSocket...');
    if (this.stompClient) {
      this.stompClient.deactivate();
      this.stompClient = null;
    }
    this.messageSubject.complete();
  }
}