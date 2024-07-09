import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { animated } from '@react-spring/web'
import React, { useContext } from 'react'
import { Hs } from 'src/ui/elements/basic-elements/Hs.tsx'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon.ts'
import { ArrayU } from '@util/common/ArrayU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { TabsRenderProps } from 'src/ui/components/Tabs/Tabs.tsx'
import { TabIdx, TabsState } from 'src/ui/components/Tabs/useTabs.ts'
import { RangeU } from 'src/util/common/RangeU'
import lastIndex = ArrayU.lastIndex
import centerAll = EmotionCommon.centerAll
import Setter = TypeU.Setter
import col = EmotionCommon.col




export type ProfilePageTabHeaderContextProps = {
  tabContainerSpring: TabsRenderProps['tabContainerSpring']
  tabWidth: number
  headers: string[]
  setTabsState: Setter<TabsState>
  setTabIdx: Setter<TabIdx>
}
export const ProfilePageTabHeaderContext = React.createContext({} as ProfilePageTabHeaderContextProps)


export type ProfilePageTabHeaderProps = {
  thisTabIdx: TabIdx
}



const ProfilePageTabHeader =
React.memo(
(props: ProfilePageTabHeaderProps) => {
  const {
    thisTabIdx: i,
  } = props
  
  
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
  const forCenter = tabContainerSpring.scrollLeft.to(v => {
    const fromRange = [(i-1)*w, (i+1)*w] as const
    v = RangeU.clamp(v, fromRange)
    v = RangeU.map(v, fromRange, [-1, 1])
    //console.log('center value',v)
    return v
  })
  const forLeft = tabContainerSpring.scrollLeft.to(v => {
    const fromRange = [(i-2)*w, (i+0)*w] as const
    v = RangeU.clamp(v, fromRange)
    v = RangeU.map(v, fromRange, [-1, 1])
    //console.log('left value',v)
    return v
  })
  const forRight = tabContainerSpring.scrollLeft.to(v => {
    const fromRange = [(i+0)*w, (i+2)*w] as const
    v = RangeU.clamp(v, fromRange)
    v = RangeU.map(v, fromRange, [-1, 1])
    return v
  })
  
  
  return <Wrap css={css`
    min-width: ${w}px;
    width: ${w}px;
    max-width: ${w}px;
  `}>
    
    { RangeU.has(i-1, [0, lastIndex(headers)])
      && <AnimatedHeader css={css`
        width: ${0.6*w}px;
        mask-image: linear-gradient(to right,
          rgba(0,0,0,0) 0%, rgba(0,0,0,1) 50%,
          rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%
        );
      `}
        style={{
          x: forLeft.to(v => RangeU.map(v, [-1, 1], [-w/2 - w, w/2 - w])),
          scale: forLeft.to(v => 1 - 0.35 * Math.abs(v)),
          opacity: forLeft.to(v => 1 - 0.6 * Math.abs(v)),
        }}
      >
        <HeaderTextWrap
          onClick={() => {
            setTabsState('snapping')
            setTabIdx(i-1)
          }}
        >
          {headers[i-1]}
        </HeaderTextWrap>
      </AnimatedHeader>
    }
    
    { RangeU.has(i+1, [0, lastIndex(headers)])
      && <AnimatedHeader css={css`
        width: ${0.6*w}px;
        mask-image: linear-gradient(to right,
          rgba(0,0,0,0) 0%, rgba(0,0,0,1) 50%,
          rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%
        );
      `}
        style={{
          x: forRight.to(v => RangeU.map(v, [-1, 1], [-w/2 + w, w/2 + w])),
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
      style={{
        x: forCenter.to(v => RangeU.map(v, [-1, 1], [-(w/2), w/2])),
        scale: forCenter.to(v => 1 - 0.35 * Math.abs(v)),
        opacity: forCenter.to(v => 1 - 0.6 * Math.abs(v)),
      }}
    >
      
      <HeaderTextWrap
        onClick={() => {
          setTabsState('snapping')
          setTabIdx(i)
        }}
      >
        {headers[i]}
      </HeaderTextWrap>
    
    </AnimatedHeader>
    
  </Wrap>
})
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
  ${p=>Hs.page(p.theme)};
  overflow-wrap: anywhere;
  user-select: none;
  cursor: pointer;
`
