import { ClassConstructor, Exclude, plainToInstance } from 'class-transformer'

export class BaseDto {
  @Exclude()
  private _id?: string

  public static factory<T, U>(ResponseDto: ClassConstructor<U>, plainTResponseData: T[]): U[]
  public static factory<T, U>(ResponseDto: ClassConstructor<U>, plainTResponseData: T): U {
    return plainToInstance(ResponseDto, plainTResponseData, {
      excludeExtraneousValues: true,
    })
  }
}
