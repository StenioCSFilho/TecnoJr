import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World galdinin!';
  }

  getHello2(): string {
    return 'Hello World!2463';
  }
}
