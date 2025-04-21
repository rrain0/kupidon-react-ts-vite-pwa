import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useStateAndRef } from '@util/react-state/useStateAndRef.ts'
import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import {
  getMediaEmtiableDownloadUiState,
  MediaDownloadable, newDefaultEmptyRemoteMedia,
  newDefaultRemoteMedia,
} from 'src/ui-data/models/media/Media.ts'
import { useMediaDownload } from 'src/ui-data/models/media/useMediaDownload.ts'
import { useMediaDownloadAutoRetry } from 'src/ui-data/models/media/useMediaDownloadAutoRetry.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon'
import { ActionUiText } from 'src/ui-data/translations/ActionUiText'
import Button from 'src/ui/0-elements/buttons/Button/Button'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import { IconButtonS6 } from 'src/ui/0-elements/buttons/IconButton/IconButtonS6.ts'
import { HeaderArrowS } from 'src/ui/0-elements/HeaderArrow/HeaderArrowS'
import { SvgIconS6 } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS6.ts'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import HeaderArrow from 'src/ui/0-elements/HeaderArrow/HeaderArrow.tsx'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import {
  imPlaceholderBoxS,
  imPlaceholderIcS,
  imSmallPieProgressS,
  imSmallPlaceholderIcS,
} from 'src/ui/0-elements/imageParts.tsx'
import PieProgress from 'src/ui/0-elements/PieProgress/PieProgress'
import SparkingLoadingLine from 'src/ui/0-elements/SparkingLoadingLine/SparkingLoadingLine'
import {
  QuickSettingsOverlayName
} from 'src/ui/1-widgets/QuickSettings/QuickSettings.tsx'
import SummaryPageFeatureCards from 'src/ui/2-pages/Profile/Summary/parts/SummaryPageFeatureCards'
import { SummaryPageParts } from 'src/ui/2-pages/Profile/Summary/SummaryPageParts.ts'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar'
import { Pages } from 'src/ui/components/Pages/Pages'
import PageScrollbars from 'src/ui/1-widgets/Scrollbars/PageScrollbars'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import UseOverlayUrl from 'src/ui/components/UseOverlayUrl/UseOverlayUrl.tsx'
import { RangeU } from 'src/util/common/RangeU'
import { DateU } from 'src/util/date/DateU'
import { MockData } from 'src/_mock-data/MockData'
import { AppTheme } from 'src/ui-data/theme/AppTheme'
import { useTimeout } from 'src/util/react/useTimeout'
import { useAppZustand } from 'src/zustand/app/AppZustand.ts'
import { useAuthZustand } from 'src/zustand/auth/AuthZustand.ts'
import full = RouteBuilder.full
import RootRoute = AppRoutes.RootRoute
import use = RouteBuilder.use
import flexC = EmotionCommon.flexC
import Txt = EmotionCommon.Txt
import PictureIc = SvgIconsPack.PictureIc
import row = EmotionCommon.row
import DocumentErrorIc = SvgIconsPack.DocumentErrorIc
import GearOutlinedIc = SvgIconsPack.GearOutlinedIc





const SummaryPage = React.memo(() => {
  const lang = useAppZustand(s => s.langs[0])
  const titleText = useUiValues(TitleUiText)
  const actionText = useUiValues(ActionUiText)
  
  const { id, name, birthDate, photos } = useAuthZustand(s => s.user!)
  
  const profile = MockData.profile2
  const profileFillProgress = 45
  const completeProfileDescriptionText = 'Завершите описание профиля'
  const completeProfileInCoupleSteps = 'Дополните профиль всего за пару шагов'
  
  const [uiProfileFillProgress, setUiProfileFillProgress] = useState(5)
  useEffect(() => setUiProfileFillProgress(profileFillProgress), [profileFillProgress])
  
  
  const [
    getMainPhoto, setMainPhoto, mainPhoto,
  ] = useStateAndRef<MediaDownloadable | undefined>(undefined)
  
  const [canShowFetchProgress, setCanShowFetchProgress] = useState(false)
  useTimeout(3000, () => setCanShowFetchProgress(true), [])
  
  useMediaDownload(getMainPhoto, setMainPhoto, { canShowFetchProgress })
  useMediaDownloadAutoRetry(getMainPhoto, setMainPhoto)
  
  const remoteMainPhoto = useMemo(() => {
    return photos.find(it => it.index === 0)
  }, [photos])
  useEffect(() => {
    const m = getMainPhoto()
    if (!photos) setMainPhoto(undefined)
    else if (!remoteMainPhoto) setMainPhoto(newDefaultEmptyRemoteMedia())
    else setMainPhoto({
      ...newDefaultRemoteMedia(),
      id: remoteMainPhoto.id,
      name: remoteMainPhoto.name,
      mimeType: remoteMainPhoto.mimeType,
      remoteUrl: remoteMainPhoto.url,
      isInited: true,
      needDownload: true,
      download: m?.download,
    })
  }, [remoteMainPhoto])
  
  
  
  const info = [profile.city, DateU.ageYears(birthDate, lang)].filter(it => it).join(', ')
  
  const {
    isLoadingNoProgress, isLoadingWithProgress, progress, isEmpty, isReady, isError,
  } = getMediaEmtiableDownloadUiState(mainPhoto)
  
  //console.log(mainPhoto)
  //console.log({ isLoadingNoProgress, isLoadingWithProgress, isReady, isError, isEmpty })
  
  //useEffect(() => console.log('mainPhoto', mainPhoto), [mainPhoto])
  
  return (
    <>
    
      <Pages.PageGrad>
        <Pages.AddSafeInsets>
          <Pages.ContentColSm css={pageContentS}>
            
            <InfoCard>
              
              <Link to={RootRoute.profile.id.userId[use](id).preview[full]()}>
                <AvaBox>
                  {(() => {
                    if (isError) {
                      return (
                        <div css={imPlaceholderBoxS}>
                          <DocumentErrorIc css={SvgIconS6.t(avaPlaceholderIcS)} />
                        </div>
                      )
                    }
                    if (isLoadingNoProgress) {
                      return (
                        <div css={imPlaceholderBoxS}>
                          <SparkingLoadingLine />
                        </div>
                      )
                    }
                    if (isLoadingWithProgress) {
                      return (
                        <div css={imPlaceholderBoxS}>
                          <PieProgress css={imSmallPieProgressS}
                            progress={
                              RangeU.map(progress, [0, 100], [5, 95])
                            }
                          />
                        </div>
                      )
                    }
                    if (isEmpty) {
                      return (
                        <div css={imPlaceholderBoxS}>
                          <PictureIc css={SvgIconS6.t(imSmallPlaceholderIcS)} />
                        </div>
                      )
                    }
                    if (isReady) {
                      return <AvaIm src={mainPhoto!.dataUrl} />
                    }
                  })()}
                </AvaBox>
              </Link>
              
              <Name>{name}</Name>
              
              <UseOverlayUrl overlayName={QuickSettingsOverlayName}>
                {overlay => (
                  <Gear onClick={overlay.open}>
                    <Button css={IconButtonS6.t(gearIc)}>
                      <GearOutlinedIc />
                    </Button>
                  </Gear>
                )}
              </UseOverlayUrl>
              
              <Info>{info}</Info>
              
              <Link to={RootRoute.profile.id.userId[use](id).profile[full]()}>
                <Edit>
                  <Button css={editBtnStyle}>{actionText.edit}</Button>
                </Edit>
              </Link>
              
              <Divider />
              
              <Link to={RootRoute.profile.id.userId[use](id).profile[full]()}>
                <HeaderArrow css={headerArrowS}>
                  {completeProfileDescriptionText}
                </HeaderArrow>
              </Link>
              
              <ProgressBox>
                <LineProgressFrame>
                  <LineProgress style={{ width: `${uiProfileFillProgress}%` }} />
                </LineProgressFrame>
                <LinePercent>{progress}%</LinePercent>
              </ProgressBox>
              
              <CompleteProfileText>
                {completeProfileInCoupleSteps}
              </CompleteProfileText>
              
            </InfoCard>
            
            
            <SummaryPageFeatureCards />
            
          
          </Pages.ContentColSm>
        </Pages.AddSafeInsets>
        
        <PageScrollbars />
      </Pages.PageGrad>
      
      <BottomButtonBar />
      
    </>
  )
})
export default SummaryPage


const pageContentS = css`
  gap: 16px;
`

const InfoCard = styled.div`
  ${SummaryPageParts.cardS};
  background: ${p => p.theme.boxDefault.bg};
  display: grid;
  grid:
    'ava  .    name .    gear' auto
    'ava  .    .    .    gear' 4px
    'ava  .    info info gear' auto
    'ava  .    .    .    .   ' 10px
    'ava  .    edit edit edit' auto
    '.    .    .    .    .   ' 14.5px
    'div  div  div  div  div ' auto
    '.    .    .    .    .   ' 9px
    'harr harr harr harr harr' auto
    '.    .    .    .    .   ' 9px
    'prog prog prog prog prog' auto
    '.    .    .    .    .   ' 10px
    'cpt  cpt  cpt  cpt  cpt ' auto /* cpt - Complete Profile Text */
   / auto 14px 1fr  8px  auto;
  gap: 0;
`

const AvaBox = styled.div`
  grid-area: ava;
  align-self: center;
  width: 82px;
  height: 82px;
  border-radius: 999999px;
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
const avaPlaceholderIcS: AppWidgetStyle = t => [imPlaceholderIcS, {
  icon: { sz: '50%', mr: -2, color: t.errorSec.ct },
}]


const Gear = styled.div`
  grid-area: gear;
  place-self: start end;
  ${flexC};
  margin-top: -14px;
  margin-right: -6px;
`
const gearIc: AppWidgetStyle = t => [IconButtonS6.S.trans.round.lg.secondary, {
  iconSz: 'full',
  iconColor: t.boxDefault.ct6,
}]


const Name = styled.div`
  grid-area: name;
  
  font-weight: 600;
  font-size: 20px;
  line-height: 119%;
  color: ${p => p.theme.boxDefault.ct2};
`
const Info = styled.div`
  grid-area: info;
  
  font-weight: 400;
  font-size: 17px;
  line-height: 119%;
  color: ${p => p.theme.boxDefault.ct6};
`
const Edit = styled.div`
  grid-area: edit;
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
  grid-area: div;
  width: 100%;
  height: 1px;
  background-color: ${p => p.theme.boxDefault.ctSec6};
`


const headerArrowS = (t: AppTheme.Theme) => css`
  ${HeaderArrowS.normal(t)};
  grid-area: harr;
`

const ProgressBox = styled.div`
  grid-area: prog;
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
  background-color: ${p => p.theme.boxDefault.ctSec6};
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
  grid-area: cpt;
  justify-self: stretch;
  ${Txt.s16Wide};
  color: ${p => p.theme.boxDefault.ct2};
  text-align: center;
`
