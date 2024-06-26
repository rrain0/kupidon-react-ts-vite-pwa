import { css } from '@emotion/react'
import { EmotionCommon } from 'src/ui-props/styles/EmotionCommon.ts'
import { DataFieldStyle } from 'src/ui/elements/DataField/DataFieldStyle.ts'
import React, { useImperativeHandle, useRef } from 'react'
import clsx from 'clsx'
import { TypeUtils } from 'src/util/common/TypeUtils.ts'
import row = EmotionCommon.row
import abs = EmotionCommon.abs
import PartialUndef = TypeUtils.PartialUndef
import trueOrUndef = TypeUtils.trueOrUndef





export type DataFieldCustomProps = PartialUndef<{
  hasError: boolean
  children: React.ReactNode
}>
export type DataFieldForwardRefProps = React.JSX.IntrinsicElements['div']
export type DataFieldRefElement = HTMLDivElement
export type DataFieldProps = DataFieldCustomProps & DataFieldForwardRefProps



const DataField =
React.memo(
React.forwardRef<DataFieldRefElement, DataFieldProps>(
(props, forwardedRef) => {
  const {
    hasError,
    children,
    className,
    ...restProps
  } = props
  
  
  const elemRef = useRef<DataFieldRefElement>(null)
  useImperativeHandle(forwardedRef, ()=>elemRef.current!,[])
  
  
  const frameProps = {
    className: clsx(className,DataFieldStyle.El.frameClassName),
    [DataFieldStyle.Attr.errorName]: trueOrUndef(hasError),
    ...restProps,
  }
  const borderProps = {
    className: DataFieldStyle.El.borderClassName,
  }
  
  
  return <article /* Frame */ css={frameStyle}
    {...frameProps}
    ref={elemRef}
  >
    
    { children }
    
    <div /* Border */ css={borderStyle}
      {...borderProps}
    />
    
  </article>
}))
export default DataField



const frameStyle = css`
  ${row};
  align-items: center;
  width: 100%;
  position: relative;\
`



const borderStyle = css`
  ${abs};
  pointer-events: none;
  border-radius: inherit;
`