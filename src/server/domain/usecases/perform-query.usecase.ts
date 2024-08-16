import { SearchOutput } from '@/server/domain/entities'

export interface PerformQueryUsecase {
  execute(query: PerformQueryUsecase.Params): Promise<PerformQueryUsecase.Result>
}

export namespace PerformQueryUsecase {
  export type Params = string
  export type Result = SearchOutput[]
}
