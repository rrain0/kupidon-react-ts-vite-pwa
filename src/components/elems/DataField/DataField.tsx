import { css } from '@emotion/react'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import { DataFieldStyle } from 'src/components/elems/DataField/DataFieldStyle.ts'
import React, { useImperativeHandle, useRef } from 'react'
import clsx from 'clsx'

import row = EmotionCommon.row
import absTlwh = EmotionCommon.absTlwh
import { Pu } from '@utils/base/typeUtils.ts'
import { toEmptyAttr } from '@utils/base/typeUtils.ts'





export type DataFieldCustomProps = Pu<{
  hasError: boolean
}>
export type DataFieldProps =
  & React.ComponentProps<'div'>
  & DataFieldCustomProps



const DataField = React.memo((props: DataFieldProps) => {
  const {
    ref, children, className,
    hasError,
    ...restProps
  } = props
  
  
  const elemRef = useRef<HTMLDivElement>(null)
  useImperativeHandle(ref, () => elemRef.current!, [])
  
  
  const frameProps = {
    className: clsx(className, DataFieldStyle.El.frameClassName),
    [DataFieldStyle.Attr.errorName]: toEmptyAttr(hasError),
    ...restProps,
  }
  const borderProps = {
    className: DataFieldStyle.El.borderClassName,
  }
  
  
  return (
    <article /* Frame */
      data-display-name='DataField'
      css={frameStyle}
      {...frameProps}
      ref={elemRef}
    >
      
      { children }
      
      <div /* Border */ css={borderStyle}
        {...borderProps}
      />
      
    </article>
  )
})
DataField.displayName = 'DataField'
export default DataField



const frameStyle = css`
  ${row};
  align-items: center;
  width: 100%;
  position: relative;
`



const borderStyle = css`
  ${absTlwh};
  pointer-events: none;
  border-radius: inherit;
`