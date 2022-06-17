import { ClassDecorator } from '../types/class-decorator.type'
import { Constructor } from '../interfaces/constructor.interface'

interface Data {
  parameters: string[]
}

export const Command = (data?: Data): ClassDecorator<any> => {
  return (target: Constructor) => {
    return class extends target {
      public readonly parameters = data?.parameters
    }
  }
}
