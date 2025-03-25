// src/cars/cars.controller.ts
import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { CarsService } from './cars.service';
import { Car } from './schemas/car.schema';
import { FindCarQuery } from './dto/find-car.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  async create(@Body() createCarDto: Partial<Car>): Promise<Car> {
    return this.carsService.create(createCarDto);
  }

  @Get()
  async findAll(@Query() query: FindCarQuery): Promise<Car[]> {
    return this.carsService.findAll(query);
  }

  @Get('brands')
  async getBrands(): Promise<string[]> {
    return this.carsService.getBrands();
  }

  @Get('models')
  async getModels(@Query('Company') company: string): Promise<string[]> {
    return this.carsService.getModels(company);
  }

  @Get('dealers')
  async getDealers(@Query('regions') regions: string) {
    const regionArray = regions ? regions.split(',') : [];
    return this.carsService.getDealersByRegions(regionArray);
  }

  @Get('years')
  async getYears(
    @Query('Company') company: string,
    @Query('Model') model: string,
  ): Promise<number[]> {
    return this.carsService.getYears(company, model);
  }
}
