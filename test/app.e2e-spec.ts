import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/server/app.module'
import { DuckDuckScrapeAdapter } from '../src/server/infra/adapters/scrape-duckduckgo.adapter'

describe('Search API e2e', () => {
  let app: INestApplication
  let ddgScraperAdapter: DuckDuckScrapeAdapter
  const scrapeResultData = [
    {
      title: 'Node.js — Run JavaScript Everywhere',
      url: 'https://nodejs.org/',
    },
    {
      title: 'Node.js — Download Node.js®',
      url: 'https://nodejs.org/en/download/prebuilt-installer',
    },
    {
      title: 'Node.js — Download Node.js®',
      url: 'https://nodejs.org/en/download/package-manager',
    },
  ]

  beforeEach(async () => {
    ddgScraperAdapter = new DuckDuckScrapeAdapter()

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/api/search', () => {
    return request(app.getHttpServer())
      .get('/api/search')
      .query({ q: 'node', page: 1, perPage: 3 })
      .expect(200)
      .expect({
        total: 3,
        perPage: 5,
        totalPages: 1,
        currentPage: 1,
        data: scrapeResultData,
      })
  })
})
