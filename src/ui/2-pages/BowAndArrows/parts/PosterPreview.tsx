import AnimatedDiv from '@animated/elements/AnimatedDiv.tsx'
import AnimatedState from '@animated/elements/AnimatedState.tsx'
import styled from '@emotion/styled'
import { ArrayU } from '@util/common/ArrayU.ts'
import { MathU } from '@util/common/MathU.ts'
import { RangeU } from '@util/common/RangeU.ts'
import { getViewProps } from '@util/view/ViewProps.ts'
import { AppWidgetStyle } from 'mini-libs/widget-style-6/WidgetStyle'
import React, { useRef } from 'react'
import { MockPoster } from 'src/_mock-data/poster/MockPoster.ts'
import { Colors } from 'src/ui-data/Colors.ts'
import { PosterData } from 'src/ui-data/special/poster/PosterData.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { StyleVals } from 'src/ui-data/style/StyleVals.ts'
import { SvgIconS6 } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS6.ts'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import ImgSpark from 'src/ui/0-elements/ImgSpark/ImgSpark.tsx'
import { ImgSparkS6 } from 'src/ui/0-elements/ImgSpark/ImgSparkS6.ts'
import SelectMeter from 'src/ui/0-elements/select-item/SelectMeter/SelectMeter.tsx'
import { SelectMeterS6 } from 'src/ui/0-elements/select-item/SelectMeter/SelectMeterS6.ts'
import { useGallery } from 'src/ui/components/UseGallery/useGallery.ts'
import Txt = EmotionCommon.Txt
import rowC = EmotionCommon.rowC
import LocationIc = SvgIconsPack.LocationIc
import PriceTagIc = SvgIconsPack.PriceTagIc
import mod = MathU.mod
import arrOfIndices = ArrayU.arrOfIndices
import arrOfZeros = ArrayU.arrOfZeros
import round3 = MathU.round3



const PosterPreview = React.memo(() => {
  
  const posters = PosterData
  const itemsCnt = posters.length
  const visibleViewsCnt = 3
  
  const itemsBoxRef = useRef<HTMLDivElement>(null)
  const getTrackProps = () => {
    const pb = itemsBoxRef.current
    if (pb) {
      const p = getViewProps(itemsBoxRef.current)
      return { x: p.x, y: p.y, w: p.w, h: p.h }
    }
    return { x: 0, y: 0, w: 0, h: 0 }
  }
  
  
  const {
    getWasDragged,
    onTrackDrag,
    animatedCurrProgressX,
    
    getStartProgressX,
    getStartItemProgress,
    getCurrProgressX,
  } = useGallery({
    itemsCnt,
    visibleViewsCnt,
    getTrackProps,
    noDrag: itemsCnt <= 1,
  })
  
  const animatedProps = animatedCurrProgressX.map(cp => (i = 1) => {
    const p = getStartProgressX() + cp
    const itemP = getStartItemProgress() + cp
    const pCurr = mod(p, 100)
    const displayed0I = RangeU.loop(Math.floor(p / 100), [-1, visibleViewsCnt - 1])
    const displayedI = RangeU.loop((i - 1) + displayed0I, [-1, visibleViewsCnt - 1])
    //console.log('i', i, 'displayedI', displayedI, 'p', p, 'itemP', itemP)
    // item progress параллелен прогрессу по оси x, так что его инвертируем
    const item0I = RangeU.loop(itemsCnt - Math.floor(itemP / 100), [0, itemsCnt])
    const itemI = RangeU.loop(displayedI + item0I, [0, itemsCnt])
    const item0VisibleI = RangeU.loop(itemsCnt - Math.floor((itemP + 50) / 100), [0, itemsCnt])
    // progressCurrent - nonnegative
    return { p, itemP, pCurr, displayed0I, displayedI, item0I, itemI, item0VisibleI }
  })
  
  return (
    <Frame
      data-display-name="PosterPreview"
      ref={itemsBoxRef}
      {...onTrackDrag()}
    >
      
      {arrOfIndices(visibleViewsCnt).map(viewI => {
        return (
          <MiniPosterFrame
            key={viewI}
            animatedStyle={{
              transform: animatedProps.map(ap => {
                const { p, itemP, pCurr, displayedI } = ap(viewI)
                let x = displayedI * 100 + pCurr
                // add gap 20%
                x = RangeU.map(x, [0, 100], [0, 120])
                return `translateX(${x}%)`
              }),
            }}
          >
            
            <AnimatedState
              animatedState={{
                itemI: animatedProps.map(ap => ap(viewI).itemI),
              }}
            >
              {({ itemI }) => {
                //console.log('itemI', itemI)
                /* return (
                  <div
                    style={{
                      backgroundColor: Colors.test[itemI],
                      width: '100%',
                      height: '100%',
                      padding: 10,
                    }}
                  >
                    {itemI + 1}
                  </div>
                ) */
                
                const p = posters[itemI]
                return (
                  <>
                    <ImgSpark
                      css={ImgSparkS6.t(ImgSparkS6.S.img.img.absFull.normal)}
                      src={p.previewImg}
                    />
                    
                    <MiniPosterImageFade />
                    
                    <MiniPosterBox>
                      <Date>{p.date}</Date>
                      
                      <LocationBox>
                        <LocationIc css={SvgIconS6.t(locationIcS)} />
                        <LocationText>{p.location}</LocationText>
                      </LocationBox>
                      
                      <Description>{p.description}</Description>
                      
                      {p.price && (
                        <PriceBox>
                          <PriceTagIc css={SvgIconS6.t(priceTagIcS)} />
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
          item0VisibleI: animatedProps.map(ap => ap().item0VisibleI),
        }}
      >
        {({ item0VisibleI }) => (
          <SelectMeter
            css={SelectMeterS6.t(selectMeterS)}
            metersValues={arrOfZeros(itemsCnt).map((it, i) => i === item0VisibleI ? 2 : it)}
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
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
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
