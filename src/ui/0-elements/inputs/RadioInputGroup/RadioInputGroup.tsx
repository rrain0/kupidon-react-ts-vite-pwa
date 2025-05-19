import { css } from '@emotion/react'
import clsx from 'clsx'
import React, { useImperativeHandle, useRef } from 'react'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { StyleVals } from 'src/ui-data/style/StyleVals.ts'
import {
  RadioInputGroupStyle,
} from 'src/ui/0-elements/inputs/RadioInputGroup/RadioInputGroupStyle.ts'
import reset = EmotionCommon.reset
import absTlwh = EmotionCommon.absTlwh
import Pu = TypeU.Pu
import toEmptyAttr = TypeU.toEmptyAttr




export type RadioInputGroupExtraProps = Pu<{
  hasError: boolean
  children: React.ReactNode
}>
export type RadioInputGroupProps =
  & React.ComponentProps<'div'>
  & RadioInputGroupExtraProps



const RadioInputGroup = React.memo((props: RadioInputGroupProps) => {
  const {
    ref, className, children,
    hasError, 
    ...restProps
  } = props
  
  
  const elemRef = useRef<HTMLDivElement>(null)
  useImperativeHandle(ref, () => elemRef.current!, [])
  
  
  const radioGroupProps = {
    className: clsx(className, RadioInputGroupStyle.El.radioGroupClassName),
    [RadioInputGroupStyle.Attr.errorName]: toEmptyAttr(hasError),
    // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/radiogroup_role
    role: 'radiogroup',
    tabIndex: 0,
    ...restProps,
  }
  const borderProps = {
    className: RadioInputGroupStyle.El.borderClassName,
  }
  
  
  return (
    <article // Radio Group
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
  )
})
export default RadioInputGroup




const radioGroupStyle = css`
  ${reset};
  position: relative;
  gap: ${StyleVals.itemListGapPx};
`



const borderStyle = css`
  ${absTlwh};
  pointer-events: none;
  border-radius: inherit;
`