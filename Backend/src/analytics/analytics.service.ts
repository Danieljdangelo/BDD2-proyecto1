import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Car, CarDocument } from '../cars/schemas/car.schema';

@Injectable()
export class AnalyticsService {
  constructor(@InjectModel(Car.name) private carModel: Model<CarDocument>) {}

  // Endpoint para obtener ventas por marca y región (usado en el gráfico de BestSelling)
  async getBestSellingByRegion(): Promise<any[]> {
    return this.carModel
      .aggregate([
        {
          $group: {
            _id: { Company: '$Company', Dealer_Region: '$Dealer_Region' },
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
      ])
      .exec();
  }

  // Endpoint para obtener la cantidad de vehículos por rango de precio,
  // filtrado por precio, región y dealership.
  async getVehiclesByPrice(query: {
    minPrice: string;
    maxPrice: string;
    region?: string;
    dealership?: string;
  }): Promise<any[]> {
    const { minPrice, maxPrice, region, dealership } = query;
    // Se asume que en el esquema el campo se llama "Price" y es numérico.
    const match: any = {
      Price: { $gte: Number(minPrice), $lte: Number(maxPrice) },
    };
    if (region) {
      match.Dealer_Region = region;
    }
    if (dealership) {
      match.Dealer_Name = dealership;
    }

    // Usamos $bucketAuto para agrupar automáticamente el campo Price en 5 buckets.
    const buckets = await this.carModel
      .aggregate([
        { $match: match },
        {
          $bucketAuto: {
            groupBy: '$Price',
            buckets: 5,
            output: { count: { $sum: 1 } },
          },
        },
      ])
      .exec();

    // Formateamos cada bucket para que _id sea un string con el rango de precios.
    const result = buckets.map((bucket) => ({
      _id: `${bucket.min} - ${bucket.max}`,
      count: bucket.count,
    }));

    return result;
  }

  async getDealersByRegions(regions: string[]): Promise<string[]> {
    // Si no se pasan regiones, devolver todos los dealers
    const filter =
      regions && regions.length > 0 ? { Dealer_Region: { $in: regions } } : {};
    return this.carModel.distinct('Dealer_Name', filter).exec();
  }

  // Endpoint para obtener las marcas con mayor cantidad de vehículos
  async getTopBrands(): Promise<any[]> {
    return this.carModel
      .aggregate([
        { $group: { _id: '$Company', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ])
      .exec();
  }
}
