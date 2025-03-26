// src/analytics/analytics.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('best-selling')
  async getBestSelling() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.analyticsService.getBestSellingByRegion();
  }

  @Get('brands-total-sum')
  async getBrandsTotalSum(@Query() query: { region?: string; brand?: string }) {
    return this.analyticsService.getBrandsTotalSum(query);
  }

  @Get('vehicles-by-price')
  getVehiclesByPrice(
    @Query()
    query: {
      minPrice: string;
      maxPrice: string;
      region?: string;
      dealership?: string;
    },
  ) {
    return this.analyticsService.getVehiclesByPrice(query);
  }

  // @Get('monthly-sales')
  // async getMonthlySales() {
  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  //   return await this.analyticsService.getYearlySales();
  // }

  @Get('top-brands')
  async getTopBrands() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.analyticsService.getTopBrands();
  }
}
