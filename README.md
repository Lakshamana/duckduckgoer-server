# DuckDuckGoer

_If there's a DuckDuckGo, there is a DuckDuckGoer..._

## Description

Server-side project for DuckDuckGoer, a unofficial full text search for DuckDuckGo. This project is a simple API that fetches data from the DuckDuckGo API and returns it to the client-side.

Note that the first request may take a long to respond, as the DuckDuckGo API is a Instant Answer API rather than a Full Search API, as noted in [this StackOverflow discussion](https://stackoverflow.com/questions/37012469/duckduckgo-api-getting-search-results). So the solution was to scrape DuckDuckGo query result page, cache the data and then return to the client-side. For the next queries using the same text the response will be much faster, since the server generates SHA256 hash from the query and check against other hashes in the database.

I have chosen NestJS due to its simplicity and ease of use, as well as its performance. The project is also using Jest for testing and MongoDB for data storage.

**Notice that this project is intended to be run with the [DuckDuckGoer client-side project](https://github.com/Lakshamana/duckduckgoer-client)**

## Software Requirements

- [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) (v22.0.0 was used)
- A working MongoDB or Docker and Docker Compose installations
- A terminal emulator

## Installation

Open a terminal and head to the project root. Then run the following commands:

```bash
$ docker-compose up -d  # assuming you have Docker and Docker Compose installed (avoid if you already have a working MongoDB instance, since it due to port clashing)
$ cp .env.example .env  # and fill the environment variables
$ npm install
```

## Running the app

```bash
# develop mode
$ npm start

# watch mode
$ npm run start:dev
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

### Environment Variables

Edit your env variables in the `.env` file. The following variables are available:

- DB_URL: URL for a working MongoDB instance, use database `searches`. Migration will be run as soon as you run the server

Example: `DB_URL=http://localhost:27071/searches`

- PORT: Port for the server to run. Defaults to 3333
  Example: `PORT=3333`

## API

- GET `/api/search`

Retrieves serach results from DuckDuckGo scraper or cache. Also returns search history to avoid client to make another request

Query Parameters:

- q: string, required, non-empty. Refers to the query string to be sent to duckduckgo scraper.
- page: number, optional, defaults to 1. Refers to the search results page number to be fetch.
- perPage: number, optional, deaults to 10. Refers to the number of results per page.

Response:

- Status: 200 OK

- JSON body:

```json
{
  "total": 22,
  "perPage": 5,
  "totalPages": 5,
  "currentPage": 1,
  "data": [
    {
      "title": "Node.js — Run JavaScript Everywhere",
      "url": "https://nodejs.org/"
    },
    {
      "title": "Node.js — Download Node.js®",
      "url": "https://nodejs.org/en/download/prebuilt-installer"
    },
    ...
  ],
  "updatedSearchHistory": [
    {
      "title": "node",
      "hash": "545ea538461003efdc8c81c244531b003f6f26cfccf6c0073b3239fdedf49446"
    },
    {
      "title": "guitar",
      "hash": "8e1f8aeaec40b42ae2150af45980ce28158e9dddda4a9eeb8a6141577eefe359"
    },
    {
      "title": "duckduckgo",
      "hash": "0113451bc3b0343f98a9230d145b3d0803285ca1f6b84d857923ac8ee155e1b8"
    }
  ]
}
```

- POST `/api/search`
Same as previous request

JSON Body:
- q: string, required, non-empty. Refers to the query string to be sent to duckduckgo scraper.
- page: number, optional, defaults to 1. Refers to the search results page number to be fetch.
- perPage: number, optional, deaults to 10. Refers to the number of results per page.

```json
{
  "q": "node",
  "page": 1,
  "perPage": 10
}
```

Response:

- Status: 200 OK
- Sample body:

```json
{
  "total": 22,
  "perPage": 5,
  "totalPages": 5,
  "currentPage": 1,
  "data": [
    {
      "title": "Node.js — Run JavaScript Everywhere",
      "url": "https://nodejs.org/"
    },
    {
      "title": "Node.js — Download Node.js®",
      "url": "https://nodejs.org/en/download/prebuilt-installer"
    },
    ...
  ],
  "updatedSearchHistory": [
    {
      "title": "node",
      "hash": "545ea538461003efdc8c81c244531b003f6f26cfccf6c0073b3239fdedf49446"
    },
    {
      "title": "guitar",
      "hash": "8e1f8aeaec40b42ae2150af45980ce28158e9dddda4a9eeb8a6141577eefe359"
    },
    {
      "title": "duckduckgo",
      "hash": "0113451bc3b0343f98a9230d145b3d0803285ca1f6b84d857923ac8ee155e1b8"
    }
  ]
}
```

- GET /api/search-history

Retrieves user search history

Response:

- Status: 200 OK

- JSON body:
```json
{
	"data": [
		{
			"title": "nodejs",
			"hash": "3987651037b6c1d2db488eafb77939b58031ceabb6794f0df551e1bd45da914e"
		},
		{
			"title": "duckduckgo",
			"hash": "93b172cbdf0acd564fa1666d4a1340337a1399e9a8a0a7328192717e977dff2b"
		},
		{
			"title": "nestjs",
			"hash": "106c9f8feb566b738a8b2721ccc70eb899245e29a00b9d114e5661b50f55636a"
		},
    ...
	]
}
```
Be sure to access `http://localhost:<PORT>/api` to check API documentation.
