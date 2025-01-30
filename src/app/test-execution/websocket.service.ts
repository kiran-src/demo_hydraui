// websocket.service.ts
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Client } from '@stomp/stompjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { BuildRun, BuildRunLog } from './pipeline.interface';

interface WebSocketConfig {
  buildRunId: number;
  azurePat: string;
}

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private client: Client;
  private buildStatusSubject = new BehaviorSubject<BuildRun | null>(null);
  private buildLogsSubject = new BehaviorSubject<BuildRunLog[]>([]);
  private connectionStatusSubject = new BehaviorSubject<boolean>(false);
  private currentConfig: WebSocketConfig | null = null;

  buildStatus$ = this.buildStatusSubject.asObservable();
  buildLogs$ = this.buildLogsSubject.asObservable();
  connectionStatus$ = this.connectionStatusSubject.asObservable();

  constructor() {
    this.initializeClient();
  }

  private initializeClient() {
    this.client = new Client({
      brokerURL: `${environment.apiUrl.replace('http', 'ws')}/websocket-endpoint`,
      debug: (str) => {
        console.debug('[WebSocket]:', str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000
    });
  }

  connect(config: WebSocketConfig): void {
    try {
      this.currentConfig = config;
      const backendToken = localStorage.getItem('token');
      if (!backendToken || !config.azurePat) {
        throw new Error('Required tokens not found');
      }

      this.client.connectHeaders = {
        'Authorization': `Bearer ${backendToken}`,
        'X-Azure-PAT': config.azurePat
      };

      this.client.onConnect = () => {
        this.connectionStatusSubject.next(true);
        console.log('WebSocket Connected');

        // Subscribe to build status
        this.client.subscribe(
          `/topic/builds/${config.buildRunId}`,
          (message) => {
            try {
              const buildRun: BuildRun = JSON.parse(message.body);
              this.buildStatusSubject.next(buildRun);
            } catch (error) {
              console.error('Error parsing build status message:', error);
            }
          },
          { 'Authorization': `Bearer ${backendToken}` }
        );

        // Subscribe to build logs
        this.client.subscribe(
          `/topic/builds/${config.buildRunId}/logs`,
          (message) => {
            try {
              const logs: BuildRunLog[] = JSON.parse(message.body);
              const currentLogs = this.buildLogsSubject.value;
              this.buildLogsSubject.next([...currentLogs, ...logs]);
            } catch (error) {
              console.error('Error parsing build logs message:', error);
            }
          },
          { 'Authorization': `Bearer ${backendToken}` }
        );
      };

      this.client.onStompError = (frame) => {
        console.error('STOMP error:', frame);
        this.connectionStatusSubject.next(false);
      };

      this.client.onDisconnect = () => {
        console.log('WebSocket Disconnected');
        this.connectionStatusSubject.next(false);
      };

      if (!this.client.active) {
        this.client.activate();
      }
    } catch (error) {
      console.error('Error establishing WebSocket connection:', error);
      this.connectionStatusSubject.next(false);
      throw error;
    }
  }

  disconnect(): void {
    if (this.client?.active) {
      this.client.deactivate()
        .then(() => {
          console.log('WebSocket disconnected successfully');
          this.clearState();
        })
        .catch(error => {
          console.error('Error disconnecting WebSocket:', error);
        });
    }
  }

  private clearState(): void {
    this.buildStatusSubject.next(null);
    this.buildLogsSubject.next([]);
    this.connectionStatusSubject.next(false);
    this.currentConfig = null;
  }

  reconnect(): void {
    if (this.currentConfig) {
      this.disconnect();
      setTimeout(() => {
        this.connect(this.currentConfig!);
      }, 1000);
    }
  }
}