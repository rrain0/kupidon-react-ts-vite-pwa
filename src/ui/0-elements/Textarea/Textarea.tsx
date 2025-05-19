import { css } from '@emotion/react'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { getViewProps } from 'src/util/view/ViewProps.ts'
import { TextareaStyle } from 'src/ui/0-elements/Textarea/TextareaStyle.ts'
import React, { useImperativeHandle, useLayoutEffect, useRef } from 'react'
import clsx from 'clsx'
import { TypeU } from '@util/common/TypeU.ts'
import { ReactU } from 'src/util/react/ReactU'
import row = EmotionCommon.row
import absTlwh = EmotionCommon.absTlwh
import resetTextarea = EmotionCommon.resetTextarea
import Pu = TypeU.Pu
import hoverable = EmotionCommon.hoverable
import Callback1 = TypeU.Callback1
import combineProps = ReactU.combineProps
import toEmptyAttr = TypeU.toEmptyAttr





export type TextareaExtraProps = Pu<{
  isError: boolean
  onValue: Callback1<string>
  startViews: React.ReactNode
  endViews: React.ReactNode
  children: React.ReactNode
  childrenPosition: 'start' | 'end'
}>
export type TextareaProps =
  & React.ComponentProps<'textarea'>
  & TextareaExtraProps



const Textarea = React.memo((props: TextareaProps) => {
  const {
    ref, className, style,
    isError,
    onValue,
    startViews, endViews, children, childrenPosition = 'end',
    ...restProps
  } = props
  
  
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  useImperativeHandle(ref, () => textareaRef.current!, [])
  
  
  useLayoutEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.setSelectionRange(textarea.textLength, textarea.textLength)
    }
  }, [])
  
  
  const frameProps = {
    className: clsx(className, TextareaStyle.El.frameClassName),
    style: style,
  }
  const borderProps = {
    className: TextareaStyle.El.borderClassName,
  }
  
  
  return (
    /* Frame */
    <label css={frameStyle}
      {...frameProps}
    >
      
      { startViews }
      { childrenPosition === 'start' && children }
      
      {/* Textarea */}
      <textarea
        css={textareaStyle}
        className={TextareaStyle.El.textareaClassName}
        {...{
          [TextareaStyle.Attr.errorName]: toEmptyAttr(isError),
        }}
        ref={textareaRef}
        
        {...combineProps(restProps, {
          onChange: (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
            onValue?.(ev.currentTarget.value)
          },
          onScroll: (ev: React.UIEvent<HTMLTextAreaElement>) => {
            textareaFitText(ev.currentTarget)
            restProps.onScroll?.(ev)
          },
        })}
      />
      
      { childrenPosition === 'end' && children }
      { endViews }
      
      {/* Border */}
      <div css={borderStyle}
        {...borderProps}
      />
    
    </label>
  )
})
export default Textarea




const frameStyle = css`
  ${row};
  align-items: center;
  width: 100%;
  position: relative;
`



const textareaStyle = css`
  ${resetTextarea};

  flex: 1;
  border-radius: inherit;

  ${hoverable}{ :hover {
    cursor: text;
  } }
`



const borderStyle = css`
  ${absTlwh};
  pointer-events: none;
  border-radius: inherit;
`



const textareaFitText = (textarea: HTMLTextAreaElement) => {
  const d = getViewProps(textarea)
  if (d.scrollHeight > d.contentHeight)
    textarea.style.height = `calc(${d.height-d.contentHeight + d.scrollHeight + 'px'} + 1em)`
}
