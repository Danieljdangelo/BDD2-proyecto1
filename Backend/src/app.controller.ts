import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('cars')
export class AppController {
  constructor(private appService: AppService) {}

  @Get('database-uri')
  getDatabaseURI(): string {
    return this.appService.getDatabaseURI();
  }

  @Get('port')
  getPort(): number {
    return this.appService.getPort();
  }

  @Get('cars/featured') 
  getFeaturedCars() {
    return this.appService.getFeaturedCars();
  }

  @Get('cars') // Ruta: GET /cars
  getCars() {
    return this.appService.getCars();
}}
