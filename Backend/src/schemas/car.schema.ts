import {Schema} from 'mongoose';

export const CarSchema = new Schema({
  ID: { type: Number, required: true }, // Asegúrate de que sea único si es necesario
  Brand: { type: String, required: true },
  Model: { type: String, required: true },
  Year: { type: Number, required: true },
  Color: { type: String, required: true },
  Mileage: { type: Number, required: true },
  Price: { type: Number, required: true },
  Condition: { type: String, required: true },
});

export interface Car extends Document {
  ID: number;
  Brand: string;
  Model: string;
  Year: number;
  Color: string;
  Mileage: number;
  Price: number;
  Condition: string;
}