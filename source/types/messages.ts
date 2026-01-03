export interface PingMessage {
  type: 'PING';
}

export interface PongMessage {
  type: 'PONG';
  timestamp: number;
}

export type ExtensionMessage = PingMessage | PongMessage;
