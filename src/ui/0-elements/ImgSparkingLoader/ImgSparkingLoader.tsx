import { css } from '@emotion/react'
import React, { SyntheticEvent, useImperativeHandle, useRef, useState } from 'react'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon'
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
          css={frameS}
          className={className}
          style={style}
        >
          
          <img
            css={imgS}
            ref={elemRef}
            {...combineProps({
              onLoad: (ev: SyntheticEvent<HTMLImageElement>) => {
                setLoading(false)
              },
              onError: (ev: SyntheticEvent<HTMLImageElement>) => {
                setLoading(false)
              },
              style: {
                display: isLoading ? 'none' : 'block',
              },
            }, restProps)}
          />
          
          {isLoading && <SparkingLoadingLine />}
          
        </div>
      )
    }
  )
)
ImgSparkingLoader.displayName = 'ImgSparkingLoader'
export default ImgSparkingLoader



const frameS = (t: AppTheme.Theme) => css`
  position: relative;
  ${colC};
  width: 100%;
  aspect-ratio: 1;
  background-color: ${t.boxTrans.bg};
  --color: ${t.boxTrans.ctSec};
  overflow: hidden;
`


const imgS = (t: AppTheme.Theme) => css`
  width: 100%;
  height: 100%;
  object-position: center;
  object-fit: cover;
`
