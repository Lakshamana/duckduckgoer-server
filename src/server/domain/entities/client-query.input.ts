import { Type } from 'class-transformer'
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator'

export class SearchInput {
  @IsString()
  @IsNotEmpty()
  q: string

  @IsNumber()
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  @IsOptional()
  @IsPositive()
  page?: number

  @IsNumber()
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  @IsOptional()
  @IsPositive()
  perPage?: number
}
