import { IsNotEmpty, IsString } from 'class-validator'

export class ClientQueryDto {
  @IsString()
  @IsNotEmpty()
  q: string
}
