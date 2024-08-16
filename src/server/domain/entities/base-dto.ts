import { ClassConstructor, Exclude, plainToClass } from 'class-transformer'

export class BaseDto {
  @Exclude()
  _id?: string

  public static factory<T, U>(ResponseDto: ClassConstructor<U>, plainTResponseData: T | T[]): U {
    return plainToClass(ResponseDto, plainTResponseData, {
      excludeExtraneousValues: true,
    })
  }
}
