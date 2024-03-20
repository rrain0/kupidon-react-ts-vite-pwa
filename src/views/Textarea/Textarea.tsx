/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { getElemProps } from 'src/utils/common/ElemProps'
import { TextareaStyle } from 'src/views/Textarea/TextareaStyle'
import React, { useImperativeHandle, useRef } from 'react'
import classNames from "classnames"
import { TypeUtils } from 'src/utils/common/TypeUtils'
import row = EmotionCommon.row
import abs = EmotionCommon.abs
import resetTextarea = EmotionCommon.resetTextarea
import PartialUndef = TypeUtils.PartialUndef
import hoverable = EmotionCommon.hoverable
import trueOrUndef = TypeUtils.trueOrUndef







export type InputProps = JSX.IntrinsicElements['textarea'] &
  PartialUndef<{
    hasError: boolean
    startViews: React.ReactNode
    endViews: React.ReactNode
    children: React.ReactNode
    childrenPosition: 'start'|'end'
  }>

const Textarea = React.memo(React.forwardRef<HTMLTextAreaElement, InputProps>((
  props, forwardedRef
) => {
  let {
    hasError,
    startViews, endViews, children, childrenPosition,
    className, style, ...restProps
  } = props
  childrenPosition ??= 'end'
  
  
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  useImperativeHandle(forwardedRef, ()=>textareaRef.current!,[])
  
  
  const frameProps = {
    className: classNames(className,TextareaStyle.El.frameClassName),
    style: style,
  }
  const textareaProps = {
    className: TextareaStyle.El.textareaClassName,
    [TextareaStyle.Attr.errorName]: trueOrUndef(hasError),
    ...restProps,
  }
  const borderProps = {
    className: TextareaStyle.El.borderClassName
  }
  
  
  return <label /* Frame */ css={frameStyle}
    {...frameProps}
  >
    
    { startViews }
    { childrenPosition==='start' && children }
    
    <textarea /* Textarea */ css={textareaStyle}
      {...textareaProps}
      ref={textareaRef}
      
      onScroll={ev=>{
        textareaFitText(ev.currentTarget)
        restProps.onScroll?.(ev)
      }}
    />
    
    { childrenPosition==='end' && children }
    { endViews }
    
    <div /* Border */ css={borderStyle}
      {...borderProps}
    />
    
  </label>
}))
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
  ${abs};
  pointer-events: none;
  border-radius: inherit;
`



const textareaFitText = (textarea: HTMLTextAreaElement)=>{
  const d = getElemProps(textarea)
  if (d.scrollHeight > d.contentHeight)
    textarea.style.height = `calc(${d.height-d.contentHeight + d.scrollHeight + 'px'} + 1em)`
}
