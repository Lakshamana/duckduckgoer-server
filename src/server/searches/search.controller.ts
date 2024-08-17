import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { SearchService } from '@/server/searches/search.service'
import { ClientQueryDto } from '@/server/domain/entities'

@Controller('api')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('search')
  search(@Query() data: ClientQueryDto) {
    return this.searchService.search(data)
  }

  @Post('search')
  searchUsingPost(@Body() data: ClientQueryDto) {
    return this.searchService.search(data)
  }

  @Get('search-history')
  searchHistory() {
    return this.searchService.loadSearchHistory()
  }
}
