import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Car } from './schemas/car.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;
  let carModel: Model<Car>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{
        provide: AppService,
        useValue: {
          getDatabaseURI: jest.fn(),
          getPort: jest.fn(),
          getFeaturedCars: jest.fn(),
        },
      }, {
        provide: getModelToken('Car'),
        useValue: {
          // Mock the methods you need for your tests
          create: jest.fn(),
          find: jest.fn(),
        },
      }],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
    carModel = app.get<Model<Car>>(getModelToken('Car'));
  });

  describe('getFeaturedCars', () => {
    it('should return an array of featured cars', async () => {
      const result: Car[] = [
        new carModel({
          _id: '67d7473209523e0f45e20763', // Mongoose will generate this
          ID: 2,
          Brand: 'Jaguar',
          Model: 'Generic Model 2',
          Year: 2003,
          Color: 'Silver',
          Mileage: 89937,
          Price: 58620,
          Condition: 'New',
        }),
      ];
      jest.spyOn(appService, 'getFeaturedCars').mockResolvedValue(result);

      expect(await appController.getFeaturedCars()).toEqual(result);
      expect(appService.getFeaturedCars).toHaveBeenCalled();
    });
  });
});