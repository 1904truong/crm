import { IsString, IsEmail, IsEnum, IsOptional } from 'class-validator';

export enum UserRole {
  ADMIN = 'ADMIN',
  CSKH = 'CSKH',
  TECH = 'TECH',
  MANAGER = 'MANAGER',
}

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  full_name: string;

  @IsOptional()
  @IsString()
  password_hash?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole = UserRole.CSKH;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  full_name?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsOptional()
  is_active?: boolean;
}
