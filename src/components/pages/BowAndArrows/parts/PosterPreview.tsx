import AnimatedDiv from '@animated/elems/AnimatedDiv.tsx'
import AnimatedState from '@animated/elems/AnimatedState.tsx'
import styled from '@emotion/styled'
import {
  defaultCarouselMergeProgress,
  getLoopedCarouselProps,
} from '@utils/move/animated/carousel/props/defaultCarouselProps.ts'
import { createTrackPropsGetter } from '@utils/move/animated/carousel/createTrackPropsGetter.ts'
import { arrOfIndices, arrOfZeros } from '@utils/base/arrayUtils.ts'
import { rangeMap } from '@utils/base/math/rangeUtils.ts'
import { useInterval2 } from '@utils/react/useInterval2.ts'
import { useElemRefGetSet } from '@utils/elem/react/useElemRefGetSet.ts'
import { AppWidgetStyle } from '@libs/widget-style-6/WidgetStyle'
import React, { useEffect, useState } from 'react'
import { PosterData } from 'src/configs/poster/PosterData.ts'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import { StyleVals } from 'src/styles/StyleVals.ts'
import PriceTagIc from 'src/components/elems/icons/SvgIcons/pack/special/PriceTagIc.tsx'
import LocationIc from 'src/components/elems/icons/SvgIcons/pack/ui/LocationIc.tsx'
import { SvgIconS6 } from 'src/components/elems/icons/SvgIcons/SvgIconS6.ts'
import ImgSpark from 'src/components/elems/ImgSpark/ImgSpark.tsx'
import { ImgSparkS6 } from 'src/components/elems/ImgSpark/ImgSparkS6.ts'
import SelectMeter from 'src/components/elems/select-item/SelectMeter/SelectMeter.tsx'
import { SelectMeterS6 } from 'src/components/elems/select-item/SelectMeter/SelectMeterS6.ts'
import { useCarousel } from '@utils/move/animated/carousel/useCarousel.ts'
import Txt = EmotionCommon.Txt
import rowC = EmotionCommon.rowC
import absTlwh = EmotionCommon.absTlwh




const PosterPreview = React.memo(() => {
  
  const posters = PosterData
  
  const itemsCnt = posters.length
  const viewsCnt = 3
  
  const [, , itemsBoxRef] = useElemRefGetSet()
  const getTrackProps = createTrackPropsGetter(itemsBoxRef)
  
  const {
    isDragging,
    getIsDragging,
    getWasDragged,
    onTrackDrag,
    
    getStartProgress,
    getStartItemProgress,
    getDeltaProgress,
    animatedDeltaProgress,
    
    animateTo,
  } = useCarousel({
    itemsCnt,
    viewsCnt,
    getTrackProps,
    axis: 'x',
    inverted: true,
    velThreshold: 120,
    mergeProgress: defaultCarouselMergeProgress,
    noDrag: itemsCnt <= 1,
  })
  
  const [wasDraggedOnce, setWasDraggedOnce] = useState(false)
  useEffect(() => {
    if (isDragging) setWasDraggedOnce(true)
  }, [isDragging])
  
  useInterval2({ offset: !wasDraggedOnce ? 2500 : 5000, interval: 3000 }, () => {
    if (isDragging) return
    void animateTo({ next: true })
  }, [isDragging, wasDraggedOnce])
  
  const animatedProps = animatedDeltaProgress.map(dp => (viewI = 0) => {
    return getLoopedCarouselProps({
      startP: getStartProgress(),
      startItemP: getStartItemProgress(),
      deltaP: dp,
      itemsCnt,
      viewsCnt,
      viewFirstI: -1,
      currViewI: viewI,
    })
  })
  
  return (
    <Frame
      data-display-name="PosterPreview"
      ref={itemsBoxRef}
      {...onTrackDrag()}
    >
      
      {arrOfIndices(viewsCnt).map(viewI => {
        return (
          <MiniPosterFrame
            key={viewI}
            /* style={{
              backgroundColor: Colors.test[viewI],
              padding: 10,
            }} */
            animatedStyle={{
              transform: animatedProps.map(ap => {
                const { viewP } = ap(viewI)
                // add gap 20%
                const x = rangeMap(viewP, [0, 100], [0, 120])
                //console.log('x', x)
                return `translateX(${x}%)`
              }),
            }}
          >
            {/* {viewI - 1} */}
            <AnimatedState
              animatedState={{
                itemI: animatedProps.map(ap => ap(viewI).viewItemI),
              }}
            >
              {({ itemI }) => {
                //console.log('itemI', itemI)
                const p = posters[itemI]
                return (
                  <>
                    <ImgSpark
                      css={ImgSparkS6.t(ImgSparkS6.S.img.img.absTrbl.normal)}
                      src={p.previewImg}
                    />
                    
                    <MiniPosterImageFade/>
                    
                    <MiniPosterBox>
                      <Date>{p.date}</Date>
                      
                      <LocationBox>
                        <LocationIc css={SvgIconS6.t(locationIcS)}/>
                        <LocationText>{p.location}</LocationText>
                      </LocationBox>
                      
                      <Description>{p.description}</Description>
                      
                      {p.price && (
                        <PriceBox>
                          <PriceTagIc css={SvgIconS6.t(priceTagIcS)}/>
                          <PriceText>{p.price}</PriceText>
                        </PriceBox>
                      )}
                    </MiniPosterBox>
                  </>
                )
              }}
              
            </AnimatedState>
          </MiniPosterFrame>
        )
      })}
      
      <AnimatedState
        animatedState={{
          pos0ItemHalfI: animatedProps.map(ap => ap().pos0ItemHalfI),
        }}
      >
        {({ pos0ItemHalfI }) => (
          <SelectMeter
            css={SelectMeterS6.t(selectMeterS)}
            metersValues={arrOfZeros(itemsCnt).map((it, i) => i === pos0ItemHalfI ? 2 : it)}
          />
        )}
      </AnimatedState>
      
    </Frame>
  )
})
PosterPreview.displayName = 'PosterPreview'
export default PosterPreview




const Frame = styled.div`
  position: relative;
  width: 100%;
  height: 214px;
  --r: ${StyleVals.cardRadius}px;
  border-radius: var(--r);
  overflow: hidden;
  display: grid;
  grid: 'meter' auto / auto;
  // TODO если начать листать, то тень будет кринжово смотреться
  box-shadow: ${StyleVals.shadowSz} ${p => p.theme.shadow.bg};
  // allow intercept only single finger up / down swipe gestures
  touch-action: pan-y;
`


const selectMeterS: AppWidgetStyle = t => [
  SelectMeterS6.S.row.round.md.normal, {
    meterFrame: {
      area: 'meter', placeSelf: 'end center',
      pb: 8, g: 3,
      pos: 'rel', z: 10,
    },
    meter: { sz: 3 },
    // TODO Theme
    meter0: { bgColor: '#D9D9D940' },
    // TODO Theme
    meter2: { bgColor: '#D9D9D9BF' },
  },
]


const MiniPosterFrame = styled(AnimatedDiv)`
  ${absTlwh};
  border-radius: var(--r);
  overflow: hidden;
`


const MiniPosterImageFade = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    #6B6B6B00 0%,
    #000000B0 100%
  );
`


const MiniPosterBox = styled.div`
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: grid;
  grid:
    '.... .... .... price' 14px
    '.... date .... price' auto
    '.... loc  .... price' auto
    '.... .... .... .....' 1fr
    '.... desc .... .....' auto
    '.... .... .... .....' 19px
    /14px 1fr  8px  110px;
`

const Date = styled.div`
  grid-area: date;
  // TODO Theme
  color: white;
  ${Txt.s32Bold};
  line-height: 1;
`

const LocationBox = styled.div`
  grid-area: loc;
  ${rowC};
  gap: 3px;
`
const locationIcS: AppWidgetStyle = t => [
  SvgIconS6.S.icon.icon.full.normal, {
    icon: {
      sz: 20,
      // TODO Theme
      color: 'white',
    },
  },
]
const LocationText = styled.div`
  margin-top: 3px;
  // TODO Theme
  color: white;
  ${Txt.s14BoldWide};
  line-height: 1;
`

const Description = styled.div`
  grid-area: desc;
  // TODO Theme
  color: white;
  ${Txt.s14Thin};
  line-height: 1.1;
`

const PriceBox = styled.div`
  grid-area: price;
  place-self: start end;
  margin-top: 19px;
  width: fit-content;
  min-height: 27px;
  padding: 0 8px;
  // TODO Theme
  background-color: #BB264991;
  border-radius: 10px 0 0 10px;
  ${rowC};
  gap: 3px;
`
const priceTagIcS: AppWidgetStyle = t => [
  SvgIconS6.S.icon.icon.full.normal, {
    icon: {
      mt: -1,
      sz: 15,
      // TODO Theme
      color: 'white',
    },
  },
]
const PriceText = styled.div`
  // TODO Theme
  color: white;
  ${Txt.s14Thin};
  line-height: 1;
`
