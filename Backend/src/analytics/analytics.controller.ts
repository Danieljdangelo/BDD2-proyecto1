// src/analytics/analytics.controller.ts
import { Controller, Get } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('best-selling')
  async getBestSelling() {
    return await this.analyticsService.getBestSelling();
  }

  @Get('monthly-sales')
  async getMonthlySales() {
    // Aunque lo llamamos monthly-sales, este endpoint devuelve la cantidad de carros por año
    return await this.analyticsService.getYearlySales();
  }

  @Get('top-brands')
  async getTopBrands() {
    return await this.analyticsService.getTopBrands();
  }
}
