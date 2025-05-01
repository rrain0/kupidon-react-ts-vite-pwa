import { css } from '@emotion/react'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { DataFieldStyle } from 'src/ui/0-elements/DataField/DataFieldStyle.ts'
import React, { useImperativeHandle, useRef } from 'react'
import clsx from 'clsx'
import { TypeU } from '@util/common/TypeU.ts'
import row = EmotionCommon.row
import abs = EmotionCommon.abs
import Pu = TypeU.Pu
import attrExists = TypeU.attrEmpty





export type DataFieldCustomProps = Pu<{
  hasError: boolean
}>
export type DataFieldProps =
  & React.ComponentPropsWithRef<'div'>
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
    [DataFieldStyle.Attr.errorName]: attrExists(hasError),
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
  ${abs};
  pointer-events: none;
  border-radius: inherit;
`