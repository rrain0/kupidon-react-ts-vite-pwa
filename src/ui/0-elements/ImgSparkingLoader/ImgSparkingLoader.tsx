import { css } from '@emotion/react'
import clsx from 'clsx'
import React, { SyntheticEvent, useImperativeHandle, useRef, useState } from 'react'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon'
import { ImgSparkingLoaderS6 } from 'src/ui/0-elements/ImgSparkingLoader/ImgSparkingLoaderS6.ts'
import SparkingLoadingLine from 'src/ui/0-elements/SparkingLoadingLine/SparkingLoadingLine.tsx'
import { ReactU } from 'src/util/react/ReactU'
import { TypeU } from 'src/util/common/TypeU.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import Puro = TypeU.Puro
import colC = EmotionCommon.colC
import ClassStyle = ReactU.ClassStyle
import combineProps = ReactU.combineProps




export type ImgSparkingLoaderExtraProps = ClassStyle & Puro<{
  // custom props
  isError: boolean
}>

export type ImgSparkingLoaderRefElement = HTMLImageElement
export type ImgSparkingLoaderProps =
  React.ComponentPropsWithoutRef<'img'> & ImgSparkingLoaderExtraProps



// TODO - make style
const ImgSparkingLoader = React.memo(
  React.forwardRef<ImgSparkingLoaderRefElement, ImgSparkingLoaderProps>(
    (props, forwardedRef) => {
      const {
        className, style,
        ...restProps
      } = props
      
      
      const elemRef = useRef<ImgSparkingLoaderRefElement>(null)
      useImperativeHandle(forwardedRef, () => elemRef.current!, [])
      
      const [isLoading, setLoading] = useState(true)
      
      
      return (
        <div // Frame
          data-display-name="ImgSparkingLoader"
          className={clsx(ImgSparkingLoaderS6.W.els.imgFrame.n, className)}
          style={style}
        >
          
          <img
            ref={elemRef}
            {...combineProps({
              onLoad: (ev: SyntheticEvent<HTMLImageElement>) => {
                setLoading(false)
              },
              onError: (ev: SyntheticEvent<HTMLImageElement>) => {
                setLoading(false)
                // You can refresh src to retry on error
                // ev.currentTarget.src = ev.currentTarget.src
              },
              style: {
                display: isLoading ? 'none' : 'block',
              },
              className: ImgSparkingLoaderS6.W.els.img.n,
            }, restProps)}
          />
          
          {isLoading && (
            <SparkingLoadingLine className={ImgSparkingLoaderS6.W.els.spark.n} />
          )}
          
        </div>
      )
    }
  )
)
ImgSparkingLoader.displayName = 'ImgSparkingLoader'
export default ImgSparkingLoader


