import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { UiValues } from '@mini-libs/ui-text/UiText.ts'
import React, { useEffect, useMemo, useState } from 'react'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import {
  getMediaUiState,
  MediaDownloadable, newDefaultEmptyRemoteMedia,
  newDefaultRemoteMediaDownloadable,
} from 'src/ui-data/models/media/Media.ts'
import MediaDownloader from 'src/ui-data/models/media/download/MediaDownloader.tsx'
import MediaUiState from 'src/ui-data/models/media/MediaUiState.tsx'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import { ActionUiText } from 'src/ui-data/translations/ActionUiText.ts'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import Gap from 'src/ui/0-elements/basic-elements/Gap.tsx'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import { IconButtonS6 } from 'src/ui/0-elements/buttons/IconButton/IconButtonS6.ts'
import { HeaderArrowS } from 'src/ui/0-elements/HeaderArrow/HeaderArrowS.ts'
import GearOutlinedIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/GearOutlinedIc.tsx'
import HeaderArrow from 'src/ui/0-elements/HeaderArrow/HeaderArrow.tsx'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import {
  QuickSettingsOverlayName
} from 'src/ui/1-widgets/QuickSettings/QuickSettings.tsx'
import SummaryPageFeatureCards
  from 'src/ui/2-pages/Profile/ProfileSummary/parts/SummaryPageFeatureCards.tsx'
import { ProfileSummaryPageParts }
  from 'src/ui/2-pages/Profile/ProfileSummary/ProfileSummaryPage.parts.ts'
import AppLink from 'src/ui/components/app-router/AppLink.tsx'
import PageContentLayout from 'src/ui/components/page/PageContentLayout.tsx'
import PageLayout from 'src/ui/components/page/PageLayout.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import UseOverlayUrl from 'src/ui/components/UseOverlayUrl/UseOverlayUrl.tsx'
import { DateU } from '@utils/date/DateU.ts'
import { MockData } from 'src/_mock-data/MockData.ts'
import { AppTheme } from 'src/styles/themes/AppTheme.ts'
import { useAppZustand } from 'src/zustand/app/AppZustand.ts'
import { useAuthZustand } from 'src/zustand/auth/AuthZustand.ts'
import RootRoute = AppRoutes.RootRoute
import use = RouteBuilder.use
import flexC = EmotionCommon.flexC
import Txt = EmotionCommon.Txt
import row = EmotionCommon.row
import qrScan from '@ic/normal/special/qr-scan.svg'




const staticUiValues = {
  completeYourProfile: {
    'ru-RU': 'Завершите описание профиля',
    'en-US': 'Complete your profile description',
  },
  completeProfileInFewSteps: {
    'ru-RU': 'Дополните профиль всего за пару шагов',
    'en-US': 'Complete your profile in just a few steps',
  },
} satisfies UiValues




const ProfileSummaryPage = React.memo(() => {
  const lang = useAppZustand(s => s.langs[0])
  const titleText = useUiValues(TitleUiText)
  const actionText = useUiValues(ActionUiText)
  
  const { id, name, birthDate, photos } = useAuthZustand(s => s.user!)
  
  const profile = MockData.profile2
  const profileFillProgress = 45
  
  const uiValues = useMemo(() => ({
    completeYourProfile: staticUiValues.completeYourProfile,
    completeProfileInFewSteps: staticUiValues.completeProfileInFewSteps,
  }), [])
  const uiText = useUiValues(uiValues)
  
  const [uiProfileFillProgress, setUiProfileFillProgress] = useState(5)
  useEffect(() => setUiProfileFillProgress(profileFillProgress), [profileFillProgress])
  
  
  const [mainPhoto, setMainPhoto] = useState<MediaDownloadable | undefined>(undefined)
  
  const remoteMainPhoto = useMemo(() => {
    return photos.find(it => it.index === 0)
  }, [photos])
  useEffect(() => {
    setMainPhoto(p => {
      if (!photos) {
        return undefined
      }
      else if (!remoteMainPhoto) {
        return newDefaultEmptyRemoteMedia()
      }
      else {
        return {
          ...p, // inherit current operations
          ...newDefaultRemoteMediaDownloadable(),
          isInited: true,
          id: remoteMainPhoto.id,
          remoteUrl: remoteMainPhoto.url,
          name: remoteMainPhoto.name,
          ext: remoteMainPhoto.ext,
        }
      }
    })
  }, [remoteMainPhoto])
  
  const info = [profile.city, DateU.ageYears(birthDate, lang)].filter(it => it).join(', ')
  
  
  //console.log('mainPhoto', mainPhoto)
  //console.log({ isLoadingNoProgress, isLoadingWithProgress, isReady, isError, isEmpty })
  
  //useEffect(() => console.log('mainPhoto', mainPhoto), [mainPhoto])
  
  return (
    <>
    
      <PageLayout col data-display-name='ProfileSummaryPage'>
        <PageContentLayout colSm styleInner={{ gap: 16 }}>
          
          <InfoCard col>
            
            
            
            <Flex row>
              
              <AppLink toFull={RootRoute.profile.id.userId[use](id).tab.preview}>
                <AvaBox>
                  <MediaDownloader media={mainPhoto}>
                    {(media) => {
                      const { isReady, dataUrl, ...loading } = getMediaUiState(media)
                      if (isReady) return <AvaIm src={dataUrl}/>
                      return <MediaUiState {...loading}/>
                    }}
                  </MediaDownloader>
                </AvaBox>
              </AppLink>
              
              <Gap w={14}/>
              
              
              
              <AppLink toFull={RootRoute.profile.id.userId[use](id).tab.edit}>
                <NameInfoEditArea col>
                  
                  <Name>{name}</Name>
                  
                  <Gap h={4}/>
                  
                  <Info>{info}</Info>
                  
                  <Gap h={10}/>
                  
                  <Edit>
                    <Button css={editBtnStyle}>{actionText.edit}</Button>
                  </Edit>
                  
                </NameInfoEditArea>
              </AppLink>
              
              
              
              <Gap w={8}/>
              
              <Flex grow row justifyCt='end'>
                <UseOverlayUrl overlayName={QuickSettingsOverlayName}>
                  {overlay => (
                    <Gear onClick={overlay.open}>
                      <Button css={IconButtonS6.t(gearS)}>
                        <GearOutlinedIc/>
                      </Button>
                    </Gear>
                  )}
                </UseOverlayUrl>
              </Flex>
              
            </Flex>
            
            
            <Gap h={14.5}/>
            
            <Divider/>
            
            <Gap h={9}/>
            
            <AppLink toFull={RootRoute.profile.id.userId[use](id).tab.edit}>
              <HeaderArrow css={headerArrowS}>
                {uiText.completeYourProfile}
              </HeaderArrow>
            </AppLink>
            
            <Gap h={9}/>
            
            <ProgressBox>
              <LineProgressFrame>
                <LineProgress style={{ width: `${uiProfileFillProgress}%` }}/>
              </LineProgressFrame>
              <LinePercent>{uiProfileFillProgress}%</LinePercent>
            </ProgressBox>
            
            <Gap h={9}/>
            
            <CompleteProfileText>
              {uiText.completeProfileInFewSteps}
            </CompleteProfileText>
            
          </InfoCard>
          
          <InfoCard szCt p={8}>
            <AppLink toFull={RootRoute.profile.id.userId[use](id).share}>
              <Button css={ButtonS6.t(qrScanS)}/>
            </AppLink>
          </InfoCard>
          
          
          <SummaryPageFeatureCards/>
          
        
        </PageContentLayout>
      </PageLayout>
      
      {/* <BottomFloatingBar/> */}
      
    </>
  )
})
ProfileSummaryPage.displayName = 'ProfileSummaryPage'
export default ProfileSummaryPage


const InfoCard = styled(Flex)`
  ${ProfileSummaryPageParts.cardS};
  background: ${p => p.theme.boxDefault.bg};
  gap: 0;
`

const AvaBox = styled.div`
  align-self: center;
  width: 82px;
  height: 82px;
  border-radius: 999999px;
  background-color: ${p => p.theme.photos.bg};
  overflow: hidden;
  position: relative;
  ${flexC};
`
const AvaIm = styled.img`
  width: 100%;
  height: 100%;
  object-position: center;
  object-fit: cover;
`


const Gear = styled.div`
  place-self: start end;
  ${flexC};
  margin-top: -14px;
  margin-right: -6px;
`
const gearS: AppWidgetStyle = t => [IconButtonS6.S.trans.round.lg.secondary, {
  iconSz: 'full',
  iconColor: t.boxDefault7.ct,
}]

// TODO Theme
const color1 = '#161941'
const color2 = '#cea1d4'
const color3 = '#242767'
const color4 = '#ffb818'

const qrScanS: AppWidgetStyle = t => [ButtonS6.S.text.rect.lg.normal, {
  button: {
    sz: 76, p: 0,
  },
  buttonAfter: {
    content: `''`,
    sz: 'full',
    backgroundImage: `
      radial-gradient(circle at bottom right, ${color2}, transparent 80%),
      radial-gradient(circle at top right, ${color4}, transparent 80%),
      radial-gradient(circle at top left, ${color1}, transparent 100%),
      radial-gradient(circle at bottom left, ${color3}, transparent 100%)
    `,
    backgroundSize: '80% 80%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    maskImage: `url("${qrScan}")`,
    maskMode: 'alpha',
    maskSize: '80% 80%',
    maskPosition: 'center',
    maskRepeat: 'no-repeat',
  },
}]



const NameInfoEditArea = styled(Flex)`
  cursor: pointer;
`

const Name = styled.div`
  font-weight: 600;
  font-size: 20px;
  line-height: 119%;
  color: ${p => p.theme.boxDefault.ct};
`
const Info = styled.div`
  font-weight: 400;
  font-size: 17px;
  line-height: 119%;
  color: ${p => p.theme.boxDefault7.ct};
`
const Edit = styled.div`
  min-width: 142px;
  width: fit-content;
`
const editBtnStyle = (t: AppTheme.Theme) => css`
  ${ButtonS6.t(ButtonS6.S.filled.rect.md.accent2)(t)};
  ${ButtonS6.W.t(t, {
    button: { w: 'ct', hMin: 34, p: [8, 14], r: 10 },
  })}
`



const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${p => p.theme.boxDefault11.ctSec};
`


const headerArrowS = (t: AppTheme.Theme) => css`
  ${HeaderArrowS.normal(t)};
`

const ProgressBox = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
  align-items: center;
`
const LineProgressFrame = styled.div`
  width: 100%;
  height: 8px;
  border-radius: 999999px;
  ${row};
  background-color: ${p => p.theme.boxDefault11.ctSec};
`
const LineProgress = styled.div`
  width: 0;
  height: 100%;
  border-radius: inherit;
  transition: width 1000ms ease-in-out;
  background-color: ${p => p.theme.boxAccent5.ct};
`
const LinePercent = styled.div`
  ${Txt.s24Bold};
  color: ${p => p.theme.boxAccent5.ct};
`


const CompleteProfileText = styled.div`
  justify-self: stretch;
  ${Txt.s16Wide};
  color: ${p => p.theme.boxDefault.ct};
  text-align: center;
`
