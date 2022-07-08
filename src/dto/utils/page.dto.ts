import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export default class PageDto {
  @ApiProperty({
    description: 'Retrieved page',
    required: false,
    example: 1,
    type: Number
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  page? = 1;

  @ApiProperty({
    description: 'Amount of retrieved pages',
    required: false,
    example: 10,
    type: Number
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  limit? = 10;
}
