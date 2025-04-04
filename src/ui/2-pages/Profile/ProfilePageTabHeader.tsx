import { AnimatedProperty } from '@animated/AnimatedProperty.ts'
import AnimatedDiv from '@animated/elements/AnimatedDiv.tsx'
import AnimatedState from '@animated/elements/AnimatedState.tsx'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { getClampedCarouselProps } from '@util/animated/carousel/carouselProps.ts'
import { RangeU } from '@util/common/RangeU.ts'
import React, { useContext } from 'react'
import { Hdrs } from 'src/ui/0-elements/basic-elements/Hdrs.tsx'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { ArrayU } from 'src/util/common/ArrayU.ts'
import { TypeU } from 'src/util/common/TypeU.ts'
import gridStackC = EmotionCommon.gridStackC
import Getter = TypeU.Getter
import arrOfIndices = ArrayU.arrOfIndices
import colC = EmotionCommon.colC




export type ProfilePageTabHeaderContextProps = {
  getStartProgressX: Getter<number>
  getStartItemProgress: Getter<number>
  animatedDeltaProgressX: AnimatedProperty<number>
  headers: string[]
  goToTab: (tabI: number) => void
}
export const ProfilePageTabHeaderContext = React.createContext({} as ProfilePageTabHeaderContextProps)


export type ProfilePageTabHeaderProps = {
  mainTabI: number
}



const ProfilePageTabHeader = React.memo((props: ProfilePageTabHeaderProps) => {
  const {
    mainTabI,
  } = props
  
  
  const {
    getStartProgressX,
    getStartItemProgress,
    animatedDeltaProgressX,
    headers,
    goToTab,
  } = useContext(ProfilePageTabHeaderContext)
  
  /*
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
   */
  
  
  
  const itemsCnt = headers.length
  const viewsCnt = itemsCnt
  
  const animatedProps = animatedDeltaProgressX.map(dp => (viewI = 0) => {
    const props = getClampedCarouselProps({
      startProgressX: getStartProgressX(),
      startItemProgress: getStartItemProgress(),
      deltaProgressX: dp,
      itemsCnt,
      viewsCnt,
      startViewI: 0,
      startItemI: 0,
      currViewI: viewI,
    })
    
    const { viewPosI, viewPBase, viewPCurr, viewItemI } = props
    
    const i = viewPosI
    let x = 0
    
    if (viewItemI === 0) {
      if (i === -1) x = viewPBase + 50
      if (i === 0)  x = viewPBase - 50 - 0.5 * (100 - viewPCurr)
      if (i === 1)  x = viewPBase + 100
    }
    if (viewItemI === 1) {
      if (i === -1) x = viewPBase + 150
      if (i === 0)  x = viewPBase       + 0.5 * viewPCurr
      if (i === 1)  x = viewPBase - 100 - 0.5 * (100 - viewPCurr)
    }
    if (viewItemI === 2) {
      if (i === 0)  x = viewPBase + 100
      if (i === 1)  x = viewPBase - 50  + 0.5 * viewPCurr
      if (i === 2)  x = viewPBase - 150 + 0.5
    }
    
    x -= 100 * (mainTabI - 1)
    
    const k = RangeU.mapClamp(x, [-50, 50], [-1, 1])
    const scale = 1 - 0.35 * Math.abs(k)
    const opacity = 1 - 0.6 * Math.abs(k)
    
    return { ...props, x, scale, opacity }
  })
  
  
  return (
    <Wrap
      css={css`
        min-width: var(--w);
        width: var(--w);
        max-width: var(--w);
      `}
    >
      {arrOfIndices(itemsCnt).map(viewI => (
        <AnimatedHeader
          key={viewI}
          animatedStyle={{
            transform: animatedProps.map(ap => {
              const { x, scale } = ap(viewI)
              return `translateX(${x}%) scale(${scale})`
            }),
            opacity: animatedProps.map(ap => ap(viewI).opacity),
          }}
        >
          <AnimatedState
            animatedState={{
              itemI: animatedProps.map(ap => ap(viewI).viewItemI),
              posI: animatedProps.map(ap => ap(viewI).viewPosI),
            }}
          >
            {({ itemI, posI }) => (
              <TextBox
                style={{
                  width: !posI ? '70%' : '60%',
                  maskImage: !posI ? '' : `linear-gradient(to right,
                    rgba(0,0,0,0) 0%, rgba(0,0,0,1) 50%,
                    rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%
                  )`,
                }}
              >
                <Text onClick={() => goToTab(itemI)}>
                  {headers[itemI]}
                </Text>
              </TextBox>
            )}
          </AnimatedState>
        </AnimatedHeader>
      ))}
      
      
      {/*
      {RangeU.has(mainTabI-1, [0, lastIndex(headers)]) && (
        <AnimatedHeader
          css={css`
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
          <Text
            onClick={() => {
              //setTabsState('snapping')
              //setTabIdx(mainTabI-1)
            }}
          >
            {headers[mainTabI-1]}
          </Text>
        </AnimatedHeader>
      )
      }
      
      {RangeU.has(mainTabI+1, [0, lastIndex(headers)]) && (
        <AnimatedHeader
          css={css`
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
          <Text
            onClick={() => {
              //setTabsState('snapping')
              //setTabIdx(mainTabI + 1)
            }}
          >
            {headers[mainTabI + 1]}
          </Text>
        </AnimatedHeader>
      )
      }
      
      <AnimatedHeader
        animatedStyle={{
          transform: forCenter.map(v => {
            v = RangeU.map(v, [-1, 1], [-(1/2), 1/2])
            return `translateX(calc( var(--w) * ${v} ))`
          }),
          scale: forCenter.map(v => 1 - 0.35 * Math.abs(v)),
          opacity: forCenter.map(v => 1 - 0.6 * Math.abs(v)),
        }}
      >
        
        <Text
          onClick={() => {
            //setTabsState('snapping')
            //setTabIdx(mainTabI)
          }}
        >
          {headers[mainTabI]}
        </Text>
      
      </AnimatedHeader>
       */}
      
      
      
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
  width: 100%;
  ${colC};
  pointer-events: none;
`

const TextBox = styled.div`
  height: 100%;
  ${colC};
`

const Text = styled.h3`
  ${p => Hdrs.page(p.theme)};
  color: ${p => p.theme.page.ct3};
  overflow-wrap: anywhere;
  cursor: pointer;
  pointer-events: auto;
`
