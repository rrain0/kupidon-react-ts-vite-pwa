import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil'
import { LangRecoil } from 'src/recoil/state/LangRecoil'
import { DefaultMediaOperation } from 'src/ui-data/models/Media'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon'
import { ActionUiText } from 'src/ui-data/translations/ActionUiText'
import Button from 'src/ui/0-elements/buttons/Button/Button'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import { IconButtonS6 } from 'src/ui/0-elements/buttons/IconButton/IconButtonS6.ts'
import { HeaderArrowS } from 'src/ui/0-elements/HeaderArrow/HeaderArrowS'
import { SvgIconS } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS.ts'
import { SvgIconS6 } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS6.ts'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import HeaderArrow from 'src/ui/0-elements/HeaderArrow/HeaderArrow.tsx'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import {
  imPlaceholderBoxS,
  imPlaceholderIcS,
  imSmallPieProgressS, imSmallPlaceholderIcFullTrans,
  imSmallPlaceholderIcS,
} from 'src/ui/0-elements/im/im'
import LineProgress from 'src/ui/0-elements/LineProgress/LineProgress'
import { LineProgressS } from 'src/ui/0-elements/LineProgress/LineProgressS'
import PieProgress from 'src/ui/0-elements/PieProgress/PieProgress'
import SparkingLoadingLine from 'src/ui/0-elements/SparkingLoadingLine/SparkingLoadingLine'
import SummaryPageFeatureCards from 'src/ui/2-pages/Profile/Summary/parts/SummaryPageFeatureCards'
import { DefaultMainPhoto, MainPhoto } from 'src/ui/2-pages/Profile/Summary/SummaryPage.model.ts'
import { SummaryPageData } from 'src/ui/2-pages/Profile/Summary/SummaryPageData'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar'
import { Pages } from 'src/ui/components/Pages/Pages'
import PageScrollbars from 'src/ui/1-widgets/Scrollbars/PageScrollbars'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import { AsyncU } from 'src/util/common/AsyncU'
import { RangeU } from 'src/util/common/RangeU'
import { DateU } from 'src/util/date/DateU'
import { MockData } from 'src/_mock-data/MockData'
import { AppTheme } from 'src/ui-data/theme/AppTheme'
import { FileU } from 'src/util/file/FileU'
import { Progress } from 'src/util/Progress'
import { useEvent } from 'src/util/react/useEvent'
import { useTimeout } from 'src/util/react/useTimeout'
import full = RouteBuilder.full
import RootRoute = AppRoutes.RootRoute
import use = RouteBuilder.use
import EyeWideIc = SvgIconsPack.EyeWideIc
import flexC = EmotionCommon.flexC
import Txt = EmotionCommon.Txt
import withThrottle = AsyncU.withThrottle
import fetchToBlob = FileU.fetchToBlob
import blobToDataUrl = FileU.blobToDataUrl
import ArrowReloadIc = SvgIconsPack.ArrowReloadIc
import PictureIc = SvgIconsPack.PictureIc




// TODO показывать уведомление с кнопкой Retry, если ошибка загрузки данных
// TODO В фотках профиля баг, что продолжается анимация инциализации, если фото пустое,
//  и только потом показывается +

const SummaryPage = React.memo(() => {
  const lang = useRecoilValue(LangRecoil).langs[0]
  const titleText = useUiValues(TitleUiText)
  const actionText = useUiValues(ActionUiText)
  
  const auth = useRecoilValue(AuthRecoil)!
  const u = auth.user
  
  const profile = MockData.profile2
  const progress = 45
  const completeProfileDescriptionText = 'Завершите описание профиля'
  const completeProfileInCoupleSteps = 'Дополните профиль всего за пару шагов'
  
  const [profileProgress, setProfileProgress] = useState(5)
  
  useEffect(() => setProfileProgress(progress), [])
  
  const [mainPhoto, setMainPhoto] = useState<MainPhoto>(() => {
    const mainPhotoRemote = u.photos.find(it => it.index === 0)
    if (!mainPhotoRemote) return {
      ...DefaultMainPhoto,
      isEmpty: true,
      needDownload: false,
    }
    return {
      ...DefaultMainPhoto,
      id: mainPhotoRemote.id,
      name: mainPhotoRemote.name,
      mimeType: mainPhotoRemote.mimeType,
      remoteUrl: mainPhotoRemote.url,
      //needDownload: false,
      //downloadError: 'error',
    }
  })
  
  useEvent(() => {
    if (mainPhoto.needDownload) {
      
      const abortCtrl = new AbortController()
      const downloadStart = {
        isReady: false,
        needDownload: false,
        download: { ...DefaultMediaOperation,
          id: mainPhoto.id,
          abort: () => {
            console.log('download was aborted')
            abortCtrl.abort('download was aborted')
          },
        },
        downloadError: undefined,
      } satisfies Partial<MainPhoto>
      
      setMainPhoto({
        ...mainPhoto,
        ...downloadStart,
      })
      
      const updateDownload = (downloadId: string, u: Partial<MainPhoto>) => {
        setMainPhoto(s => {
          if (s.download?.id === downloadId) return { ...s, ...u }
          return s
        })
      }
      const updateDownloadThrottled = withThrottle(
        RangeU.map(Math.random(), [0, 1], [1450, 2000]),
        updateDownload,
      )
      
      ;(async () => {
        try {
          const progress = new Progress(2, [90, 10])
          const onProgress = (p: number | null) => {
            progress.progress = p ?? 0
            //console.log('progress', photo.id, progress.value)
            updateDownloadThrottled(
              downloadStart.download.id,
              { download: {
                ...downloadStart.download,
                progress: progress.value,
              } }
            )
          }
          
          console.log('download started')
          const blob = await fetchToBlob(
            mainPhoto.remoteUrl,
            { onProgress, abortCtrl }
          )
          abortCtrl.signal.throwIfAborted()
          
          progress.stage++
          progress.progress = 0
          const dataUrl = await blobToDataUrl(blob, { onProgress, abortCtrl })
          abortCtrl.signal.throwIfAborted()
          
          console.log('download completed')
          updateDownload(
            downloadStart.download.id,
            { isReady: true, download: undefined, dataUrl },
          )
        }
        catch (ex) {
          // TODO notify about error
          //console.log('download error', ex)
          //console.log('photo', photo)
          updateDownload(
            downloadStart.download.id,
            { download: undefined, downloadError: ex },
          )
        }
        finally {
          //unlock(photo.remoteUrl)
        }
        
      })()
    }
  }, [mainPhoto.needDownload], true)
  
  const [canShowFetchProgress, setCanShowFetchProgress] = useState(false)
  useTimeout(3000, () => setCanShowFetchProgress(true), [])
  
  
  const retry = () => {
    mainPhoto.download?.abort()
    setMainPhoto({
      ...mainPhoto,
      needDownload: true,
      download: undefined,
      downloadError: undefined,
    })
  }
  
  
  const info = [profile.city, DateU.ageYears(u.birthDate, lang)].filter(it => it).join(', ')
  
  
  //useEffect(() => console.log('mainPhoto', mainPhoto), [mainPhoto])
  
  return (
    <>
    
      <Pages.Page>
        <Pages.SafeInsets>
          <Pages.Content css={pageContentS}>
            
            <InfoCard>
              
              <AvaBox>
                {(() => {
                  if (mainPhoto.downloadError)
                    return (
                      <div css={imPlaceholderBoxS}>
                        <Button
                          css={IconButtonS6.t(imSmallPlaceholderIcFullTrans)}
                          onClick={retry}
                        >
                          <ArrowReloadIc css={avaPlaceholderIcS} />
                        </Button>
                      </div>
                    )
                  if (!canShowFetchProgress
                    && mainPhoto.type === 'remote'
                    && !mainPhoto.isReady
                    && !mainPhoto.isEmpty
                  )
                    return (
                      <div css={imPlaceholderBoxS}>
                        <SparkingLoadingLine />
                      </div>
                    )
                  if (canShowFetchProgress && mainPhoto.download)
                    return (
                      <div css={imPlaceholderBoxS}>
                        <PieProgress css={imSmallPieProgressS}
                          progress={
                            RangeU.map(mainPhoto.download.progress, [0, 100], [5, 95])
                          }
                        />
                      </div>
                    )
                  if (mainPhoto.isEmpty) return (
                    <div css={imPlaceholderBoxS}>
                      <PictureIc css={SvgIconS6.t(imSmallPlaceholderIcS)} />
                    </div>
                  )
                  if (mainPhoto.isReady) return <AvaIm src={mainPhoto.dataUrl} />
                })()}
              </AvaBox>
              
              <Name>{u.name}</Name>
              <Link to={RootRoute.profile.id.userId[use](u.id).preview[full]()}>
                <Eye>
                  <Button css={IconButtonS6.t(eyeIcS)}>
                    <EyeWideIc />
                  </Button>
                </Eye>
              </Link>
              <Info>{info}</Info>
              
              <Link to={RootRoute.profile.id.userId[use](u.id).profile[full]()}>
                <Edit>
                  <Button css={editBtnStyle}>{actionText.edit}</Button>
                </Edit>
              </Link>
              
              <Divider />
              
              <HeaderArrowBox>
                <HeaderArrow css={HeaderArrowS.normal}>
                  {completeProfileDescriptionText}
                </HeaderArrow>
              </HeaderArrowBox>
              
              <ProgressBox>
                <LineProgress css={LineProgressS.S.normal} progress={profileProgress} />
                <Percent>{progress}%</Percent>
              </ProgressBox>
              
              <CompleteProfileText>
                {completeProfileInCoupleSteps}
              </CompleteProfileText>
              
            </InfoCard>
            
            
            <SummaryPageFeatureCards />
            
          
          </Pages.Content>
        </Pages.SafeInsets>
        
        <PageScrollbars />
      </Pages.Page>
      
      <BottomButtonBar />
      
    </>
  )
})
export default SummaryPage


const pageContentS = css`
  gap: 16px;
`

const InfoCard = styled.div`
  ${SummaryPageData.cardStyle};
  background: ${p => p.theme.boxNormal.bg[0]};
  display: grid;
  grid:
    'ava  .    name .    eye ' auto
    'ava  .    .    .    eye ' 4px
    'ava  .    info info eye' auto
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
const avaPlaceholderIcS = (t: AppTheme.Theme) => css`
  ${SvgIconS6.t(imPlaceholderIcS)(t)};
  ${SvgIconS.El.icon.thiz()}{
    ${SvgIconS.El.icon.props.size.set('50%')}
  }
`


const Eye = styled.div`
  grid-area: eye;
  place-self: start end;
  ${flexC};
  margin-top: -14px;
  margin-right: -6px;
`
const eyeIcS0: AppWidgetStyle = t => [SvgIconS6.S.Normal.normal, {
  iconSz: 'full',
  iconColor: t.boxNormal.ct3d[0],
}]
const eyeIcS: AppWidgetStyle = t => [IconButtonS6.S.trans.round.lg.normal2, {
  iconSz: 'full',
  iconColor: t.boxNormal.ct3d[0],
}]


const Name = styled.div`
  grid-area: name;
  
  font-weight: 600;
  font-size: 20px;
  line-height: 119%;
  color: ${p => p.theme.boxNormal.ct1a[0]};
`
const Info = styled.div`
  grid-area: info;
  
  font-weight: 400;
  font-size: 17px;
  line-height: 119%;
  color: ${p => p.theme.boxNormal.ct3d[0]};
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
  background-color: ${p => p.theme.boxNormal.ct5};
`


const HeaderArrowBox = styled.div`
  grid-area: harr;
`

const ProgressBox = styled.div`
  grid-area: prog;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
  align-items: center;
`
const Percent = styled.div`
  ${Txt.lg24Bold};
  color: ${p => p.theme.boxAccent.bg3};
`


const CompleteProfileText = styled.div`
  grid-area: cpt;
  justify-self: stretch;
  ${Txt.lg16Wide};
  color: ${p => p.theme.boxNormal.ct1a[0]};
  text-align: center;
`
