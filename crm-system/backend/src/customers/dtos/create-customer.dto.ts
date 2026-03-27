import {
  IsString,
  IsOptional,
  IsEnum,
  IsEmail,
  IsPhoneNumber,
} from 'class-validator';

export enum CustomerSegment {
  VIP = 'VIP',
  NORMAL = 'NORMAL',
  POTENTIAL = 'POTENTIAL',
}

export enum CustomerType {
  PERSONAL = 'PERSONAL',
  BUSINESS = 'BUSINESS',
  ENTERPRISE = 'ENTERPRISE',
}

export class CreateCustomerDto {
  @IsString()
  full_name: string;

  @IsOptional()
  @IsPhoneNumber('VN')
  phone_primary?: string;

  @IsOptional()
  @IsEmail()
  email_primary?: string;

  @IsOptional()
  @IsEnum(CustomerType)
  customer_type?: CustomerType = CustomerType.PERSONAL;

  @IsOptional()
  @IsEnum(CustomerSegment)
  segment?: CustomerSegment = CustomerSegment.NORMAL;

  @IsOptional()
  @IsString()
  source?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
