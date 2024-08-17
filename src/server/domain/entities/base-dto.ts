import { ClassConstructor, plainToInstance } from 'class-transformer'

export class BaseDto {
  _id: string

  public static toInstance<T, U>(ResponseDto: ClassConstructor<U>, plainTResponseData: T[]): U[]
  public static toInstance<T, U>(ResponseDto: ClassConstructor<U>, plainTResponseData: T): U {
    return plainToInstance(ResponseDto, plainTResponseData, {
      excludeExtraneousValues: true,
    })
  }
}
