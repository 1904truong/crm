import {
  IsString,
  IsDateString,
  IsInt,
  IsOptional,
  Min,
  Max,
} from 'class-validator';

export class CreateCustomerProductDto {
  @IsString()
  customer_id: string;

  @IsOptional()
  @IsString()
  purchase_id?: string;

  @IsString()
  product_model: string;

  @IsOptional()
  @IsString()
  product_serial?: string;

  @IsDateString()
  purchase_date: string;

  @IsInt()
  @Min(1)
  @Max(360)
  warranty_months: number = 24;
}

export class CustomerProductDto {
  id: string;
  customer_id: string;
  purchase_id: string;
  product_model: string;
  product_serial: string;
  purchase_date: Date;
  warranty_months: number;
  warranty_end_at: Date;
  created_at: Date;
  updated_at: Date;
}
