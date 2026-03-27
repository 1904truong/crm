import { IsString, IsDateString, IsOptional } from 'class-validator';

export class CreatePurchaseDto {
  @IsString()
  customer_id: string;

  @IsDateString()
  purchase_date: string;

  @IsOptional()
  @IsString()
  source?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class PurchaseDto {
  id: string;
  customer_id: string;
  purchase_date: Date;
  source: string;
  notes: string;
  created_at: Date;
}
