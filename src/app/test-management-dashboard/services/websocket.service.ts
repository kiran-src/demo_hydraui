// websocket.service.ts
import { Injectable, OnDestroy } from '@angular/core';
import { Client, Message, StompSubscription } from '@stomp/stompjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../authentication/auth.service';
import { ErrorService } from './error.service';

export interface WebSocketMessage<T = any> {
  type: 'metrics' | 'testRun' | 'alert';
  payload: T;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class WebSocketService implements OnDestroy {
  private client: Client;
  private connected = new BehaviorSubject<boolean>(false);
  private messageSubject = new BehaviorSubject<WebSocketMessage | null>(null);
  private subscriptions: StompSubscription[] = [];

  constructor(
    private authService: AuthService,
    private errorService: ErrorService
  ) {
    this.initializeWebSocket();
  }

  public get connected$(): Observable<boolean> {
    return this.connected.asObservable();
  }

  public get messages$(): Observable<WebSocketMessage | null> {
    return this.messageSubject.asObservable();
  }

  private initializeWebSocket() {
    const clientId = this.authService.currentUserValue?.clientId;
    if (!clientId) {
      console.error('No client ID available');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No auth token available');
      return;
    }

    this.client = new Client({
      brokerURL: `${environment.wsUrl}/ws`,
      connectHeaders: {
        Authorization: `Bearer ${token}`
      },
      debug: (str) => {
        console.debug(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000
    });

    this.client.onConnect = () => {
      console.log('Connected to WebSocket');
      this.connected.next(true);
      this.subscribeToTopics(clientId);
    };

    this.client.onDisconnect = () => {
      console.log('Disconnected from WebSocket');
      this.connected.next(false);
    };

    this.client.onStompError = (frame) => {
      console.error('STOMP error', frame);
      this.errorService.handleError({
        message: 'WebSocket connection error',
        type: 'error'
      });
    };

    this.client.activate();
  }

  private subscribeToTopics(clientId: number) {
    const subscriptionTypes = [
      { topic: 'metrics', route: `/topic/client/${clientId}/metrics` },
      { topic: 'test-runs', route: `/topic/client/${clientId}/test-runs` },
      { topic: 'alerts', route: `/topic/client/${clientId}/alerts` }
    ];

    subscriptionTypes.forEach(({ topic, route }) => {
      this.subscriptions.push(
        this.client.subscribe(route, (message: Message) => {
          this.handleMessage(topic as WebSocketMessage['type'], message);
        })
      );
    });
  }

  private handleMessage(type: WebSocketMessage['type'], message: Message) {
    try {
      const payload = JSON.parse(message.body);
      this.messageSubject.next({
        type,
        payload,
        timestamp: new Date()
      });
    } catch (error) {
      console.error('Error parsing WebSocket message', error);
      this.errorService.handleError({
        message: 'Error processing message',
        type: 'error'
      });
    }
  }

  public sendMessage(destination: string, body: any) {
    if (this.client?.connected) {
      this.client.publish({
        destination,
        body: JSON.stringify(body)
      });
    }
  }

  public disconnect() {
    if (this.client) {
      this.client.deactivate();
    }
    this.connected.next(false);
  }

  public reconnect() {
    this.disconnect();
    this.initializeWebSocket();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.disconnect();
  }
}