import { AnimatedProperty } from '@animated/AnimatedProperty.ts'
import AnimatedDiv from '@animated/elements/AnimatedDiv.tsx'
import AnimatedState from '@animated/elements/AnimatedState.tsx'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { getClampedCarouselProps } from '@util/animated/carousel/carouselProps.ts'
import { MathU } from '@util/common/MathU.ts'
import React, { useContext } from 'react'
import { Hdrs } from 'src/ui/0-elements/basic-elements/Hdrs.tsx'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { ArrayU } from 'src/util/common/ArrayU.ts'
import { TypeU } from 'src/util/common/TypeU.ts'
import { RangeU } from 'src/util/common/RangeU'
import lastIndex = ArrayU.lastI
import gridStackC = EmotionCommon.gridStackC
import col = EmotionCommon.col
import Getter = TypeU.Getter
import mod = MathU.mod
import arrOfIndices = ArrayU.arrOfIndices
import NumRange = RangeU.NumRange




export type ProfilePageTabHeaderContextProps = {
  getStartProgressX: Getter<number>
  getStartItemProgress: Getter<number>
  animatedDeltaProgressX: AnimatedProperty<number>
  
  //tabContainerSpring: TabsRenderProps['tabContainerSpring']
  progress: AnimatedProperty<(tabI: number) => number>
  //tabWidth: number
  headers: string[]
  //setTabsState: Setter<TabsState>
  //setTabIdx: Setter<TabIdx>
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
    let v = ap(mainTabI)
    const fromRange = [(mainTabI-1)*100, (mainTabI+1)*100] as NumRange
    v = RangeU.clamp(v, fromRange)
    v = -RangeU.map(v, fromRange, [-1, 1])
    //console.log('center value',v)
    return v
  })
  const forLeft = progress.map(ap => {
    let v = ap(mainTabI)
    const fromRange = [(mainTabI-2)*100 - 100, (mainTabI+0)*100 - 100] as NumRange
    v = RangeU.clamp(v, fromRange)
    v = -RangeU.map(v, fromRange, [-1, 1])
    //console.log('left value',v)
    return v
  })
  const forRight = progress.map(ap => {
    let v = ap(mainTabI)
    const fromRange = [(mainTabI+0)*100 - 100, (mainTabI+2)*100 - 100] as NumRange
    v = RangeU.clamp(v, fromRange)
    v = -RangeU.map(v, fromRange, [-1, 1])
    return v
  })
  
  
  
  
  const itemsCnt = headers.length
  const viewsCnt = itemsCnt
  
  
  const viewsFromI = 0
  const animatedProps = animatedDeltaProgressX.map(dp => (viewI = -viewsFromI) => {
    return getClampedCarouselProps({
      getStartProgressX,
      getStartItemProgress,
      deltaProgressX: dp,
      itemsCnt,
      viewsCnt,
      startViewI: viewsFromI,
      currViewI: viewI,
    })
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
          /* css={{
            maskImage:
          }} */
          animatedStyle={{
            transform: animatedProps.map(ap => {
              const { posI, viewPBase, viewPCurr, itemI } = ap(viewI)
              let x = 0
              // if (viewI === 0) x = viewPI + (100 - 0.5 * viewIP)
              // if (viewI === 1) x = viewPI - 0.5 * viewIP
              // if (viewI === 2) x = viewPI - 50 + 0.5 * viewIP
              if (posI === -1) x = viewPBase + 50
              if (posI === 0) x = viewPBase + 0.5 * viewPCurr
              if (posI === 1) x = viewPBase - 50
              return `translateX(${x}%)`
            }),
          }}
        >
          <AnimatedState
            animatedState={{
              itemI: animatedProps.map(ap => ap(viewI).itemI),
            }}
          >
            {({ itemI }) => (
              <Text>
                {headers[itemI]}
              </Text>
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
  ${col};
`

const Text = styled.h3`
  ${p => Hdrs.page(p.theme)};
  color: ${p => p.theme.page.ct3};
  overflow-wrap: anywhere;
  cursor: pointer;
`
