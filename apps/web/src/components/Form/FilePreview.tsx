import type { BaseSyntheticEvent } from 'react'
import { MdClose } from 'react-icons/md'

interface FilePreviewProps {
  idx: number
  name: string
  src: string
  cancelImage?: (_idx?: number, _e?: BaseSyntheticEvent) => void
}
export default function FilePreview({
  idx,
  name,
  src,
  cancelImage
}: FilePreviewProps) {
  return <div className="relative h-40 w-40 rounded-lg overflow-hidden" key={`preview-img-${idx}`}>
    <img role="button" tabIndex={0} src={src} className='h-full w-full' alt={name} />
    <button className='absolute right-2 top-2 rounded-full bg-red-400/90' type="button" onClick={(e) => cancelImage && cancelImage(idx, e)}>
      <MdClose size="1.5rem" preserveAspectRatio="xMidYMid slice" />
    </button>
  </div>
}