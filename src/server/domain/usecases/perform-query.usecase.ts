import { SearchItem, SearchOutput } from '@/server/domain/entities'

export interface PerformQueryUsecase {
  search(params: PerformQueryUsecase.Params): Promise<PerformQueryUsecase.Result>
}

export namespace PerformQueryUsecase {
  export type Params = {
    q: string
    page?: number
    perPage?: number
  }

  export type Result = {
    perPage: number
    total: number
    totalPages: number
    currentPage: number
    data: SearchItem[]
    updatedSearchHistory: SearchOutput[]
  }
}
