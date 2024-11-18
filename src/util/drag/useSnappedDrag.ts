import { DragEventType, useDragProgress } from 'src/util/drag/useDragProgress'
import { useProgressToValue } from 'src/util/drag/useProgressToValue'
import { useRefGetSet } from 'src/util/react-state/useRefGetSet'


export const useSnappedDrag = () => {
  
  const [getProgress, setProgress] = useRefGetSet(0)
  const [getValue, setValue] = useRefGetSet(0)
  
  
  // TODO deps for setValue
  const updateProgress = useProgressToValue({
    setValue,
    minMax: [30, 70],
  })
  
  
  const onDrag = (progress: number, type: DragEventType) => {
    setProgress(progress)
    updateProgress(progress)
  }
  const onDragStart = () => {}
  const onDragging = () => {}
  const onDragEnd = () => {}
  
  const {
    setTrackStart,
    setTrackLen,
    onTrackDrag,
  } = useDragProgress({
    onDrag,
    onDragStart,
    onDragging,
    onDragEnd,
  })
  
  
  
  setTrackStart(100)
  setTrackLen(100)
  const drag = { ...onTrackDrag() }
  
  console.log('progress', getProgress())
  console.log('value', getValue())
}




