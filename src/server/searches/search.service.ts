import { Injectable } from '@nestjs/common'
import { PerformQueryUsecase } from '@/server/domain/usecases'
import { DuckDuckScrapeAdapter } from '@/server/infra/adapters'
import { SearchRepository } from './search.repository'
import { createHash } from 'crypto'

@Injectable()
export class SearchService implements PerformQueryUsecase {
  constructor(
    private readonly searchRepository: SearchRepository,
    private readonly scrapeDuckDuckGoTaskContract: DuckDuckScrapeAdapter,
  ) {}

  async execute(query: string): Promise<PerformQueryUsecase.Result> {
    const hash = createHash('sha256').update(query).digest('hex')

    const savedSearch = await this.searchRepository.findByHash(hash)

    if (savedSearch) {
      return savedSearch.results
    }

    const scrapeResults = await this.scrapeDuckDuckGoTaskContract.execute(query)

    const search = {
      title: query,
      hash,
      results: scrapeResults,
    }

    await this.searchRepository.create(search)

    return scrapeResults
  }
}
