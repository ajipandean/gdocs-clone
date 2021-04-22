import { Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway()
export class AppGateway implements OnGatewayConnection {
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('send_text_change')
  receiveTextChange(@MessageBody() payload: {}) {
    this.logger.log(`Data: ${payload}`);
  }

  handleConnection() {
    this.logger.log('Client connected');
  }
}
