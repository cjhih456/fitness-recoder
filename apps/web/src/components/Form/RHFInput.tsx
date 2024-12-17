import type { ChangeEvent, ChangeEventHandler, ReactNode } from 'react'
import type { UseControllerProps } from 'react-hook-form';
import { useMemo } from 'react'
import { useController } from 'react-hook-form';
import RHFLayer from './RHFLayer';

interface RHFInputProps {
  className?: string
  title: string
  name: string
  multiple?: boolean
  accept?: string
  labelChildren?: ReactNode
  children?: ReactNode
  onChange?: ChangeEventHandler<HTMLInputElement>
}

type ValidateFun<T> = (_v: T) => string | boolean | undefined
type ValidateType<T> = ValidateFun<T> | Record<string, ValidateFun<T>>

type FileTypeProps = {
  type: 'file'
  multiple?: boolean
  onChange?: (_e: ChangeEvent<HTMLInputElement>, _callBack: (..._event: any[]) => void) => void
  max?: number
  rules?: {
    validate?: ValidateType<File[] | FileList>
  }
}
type NumberTypeProps = {
  type: 'number'
  rules?: {
    validate: ValidateType<number>
  }
}
type StrintTypeProps = {
  type?: string
  rules?: {
    validate?: ValidateType<string>
  }
}

export default function RHFInput(props: UseControllerProps & RHFInputProps & (FileTypeProps | NumberTypeProps | StrintTypeProps)) {
  const {
    title,
    children,
    labelChildren,
    rules,
    onChange,
    ...inputProps
  } = props
  const requredMessage = useMemo(() => {
    const message = typeof rules?.required === 'string' ? rules?.required : `Insert ${title}`
    return rules?.required ? message : false
  }, [title, rules?.required])

  const defaultValue = useMemo(() => {
    switch (props.type) {
      case 'file': return []
      case 'number': return 0
      default:
        return ''
    }
  }, [props.type])

  const { fieldState, field } = useController({
    ...props,
    defaultValue: defaultValue,
    rules: {
      ...rules,
      onChange,
      validate: rules?.validate,
      required: requredMessage
    }
  })

  return <RHFLayer title={title} rhfFieldstatus={fieldState}>
    {children}
    <label className='inline-block'>
      <input
        {...inputProps}
        {...field}
        onChange={(e) => {
          if (props.type === 'file') {
            props.onChange && props.onChange(e)
          } else {
            field.onChange(e)
          }
        }}
      />
      {labelChildren}
    </label>
  </RHFLayer>
}