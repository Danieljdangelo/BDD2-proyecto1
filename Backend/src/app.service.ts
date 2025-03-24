import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Car } from './schemas/car.schema';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService,
    @InjectModel('Car') private carModel: Model<Car>,
  ) {}

  getDatabaseURI(): string {
    return this.configService.get<string>('MONGO_URI','mongodb://localhost:27017/defaultdb');
  }

  getPort(): number {
    
    return this.configService.get<number>('PORT',3000);
  }

  async getFeaturedCars(): Promise<Car[]> {
    return this.carModel.find().exec(); // Obtiene todos los vehículos
  }

  async getCars(): Promise<Car[]> {
    return this.carModel.find().exec(); // Obtiene todos los carros
  }

}
