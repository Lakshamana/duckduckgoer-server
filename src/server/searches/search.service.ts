import { Injectable } from '@nestjs/common'

import { PerformQueryUsecase } from '@/server/domain/usecases'
import { DuckDuckScrapeAdapter, GenerateHashAdapter } from '@/server/infra/adapters'
import { SearchRepository } from './search.repository'

@Injectable()
export class SearchService implements PerformQueryUsecase {
  constructor(
    private readonly searchRepository: SearchRepository,
    private readonly hasher: GenerateHashAdapter,
    private readonly scrapeDuckDuckGoAdapter: DuckDuckScrapeAdapter,
  ) {}

  async execute(query: string): Promise<PerformQueryUsecase.Result> {
    const hash = this.hasher.execute(query)

    const savedSearch = await this.searchRepository.findByHash(hash)

    if (savedSearch) {
      return savedSearch.results
    }

    const scrapeResults = await this.scrapeDuckDuckGoAdapter.execute(query)

    await this.searchRepository.create({
      title: query,
      hash,
      results: scrapeResults,
    })

    return scrapeResults
  }
}
