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
      
      
      const [loaded, setLoaded] = useState<string | undefined>()
      const [error, setError] = useState<string | undefined>()
      
      const isLoading = notExists(loaded) && notExists(error)
      const isLoaded = exists(loaded)
      const isError = exists(error)
      
      
      useMemo(() => {
        setLoaded(loaded => loaded !== src ? undefined : loaded)
        setError(error => error !== src ? undefined : error)
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
                setLoaded(src)
                setError(undefined)
              },
              onError: (ev: SyntheticEvent<HTMLImageElement>) => {
                setLoaded(undefined)
                // You can refresh src to retry if error:
                // ev.currentTarget.src = ev.currentTarget.src
                setError(src)
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


