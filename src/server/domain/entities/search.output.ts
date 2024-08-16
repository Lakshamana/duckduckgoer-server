import { Expose } from 'class-transformer'
import { IsString } from 'class-validator'

import { BaseDto } from './base-dto'

export class SearchOutput extends BaseDto {
  @IsString()
  @Expose()
  title: string

  @IsString()
  @Expose()
  url: string
}
