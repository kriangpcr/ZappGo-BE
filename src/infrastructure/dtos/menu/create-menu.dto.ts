import { MenuStatus } from '@domain/model';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMenuDto {
  @ApiProperty({
    description: 'Menu name',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Menu price',
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    description: 'Restaurant id',
    type: String,
    required: true,
  })
  @IsString()
  @IsOptional()
  restaurant_id: string;

  @ApiProperty({
    description: 'Menu status',
    enum: MenuStatus,
    required: false,
  })
  @IsEnum(MenuStatus)
  @IsOptional()
  status: MenuStatus;
}
