import type { ReactNode } from 'react';

type KeyType = string | number
type StateRenderType = { [k: KeyType]: ReactNode }

interface StateRenderProps<P> {
  render: P
  state: keyof P
}

interface StateRenderBooleanProps {
  render: { false?: ReactNode, true?: ReactNode }
  state: boolean
}

const StateRender = <P extends StateRenderType = StateRenderType>({ render, state }: StateRenderProps<P>) => {
  if (render[state]) return <>{render[state]}</>
  return null
}

const StateRenderBoolean = ({ render, state }: StateRenderBooleanProps) => {
  return <>{state ? render.true : render.false}</>
}

StateRender.Boolean = StateRenderBoolean

export default StateRender