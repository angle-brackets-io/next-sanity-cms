import { ArrayOfObjectsInputProps } from 'sanity'

export function getArrayInput({ maxLength = 1 }: { maxLength: number }) {
  return function ArrayInput(props: ArrayOfObjectsInputProps) {
    const { value, arrayFunctions } = props
    return props.renderDefault({
      ...props,
      arrayFunctions:
        value && value.length >= maxLength ? () => null : arrayFunctions,
    })
  }
}
