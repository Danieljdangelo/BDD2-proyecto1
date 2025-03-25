import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Car, CarDocument } from './schemas/car.schema';
import { FindCarQuery } from './dto/find-car.dto';

@Injectable()
export class CarsService {
  constructor(@InjectModel(Car.name) private carModel: Model<CarDocument>) {}

  async getBrands(): Promise<string[]> {
    return this.carModel.distinct('Company').exec();
  }

  async getModels(company: string): Promise<string[]> {
    return this.carModel.distinct('Model', { Company: company }).exec();
  }

  async getDealersByRegions(regions: string[]): Promise<string[]> {
    const filter =
      regions && regions.length > 0 ? { Dealer_Region: { $in: regions } } : {};
    return this.carModel.distinct('Dealer_Name', filter).exec() as Promise<
      string[]
    >;
  }

  async getYears(company: string, model: string): Promise<number[]> {
    // Declaramos el tipo de resultados para evitar el retorno inseguro
    const results = (await this.carModel
      .aggregate([
        { $match: { Company: company, Model: model } },
        { $group: { _id: { $year: '$Date' }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ])
      .exec()) as Array<{ _id: number; count: number }>;
    return results.map((item) => item._id);
  }

  async create(createCarDto: Partial<Car>): Promise<Car> {
    const createdCar = new this.carModel(createCarDto);
    return createdCar.save();
  }

  async findAll(query: FindCarQuery): Promise<Car[]> {
    // Definimos filter con un tipo seguro
    const filter: Record<string, unknown> = {};
    if (query.Company) filter.Company = query.Company;
    if (query.Model) filter.Model = query.Model;
    if (query.Year) {
      const year = Number(query.Year);
      filter.Date = {
        $gte: new Date(year, 0, 1),
        $lte: new Date(year, 11, 31),
      };
    }
    return this.carModel.find(filter).exec();
  }
}
