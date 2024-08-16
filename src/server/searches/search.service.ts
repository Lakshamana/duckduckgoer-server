import { Injectable } from '@nestjs/common'

import { PerformQueryUsecase } from '@/server/domain/usecases'
import { DuckDuckScrapeAdapter, GenerateHashAdapter } from '@/server/infra/adapters'
import { SearchRepository } from './search.repository'
import { paginate } from '../common'

@Injectable()
export class SearchService implements PerformQueryUsecase {
  constructor(
    private readonly searchRepository: SearchRepository,
    private readonly hasher: GenerateHashAdapter,
    private readonly scrapeDuckDuckGoAdapter: DuckDuckScrapeAdapter,
  ) {}

  async execute({
    q,
    page = 1,
    perPage = 10,
  }: PerformQueryUsecase.Params): Promise<PerformQueryUsecase.Result> {
    const hash = this.hasher.execute(q)

    const savedSearch = await this.searchRepository.findByHash(hash, page, perPage)

    let results = savedSearch?.results

    if (!results) {
      results = await this.scrapeDuckDuckGoAdapter.execute(q)

      await this.searchRepository.create({
        title: q,
        hash,
        results,
      })
    }

    const total = results?.length ?? 0
    const totalPages = Math.ceil(total / perPage)

    return {
      total,
      perPage,
      totalPages,
      currentPage: totalPages ? page : 0,
      data: paginate(results, perPage)[page - 1] ?? [],
    }
  }
}
