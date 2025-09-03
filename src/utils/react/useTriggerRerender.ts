import { useBool } from 'src/utils/react/state/useBool.ts'


export const useTriggerRerender = () => {
  const [, , , toggle] = useBool(false)
  return toggle
}


