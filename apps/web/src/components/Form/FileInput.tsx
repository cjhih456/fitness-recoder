import type { MouseEvent, TouchEvent } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { MdClose } from 'react-icons/md'
import CInput from './CInput'

interface FileInputProps {
  name: string
  title: string
  max?: number
  required?: string | boolean
}

export default function FileMultiInput(props: FileInputProps) {
  const { watch, setValue } = useFormContext()
  const file = watch(props.name)
  const lazyFile = useRef<File[]>([])
  const [imgPreview, setImgPreview] = useState<string[]>([])

  const maxLength = useMemo(() => {
    return props.max ?? 1
  }, [props.max])
  const multi = useMemo(() => {
    return maxLength > 1
  }, [maxLength])

  const deleteImageFile = useCallback((index: number) => {
    const tempArray = [...lazyFile.current]
    tempArray.splice(index, 1)
    setImgPreview((prev) => {
      const tempArray = [...prev]
      tempArray.splice(index, 1).forEach(str => URL.revokeObjectURL(str))
      return tempArray
    })
    lazyFile.current = tempArray
    setValue(props.name, multi ? lazyFile.current : lazyFile.current[0])
    return tempArray
  }, [setValue, props.name, multi])

  const appendImageFile = useCallback((file: (File | null)[]) => {
    const tempList = [...lazyFile.current]
    const newFileUrlList: string[] = [...imgPreview]
    file.forEach(f => {
      if (!f) return
      newFileUrlList.push(URL.createObjectURL(f))
      tempList.push(f)
    })
    if (tempList.length > maxLength) {
      // TODO: 
      const overCnt = tempList.length - maxLength
      tempList.splice(0, overCnt)
      newFileUrlList.splice(0, overCnt).forEach(str => URL.revokeObjectURL(str))
    }
    setImgPreview(newFileUrlList)
    lazyFile.current = tempList
    setValue(props.name, multi ? lazyFile.current : lazyFile.current[0])
  }, [setValue, props.name, multi, maxLength, imgPreview])

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
    multiple={multi}
    accept='image/*'
    labelChildren={
      <div className='bg-purple-500 rounded-lg p-2'>
        {multi ? 'Add Images' : 'Set Image'}
      </div>
    }
  >
    <div className='flex flex-row gap-x-4'>
      {
        imgPreview.map((imgSrc, idx) => {
          return <div className="relative h-40 w-40 rounded-lg overflow-hidden" key={`preview-img-${idx}`}>
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