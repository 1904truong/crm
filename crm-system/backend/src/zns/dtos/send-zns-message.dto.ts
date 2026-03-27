import {
  IsString,
  IsPhoneNumber,
  IsObject,
  IsOptional,
  IsEnum,
} from 'class-validator';

export enum SendMode {
  MANUAL = 'MANUAL',
  AUTO = 'AUTO',
}

export class SendZnsMessageDto {
  @IsString()
  customer_id: string;

  @IsString()
  template_id: string;

  @IsPhoneNumber('VN')
  phone_number: string;

  @IsObject()
  payload: Record<string, any>;

  @IsOptional()
  @IsString()
  sent_by?: string;

  @IsOptional()
  @IsEnum(SendMode)
  send_mode?: SendMode = SendMode.MANUAL;
}

export class ZnsMessageLogDto {
  id: string;
  customer_id: string;
  template_id: string;
  phone_number: string;
  payload: Record<string, any>;
  status: string;
  zalo_msg_id: string;
  error_code: string;
  sent_at: Date;
  delivered_at: Date;
  created_at: Date;
}
