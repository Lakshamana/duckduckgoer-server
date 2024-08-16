import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { SearchService } from './search.service'
import { SearchController } from './search.controller'
import { SearchRepository } from './search.repository'

import { Search, SearchSchema } from '@/server/database/schemas'
import { DuckDuckScrapeAdapter } from '@/server/infra/adapters'

@Module({
  imports: [MongooseModule.forFeature([{ name: Search.name, schema: SearchSchema }])],
  providers: [SearchService, SearchRepository, DuckDuckScrapeAdapter],
  controllers: [SearchController],
})
export class SearchModule {}
