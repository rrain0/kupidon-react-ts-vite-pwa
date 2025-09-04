import { css } from '@emotion/react'
import clsx from 'clsx'
import React, { useImperativeHandle, useRef } from 'react'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'

import { StyleVals } from 'src/styles/StyleVals.ts'
import {
  CheckboxInputGroupStyle,
} from 'src/components/elems/inputs/CheckboxInputGroup/CheckboxInputGroupStyle.ts'
import reset = EmotionCommon.reset
import absTlwh = EmotionCommon.absTlwh
import { Pu } from '@utils/base/math/typeUtils.ts'
import { toEmptyAttr } from '@utils/base/math/typeUtils.ts'




export type CheckboxInputGroupExtraProps = Pu<{
  hasError: boolean
  children: React.ReactNode
}>
export type CheckboxInputGroupProps =
  & React.ComponentProps<'div'>
  & CheckboxInputGroupExtraProps



const CheckboxInputGroup = React.memo((props: CheckboxInputGroupProps) => {
  const {
    ref, children, className,
    hasError,
    ...restProps
  } = props
  
  
  const elemRef = useRef<HTMLDivElement>(null)
  useImperativeHandle(ref, () => elemRef.current!, [])
  
  
  const radioGroupProps = {
    className: clsx(className, CheckboxInputGroupStyle.El.radioGroupClassName),
    [CheckboxInputGroupStyle.Attr.errorName]: toEmptyAttr(hasError),
    tabIndex: 0,
    ...restProps,
  }
  const borderProps = {
    className: CheckboxInputGroupStyle.El.borderClassName,
  }
  
  
  return (
    <article /* RadioGroup */
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
  )
})
export default CheckboxInputGroup




const radioGroupStyle = css`
  ${reset};
  position: relative;
  gap: ${StyleVals.listGPx};
`



const borderStyle = css`
  ${absTlwh};
  pointer-events: none;
  border-radius: inherit;
`