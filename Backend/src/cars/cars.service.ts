// src/cars/cars.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Car, CarDocument } from './schemas/car.schema';
import { FindCarQuery } from './dto/find-car.dto';

@Injectable()
export class CarsService {
  constructor(@InjectModel(Car.name) private carModel: Model<CarDocument>) {}

  async getBrands(): Promise<string[]> {
    return this.carModel.distinct('Brand').exec();
  }

  async getModels(brand: string): Promise<string[]> {
    return this.carModel.distinct('Model', { Brand: brand }).exec();
  }

  async getYears(brand: string, model: string): Promise<number[]> {
    return this.carModel
      .distinct('Year', { Brand: brand, Model: model })
      .exec();
  }

  async create(createCarDto: Partial<Car>): Promise<Car> {
    const createdCar = new this.carModel(createCarDto);
    return createdCar.save();
  }

  async findAll(query: FindCarQuery): Promise<Car[]> {
    const filter: Record<string, unknown> = {};
    if (query.Brand) filter.Brand = query.Brand;
    if (query.Model) filter.Model = query.Model;
    if (query.Year) filter.Year = Number(query.Year);
    if (query.Color) filter.Color = query.Color;
    if (query.Mileage) filter.Mileage = Number(query.Mileage);
    if (query.Price) filter.Price = Number(query.Price);
    if (query.Condition) filter.Condition = query.Condition;

    return this.carModel.find(filter).exec();
  }
}
