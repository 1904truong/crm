import { IsString, IsEnum, IsOptional } from 'class-validator';

export enum InteractionType {
  CALL = 'CALL',
  SMS = 'SMS',
  ZALO = 'ZALO',
  EMAIL = 'EMAIL',
  MEETING = 'MEETING',
  OTHER = 'OTHER',
}

export class CreateInteractionDto {
  @IsString()
  customer_id: string;

  @IsEnum(InteractionType)
  type: InteractionType;

  @IsString()
  content: string;

  @IsString()
  owner_id: string;

  @IsOptional()
  @IsString()
  follow_up_date?: string;
}

export class InteractionDto {
  id: string;
  customer_id: string;
  type: InteractionType;
  content: string;
  owner_id: string;
  created_at: Date;
  updated_at: Date;
}
