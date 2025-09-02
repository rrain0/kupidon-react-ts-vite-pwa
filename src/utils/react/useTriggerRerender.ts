import { useBool } from 'src/utils/react-state/useBool'


export const useTriggerRerender = () => {
  const [, , , toggle] = useBool(false)
  return toggle
}


