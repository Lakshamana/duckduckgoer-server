import { Injectable } from '@nestjs/common'
import { SafeSearchType, search, SearchResult } from 'duck-duck-scrape'

import { ScrapeDuckDuckGoTaskContract } from '@/server/domain/contracts'
import { BaseDto, SearchOutput } from '@/server/domain/entities'

@Injectable()
export class DuckDuckScrapeAdapter implements ScrapeDuckDuckGoTaskContract {
  async execute(
    query: ScrapeDuckDuckGoTaskContract.Params,
  ): Promise<ScrapeDuckDuckGoTaskContract.Result> {
    const data = await search(query, {
      safeSearch: SafeSearchType.STRICT,
    })

    return BaseDto.factory<SearchResult[], SearchOutput[]>(Array<SearchOutput>, data.results)
  }
}
