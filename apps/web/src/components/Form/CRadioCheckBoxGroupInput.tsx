import { useMemo } from 'react'
import { useFormContext, useFormState } from 'react-hook-form'

type ValidateFun<T> = (_v: T) => string | boolean | undefined
type ValidateType<T> = ValidateFun<T> | Record<string, ValidateFun<T>>

type RadioOption = {
  label?: string
  value: string
  disabled?: boolean
}

interface CRadioCheckBoxGroupInputProps {
  title: string
  name: string
  radioOptions: RadioOption[]
  className?: string
  required?: string | boolean
  onChange?: (_e: InputEvent) => void
}

type RadioTypeProps = {
  validate?: ValidateType<string>
  type: 'radio'
}

type CheckboxTypeProps = {
  validate?: ValidateType<string[]>
  type: 'checkbox'
}

export default function CRadioCheckBoxGroupInput({
  title,
  name,
  radioOptions,
  className,
  required,
  type,
  onChange,
}: CRadioCheckBoxGroupInputProps & (RadioTypeProps | CheckboxTypeProps)) {
  const { register } = useFormContext()

  const formState = useFormState({ name: name })
  const errorMessage = useMemo(() => {
    return String(formState.errors[name]?.message || '')
  }, [formState, name])

  const requredMessage = useMemo(() => {
    const message = typeof required === 'string' ? required : `Select ${title}`
    return required ? message : false
  }, [title, required])

  const inputFields = useMemo(() => {
    return radioOptions.map((options) => {
      return <label key={options.value} className='inline-block'>
        <input
          type={type}
          value={options.value}
          {...register(name, {
            required: requredMessage,
            onChange: (e) => {
              onChange && onChange(e)
            }
          })} />
        {options.label || options.value}
      </label>
    })
  }, [radioOptions, onChange, name, register, requredMessage, type])
  return <fieldset>
    <legend>
      {title}
    </legend>
    <div className={className}>
      {inputFields}
    </div>
    <p className='text-red-300 pt-1 h-5 leading-4'>
      {errorMessage}
    </p>
  </fieldset>
}