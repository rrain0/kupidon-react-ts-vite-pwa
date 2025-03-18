import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useMemo } from 'react'
import { UiValues } from 'src/mini-libs/ui-text/UiText.ts'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { DatePlace } from 'src/ui-data/special/date-place/DatePlacesData.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { StyleVals } from 'src/ui-data/style/StyleVals.ts'
import ImgSpark from 'src/ui/0-elements/ImgSpark/ImgSpark.tsx'
import { ImgSparkS6 } from 'src/ui/0-elements/ImgSpark/ImgSparkS6.ts'
import UseBottomSheetState from 'src/ui/1-widgets/BottomSheet/UseBottomSheetState.tsx'
import BottomSheetBasic from 'src/ui/1-widgets/BottomSheetBasic/BottomSheetBasic.tsx'
import { BottomSheetBasicS6 } from 'src/ui/1-widgets/BottomSheetBasic/BottomSheetBasicS6.ts'
import { Contact } from 'src/ui/1-widgets/ContactButton/Contact.ts'
import ContactButton from 'src/ui/1-widgets/ContactButton/ContactButton.tsx'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar'
import BackBtn from 'src/ui/components/BottomButtonBar/parts/BackBtn.tsx'
import ModalPortal from 'src/ui/components/modal/ModalPortal/ModalPortal.tsx'
import { Pages } from 'src/ui/components/Pages/Pages'
import PageScrollbars from 'src/ui/1-widgets/Scrollbars/PageScrollbars'
import { useUiValues, useUiValuesArr } from 'src/mini-libs/ui-text/useUiText.ts'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { Hdrs } from 'ui/0-elements/basic-elements/Hdrs'
import Txt = EmotionCommon.Txt
import resetH = EmotionCommon.resetH
import col = EmotionCommon.col



export const LocationOverlayName = 'location'

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
  copyAddress: {
    'en-US': 'Copy address',
    'ru-RU': 'Скопировать адрес',
  },
} satisfies UiValues


export type DatePlacePageProps = {
  place: DatePlace
}
const DatePlacePage = React.memo((props: DatePlacePageProps) => {
  const { place } = props
  
  const uiValues = useMemo(() => ({
    pageTitle: place.name,
    addressText: place.uiAddress,
    description: place.description,
    features: uiVals.features,
    bonusesFromKupidon: uiVals.bonusesFromKupidon,
    contactInformation: uiVals.contactInformation,
    copyAddress: uiVals.copyAddress,
  }), [place])
  const uiText = useUiValues(uiValues)
  const featuresUiText = useUiValuesArr(place.features)
  const bonusesUiText = useUiValuesArr(place.kupidonBonuses)
  
  const locationDialog = useOverlayUrl(LocationOverlayName)
  const locations: Contact[] = [
    { type: 'copy', text: uiText.copyAddress, data: place.locationMap.q },
    ...place.locationPlaces,
    { type: 'map', ...place.locationMap },
  ]
  
  return (
    <>
    
      <Pages.PageGrad>
        <Pages.AddSafeInsets>
          <Pages.ContentColSm style={{ gap: 0 }}>
            
            <Pages.PageHeaderWithLeftRight>
              <BackBtn />
              <Hdrs.Page>{uiText.pageTitle}</Hdrs.Page>
              <div css={{ width: 50, height: 50 }} />
            </Pages.PageHeaderWithLeftRight>
            
            <div style={{ height: 34 }} />
            
            {!place.video && (
              <ImgSpark
                css={ImgSparkS6.t(imgSparkS)}
                src={place.picture}
              />
            )}
            {place.video && (
              <Video autoPlay loop muted playsInline
                src={place.video}
              />
            )}
            
            <div style={{ height: 19 }} />
            
            <Title>
              {uiText.pageTitle}
            </Title>
            
            <div style={{ height: 7 }} />
            
            <ContactButton
              contact={{ type: 'address', text: uiText.addressText! }}
              onClick={locationDialog.open}
            />
            
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
                        key={JSON.stringify(it)}
                        contact={it}
                      />
                    ))}
                  </ContactsList>
                </div>
              )}
              
            </div>
          
          </Pages.ContentColSm>
        </Pages.AddSafeInsets>
        
        <PageScrollbars />
      </Pages.PageGrad>
      
      
      <UseBottomSheetState isOpen={locationDialog.isOpen} onClose={locationDialog.close}>
        {props => (
          <ModalPortal>
            <BottomSheetBasic
              css={BottomSheetBasicS6.t(BottomSheetBasicS6.S.bottom.sheet.full.normal)}
              {...props.sheetProps}
            >
              <ContactsList>
                {locations.map(it => (
                  <ContactButton
                    key={JSON.stringify(it)}
                    contact={it}
                  />
                ))}
              </ContactsList>
              <div style={{ height: 40 }} />
            </BottomSheetBasic>
          </ModalPortal>
        )}
      </UseBottomSheetState>
      
      
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

const Video = styled.video`
  width: 100%;
  aspect-ratio: 1;
  object-position: center;
  object-fit: cover;
  border-radius: ${StyleVals.cardRadius}px;
  overflow: hidden;
`

const Title = styled.div`
  // TODO Theme
  color: black;
  ${Txt.s20Bold};
`


const Description = styled.div`
  // TODO Theme
  color: #000000;
  text-align: justify;
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
  gap: 16px;
`
