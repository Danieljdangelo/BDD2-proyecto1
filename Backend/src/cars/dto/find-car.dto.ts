// src/cars/dto/find-car.dto.ts
export interface FindCarQuery {
  Brand?: string;
  Model?: string;
  Year?: string;
  Color?: string;
  Mileage?: string;
  Price?: string;
  Condition?: string;
}
