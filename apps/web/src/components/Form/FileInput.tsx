import { MouseEvent, MouseEventHandler, TouchEvent, useCallback, useEffect, useRef, useState } from 'react'
import CInput from './CInput'
import { useFormContext } from 'react-hook-form'
import { MdClose } from 'react-icons/md'

interface FileInputProps {
  name: string
  title: string
  required?: string | boolean
}

export default function FileInput(props: FileInputProps) {
  const { watch, setValue } = useFormContext()

  const file = watch(props.name)
  const lazyFile = useRef<File | undefined>()
  const [imgPreview, setImgPreview] = useState<string>('')


  const updateImagePreview = useCallback((file: File | undefined) => {
    setImgPreview((prev) => {
      prev && URL.revokeObjectURL(prev)
      return file ? URL.createObjectURL(file) : ''
    })
  }, [setImgPreview])

  const updateImageFile = useCallback((file: File | undefined) => {
    if (file === lazyFile.current) return
    lazyFile.current = file
    updateImagePreview(file)
    setValue(props.name, file)
  }, [updateImagePreview, setValue, props.name])

  const cancelImage = useCallback<MouseEventHandler<HTMLButtonElement>>((e: MouseEvent | TouchEvent) => {
    e.stopPropagation()
    updateImageFile(undefined)
    return
  }, [updateImageFile])

  useEffect(() => {
    if (!(file instanceof FileList)) {
      return
    }
    if (!file.length) return
    const selectedFile = file.item(0)
    selectedFile && updateImageFile(selectedFile)
  }, [file, updateImageFile])

  return <CInput
    className="hidden"
    {...props}
    type="file"
    accept='image/*'
    labelChildren={
      <div className="relative h-20 w-20 rounded-lg">
        <img role="button" tabIndex={0} src={imgPreview} className='h-full w-full' />
        <button className='absolute right-2 top-2 rounded-full bg-red-400/90' onClick={cancelImage}>
          <MdClose size="1.5rem" preserveAspectRatio="xMidYMid slice" />
        </button>
      </div>
    }
  >
  </CInput>
}