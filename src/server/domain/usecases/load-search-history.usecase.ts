import { SearchHistoryOutput } from '@/server/domain/entities'

export interface LoadSearchHistoryUsecase {
  loadSearchHistory(): Promise<LoadSearchHistoryUsecase.Result>
}

export namespace LoadSearchHistoryUsecase {
  export type Result = SearchHistoryOutput
}
