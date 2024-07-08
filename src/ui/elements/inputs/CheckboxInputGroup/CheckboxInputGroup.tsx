import { css } from '@emotion/react'
import clsx from 'clsx'
import React, { useImperativeHandle, useRef } from 'react'
import { EmotionCommon } from 'src/ui-props/styles/EmotionCommon.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { StyleConstants } from 'src/ui-props/styles/StyleConstants.ts'
import {
  CheckboxInputGroupStyle,
} from 'src/ui/elements/inputs/CheckboxInputGroup/CheckboxInputGroupStyle.ts'
import reset = EmotionCommon.reset
import abs = EmotionCommon.abs
import PartialUndef = TypeU.PartialUndef
import trueOrUndef = TypeU.trueOrUndef




export type CheckboxInputGroupCustomProps = PartialUndef<{
  hasError: boolean
  children: React.ReactNode
}>
export type CheckboxInputGroupForwardRefProps = React.JSX.IntrinsicElements['div']
export type CheckboxInputGroupRefElement = HTMLDivElement
export type CheckboxInputGroupProps = CheckboxInputGroupCustomProps & CheckboxInputGroupForwardRefProps



const CheckboxInputGroup =
React.memo(
React.forwardRef<CheckboxInputGroupRefElement, CheckboxInputGroupProps>(
  (props, forwardedRef)=>{
  const { hasError, children, className, ...restProps } = props
  
  
  const elemRef = useRef<CheckboxInputGroupRefElement>(null)
  useImperativeHandle(forwardedRef, ()=>elemRef.current!,[])
  
  
  const radioGroupProps = {
    className: clsx(className, CheckboxInputGroupStyle.El.radioGroupClassName),
    [CheckboxInputGroupStyle.Attr.errorName]: trueOrUndef(hasError),
    tabIndex: 0,
    ...restProps,
  }
  const borderProps = {
    className: CheckboxInputGroupStyle.El.borderClassName,
  }
  
  
  return <article /* RadioGroup */
    css={radioGroupStyle}
    {...radioGroupProps}
    ref={elemRef}
  >
    
    { children }
    
    <div /* Border */
      css={borderStyle}
      {...borderProps}
    />
    
  </article>
}))
export default CheckboxInputGroup




const radioGroupStyle = css`
  ${reset};
  position: relative;
  gap: ${StyleConstants.itemListGap};
`



const borderStyle = css`
  ${abs};
  pointer-events: none;
  border-radius: inherit;
`