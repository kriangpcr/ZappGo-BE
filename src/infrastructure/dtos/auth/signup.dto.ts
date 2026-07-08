import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SignUpDto {
  @ApiProperty({
    description: 'User email',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'User password',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
