import { useAutoRetry } from '@util/app/useAutoRetry.ts'
import clsx from 'clsx'
import React, {
  SyntheticEvent,
  useImperativeHandle, useMemo,
  useRef,
  useState,
} from 'react'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import { ImgSparkS6 } from 'src/ui/0-elements/ImgSpark/ImgSparkS6.ts'
import SparkingLoadingLine from 'src/ui/0-elements/SparkingLoadingLine/SparkingLoadingLine.tsx'
import { ReactU } from 'src/util/react/ReactU'
import { TypeU } from 'src/util/common/TypeU.ts'
import Puro = TypeU.Puro
import ClassStyle = ReactU.ClassStyle
import combineProps = ReactU.combineProps
import DocumentErrorIc = SvgIconsPack.DocumentErrorIc
import notExists = TypeU.notExists
import exists = TypeU.exists




export type ImgSparkExtraProps = ClassStyle & Puro<{
  // custom props
  isError: boolean
}>

export type ImgSparkRefElement = HTMLImageElement
export type ImgSparkProps =
  React.ComponentPropsWithoutRef<'img'> & ImgSparkExtraProps



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
      
      
      const [loadedSrc, setLoadedSrc] = useState<string | undefined>()
      const [errorSrc, setErrorSrc] = useState<string | undefined>()
      
      const [needRetryDownload, setNeedRetryDownload] = useState(false)
      
      useAutoRetry(needRetryDownload, { }, () => {
        const im = elemRef.current
        if (im) {
          setNeedRetryDownload(false)
          setErrorSrc(undefined)
          im.src = src ?? ''
        }
      })
      
      const isLoading = notExists(loadedSrc) && notExists(errorSrc)
      const isLoaded = exists(loadedSrc)
      const isError = exists(errorSrc)
      
      
      useMemo(() => {
        setNeedRetryDownload(false)
        setLoadedSrc(loaded => loaded !== src ? undefined : loaded)
        setErrorSrc(error => error !== src ? undefined : error)
      }, [src])
      
      
      
      return (
        <div // Frame
          data-display-name="ImgSpark"
          className={clsx(ImgSparkS6.W.els.imgFrame.n, className)}
          style={style}
        >
          
          <img
            ref={elemRef}
            {...combineProps({
              onLoad: (ev: SyntheticEvent<HTMLImageElement>) => {
                setLoadedSrc(src)
                setErrorSrc(undefined)
                setNeedRetryDownload(false)
              },
              onError: (ev: SyntheticEvent<HTMLImageElement>) => {
                console.log('error', ev)
                setLoadedSrc(undefined)
                // You can refresh src to retry if error:
                // ev.currentTarget.src = ev.currentTarget.src
                setErrorSrc(src)
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


