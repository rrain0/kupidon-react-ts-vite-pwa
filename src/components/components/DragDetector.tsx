import React, { useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import Contents from '@libs/short-propsed/components/Contents.tsx'

import { useAppZustand } from 'src/zustand/app/AppZustand.ts'
import { Pu } from '@utils/base/typeUtils.ts'
import contents = EmotionCommon.contents




export type DragDetectorProps = Pu<{
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
