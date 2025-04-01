import { AnimatedProperty } from '@animated/AnimatedProperty.ts'
import AnimatedDiv from '@animated/elements/AnimatedDiv.tsx'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useContext } from 'react'
import { Hdrs } from 'src/ui/0-elements/basic-elements/Hdrs.tsx'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { ArrayU } from 'src/util/common/ArrayU.ts'
import { TypeU } from 'src/util/common/TypeU.ts'
import { RangeU } from 'src/util/common/RangeU'
import lastIndex = ArrayU.lastI
import gridStackC = EmotionCommon.gridStackC
import col = EmotionCommon.col




export type ProfilePageTabHeaderContextProps = {
  //tabContainerSpring: TabsRenderProps['tabContainerSpring']
  progress: AnimatedProperty<(tabI: number) => number>
  //tabWidth: number
  headers: string[]
  //setTabsState: Setter<TabsState>
  //setTabIdx: Setter<TabIdx>
}
export const ProfilePageTabHeaderContext = React.createContext({} as ProfilePageTabHeaderContextProps)


export type ProfilePageTabHeaderProps = {
  thisTabIdx: number
}



const ProfilePageTabHeader = React.memo((props: ProfilePageTabHeaderProps) => {
  const {
    thisTabIdx: i,
  } = props
  
  
  const {
    //tabContainerSpring,
    progress,
    //tabWidth: w,
    headers,
    //setTabsState,
    //setTabIdx,
  } = useContext(ProfilePageTabHeaderContext)
  
  
  
  // -1 - заголовок уехал влево
  // 0 - заголовок по центру
  // +1 - заголовок уехал вправо
  const forCenter = progress.map(ap => {
    let v = ap(i)
    const fromRange = [(i-1)*100, (i+1)*100] as const
    v = RangeU.clamp(v, fromRange)
    v = -RangeU.map(v, fromRange, [-1, 1])
    //console.log('center value',v)
    return v
  })
  const forLeft = progress.map(ap => {
    let v = ap(i)
    const fromRange = [(i-2)*100 - 100, (i+0)*100 - 100] as const
    v = RangeU.clamp(v, fromRange)
    v = -RangeU.map(v, fromRange, [-1, 1])
    //console.log('left value',v)
    return v
  })
  const forRight = progress.map(ap => {
    let v = ap(i)
    const fromRange = [(i+0)*100 - 100, (i+2)*100 - 100] as const
    v = RangeU.clamp(v, fromRange)
    v = -RangeU.map(v, fromRange, [-1, 1])
    return v
  })
  
  
  return (
    <Wrap
      css={css`
        min-width: var(--w);
        width: var(--w);
        max-width: var(--w);
      `}
    >
      
      {RangeU.has(i-1, [0, lastIndex(headers)]) && (
        <AnimatedHeader
          css={css`
            width: calc( 0.6 * var(--w) );
            mask-image: linear-gradient(to right,
              rgba(0,0,0,0) 0%, rgba(0,0,0,1) 50%,
              rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%
            );
          `}
          animatedStyle={{
            transform: forLeft.map(v => {
              v = RangeU.map(v, [-1, 1], [-1/2 - 1, 1/2 - 1])
              return `translateX(calc( var(--w) * ${v} ))`
            }),
            scale: forLeft.map(v => 1 - 0.35 * Math.abs(v)),
            opacity: forLeft.map(v => 1 - 0.6 * Math.abs(v)),
          }}
        >
          <HeaderTextWrap
            onClick={() => {
              //setTabsState('snapping')
              //setTabIdx(i-1)
            }}
          >
            {headers[i-1]}
          </HeaderTextWrap>
        </AnimatedHeader>
      )
      }
      
      {RangeU.has(i+1, [0, lastIndex(headers)]) && (
        <AnimatedHeader
          css={css`
            width: calc( 0.6 * var(--w) );
            mask-image: linear-gradient(to right,
              rgba(0,0,0,0) 0%, rgba(0,0,0,1) 50%,
              rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%
            );
          `}
          animatedStyle={{
            transform: forRight.map(v => {
              v = RangeU.map(v, [-1, 1], [-1/2 + 1, 1/2 + 1])
              return `translateX(calc( var(--w) * ${v} ))`
            }),
            scale: forRight.map(v => 1 - 0.35 * Math.abs(v)),
            opacity: forRight.map(v => 1 - 0.6 * Math.abs(v)),
          }}
        >
          <HeaderTextWrap
            onClick={() => {
              //setTabsState('snapping')
              //setTabIdx(i + 1)
            }}
          >
            {headers[i + 1]}
          </HeaderTextWrap>
        </AnimatedHeader>
      )
      }
      
      <AnimatedHeader
        css={css`
          width: calc( 0.7 * var(--w) );
        `}
        animatedStyle={{
          transform: forCenter.map(v => {
            v = RangeU.map(v, [-1, 1], [-(1/2), 1/2])
            return `translateX(calc( var(--w) * ${v} ))`
          }),
          scale: forCenter.map(v => 1 - 0.35 * Math.abs(v)),
          opacity: forCenter.map(v => 1 - 0.6 * Math.abs(v)),
        }}
      >
        
        <HeaderTextWrap
          onClick={() => {
            //setTabsState('snapping')
            //setTabIdx(i)
          }}
        >
          {headers[i]}
        </HeaderTextWrap>
      
      </AnimatedHeader>
      
    </Wrap>
  )
})
export default ProfilePageTabHeader





const Wrap = styled.div`
  align-self: center;
  height: fit-content;
  position: relative;
  overflow: hidden;
  ${gridStackC};
  place-items: start center;
`

const AnimatedHeader = styled(AnimatedDiv)`
  ${col};
  overflow: visible;
`
const HeaderTextWrap = styled.h3`
  ${p => Hdrs.page(p.theme)};
  color: ${p => p.theme.page.ct3};
  overflow-wrap: anywhere;
  cursor: pointer;
`
