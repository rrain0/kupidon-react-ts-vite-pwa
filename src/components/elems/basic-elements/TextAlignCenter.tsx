import { ReactU } from '@utils/react/ReactU.ts'
import { useElemRefGetSet } from '@utils/view/useElemRefGetSet.ts'
import { useResizeRef } from '@utils/view/useResizeRef.ts'
import React, { useImperativeHandle, useLayoutEffect } from 'react'
import { TypeU } from '@utils/base/TypeU.ts'
import Flex from '@libs/short-propsed/components/Flex.tsx'
import Pu = TypeU.Pu
import ClassNameProp = ReactU.ClassNameProp
import StyleProp = ReactU.StyleProp



// У центрально выравненного текста есть неприятные отступы по бокам. Компонента их убирает.
// А потом выравнивает колонку текста как настроено через пропсы (по умолчанию влево).


export type TextCenterAlignExtraProps = Pu<{
  left: boolean
  center: boolean
  right: boolean
  classNameText: ClassNameProp
  styleText: StyleProp
  children: string | number
}>

export type TextCenterAlignProps =
  & React.ComponentProps<typeof Flex>
  & TextCenterAlignExtraProps



const TextAlignCenter = React.memo((props: TextCenterAlignProps) => {
  const {
    ref, children, classNameText, styleText,
    left = true, center, right,
    ...restProps
  } = props
  
  const setResizeElem = useResizeRef(el => adjustText())
  
  const [getBoxEl, setBoxElRef, boxElRef] = useElemRefGetSet(setResizeElem)
  useImperativeHandle(ref, () => boxElRef.current!, [])
  
  const [getTextEl, setTextEl] = useElemRefGetSet()
  
  const adjustText = () => {
    const textEl = getTextEl()
    if (textEl) {
      textEl.style.alignSelf = ''
      textEl.style.width = '100%'
      const text = textEl.childNodes[0]
      const range = document.createRange()
      range.setStartBefore(text)
      range.setEndAfter(text)
      const clientRect = range.getBoundingClientRect()
      textEl.style.alignSelf = right ? 'end' : center ? 'center' : left ? 'start' : ''
      textEl.style.width = `${clientRect.width}px`
    }
  }
  
  useLayoutEffect(() => adjustText(), [children, right, center, left])
  
  return (
    <Flex col
      data-display-name='TextAlignCenter'
      ref={setBoxElRef}
      {...restProps}
    >
      <Flex w='full' textAlign
        ref={setTextEl}
        className={classNameText}
        style={styleText}
      >
        {children}
      </Flex>
    </Flex>
  )
})
TextAlignCenter.displayName = 'TextAlignCenter'
export default TextAlignCenter



