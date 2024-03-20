/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { animated } from '@react-spring/web'
import React, { useContext, useImperativeHandle, useRef } from 'react'
import { formHeaderStyle } from 'src/components/FormElements/FormHeader'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { ArrayUtils } from 'src/utils/common/ArrayUtils'
import { MathUtils } from 'src/utils/common/NumberUtils'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import { TabsRenderProps } from 'src/views/Tabs/Tabs'
import { TabIdx, TabsState } from 'src/views/Tabs/useTabs'
import fitRange2 = MathUtils.fitRange
import mapRange = MathUtils.mapRange
import inRange2 = MathUtils.inRange
import lastIndex = ArrayUtils.lastIndex
import centerAll = EmotionCommon.centerAll
import Setter = TypeUtils.Setter
import col = EmotionCommon.col




export type ProfilePageTabHeaderContextProps = {
  tabContainerSpring: TabsRenderProps['tabContainerSpring']
  tabWidth: number
  headers: string[]
  setTabsState: Setter<TabsState>
  setTabIdx: Setter<TabIdx>
}
export const ProfilePageTabHeaderContext = React.createContext({} as ProfilePageTabHeaderContextProps)


export type ProfilePageTabHeaderCustomProps = {
  thisTabIdx: TabIdx
}
export type ProfilePageTabHeaderForwardRefProps = Omit<JSX.IntrinsicElements['div'], 'children'>
export type ProfilePageTabHeaderRefElement = HTMLDivElement
export type ProfilePageTabHeaderProps = ProfilePageTabHeaderCustomProps & ProfilePageTabHeaderForwardRefProps



const ProfilePageTabHeader =
React.memo(
React.forwardRef<ProfilePageTabHeaderRefElement, ProfilePageTabHeaderProps>(
(props, forwardedRef)=>{
  const {
    thisTabIdx: i,
    ...restProps
  } = props
  
  
  const elemRef = useRef<ProfilePageTabHeaderRefElement>(null)
  useImperativeHandle(forwardedRef, ()=>elemRef.current!,[])
  
  
  const {
    tabContainerSpring,
    tabWidth: w,
    headers,
    setTabsState,
    setTabIdx,
  } = useContext(ProfilePageTabHeaderContext)
  
  
  
  // -1 - заголовок уехал влево
  // 0 - заголовок по центру
  // +1 - заголовок уехал вправо
  const forCenter = tabContainerSpring.scrollLeft.to(v=>{
    const fromRange = [(i-1)*w, (i+1)*w] as const
    v = fitRange2(v, fromRange)
    v = mapRange(v, fromRange, [-1,1])
    //console.log('center value',v)
    return v
  })
  const forLeft = tabContainerSpring.scrollLeft.to(v=>{
    const fromRange = [(i-2)*w, (i+0)*w] as const
    v = fitRange2(v, fromRange)
    v = mapRange(v, fromRange, [-1,1])
    //console.log('left value',v)
    return v
  })
  const forRight = tabContainerSpring.scrollLeft.to(v=>{
    const fromRange = [(i+0)*w, (i+2)*w] as const
    v = fitRange2(v, fromRange)
    v = mapRange(v, fromRange, [-1,1])
    return v
  })
  
  
  return <Wrap css={css`
    min-width: ${w}px;
    width: ${w}px;
    max-width: ${w}px;
  `}>
    
    {inRange2(i-1, [0, lastIndex(headers)]) &&
      <AnimatedHeader css={css`
        width: ${0.6*w}px;
        mask-image: linear-gradient(to right,
          rgba(0,0,0,0) 0%, rgba(0,0,0,1) 50%,
          rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%
        );
      `}
        style={{
          x: forLeft.to(v => mapRange(v, [-1, 1], [-w/2 - w, w/2 - w])),
          scale: forLeft.to(v=>1 - 0.35 * Math.abs(v)),
          opacity: forLeft.to(v=>1 - 0.6 * Math.abs(v)),
        }}
      >
        <HeaderTextWrap
          onClick={()=>{
            setTabsState('snapping')
            setTabIdx(i-1)
          }}
        >
          {headers[i-1]}
        </HeaderTextWrap>
      </AnimatedHeader>
    }
    
    {inRange2(i+1, [0, lastIndex(headers)]) &&
      <AnimatedHeader css={css`
        width: ${0.6*w}px;
        mask-image: linear-gradient(to right,
          rgba(0,0,0,0) 0%, rgba(0,0,0,1) 50%,
          rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%
        );
      `}
        style={{
          x: forRight.to(v => mapRange(v, [-1, 1], [-w/2 + w, w/2 + w])),
          scale: forRight.to(v=>1 - 0.35 * Math.abs(v)),
          opacity: forLeft.to(v=>1 - 0.6 * Math.abs(v)),
        }}
      >
        <HeaderTextWrap
          onClick={()=>{
            setTabsState('snapping')
            setTabIdx(i+1)
          }}
        >
          {headers[i+1]}
        </HeaderTextWrap>
      </AnimatedHeader>
    }
    
    <AnimatedHeader css={css`
      width: ${0.7*w}px;
    `}
      {...restProps}
      ref={elemRef}
      style={{
        x: forCenter.to(v => mapRange(v, [-1,1], [-(w/2), w/2])),
        scale: forCenter.to(v => 1 - 0.35 * Math.abs(v)),
        opacity: forCenter.to(v => 1 - 0.6 * Math.abs(v)),
      }}
    >
      
      <HeaderTextWrap
        onClick={()=>{
          setTabsState('snapping')
          setTabIdx(i)
        }}
      >
        {headers[i]}
      </HeaderTextWrap>
    
    </AnimatedHeader>
    
  </Wrap>
}))
export default ProfilePageTabHeader






const Wrap = styled.div`
  align-self: center;
  height: fit-content;
  position: relative;
  overflow: hidden;
  ${centerAll};
  place-items: start center;
`

const AnimatedHeader = styled(animated.div)`
  ${col};
  overflow: visible;
`
const HeaderTextWrap = styled.h3`
  ${p=>formHeaderStyle(p.theme)};
  overflow-wrap: anywhere;
  user-select: none;
  cursor: pointer;
`
