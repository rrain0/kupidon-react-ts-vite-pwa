import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useMemo } from 'react'
import { UiValues } from 'src/mini-libs/ui-text/UiText.ts'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { DatePlace } from 'src/ui-data/special/DatePlacesData.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { StyleVals } from 'src/ui-data/style/StyleVals.ts'
import { SvgIconS6 } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS6.ts'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import ImgSpark from 'src/ui/0-elements/ImgSpark/ImgSpark.tsx'
import { ImgSparkS6 } from 'src/ui/0-elements/ImgSpark/ImgSparkS6.ts'
import ContactButton from 'src/ui/2-pages/DatePlace/parts/ContactButton.tsx'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar'
import BackBtn from 'src/ui/components/BottomButtonBar/parts/BackBtn.tsx'
import { Pages } from 'src/ui/components/Pages/Pages'
import PageScrollbars from 'src/ui/1-widgets/Scrollbars/PageScrollbars'
import { useUiValues, useUiValuesArr } from 'src/mini-libs/ui-text/useUiText.ts'
import { Hdrs } from 'ui/0-elements/basic-elements/Hdrs'
import Txt = EmotionCommon.Txt
import LocationIc = SvgIconsPack.LocationIc
import rowC = EmotionCommon.rowC
import resetH = EmotionCommon.resetH
import col = EmotionCommon.col



const uiVals = {
  insightsAndPlacesForDate: {
    'ru-RU': 'Идеи и места для свиданий',
  },
  features: {
    'ru-RU': 'Особенности',
  },
  bonusesFromKupidon: {
    'ru-RU': 'Бонусы от «Купидон»',
  },
  contactInformation: {
    'en-US': 'Contact information',
    'ru-RU': 'Контактная информация',
  },
} satisfies UiValues


export type DatePlacePageProps = {
  place: DatePlace
}
const DatePlacePage = React.memo((props: DatePlacePageProps) => {
  const { place } = props
  
  const uiValues = useMemo(() => ({
    pageTitle: place.name,
    location: place.location,
    description: place.description,
    features: uiVals.features,
    bonusesFromKupidon: uiVals.bonusesFromKupidon,
    contactInformation: uiVals.contactInformation,
  }), [place])
  
  const uiText = useUiValues(uiValues)
  const featuresUiText = useUiValuesArr(place.features)
  const bonusesUiText = useUiValuesArr(place.kupidonBonuses)
  
  return (
    <>
    
      <Pages.PageGrad>
        <Pages.AddSafeInsets>
          <Pages.ContentSmCol style={{ gap: 0 }}>
            
            <Pages.PageHeaderWithLeftRight>
              <BackBtn />
              <Hdrs.Page>{uiText.pageTitle}</Hdrs.Page>
              <div css={{ width: 50, height: 50 }} />
            </Pages.PageHeaderWithLeftRight>
            
            <div style={{ height: 34 }} />
            
            <ImgSpark
              css={ImgSparkS6.t(imgSparkS)}
              src={place.picture}
            />
            
            <div style={{ height: 19 }} />
            
            <Title>
              {uiText.pageTitle}
            </Title>
            
            <div style={{ height: 7 }} />
            
            <LocationBox>
              <LocationIc css={SvgIconS6.t(locationIcS)} />
              <LocationText>{uiText.location}</LocationText>
            </LocationBox>
            
            <div style={{ height: 17 }} />
            
            <Description>{uiText.description}</Description>
            
            
            
            <div style={{ height: 19 }} />
            
            <div css={css`${col}; gap: 26px;`}>
              
              {!!featuresUiText.length && (
                <div css={col}>
                  <ListTitle>{uiText.features}</ListTitle>
                  
                  <div style={{ height: 12 }} />
                  
                  <List>
                    {featuresUiText.map(it => (
                      <ListItem key={it}>{it}</ListItem>
                    ))}
                  </List>
                </div>
              )}
              
              {!!bonusesUiText.length && (
                <div css={col}>
                  <ListTitle>{uiText.bonusesFromKupidon}</ListTitle>
                  
                  <div style={{ height: 12 }} />
                  
                  <List>
                    {bonusesUiText.map(it => (
                      <ListItem key={it}>{it}</ListItem>
                    ))}
                  </List>
                </div>
              )}
              
              {!!place.contacts.length && (
                <div css={col}>
                  <ListTitle>{uiText.contactInformation}</ListTitle>
                  
                  <div style={{ height: 12 }} />
                  
                  <ContactsList>
                    {place.contacts.map(it => (
                      <ContactButton
                        key={[it.type, it.value].join()}
                        type={it.type}
                        value={it.value}
                      />
                    ))}
                  </ContactsList>
                </div>
              )}
              
            </div>
          
          </Pages.ContentSmCol>
        </Pages.AddSafeInsets>
        
        <PageScrollbars />
      </Pages.PageGrad>
      
      
      <BottomButtonBar settingsBtn />
      
    </>
  )
})
export default DatePlacePage



const imgSparkS: AppWidgetStyle = [
  ImgSparkS6.S.img.img.wFull.normal, {
    imgFrame: { ratio: 1.570, r: StyleVals.cardRadius },
  },
]

const Title = styled.div`
  // TODO Theme
  color: black;
  ${Txt.s20Bold};
`


const LocationBox = styled.div`
  grid-area: loc;
  ${rowC};
  gap: 3px;
`
const locationIcS: AppWidgetStyle = t => [
  SvgIconS6.S.icon.icon.full.normal, {
    // TODO Theme
    icon: { sz: 20, color: '#848484' },
  },
]
const LocationText = styled.div`
  margin-top: 2px;
  // TODO Theme
  color: #848484;
  ${Txt.s15Bold};
  line-height: 1;
`


const Description = styled.div`
  // TODO Theme
  color: #000000;
  ${Txt.s15};
`


const ListTitle = styled.h6`
  ${resetH};
  // TODO Theme
  color: #232020;
  ${Txt.s17Bold};
`
const List = styled.ul`
  padding-left: 40px;
`
const ListItem = styled.li``



const ContactsList = styled.div`
  ${col};
  gap: 24px;
`
