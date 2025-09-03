import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useMemo } from 'react'
import { UiValues } from 'src/mini-libs/ui-text/UiText.ts'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { DatePlace } from 'src/configs/date-place/DatePlacesData.ts'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import { StyleVals } from 'src/styles/StyleVals.ts'
import Flex from 'src/components/elems/basic-elements/Flex.tsx'
import Gap from 'src/components/elems/basic-elements/Gap.tsx'
import Grid from 'src/components/elems/basic-elements/Grid.tsx'
import ImgSpark from 'src/components/elems/ImgSpark/ImgSpark.tsx'
import { ImgSparkS6 } from 'src/components/elems/ImgSpark/ImgSparkS6.ts'
import UseBottomSheetState from 'src/components/widgets/BottomSheet/UseBottomSheetState.tsx'
import BottomSheetBasic from 'src/components/widgets/BottomSheetBasic/BottomSheetBasic.tsx'
import { BottomSheetBasicS6 } from 'src/components/widgets/BottomSheetBasic/BottomSheetBasicS6.ts'
import { Contact } from 'src/components/widgets/ContactButton/Contact.ts'
import ContactButton from 'src/components/widgets/ContactButton/ContactButton.tsx'
import PageContentLayout from 'src/components/components/page/PageContentLayout.tsx'
import PageLayout from 'src/components/components/page/PageLayout.tsx'
import BottomFloatingBar from 'src/components/components/screen-bars/BottomFloatingBar.tsx'
import BackButton from 'src/components/components/screen-bars/parts/BackButton.tsx'
import ModalPortal from 'src/components/components/modal/ModalPortal.tsx'
import { useUiValues, useUiValuesArr } from 'src/mini-libs/ui-text/useUiText.ts'
import { useOverlayUrl } from 'src/components/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { Hdrs } from 'components/elems/basic-elements/Hdrs'
import Txt = EmotionCommon.Txt
import resetH = EmotionCommon.resetH
import col = EmotionCommon.col



export const LocationOverlayName = 'location'

const uiVals = {
  insightsAndPlacesForDate: {
    'ru-RU': 'Идеи и места',
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
    
      <PageLayout col data-display-name='DatePlacePage'>
        <PageContentLayout colSm>
          
          <Grid cols='38px 1fr 38px' stretch>
            <Flex centerStart m={-13}><BackButton/></Flex>
            <Flex center><Hdrs.Page>{uiText.pageTitle}</Hdrs.Page></Flex>
            <Gap w={38}/>
          </Grid>
          
          <div style={{ height: 34 }}/>
          
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
          
          <div style={{ height: 19 }}/>
          
          <Title>
            {uiText.pageTitle}
          </Title>
          
          <div style={{ height: 7 }}/>
          
          <ContactButton
            contact={{ type: 'address', text: uiText.addressText! }}
            onClick={locationDialog.open}
          />
          
          <div style={{ height: 17 }}/>
          
          <Description>{uiText.description}</Description>
          
          
          
          <div style={{ height: 19 }}/>
          
          <div css={css`${col}; gap: 26px;`}>
            
            {!!featuresUiText.length && (
              <div css={col}>
                <ListTitle>{uiText.features}</ListTitle>
                
                <div style={{ height: 12 }}/>
                
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
                
                <div style={{ height: 12 }}/>
                
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
                
                <div style={{ height: 12 }}/>
                
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
        
        </PageContentLayout>
      </PageLayout>
      
      
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
              <div style={{ height: 40 }}/>
            </BottomSheetBasic>
          </ModalPortal>
        )}
      </UseBottomSheetState>
      
      
      <BottomFloatingBar settingsButton/>
      
    </>
  )
})
DatePlacePage.displayName = 'DatePlacePage'
export default DatePlacePage



const imgSparkS: AppWidgetStyle = [
  ImgSparkS6.S.img.img.fullW.normal, {
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
  color: ${p => p.theme.boxAccent6Ct.ct};
  ${Txt.s20Bold};
`


const Description = styled.div`
  color: ${p => p.theme.boxDefault2.ct};
  text-align: justify;
  ${Txt.s15};
`


const ListTitle = styled.h6`
  ${resetH};
  color: ${p => p.theme.boxNormal4.ct};
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
