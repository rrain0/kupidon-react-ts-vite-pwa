import { css } from '@emotion/react'
import clsx from 'clsx'
import React, { useImperativeHandle, useRef } from 'react'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { StyleConstants } from 'src/ui-data/styles/StyleConstants.ts'
import {
  RadioInputGroupStyle,
} from 'src/ui/elements/inputs/RadioInputGroup/RadioInputGroupStyle.ts'
import reset = EmotionCommon.reset
import abs = EmotionCommon.abs
import PartialUndef = TypeU.PartialUndef
import trueOrUndef = TypeU.trueOrUndef




export type RadioInputGroupCustomProps = PartialUndef<{
  hasError: boolean
  children: React.ReactNode
}>
export type RadioInputGroupForwardRefProps = React.JSX.IntrinsicElements['div']
export type RadioInputGroupRefElement = HTMLDivElement
export type RadioInputGroupProps = RadioInputGroupCustomProps & RadioInputGroupForwardRefProps



const RadioInputGroup =
React.memo(
React.forwardRef<RadioInputGroupRefElement, RadioInputGroupProps>(
  (props, forwardedRef)=>{
  const { hasError, children, className, ...restProps } = props
  
  
  const elemRef = useRef<RadioInputGroupRefElement>(null)
  useImperativeHandle(forwardedRef, () => elemRef.current!,[])
  
  
  const radioGroupProps = {
    className: clsx(className, RadioInputGroupStyle.El.radioGroupClassName),
    [RadioInputGroupStyle.Attr.errorName]: trueOrUndef(hasError),
    // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/radiogroup_role
    role: 'radiogroup',
    tabIndex: 0,
    ...restProps,
  }
  const borderProps = {
    className: RadioInputGroupStyle.El.borderClassName,
  }
  
  
  return <article // Radio Group
    css={radioGroupStyle}
    {...radioGroupProps}
    ref={elemRef}
  >
    
    { children }
    
    <div // Border
      css={borderStyle}
      {...borderProps}
    />
    
  </article>
}))
export default RadioInputGroup




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