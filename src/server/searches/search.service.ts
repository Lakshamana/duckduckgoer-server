import { Injectable } from '@nestjs/common'

import { LoadSearchHistoryUsecase, PerformQueryUsecase } from '@/server/domain/usecases'
import { DuckDuckScrapeAdapter, GenerateHashAdapter } from '@/server/infra/adapters'
import { SearchRepository } from './search.repository'
import { paginate } from '@/server/common'
import { BaseDto, SearchOutput } from '@/server/domain/entities'

@Injectable()
export class SearchService implements PerformQueryUsecase, LoadSearchHistoryUsecase {
  constructor(
    private readonly searchRepository: SearchRepository,
    private readonly hasher: GenerateHashAdapter,
    private readonly scrapeDuckDuckGoAdapter: DuckDuckScrapeAdapter,
  ) {}

  async loadSearchHistory(): Promise<LoadSearchHistoryUsecase.Result> {
    const results = await this.searchRepository.list()
    return { data: BaseDto.toInstance(SearchOutput, results) }
  }

  async search({
    q,
    page = 1,
    perPage = 10,
  }: PerformQueryUsecase.Params): Promise<PerformQueryUsecase.Result> {
    const hash = this.hasher.execute(q)

    const savedSearch = await this.searchRepository.findByHash(hash)

    let results = savedSearch?.results

    if (!savedSearch) {
      results = await this.scrapeDuckDuckGoAdapter.execute(q)

      await this.searchRepository.create({
        title: q,
        hash,
        results,
      })
    }

    const total = results?.length ?? 0
    const totalPages = Math.ceil(total / perPage)

    const updatedSearchHistory = await this.searchRepository.list()

    return {
      total,
      perPage,
      totalPages,
      currentPage: totalPages ? page : 0,
      data: paginate(results, perPage)[page - 1] ?? [],
      updatedSearchHistory: BaseDto.toInstance(SearchOutput, updatedSearchHistory),
    }
  }
}
