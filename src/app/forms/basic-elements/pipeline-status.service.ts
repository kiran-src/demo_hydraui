import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class PipelineStatusService {
  private socket$: WebSocketSubject<any>;

  constructor() {
    // Replace 'ws://localhost:8080/status' with your WebSocket server URL
    this.socket$ = webSocket('ws://localhost:8080/status');
  }

  // Observable stream for pipeline status updates
  getStatusUpdates() {
    return this.socket$;
  }

  // Send a message to the WebSocket server if needed
  sendMessage(message: any) {
    this.socket$.next(message);
  }

  // Close the WebSocket connection
  closeConnection() {
    this.socket$.complete();
  }
}
