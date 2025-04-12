import { IsEmail, IsString, MinLength, IsOptional, MaxLength } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  name?: string;
} 