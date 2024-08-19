import { PaginatedSearchResultsOutput } from '@/server/domain/entities'

export interface PerformQueryUsecase {
  search(params: PerformQueryUsecase.Params): Promise<PerformQueryUsecase.Result>
}

export namespace PerformQueryUsecase {
  export type Params = {
    q: string
    page?: number
    perPage?: number
  }

  export type Result = PaginatedSearchResultsOutput
}
