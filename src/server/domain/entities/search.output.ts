import { Expose, Type } from 'class-transformer'

import { BaseDto } from './base-dto'
import { SearchItem } from './search-item.output'

export class SearchOutput extends BaseDto {
  @Expose()
  title: string

  @Expose()
  hash: string

  @Type(() => SearchItem)
  results: SearchItem[]
}
