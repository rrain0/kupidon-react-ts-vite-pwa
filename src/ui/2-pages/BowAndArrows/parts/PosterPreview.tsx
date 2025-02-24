import styled from '@emotion/styled'
import { AppWidgetStyle } from 'mini-libs/widget-style-6/WidgetStyle'
import React from 'react'
import { MockPoster } from 'src/_mock-data/poster/MockPoster.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { StyleVals } from 'src/ui-data/style/StyleVals.ts'
import { SvgIconS6 } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS6.ts'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import ImgSpark from 'src/ui/0-elements/ImgSpark/ImgSpark.tsx'
import { ImgSparkS6 } from 'src/ui/0-elements/ImgSpark/ImgSparkS6.ts'
import SelectMeter from 'src/ui/0-elements/select-item/SelectMeter/SelectMeter.tsx'
import { SelectMeterS6 } from 'src/ui/0-elements/select-item/SelectMeter/SelectMeterS6.ts'
import Txt = EmotionCommon.Txt
import rowC = EmotionCommon.rowC
import LocationIc = SvgIconsPack.LocationIc
import PriceTagIc = SvgIconsPack.PriceTagIc



const PosterPreview = React.memo(() => {
  
  const p = MockPoster.posters[0]
  
  return (
    <Frame
      data-display-name="PosterPreview"
    >
      
      <MiniPosterFrame>
      
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
          
          <PriceBox>
            <PriceTagIc css={SvgIconS6.t(priceTagIcS)} />
            <PriceText>{p.price}</PriceText>
          </PriceBox>
        </MiniPosterBox>
        
      </MiniPosterFrame>
      
      <SelectMeter
        css={SelectMeterS6.t(selectMeterS)}
        metersValues={[2, 0, 0, 0, 0]}
      />
      
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


const MiniPosterFrame = styled.div`
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
