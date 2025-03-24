import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Car } from './schemas/car.schema';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

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
      },],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('getDatabaseURI', () => {
    it('should return the database URI', () => {
      const result = 'mongodb://localhost:27017/defaultdb';
      jest.spyOn(appService, 'getDatabaseURI').mockReturnValue(result);

      expect(appController.getDatabaseURI()).toBe(result);
      expect(appService.getDatabaseURI).toHaveBeenCalled();
    });
  });

  describe('getPort', () => {
    it('should return the port number', () => {
      const result = 3000;
      jest.spyOn(appService, 'getPort').mockReturnValue(result);

      expect(appController.getPort()).toBe(result);
      expect(appService.getPort).toHaveBeenCalled();
    });
  });

  // describe('getFeaturedCars', () => {
  //   it('should return an array of featured cars', async () => {
  //     const result: Car[] = [
  //       {
  //         // _id: '67d7473209523e0f45e20763',
  //         ID: 2,
  //         Brand: 'Jaguar',
  //         Model: 'Generic Model 2',
  //         Year: 2003,
  //         Color: 'Silver',
  //         Mileage: 89937,
  //         Price: 58620,
  //         Condition: 'New',
  //       },
  //     ];
  //     jest.spyOn(appService, 'getFeaturedCars').mockResolvedValue(result);

  //     expect(await appController.getFeaturedCars()).toEqual(result);
  //     expect(appService.getFeaturedCars).toHaveBeenCalled();
  //   });
  // });
  
});
