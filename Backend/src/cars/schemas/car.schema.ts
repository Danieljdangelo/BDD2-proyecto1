// src/cars/schemas/car.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CarDocument = Car & Document;

@Schema({ collection: 'proyecto-BD2' })
export class Car {
  @Prop({ required: true })
  Brand: string;

  @Prop({ required: true })
  Model: string;

  @Prop({ required: true })
  Year: number;

  @Prop({ required: true })
  Color: string;

  @Prop({ required: true })
  Mileage: number;

  @Prop({ required: true })
  Price: number;

  @Prop({ required: true })
  Condition: string;
}

export const CarSchema = SchemaFactory.createForClass(Car);
