import { SearchOutput } from '@/server/domain/entities'

export class ScrapeDuckDuckGoTaskContract {
  execute: (
    query: ScrapeDuckDuckGoTaskContract.Params,
  ) => Promise<ScrapeDuckDuckGoTaskContract.Result>
}

export namespace ScrapeDuckDuckGoTaskContract {
  export type Params = string
  export type Result = SearchOutput[]
}
