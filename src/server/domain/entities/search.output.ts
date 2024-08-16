import { IsString } from 'class-validator'

export class SearchOutput {
  @IsString()
  title: string

  @IsString()
  url: string
}
