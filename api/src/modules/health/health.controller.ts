import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthController {
  @Get('/__health')
  getReadiness(): string {
    return 'is healthy';
  }
}
