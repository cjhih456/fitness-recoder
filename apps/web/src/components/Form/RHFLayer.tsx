import type { ControllerFieldState, ControllerRenderProps, UseControllerProps, UseFormStateReturn } from 'react-hook-form';
import { Controller } from 'react-hook-form';

interface RHFLayerProps<T extends RHFValues> {
  title: string
  children: (_args: {
    field: ControllerRenderProps<T>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<T>;
  }) => React.ReactElement
  errorMessage?: string
}

export default function RHFLayer<T extends RHFValues>(props: RHFLayerProps<T> & UseControllerProps<T>) {
  const { title, children, errorMessage, ...controllerProps } = props

  return <Controller
    {...controllerProps}
    render={(render) => {
      const errorMessageDisplay = render.fieldState?.isTouched && render.fieldState.error?.message || errorMessage || ''
      return <fieldset>
        <legend>
          {title}
        </legend>
        <div>
          {children(render)}
        </div>
        <p className='text-red-300'>
          {errorMessageDisplay}
        </p>
      </fieldset>
    }}
  >
  </Controller>
}