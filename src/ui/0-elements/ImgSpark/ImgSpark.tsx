import { useStateAndRef } from '@util/react-state/useStateAndRef.ts'
import clsx from 'clsx'
import React, {
  SyntheticEvent, useEffect,
  useImperativeHandle,
  useRef,
} from 'react'
import {
  getMediaDownloadUiState,
  MediaDownloadable,
  urlToMedia,
} from 'src/ui-data/models/media/Media.ts'
import { useMediaDownload } from 'src/ui-data/models/media/useMediaDownload.ts'
import { useMediaDownloadAutoRetry } from 'src/ui-data/models/media/useMediaDownloadAutoRetry.ts'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import { ImgSparkS6 } from 'src/ui/0-elements/ImgSpark/ImgSparkS6.ts'
import SparkingLoadingLine from 'src/ui/0-elements/SparkingLoadingLine/SparkingLoadingLine.tsx'
import { ReactU } from 'src/util/react/ReactU'
import ClassStyle = ReactU.ClassStyle
import combineProps = ReactU.combineProps
import DocumentErrorIc = SvgIconsPack.DocumentErrorIc




export type ImgSparkRefElement = HTMLImageElement
export type ImgSparkProps = React.ComponentPropsWithoutRef<'img'> & ClassStyle



const ImgSpark = React.memo(
  React.forwardRef<ImgSparkRefElement, ImgSparkProps>(
    (props, forwardedRef) => {
      const {
        className, style,
        ...restProps
      } = props
      const { src } = props
      
      
      const elemRef = useRef<ImgSparkRefElement>(null)
      useImperativeHandle(forwardedRef, () => elemRef.current!, [])
      
      
      const [
        getMedia, setMedia, media,
      ] = useStateAndRef<MediaDownloadable | undefined>(undefined)
      
      useMediaDownload(getMedia, setMedia)
      useMediaDownloadAutoRetry(getMedia, setMedia)
      
      useEffect(() => {
        console.log('effect media:', media)
        //media?.download?.abort()
        setMedia(urlToMedia(src))
      }, [src])
      
      
      const { isLoading, isLoaded, isError } = getMediaDownloadUiState(media)
      
      console.log(media)
      console.log({ isLoading, isLoaded, isError })
      
      return (
        <div // Frame
          data-display-name="ImgSpark"
          className={clsx(ImgSparkS6.W.els.imgFrame.n, className)}
          style={style}
        >
          
          <img
            ref={elemRef}
            src={media?.dataUrl}
            {...combineProps({
              onLoad: (ev: SyntheticEvent<HTMLImageElement>) => {
              
              },
              onError: (ev: SyntheticEvent<HTMLImageElement>) => {
                // You can refresh src to retry if error:
                // ev.currentTarget.src = ev.currentTarget.src
              },
              style: {
                display: isLoaded ? 'block' : 'none',
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
    }
  )
)
ImgSpark.displayName = 'ImgSpark'
export default ImgSpark


