import { Controller, Get, Query } from '@nestjs/common'
import { SearchService } from '@/server/searches'
import { ClientQueryDto } from '../domain/entities'

@Controller('api')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('search')
  search(@Query() data: ClientQueryDto) {
    return this.searchService.execute(data.q)
  }
}
