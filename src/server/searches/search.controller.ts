import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { SearchService } from '@/server/searches/search.service'
import { PaginatedSearchResultsOutput, SearchInput } from '@/server/domain/entities'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { SearchHistoryOutput } from '../domain/entities/search-history.output'

@ApiTags('search')
@Controller('api')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('search')
  @ApiOkResponse({
    description: 'OK',
    type: PaginatedSearchResultsOutput,
    isArray: false,
  })
  search(@Query() data: SearchInput) {
    return this.searchService.search(data)
  }

  @ApiOkResponse({
    description: 'OK',
    type: PaginatedSearchResultsOutput,
    isArray: false,
  })
  @Post('search')
  searchUsingPost(@Body() data: SearchInput) {
    return this.searchService.search(data)
  }

  @Get('search-history')
  @ApiOkResponse({
    description: 'OK',
    type: SearchHistoryOutput,
    isArray: false,
  })
  searchHistory() {
    return this.searchService.loadSearchHistory()
  }
}
