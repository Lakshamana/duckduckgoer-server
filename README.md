# DuckDuckGoer

_If there's a DuckDuckGo, there is a DuckDuckGoer..._

## Description

Server-side project for DuckDuckGoer, a unofficial full text search for DuckDuckGo. Notice that this project is intended to be run with the [DuckDuckGoer client-side project](https://github.com/Lakshamana/duckduckgoer-client). This project is a simple API that fetches data from the DuckDuckGo API and returns it to the client-side.

Note that the first request may take a long to respond, as the DuckDuckGo API is a Instant Answer API rather than a Full Search API, as noted in [this StackOverflow discussion](https://stackoverflow.com/questions/37012469/duckduckgo-api-getting-search-results). So the solution was to scrape DuckDuckGo query result page, cache the data and then return to the client-side. For the next queries using the same text the response will be much faster, since the server generates SHA256 hash from the query and check against other hashes in the database.

## Software Requirements
- [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) (v22.0.0 was used)
- A working MongoDB or Docker and Docker Compose installations
- A terminal emulator

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

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

## Documentation
Be sure to access `http://localhost:3333/api` to check API documentation.
