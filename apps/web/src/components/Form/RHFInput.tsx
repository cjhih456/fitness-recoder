import type { BaseSyntheticEvent, ReactElement, ReactNode } from 'react'
import type { UseControllerProps } from 'react-hook-form';
import { useMemo } from 'react'
import RHFLayer from './RHFLayer';
import useFileControl from './hooks/useFileControl';

interface RHFInputProps<T extends RHFValues> {
  // Input Props
  className?: string
  accept?: string
  type?: string

  // Label children
  labelChildren?: ReactNode

  // Layer Props
  title: string
  name: Path<T>

  // Overwrite Controller Props
  defaultValue: RHFDefaultValue<T>

  // File Input Props
  onSelectFile?: (_files: File[]) => void
  children?: (_fileSrc?: string[], _imgDeleteAction?: ((_idx?: number, _e?: BaseSyntheticEvent) => void)) => (ReactElement | ReactElement[])
}

export default function RHFInput<T extends RHFValues>(
  props: UseControllerProps<T> & RHFInputProps<T>
) {
  const {
    type,
    className,
    labelChildren,
    onSelectFile,
    children,
    ...controllerProps
  } = props

  // File type Controls
  const maxLength = useMemo(() => {
    return Number(props.rules?.max || 1)
  }, [props.rules?.max])
  const multiple = useMemo(() => type === 'file' && maxLength > 1, [type, maxLength])
  const {
    cancelImage,
    onInputFileChange,
    imgPreview
  } = useFileControl<T>(maxLength, onSelectFile)

  return <RHFLayer<T>
    {...controllerProps}
  >
    {({ field }) => {
      function deleteImage(idx?: number, e?: BaseSyntheticEvent) {
        cancelImage(idx, e, field)
      }
      return <>
        {children && children(imgPreview, deleteImage)}
        <label className='inline-block'>
          <input
            type={type}
            className={className}
            multiple={multiple}
            {...(props.type === 'file' ? {} : field)}
            onChange={(e) => {
              if (props.type === 'file') {
                onInputFileChange(e, field)
              } else {
                field.onChange(e)
              }
            }}
          />
          {labelChildren}
        </label>
      </>
    }}
  </RHFLayer>
}