// src/cars/schemas/car.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CarDocument = Car & Document;

@Schema({ collection: 'proyecto-BD2' })
export class Car {
  @Prop({ required: true })
  Car_id: string;

  @Prop({ required: true })
  Date: Date;

  @Prop({ required: true })
  Company: string; // Representa la marca

  @Prop({ required: true })
  Model: string;

  @Prop({ required: true })
  Color: string;

  @Prop({ required: true })
  Price: number;

  // Agrega los campos para los dealers:
  @Prop({ required: true })
  Dealer_Name: string;

  @Prop({ required: true })
  Dealer_Region: string;
}

export const CarSchema = SchemaFactory.createForClass(Car);
