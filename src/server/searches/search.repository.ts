import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Search, SearchDocument } from '@/server/database/schemas'

@Injectable()
export class SearchRepository {
  constructor(@InjectModel(Search.name) private readonly searchModel: Model<SearchDocument>) {}

  async create(search: Search): Promise<Search> {
    return this.searchModel.create(search)
  }

  async findByHash(hash: string): Promise<Search> {
    return this.searchModel
      .findOneAndUpdate({ hash }, { updatedAt: new Date() }, { new: true })
      .lean()
  }

  async list(): Promise<Search[]> {
    return this.searchModel.find({}, {}, { sort: { updatedAt: -1 } }).lean()
  }
}
