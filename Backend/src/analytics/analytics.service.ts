// src/analytics/analytics.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Car, CarDocument } from '../cars/schemas/car.schema';

@Injectable()
export class AnalyticsService {
  constructor(@InjectModel(Car.name) private carModel: Model<CarDocument>) {}

  // Endpoint para obtener los modelos más repetidos por cada marca
  async getBestSelling(): Promise<any[]> {
    // Agrupar por marca y modelo, contar y ordenar
    return this.carModel
      .aggregate([
        {
          $group: {
            _id: { Brand: '$Brand', Model: '$Model' },
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
      ])
      .exec();
  }

  // Endpoint para obtener la cantidad de carros por año
  async getYearlySales(): Promise<any[]> {
    return this.carModel
      .aggregate([
        { $group: { _id: '$Year', count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ])
      .exec();
  }

  // Endpoint para obtener las marcas con mayor cantidad de carros
  async getTopBrands(): Promise<any[]> {
    return this.carModel
      .aggregate([
        { $group: { _id: '$Brand', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ])
      .exec();
  }
}
