import { Injectable } from '@nestjs/common'
import { SafeSearchType, search } from 'duck-duck-scrape'

import { ScrapeDuckDuckGoAdapterContract } from '@/server/domain/contracts'
import { BaseDto, SearchItem } from '@/server/domain/entities'

@Injectable()
export class DuckDuckScrapeAdapter implements ScrapeDuckDuckGoAdapterContract {
  async execute(
    query: ScrapeDuckDuckGoAdapterContract.Params,
  ): Promise<ScrapeDuckDuckGoAdapterContract.Result> {
    const data = await search(query, {
      safeSearch: SafeSearchType.STRICT,
    })

    return BaseDto.toInstance(SearchItem, data.results)
  }
}
