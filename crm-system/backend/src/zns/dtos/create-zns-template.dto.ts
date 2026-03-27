import { IsString, IsOptional, IsEnum, IsArray } from 'class-validator';

export enum ZnsTemplateStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  REJECTED = 'REJECTED',
}

export class CreateZnsTemplateDto {
  @IsString()
  name: string;

  @IsString()
  zalo_template_id: string;

  @IsString()
  content: string;

  @IsArray()
  variables: string[];

  @IsOptional()
  @IsEnum(ZnsTemplateStatus)
  status?: ZnsTemplateStatus = ZnsTemplateStatus.ACTIVE;
}

export class ZnsTemplateDto {
  id: string;
  name: string;
  zalo_template_id: string;
  content: string;
  variables: string[];
  status: ZnsTemplateStatus;
  created_at: Date;
  updated_at: Date;
}
