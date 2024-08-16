import { SearchOutput } from '@/server/domain/entities'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type SearchDocument = HydratedDocument<Search>

@Schema()
export class Search {
  @Prop({ required: true })
  title: string

  @Prop({ required: true, unique: true })
  hash: string

  @Prop({ type: () => SearchOutput })
  results: SearchOutput[]
}

export const SearchSchema = SchemaFactory.createForClass(Search)
SearchSchema.index({ hash: 1 }, { unique: true })
