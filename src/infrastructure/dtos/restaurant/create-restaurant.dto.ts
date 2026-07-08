import { MenuStatus } from '@domain/model';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import {
  HasMimeType,
  IsFile,
  MaxFileSize,
  MemoryStoredFile,
} from 'nestjs-form-data';
export class CreateRestaurantDto {
  @ApiProperty({
    description: 'Restaurant name',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Restaurant description',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Open time',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
  open_time: string;

  @ApiProperty({
    description: 'Close time',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
  close_time: string;

  @IsFile({
    message: 'This field is required',
  })
  @HasMimeType(['image/jpeg', 'image/png'])
  @MaxFileSize(10485760, { message: `Maximum file size is ` })
  img: MemoryStoredFile;
}
