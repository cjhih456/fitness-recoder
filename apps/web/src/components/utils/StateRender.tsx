import type { ReactNode } from 'react';

type KeyType = string | number
type StateRenderType = { [k: KeyType]: ReactNode }

interface StateRenderProps<P> {
  render: P
  condition: keyof P
}

interface StateRenderBooleanProps {
  render: { false?: ReactNode, true?: ReactNode }
  condition: boolean
}

const StateRender = <P extends StateRenderType = StateRenderType>({ render, condition }: StateRenderProps<P>) => {
  if (render[condition]) return <>{render[condition]}</>
  return null
}

const StateRenderBoolean = ({ render, condition }: StateRenderBooleanProps) => {
  return <>{condition ? render.true : render.false}</>
}

StateRender.Boolean = StateRenderBoolean

export default StateRender