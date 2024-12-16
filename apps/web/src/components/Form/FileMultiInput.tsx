import { MouseEvent, MouseEventHandler, TouchEvent, useCallback, useEffect, useRef, useState } from 'react'
import CInput from './CInput'
import { useFormContext } from 'react-hook-form'
import { MdClose } from 'react-icons/md'

interface FileInputProps {
  name: string
  title: string
  required?: string | boolean
}

export default function FileMultiInput(props: FileInputProps) {
  const { watch, setValue } = useFormContext()

  const file = watch(props.name)
  const lazyFile = useRef<File[]>([])
  const [imgPreview, setImgPreview] = useState<string[]>([])

  const deleteImagePreview = useCallback((index: number) => {
    setImgPreview((prev) => {
      const tempArray = [...prev]
      tempArray.splice(index, 1).forEach(str => URL.revokeObjectURL(str))
      return tempArray
    })
  }, [setImgPreview])
  const deleteImageFile = useCallback((index: number) => {
    const tempArray = [...lazyFile.current]
    tempArray.splice(index, 1)
    deleteImagePreview(index)
    return tempArray
  }, [deleteImagePreview])

  const appendImagePreview = useCallback((fileName: string[]) => {
    setImgPreview((prev) => {
      return [...prev, ...fileName]
    })
  }, [setImgPreview])
  const appendImageFile = useCallback((file: (File | null)[]) => {
    const tempList = [...lazyFile.current]
    const newFileUrlList: string[] = []
    file.forEach(f => {
      if (!f) return
      newFileUrlList.push(URL.createObjectURL(f))
      tempList.push(f)
    })
    appendImagePreview(newFileUrlList)

    setValue(props.name, tempList)
  }, [setValue, props.name, appendImagePreview])

  const cancelImage = useCallback((e: MouseEvent | TouchEvent, idx: number) => {
    e.stopPropagation()
    deleteImageFile(idx)
  }, [deleteImageFile])

  useEffect(() => {
    if (!(file instanceof FileList)) {
      return
    }
    const fileList = Array(file.length).fill(0).map((_, i) => file.item(i))
    appendImageFile(fileList)
  }, [file, appendImageFile])

  return <CInput
    className="hidden"
    {...props}
    type="file"
    multiple
    accept='image/*'
    labelChildren={
      <div>
        Add Images
      </div>
    }
  >
    <div className='flex flex-row gap-x-4'>
      {
        imgPreview.map((imgSrc, idx) => {
          return <div className="relative h-40 w-40 rounded-lg" key={`preview-img-${idx}`}>
            <img role="button" tabIndex={0} src={imgSrc} className='h-full w-full' />
            <button className='absolute right-2 top-2 rounded-full bg-red-400/90' onClick={(e) => cancelImage(e, idx)}>
              <MdClose size="1.5rem" preserveAspectRatio="xMidYMid slice" />
            </button>
          </div>
        })
      }
    </div>
  </CInput>
}