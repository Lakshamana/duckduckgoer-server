import { GenerateHashAdapterContract } from '@/server/domain/contracts'
import { Injectable } from '@nestjs/common'
import { createHash } from 'crypto'

@Injectable()
export class GenerateHashAdapter implements GenerateHashAdapterContract {
  execute(data: string): string {
    return createHash('sha256').update(data).digest('hex')
  }
}
