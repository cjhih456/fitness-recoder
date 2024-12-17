import type { ReactNode } from 'react';
import type { ControllerFieldState } from 'react-hook-form'
import { useMemo } from 'react'

interface RHFLayerProps {
  title: string
  children: ReactNode
  rhfFieldstatus?: ControllerFieldState
  errorMessage?: string
}

export default function RHFLayer({ title, children, rhfFieldstatus, errorMessage }: RHFLayerProps) {
  const errorMessageDisplay = useMemo(() => {
    return rhfFieldstatus?.isTouched && rhfFieldstatus.error?.message || errorMessage || ''
  }, [rhfFieldstatus, errorMessage])
  return <fieldset>
    <legend>
      {title}
    </legend>
    <div>
      {children}
    </div>
    <p className='text-red-300'>
      {errorMessageDisplay}
    </p>
  </fieldset>
}