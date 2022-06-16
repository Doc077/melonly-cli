import { ClassDecorator } from '../types/class-decorator.type'

interface Data {
  arguments: string[]
}

export const Command = (data?: Data): ClassDecorator<any> => {
  return (target: any) => {
    if (data) {
      target.arguments = data.arguments
    }
  }
}
