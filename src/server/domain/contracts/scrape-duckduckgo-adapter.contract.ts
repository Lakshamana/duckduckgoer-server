import { SearchOutput } from '@/server/domain/entities'

export class ScrapeDuckDuckGoAdapterContract {
  execute: (
    query: ScrapeDuckDuckGoAdapterContract.Params,
  ) => Promise<ScrapeDuckDuckGoAdapterContract.Result>
}

export namespace ScrapeDuckDuckGoAdapterContract {
  export type Params = string
  export type Result = SearchOutput[]
}
