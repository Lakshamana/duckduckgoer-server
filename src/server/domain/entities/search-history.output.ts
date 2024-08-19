import { ApiResponseProperty } from '@nestjs/swagger'
import { SearchOutput } from './search.output'

export class SearchHistoryOutput {
  @ApiResponseProperty({
    type: [SearchOutput],
    example: [
      {
        title: 'node',
        hash: '545ea538461003efdc8c81c244531b003f6f26cfccf6c0073b3239fdedf49446',
      },
    ],
  })
  data: SearchOutput[]
}
