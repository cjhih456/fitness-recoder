import { useMemo, useState } from 'react'
import { FieldError, useFormContext, ValidationRule } from 'react-hook-form'

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
  onChange?: (_e: InputEvent) => void
}

type StrintTypeProps = {
  type?: string
  validate?: (_v: string) => string | boolean | undefined
}
type NumberTypeProps = {
  type: 'number'
  validate: (_v: string) => string | boolean | undefined
}
type FileSingleTypeProps = {
  type: 'file'
  accept: string
  validate?: (_v: File) => string | boolean | undefined
}
type FileMultiTypeProps = {
  type: 'file'
  multiple: true
  accept: string
  validate?: (_v: File[]) => string | boolean | undefined
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
  accept
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
    <input
      className={className}
      type={type}
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
    <span className='text-red-300'>
      {errorState?.message}
    </span>
  </fieldset>
}