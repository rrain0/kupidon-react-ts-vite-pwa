import { css } from '@emotion/react'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import { TextareaStyle } from 'src/components/elems/Textarea/TextareaStyle.ts'
import React, { useImperativeHandle, useLayoutEffect, useRef } from 'react'
import clsx from 'clsx'

import row = EmotionCommon.row
import absTlwh = EmotionCommon.absTlwh
import resetTextarea = EmotionCommon.resetTextarea
import { Pu } from '@utils/base/tsUtils.ts'
import hoverable = EmotionCommon.hoverable
import { Cb1 } from '@utils/base/tsUtils.ts'
import { toEmptyAttr } from '@utils/base/tsUtils.ts'





export type TextareaExtraProps = Pu<{
  isError: boolean
  onValue: Cb1<string>
  hFitText: boolean
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
    hFitText,
    startViews, endViews, children, childrenPosition = 'end',
    ...restProps
  } = props
  
  
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  useImperativeHandle(ref, () => textareaRef.current!, [])
  
  
  // Поставить курсор в конец текста после начального рендера
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
      
      {startViews}
      {childrenPosition === 'start' && children}
      
      {/* Textarea */}
      <textarea
        css={textareaStyle}
        className={TextareaStyle.El.textareaClassName}
        {...{
          [TextareaStyle.Attr.errorName]: toEmptyAttr(isError),
        }}
        ref={textareaRef}
        rows={1}
        {...restProps}
        onChange={ev => {
          if (hFitText) textareaHeightFitContent(ev.currentTarget)
          restProps.onChange?.(ev)
          onValue?.(ev.currentTarget.value)
        }}
      />
      
      {childrenPosition === 'end' && children}
      {endViews}
      
      {/* Border */}
      <div css={borderStyle}
        {...borderProps}
      />
    
    </label>
  )
})
Textarea.displayName = 'Textarea'
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



const textareaHeightFitContent = (textarea: HTMLTextAreaElement) => {
  textarea.style.height = 'auto'
  textarea.style.height = textarea.scrollHeight + 'px'
}
