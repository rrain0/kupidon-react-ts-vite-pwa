import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useAutoRetry } from '@util/app/useAutoRetry.ts'
import { useNext } from '@util/react-state/useNext.ts'
import { useInterval } from '@util/react/useInterval.ts'
import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router'
import { ApiUtils } from 'src/api/ApiUtils.ts'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { newDefaultMediaOperation } from 'src/ui-data/models/Media'
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
import SummaryPageFeatureCards from 'src/ui/2-pages/Profile/Summary/parts/SummaryPageFeatureCards'
import {
  MainPhoto,
  newDefaultMainPhoto,
} from 'src/ui/2-pages/Profile/Summary/SummaryPage.model.ts'
import { SummaryPageParts } from 'src/ui/2-pages/Profile/Summary/SummaryPageParts.ts'
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
import { StageProgress } from '@util/progress/StageProgress.ts'
import { useTimeout } from 'src/util/react/useTimeout'
import { useAppZustand } from 'src/zustand/app/AppZustand.ts'
import { useAuthZustand } from 'src/zustand/auth/AuthZustand.ts'
import full = RouteBuilder.full
import RootRoute = AppRoutes.RootRoute
import use = RouteBuilder.use
import EyeWideIc = SvgIconsPack.EyeWideIc
import flexC = EmotionCommon.flexC
import Txt = EmotionCommon.Txt
import withThrottle = AsyncU.withThrottle
import fetchToBlob = FileU.fetchToBlob
import blobToDataUrl = FileU.blobToDataUrl
import PictureIc = SvgIconsPack.PictureIc
import row = EmotionCommon.row
import DocumentErrorIc = SvgIconsPack.DocumentErrorIc





const SummaryPage = React.memo(() => {
  const lang = useAppZustand(s => s.langs[0])
  const titleText = useUiValues(TitleUiText)
  const actionText = useUiValues(ActionUiText)
  
  const { id, name, birthDate, photos } = useAuthZustand(s => s.user!)
  
  const profile = MockData.profile2
  const progress = 45
  const completeProfileDescriptionText = 'Завершите описание профиля'
  const completeProfileInCoupleSteps = 'Дополните профиль всего за пару шагов'
  
  const [profileProgress, setProfileProgress] = useState(5)
  
  useEffect(() => setProfileProgress(progress), [])
  
  // const [index, setIndex] = useState(0)
  // useInterval(6000, () => setIndex(i => i === 0 ? 1 : 0))
  
  const remoteMainPhoto = useMemo(() => {
    return photos.find(it => it.index === 0)
  }, [photos])
  
  const [canShowFetchProgress, setCanShowFetchProgress] = useState(false)
  useTimeout(3000, () => setCanShowFetchProgress(true), [])
  
  const getMainPhoto = () => {
    if (!remoteMainPhoto) return {
      ...newDefaultMainPhoto(),
      isEmpty: true,
      needDownload: false,
    }
    return {
      ...newDefaultMainPhoto(),
      needDownload: true,
      id: remoteMainPhoto.id,
      name: remoteMainPhoto.name,
      mimeType: remoteMainPhoto.mimeType,
      remoteUrl: remoteMainPhoto.url,
    }
  }
  
  const [mainPhoto, setMainPhoto] = useState<MainPhoto>(getMainPhoto)
  useEffect(() => setMainPhoto(getMainPhoto()), [remoteMainPhoto])
  useEffect(() => {
    if (mainPhoto.download) setMainPhoto({
      ...mainPhoto, download: { ...mainPhoto.download,
        showProgress: canShowFetchProgress,
      },
    })
  }, [canShowFetchProgress])
  
  const [downloadNumber, nextDownload] = useNext()
  const { needDownload } = mainPhoto
  useEffect(() => { if (needDownload) nextDownload() }, [needDownload])
  
  useEffect(() => {
    const fetchToBlobAbortCtrl = new AbortController()
    const blobToDataUrlAbortCtrl = new AbortController()
    const abortCtrl = new AbortController()
    abortCtrl.signal.onabort = function() {
      fetchToBlobAbortCtrl.abort(this.reason)
      blobToDataUrlAbortCtrl.abort(this.reason)
    }
    const downloadStart = {
      isReady: false,
      needDownload: false,
      download: { ...newDefaultMediaOperation(),
        id: mainPhoto.id,
        showProgress: canShowFetchProgress,
        abort: reason => abortCtrl.abort(reason),
      },
      downloadError: undefined,
    } satisfies Partial<MainPhoto>
    
    setMainPhoto({ ...mainPhoto, ...downloadStart })
    
    const updateDownload = (
      photoUpdate?: Partial<MainPhoto>,
      downloadUpdate?: Partial<MainPhoto['download']>
    ) => {
      setMainPhoto(photo => {
        if (photo.download?.id !== downloadStart.download.id) return photo
        return { ...photo,
          ...photoUpdate,
          ...downloadUpdate && photo.download && {
            download: { ...photo.download, ...downloadUpdate },
          },
        }
      })
    }
    const updateDownloadThrottled = withThrottle(
      RangeU.random(1500, 2300), updateDownload
    )
    
    ;(async () => {
      try {
        const progress = new StageProgress(2, [90, 10])
        const onProgress = (p: number | null) => {
          progress.progress = p ?? 0
          //console.log('progress', photo.id, progress.value)
          updateDownloadThrottled(undefined, { progress: progress.value })
        }
        
        //console.log('download started')
        const blob = await fetchToBlob(mainPhoto.remoteUrl,
          { onProgress, abortCtrl: fetchToBlobAbortCtrl }
        )
        abortCtrl.signal.throwIfAborted()
        
        progress.stage++
        progress.progress = 0
        const dataUrl = await blobToDataUrl(blob,
          { onProgress, abortCtrl: blobToDataUrlAbortCtrl }
        )
        abortCtrl.signal.throwIfAborted()
        
        //console.log('download completed')
        updateDownload({ isReady: true, download: undefined, dataUrl })
      }
      catch (ex) {
        if (abortCtrl.signal.aborted) {
          //console.log('download aborted:', abortCtrl.signal.reason)
          return
        }
        if (ApiUtils.isConnectionError(ex)) {
          updateDownload({ download: undefined, needRetryDownload: true })
          return
        }
        
        //console.log('download error', ex)
        //console.log('download error photo', photo)
        updateDownload({ download: undefined, downloadError: ex })
      }
    })()
    
    return () => downloadStart.download.abort('download is stale')
  }, [downloadNumber])
  
  
  const retry = () => {
    mainPhoto.download?.abort()
    setMainPhoto({
      ...mainPhoto,
      needRetryDownload: false,
      needDownload: true,
      download: undefined,
      downloadError: undefined,
    })
  }
  
  useAutoRetry(mainPhoto.needRetryDownload, { }, retry)
  
  
  const info = [profile.city, DateU.ageYears(birthDate, lang)].filter(it => it).join(', ')
  
  
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
                    if (mainPhoto.downloadError)
                      return (
                        <div css={imPlaceholderBoxS}>
                          <DocumentErrorIc css={SvgIconS6.t(avaPlaceholderIcS)} />
                        </div>
                      )
                    if (!mainPhoto.download?.showProgress
                      && mainPhoto.type === 'remote'
                      && !mainPhoto.isReady
                      && !mainPhoto.isEmpty
                    )
                      return (
                        <div css={imPlaceholderBoxS}>
                          <SparkingLoadingLine />
                        </div>
                      )
                    if (mainPhoto.download?.showProgress && mainPhoto.download)
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
              </Link>
              
              <Name>{name}</Name>
              <Link to={RootRoute.profile.id.userId[use](id).preview[full]()}>
                <Eye>
                  <Button css={IconButtonS6.t(eyeIcS)}>
                    <EyeWideIc />
                  </Button>
                </Eye>
              </Link>
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
                  <LineProgress style={{ width: `${profileProgress}%` }} />
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
const avaPlaceholderIcS: AppWidgetStyle = t => [imPlaceholderIcS, {
  icon: { sz: '50%', mr: -2, color: t.errorSec.ct },
}]


const Eye = styled.div`
  grid-area: eye;
  place-self: start end;
  ${flexC};
  margin-top: -14px;
  margin-right: -6px;
`
const eyeIcS: AppWidgetStyle = t => [IconButtonS6.S.trans.round.lg.secondary, {
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
