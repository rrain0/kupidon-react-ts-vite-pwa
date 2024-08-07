import React, { useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { useSetRecoilState } from 'recoil'
import { AppRecoil } from 'src/recoil/state/AppRecoil'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon.ts'
import { TypeU } from 'src/util/common/TypeU.ts'
import PartialUndef = TypeU.PartialUndef
import contents = EmotionCommon.contents




export type DragDetectorProps = PartialUndef<{
  children: React.ReactNode
}>

const DragDetector =
React.memo(
(props: DragDetectorProps) => {
  const setAppState = useSetRecoilState(AppRecoil)
  
  
  const {
    getRootProps,
    isDragActive,
    acceptedFiles,
  } = useDropzone({
    noClick: true,
    noKeyboard: true,
  })
  useEffect(
    () => {
      //console.log('isDragActive',isDragActive)
      setAppState(s => ({
        ...s,
        isDraggingFiles: isDragActive,
      }))
    },
    [isDragActive, setAppState]
  )
  /* useEffect(
    ()=>{
      console.log('acceptedFiles',acceptedFiles)
    },
    [acceptedFiles]
  ) */
  
  
  
  return <div css={contents}
    {...getRootProps()}
    /* onDragOver={ev=>{
      console.log('onDragOver',ev)
      console.log('onDragOver',{
        files: ev.dataTransfer.files,
        types: ev.dataTransfer.types,
      })
    }} */
  >
    {props.children}
  </div>
})
export default DragDetector
