import { Expose } from 'class-transformer'

export class SearchItem {
  @Expose()
  title: string

  @Expose()
  url: string
}
