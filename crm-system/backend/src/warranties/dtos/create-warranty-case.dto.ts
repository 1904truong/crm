import { IsString, IsOptional, IsEnum } from 'class-validator';

export enum WarrantyStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
}

export class CreateWarrantyCaseDto {
  @IsString()
  customer_product_id: string;

  @IsString()
  issue_description: string;

  @IsOptional()
  @IsString()
  resolution?: string;
}

export class UpdateWarrantyCaseDto {
  @IsOptional()
  @IsEnum(WarrantyStatus)
  status?: WarrantyStatus;

  @IsOptional()
  @IsString()
  resolution?: string;
}

export class WarrantyCaseDto {
  id: string;
  customer_product_id: string;
  status: WarrantyStatus;
  issue_description: string;
  resolution: string;
  opened_at: Date;
  closed_at: Date;
  created_at: Date;
  updated_at: Date;
}
