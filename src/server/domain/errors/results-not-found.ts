import { HttpException, HttpStatus } from '@nestjs/common'

export class ResultsNotFoundException extends HttpException {
  constructor() {
    super('Results not found', HttpStatus.NOT_FOUND)
  }
}
