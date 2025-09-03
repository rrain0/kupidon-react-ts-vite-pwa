import React, { useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import Contents from 'src/components/elems/basic-elements/Contents.tsx'
import { TypeU } from '@utils/base/TypeU.ts'
import { useAppZustand } from 'src/zustand/app/AppZustand.ts'
import PartialUndef = TypeU.PartialUndef
import contents = EmotionCommon.contents




export type DragDetectorProps = PartialUndef<{
  children: React.ReactNode
}>

const DragDetector = React.memo((props: DragDetectorProps) => {
  
  const setApp = useAppZustand.setState
  
  
  const {
    getRootProps,
    isDragActive,
    acceptedFiles,
  } = useDropzone({
    noClick: true,
    noKeyboard: true,
  })
  
  useEffect(() => {
    //console.log('isDragActive',isDragActive)
    setApp({ isDraggingFiles: isDragActive })
  }, [isDragActive])
  
  /* useEffect(
    () => {
      console.log('acceptedFiles',acceptedFiles)
    },
    [acceptedFiles]
  ) */
  
  
  
  return (
    <Contents
      {...getRootProps()}
      /* onDragOver={ev => {
        console.log('onDragOver',ev)
        console.log('onDragOver',{
          files: ev.dataTransfer.files,
          types: ev.dataTransfer.types,
        })
      }} */
    >
      {props.children}
    </Contents>
  )
})
export default DragDetector
