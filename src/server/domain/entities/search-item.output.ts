import { ApiResponse, ApiResponseProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

@ApiResponse({
  type: SearchItem,
  description: 'Structured search results item',
  status: 200,
  example: { title: 'nodejs', url: 'https://nodejs.org' },
})
export class SearchItem {
  @ApiResponseProperty({
    type: String,
    example: 'nodejs',
  })
  @Expose()
  title: string

  @ApiResponseProperty({
    type: String,
    example: 'https://nodejs.org',
  })
  @Expose()
  url: string
}
