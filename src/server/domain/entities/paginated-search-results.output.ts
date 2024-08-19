import { ApiResponseProperty } from '@nestjs/swagger'
import { SearchItem } from './search-item.output'
import { SearchOutput } from './search.output'

export class PaginatedSearchResultsOutput {
  @ApiResponseProperty({ type: Number, example: 10 })
  perPage: number

  @ApiResponseProperty({ type: Number, example: 25 })
  total: number

  @ApiResponseProperty({ type: Number, example: 3 })
  totalPages: number

  @ApiResponseProperty({ type: Number, example: 1 })
  currentPage: number

  @ApiResponseProperty({
    type: [SearchItem],
    example: [
      {
        title: 'Go Beyond Google: The Best Alternative Search Engines for 2024',
        url: 'https://www.pcmag.com/picks/go-beyond-google-best-alternative-search-engines',
      },
      {
        title: '19 Alternative Search Engines To Use in 2024 - Kinsta®',
        url: 'https://kinsta.com/blog/alternative-search-engines/',
      },
      {
        title: 'Search outside the box: How we&#x27;re making Search more ... - The Keyword',
        url: 'https://blog.google/products/search/new-search-technology/',
      },
    ],
  })
  data: SearchItem[]

  @ApiResponseProperty({
    type: [SearchOutput],
    example: [
      {
        title: 'node',
        hash: '545ea538461003efdc8c81c244531b003f6f26cfccf6c0073b3239fdedf49446',
      },
    ],
  })
  updatedSearchHistory: SearchOutput[]
}
