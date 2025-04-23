import type { ReactNode } from 'react';

type KeyType = string | number
type StateRenderType = { [k: KeyType]: () => ReactNode }

interface StateRenderProps<P> {
  render: P
  state: keyof P
}

interface StateRenderBooleanProps {
  render: { false?: () => ReactNode, true?: () => ReactNode }
  state: boolean
}

export const EnumRender = <P extends StateRenderType = StateRenderType>({ render, state }: StateRenderProps<P>) => {
  return <>{render[state]?.()}</>
}

export const BooleanRender = ({ render, state }: StateRenderBooleanProps) => {
  return <>{state ? render.true?.() : render.false?.()}</>
}
