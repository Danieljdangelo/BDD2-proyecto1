import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { CarSchema } from './schemas/car.schema';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'), // Accede a MONGO_URI
      }),
      inject: [ConfigService], }),
      MongooseModule.forFeature([{ name: 'Car', schema: CarSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
