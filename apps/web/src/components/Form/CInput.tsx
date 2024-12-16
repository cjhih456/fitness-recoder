import type { ReactNode } from 'react'
import type { FieldError, ValidationRule } from 'react-hook-form';
import { useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'

interface CInputProps {
  className?: string
  title: string
  name: string
  multiple?: boolean
  required?: string | boolean
  pattern?: ValidationRule<RegExp>
  min?: number
  max?: number
  accept?: string
  labelChildren?: ReactNode
  children?: ReactNode
  onChange?: (_e: InputEvent) => void
}

type ValidateFun<T> = (_v: T) => string | boolean | undefined
type ValidateType<T> = ValidateFun<T> | Record<string, ValidateFun<T>>

type StrintTypeProps = {
  type?: string
  validate?: ValidateType<string>
}
type NumberTypeProps = {
  type: 'number'
  validate: ValidateType<number>
}
type FileSingleTypeProps = {
  type: 'file'
  accept: string
  validate?: ValidateType<File | FileList>
}
type FileMultiTypeProps = {
  type: 'file'
  multiple: true
  accept: string
  validate?: ValidateType<File[] | FileList>
}

type PatternFilter = ({
  pattern?: ValidationRule<RegExp>;
  valueAsNumber?: false;
  valueAsDate?: false;
} | {
  pattern?: undefined;
  valueAsNumber?: false;
  valueAsDate?: true;
} | {
  pattern?: undefined;
  valueAsNumber?: true;
  valueAsDate?: false;
})

export default function CInput({
  className,
  title,
  name,
  type,
  validate,
  onChange,
  required,
  pattern,
  min,
  max,
  accept,
  multiple,
  children,
  labelChildren
}: CInputProps & (StrintTypeProps | NumberTypeProps | FileSingleTypeProps | FileMultiTypeProps)) {
  const { register, getFieldState } = useFormContext()
  const [errorState, setErrorState] = useState<FieldError | undefined>()

  const requredMessage = useMemo(() => {
    const message = typeof required === 'string' ? required : `Insert ${title}`
    return required ? message : false
  }, [title, required])
  const patternFilter = useMemo<PatternFilter>(() => {
    if (type === 'number') {
      return {
        valueAsDate: false,
        valueAsNumber: true,
        pattern: undefined
      }
    } else if (type === 'date') {
      return {
        valueAsDate: true,
        valueAsNumber: false,
        pattern: undefined
      }
    } else {
      return {
        valueAsDate: false,
        valueAsNumber: false,
        pattern: pattern
      }
    }
  }, [type, pattern])
  return <fieldset>
    <legend>
      {title}
    </legend>
    <div>
      {children}
      <label className='inline-block'>
        <input
          className={className}
          type={type}
          multiple={multiple}
          accept={accept}
          {...register(name, {
            ...patternFilter,
            required: requredMessage,
            validate: validate,
            maxLength: max,
            minLength: min,
            onChange: (e) => {
              setErrorState(getFieldState(name).error)
              onChange && onChange(e)
            }
          })} />
        {labelChildren}
      </label>
    </div>
    <p className='text-red-300'>
      {errorState?.message}
    </p>
  </fieldset>
}