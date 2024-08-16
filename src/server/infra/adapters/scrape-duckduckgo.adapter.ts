import { Injectable } from '@nestjs/common'
import { SafeSearchType, search } from 'duck-duck-scrape'

import { ScrapeDuckDuckGoTaskContract } from '@/server/domain/contracts'

@Injectable()
export class DuckDuckScrapeAdapter implements ScrapeDuckDuckGoTaskContract {
  async execute(
    query: ScrapeDuckDuckGoTaskContract.Params,
  ): Promise<ScrapeDuckDuckGoTaskContract.Result> {
    const data = await search(query, {
      safeSearch: SafeSearchType.STRICT,
    })

    return data.results
  }
}
