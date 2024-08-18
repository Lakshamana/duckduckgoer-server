import { Test } from '@nestjs/testing'
import { SearchController } from './search.controller'
import { SearchRepository } from './search.repository'
import { SearchService } from './search.service'
import { DuckDuckScrapeAdapter, GenerateHashAdapter } from '../infra/adapters'
import { BaseDto, SearchOutput } from '../domain/entities'

const mockSearchRepository = () => ({
  list: jest.fn(),
})

describe('SearchController', () => {
  let controller: SearchController
  let searchRepository: SearchRepository

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        SearchService,
        SearchRepository,
        DuckDuckScrapeAdapter,
        GenerateHashAdapter,
        {
          provide: SearchRepository,
          useFactory: mockSearchRepository,
        },
      ],
      controllers: [SearchController],
    }).compile()

    searchRepository = moduleRef.get<SearchRepository>(SearchRepository)
    controller = moduleRef.get<SearchController>(SearchController)
  })

  describe('searchHistory', () => {
    it('should return search history', async () => {
      const data = [
        {
          title: 'Node.js — Run JavaScript Everywhere',
          hash: '3987651037b6c1d2db488eafb77939b58031ceabb6794f0df551e1bd45da914e',
        },
        {
          title: 'Node.js — Download Node.js®',
          hash: '93b172cbdf0acd564fa1666d4a1340337a1399e9a8a0a7328192717e977dff2b',
        },
        {
          title: 'Node.js — Download Node.js®',
          hash: '106c9f8feb566b738a8b2721ccc70eb899245e29a00b9d114e5661b50f55636a',
        },
      ]
      jest
        .spyOn(searchRepository, 'list')
        .mockImplementation(() => Promise.resolve(BaseDto.toInstance(SearchOutput, data)))
      expect(await controller.searchHistory()).toEqual({ data })
    })
  })
})
