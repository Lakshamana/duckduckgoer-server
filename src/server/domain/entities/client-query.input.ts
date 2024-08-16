import { Type } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator'

export class ClientQueryDto {
  @IsString()
  @IsNotEmpty()
  q: string

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  @IsOptional()
  @IsPositive()
  page?: number

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  @IsOptional()
  perPage?: number
}
