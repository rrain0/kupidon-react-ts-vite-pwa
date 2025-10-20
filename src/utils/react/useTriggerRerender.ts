import { useBool0 } from 'src/utils/state/react/useBool0.ts'


export const useTriggerRerender = () => {
  const [, , , toggle] = useBool0(false)
  return toggle
}


