import { useBool } from 'src/utils/state/react/useBool.ts'


export const useTriggerRerender = () => {
  const [, , , toggle] = useBool(false)
  return toggle
}


