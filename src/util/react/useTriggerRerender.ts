import { useBool } from 'src/util/react-state/useBool'


export const useTriggerRerender = () => {
  const [, , , toggle] = useBool(false)
  return toggle
}


