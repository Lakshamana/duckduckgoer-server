import { Expose, Type } from 'class-transformer'

import { BaseDto } from './base-dto'
import { SearchItem } from './search-item.output'
import { ApiResponse, ApiResponseProperty } from '@nestjs/swagger'

@ApiResponse({
  type: SearchOutput,
  description: 'Structured saved search results items with hash and search query title',
  status: 200,
  example: { title: 'nodejs', hash: 'd8b6c6e4a0b6e3b1d8b6c6e4a0b6e3b1', results: [SearchItem] },
})
export class SearchOutput extends BaseDto {
  @ApiResponseProperty({
    type: String,
    example: 'nodejs',
  })
  @Expose()
  title: string

  @ApiResponseProperty({
    type: String,
    example: 'd8b6c6e4a0b6e3b1d8b6c6e4a0b6e3b1',
  })
  @Expose()
  hash: string

  @ApiResponseProperty({
    type: [SearchItem],
    example: [SearchItem],
  })
  @Type(() => SearchItem)
  results: SearchItem[]
}
