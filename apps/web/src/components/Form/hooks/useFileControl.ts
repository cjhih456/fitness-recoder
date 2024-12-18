import type { BaseSyntheticEvent, ChangeEvent } from 'react';
import type { ControllerRenderProps, FieldValues } from 'react-hook-form'
import { useCallback, useMemo, useRef, useState } from 'react'

export default function useFileControl<TFieldValues extends FieldValues = FieldValues>(
  max: number,
  onSelectFile?: (_file: File[]) => void
) {
  const maxNumber = useMemo(() => {
    return max || 1
  }, [max])
  const lazyFile = useRef<File[]>([])
  const [imgPreview, setImgPreview] = useState<string[]>([])
  const updateFileValueOnForm = useCallback((v: File[], field?: ControllerRenderProps<TFieldValues>) => {
    lazyFile.current = v
    field && field.onChange(lazyFile.current)
    onSelectFile && onSelectFile(lazyFile.current)
  }, [onSelectFile])

  const deleteImageFile = useCallback((index: number, field?: ControllerRenderProps<TFieldValues>) => {
    const tempArray = [...lazyFile.current]
    tempArray.splice(index, 1)
    setImgPreview((prev) => {
      const tempSrcArray = [...prev]
      tempSrcArray.splice(index, 1).forEach(str => URL.revokeObjectURL(str))
      return tempSrcArray
    })
    updateFileValueOnForm(tempArray, field)
    return tempArray
  }, [setImgPreview, updateFileValueOnForm])

  const appendImageFile = useCallback((file: (File | null)[], field?: ControllerRenderProps<TFieldValues>) => {
    const tempList = [...lazyFile.current]
    const newFileUrlList: string[] = [...imgPreview]
    file.forEach(f => {
      if (!f) return
      newFileUrlList.push(URL.createObjectURL(f))
      tempList.push(f)
    })
    if (tempList.length > maxNumber) {
      const overCnt = tempList.length - maxNumber
      tempList.splice(0, overCnt)
      newFileUrlList.splice(0, overCnt).forEach(str => URL.revokeObjectURL(str))
    }
    setImgPreview(newFileUrlList)
    updateFileValueOnForm(tempList, field)
  }, [maxNumber, imgPreview, updateFileValueOnForm])

  const cancelImage = useCallback((idx?: number, e?: BaseSyntheticEvent, field?: ControllerRenderProps<TFieldValues>) => {
    e && e.stopPropagation()
    if (typeof idx === 'number')
      deleteImageFile(idx, field)
  }, [deleteImageFile])

  const onInputFileChange = useCallback((e: ChangeEvent<HTMLInputElement>, field?: ControllerRenderProps<TFieldValues>) => {
    const file = e.target.files
    if (!file) return
    const fileList = Array(file.length).fill(0).map((_, i) => file.item(i))
    appendImageFile(fileList, field)
  }, [appendImageFile])
  return { onInputFileChange, cancelImage, imgPreview }
}