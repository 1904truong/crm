import { IsString, IsEnum, IsBoolean, IsOptional } from 'class-validator';

export enum ContactType {
  PHONE = 'PHONE',
  EMAIL = 'EMAIL',
  ZALO = 'ZALO',
  FACEBOOK = 'FACEBOOK',
}

export class CustomerContactDto {
  id: string;
  customer_id: string;
  type: ContactType;
  value: string;
  is_primary: boolean;
  created_at: Date;
}

export class CreateCustomerContactDto {
  @IsEnum(ContactType)
  type: ContactType;

  @IsString()
  value: string;

  @IsOptional()
  @IsBoolean()
  is_primary?: boolean = false;
}

export class UpdateCustomerContactDto {
  @IsOptional()
  @IsEnum(ContactType)
  type?: ContactType;

  @IsOptional()
  @IsString()
  value?: string;

  @IsOptional()
  @IsBoolean()
  is_primary?: boolean;
}
