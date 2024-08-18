import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator'

export class SearchInput {
  @ApiProperty({ required: true, type: String, description: 'Search query', example: 'nodejs' })
  @IsString()
  @IsNotEmpty()
  q: string

  @ApiProperty({ type: Number, description: 'Page number', minimum: 1, default: 1, example: 1 })
  @ApiPropertyOptional()
  @IsNumber()
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  @IsOptional()
  @IsPositive()
  page?: number

  @ApiProperty({
    type: Number,
    minimum: 1,
    description: 'Number of elements per page, page size',
    default: 10,
    example: 5,
  })
  @ApiPropertyOptional()
  @IsNumber()
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  @IsOptional()
  @IsPositive()
  perPage?: number
}
