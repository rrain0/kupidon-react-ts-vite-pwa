import clsx from 'clsx'
import React, {
  SyntheticEvent, useEffect,
  useImperativeHandle,
  useRef, useState,
} from 'react'
import {
  getMediaUiState,
  MediaDownloadable,
  urlToMedia,
} from 'src/ui-data/models/media/Media.ts'
import { useMediaDownload } from 'src/ui-data/models/media/download/parts/useMediaDownload.ts'
import { useMediaDownloadAutoRetry } from 'src/ui-data/models/media/download/parts/useMediaDownloadAutoRetry.ts'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import { ImgSparkS6 } from 'src/ui/0-elements/ImgSpark/ImgSparkS6.ts'
import SparkingLoadingLine from 'src/ui/0-elements/SparkingLoadingLine/SparkingLoadingLine.tsx'
import { ReactU } from 'src/util/react/ReactU'
import combineProps = ReactU.combineProps
import DocumentErrorIc = SvgIconsPack.DocumentErrorIc




export type ImgSparkProps = React.ComponentPropsWithRef<'img'>



const ImgSpark = React.memo((props: ImgSparkProps) => {
  const {
    ref,
    className, style,
    src,
    ...restProps
  } = props
  
  
  const elemRef = useRef<HTMLImageElement>(null)
  useImperativeHandle(ref, () => elemRef.current!, [])
  
  
  const [media, setMedia] = useState<MediaDownloadable | undefined>(undefined)
  
  useMediaDownload(media, setMedia)
  useMediaDownloadAutoRetry(media, setMedia)
  
  useEffect(() => {
    setMedia(urlToMedia(src))
  }, [src])
  
  
  const { isLoading, isReady, isError } = getMediaUiState(media, { allowEmpty: false })
  
  console.log(media)
  console.log({ isLoading, isReady, isError })
  
  return (
    <div // Frame
      data-display-name="ImgSpark"
      className={clsx(ImgSparkS6.W.els.imgFrame.n, className)}
      style={style}
    >
      
      <img
        ref={elemRef}
        src={media?.dataUrl || undefined}
        {...combineProps({
          onLoad: (ev: SyntheticEvent<HTMLImageElement>) => {
            // Event, when image fully loaded and queued for rendering, but not rendered yet
          },
          onError: (ev: SyntheticEvent<HTMLImageElement>) => {
            // You can refresh src to retry if error:
            // ev.currentTarget.src = ev.currentTarget.src
          },
          style: {
            display: isReady ? 'block' : 'none',
          },
          className: ImgSparkS6.W.els.img.n,
        }, restProps)}
      />
      
      {isLoading && (
        <SparkingLoadingLine className={ImgSparkS6.W.els.spark.n} />
      )}
      
      {isError && (
        <DocumentErrorIc />
      )}
      
    </div>
  )
})
ImgSpark.displayName = 'ImgSpark'
export default ImgSpark


