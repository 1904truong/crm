import { IsString, IsDateString, IsOptional, IsEnum } from 'class-validator';

export enum ReminderStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export class CreateReminderDto {
  @IsString()
  customer_id: string;

  @IsOptional()
  @IsString()
  interaction_id?: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDateString()
  follow_up_at: string;

  @IsOptional()
  @IsString()
  owner_id?: string;
}

export class UpdateReminderDto {
  @IsOptional()
  @IsEnum(ReminderStatus)
  status?: ReminderStatus;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class ReminderDto {
  id: string;
  customer_id: string;
  interaction_id: string;
  title: string;
  description: string;
  follow_up_at: Date;
  status: ReminderStatus;
  created_at: Date;
  updated_at: Date;
}
