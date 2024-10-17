import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil'
import { LangRecoil } from 'src/recoil/state/LangRecoil'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon'
import { ActionUiText } from 'src/ui-data/translations/ActionUiText'
import Button from 'src/ui/0-elements/buttons/Button/Button'
import { ButtonS } from 'src/ui/0-elements/buttons/Button/ButtonS'
import { HeaderArrowS } from 'src/ui/0-elements/HeaderArrow/HeaderArrowS'
import { SvgIconS } from 'src/ui/0-elements/icons/SvgIcons/style/SvgIconS'
import { SvgIcons } from 'src/ui/0-elements/icons/SvgIcons/SvgIcons'
import HeaderArrow from 'src/ui/0-elements/HeaderArrow/HeaderArrow.tsx'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import LineProgress from 'src/ui/0-elements/LineProgress/LineProgress'
import { LineProgressS } from 'src/ui/0-elements/LineProgress/LineProgressS'
import SummaryPageFeatureCards from 'src/ui/2-pages/Profile/Summary/parts/SummaryPageFeatureCards'
import { SummaryPageData } from 'src/ui/2-pages/Profile/Summary/SummaryPageData'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar'
import { Pages } from 'src/ui/components/Pages/Pages'
import PageScrollbars from 'src/ui/1-widgets/Scrollbars/PageScrollbars'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import UserActionsConsumer from 'src/ui/components/UserActionsConsumer/UserActionsConsumer'
import { DateU } from 'src/util/date/DateU'
import { MockData } from 'src/_mock-data/MockData'
import { AppTheme } from 'src/ui-data/theme/AppTheme'
import full = RouteBuilder.full
import RootRoute = AppRoutes.RootRoute
import use = RouteBuilder.use
import EyeWideIc = SvgIcons.EyeWideIc
import center = EmotionCommon.center
import Txt = EmotionCommon.Txt



const SummaryPage = React.memo(
  () => {
    const lang = useRecoilValue(LangRecoil).langs[0]
    const titleText = useUiValues(TitleUiText)
    const actionText = useUiValues(ActionUiText)
    
    const auth = useRecoilValue(AuthRecoil)!
    const u = auth.user
    
    const profile = MockData.profile2
    const progress = 45
    const completeProfileDescriptionText = 'Завешите описание профиля'
    const completeProfileInCoupleSteps = 'Дополните профиль всего за пару шагов'
    
    const [displayedProgress, setDisplayedProgress] = useState(5)
    
    useEffect(() => setDisplayedProgress(progress), [])
    
    
    const info = [profile.city, DateU.age(u.birthDate, lang)]
      .filter(it => it)
      .join(', ')
    
    
    
    return (
      <>
      
        <Pages.Page>
          <Pages.SafeInsets>
            <Pages.Content css={pageContentS}>
              
              <InfoCard>
                
                <Ava src={profile.ava} />
                
                <Name>{u.name}</Name>
                <UserActionsConsumer>
                  <Link to={RootRoute.profile.id.userId[use](u.id).preview[full]()}>
                    <Eye>
                      <Button css={ButtonS.textRoundBigNormal}>
                        <EyeWideIc css={eyeIcS} />
                      </Button>
                    </Eye>
                  </Link>
                </UserActionsConsumer>
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
                  <LineProgress css={LineProgressS.S.normal} progress={displayedProgress} />
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
  }
)
export default SummaryPage


const pageContentS = css`
  gap: 16px;
`

const InfoCard = styled.div`
  ${SummaryPageData.cardStyle};
  background: ${p => p.theme.containerNormal.bg[0]};
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
    'cpt  cpt  cpt  cpt  cpt ' auto /* Complete Profile Text (cpt) */
   / auto 14px 1fr  8px  auto;
  gap: 0;
`

const Ava = styled.img`
  grid-area: ava;
  align-self: center;
  width: 82px;
  height: 82px;
  border-radius: 999999px;
  object-position: center;
  object-fit: cover;
`


const Eye = styled.div`
  grid-area: eye;
  place-self: start end;
  ${center};
  margin-top: -14px;
  margin-right: -6px;
`
const eyeIcS = (t: AppTheme.Theme) => css`
  ${SvgIconS.normal(t)}
  ${SvgIconS.W.use.s.normal().e.icon().thisUse} {
    ${SvgIconS.W.e.icon.p.size.set('100%')}
    ${SvgIconS.W.e.icon.p.color.set(t.containerNormal.content3d[0])}
  }
`


const Name = styled.div`
  grid-area: name;
  
  font-weight: 600;
  font-size: 20px;
  line-height: 119%;
  color: ${p => p.theme.containerNormal.content1a[0]};
`
const Info = styled.div`
  grid-area: info;
  
  font-weight: 400;
  font-size: 17px;
  line-height: 119%;
  color: ${p => p.theme.containerNormal.content3d[0]};
`
const Edit = styled.div`
  grid-area: edit;
  min-width: 142px;
  width: fit-content;
`
const editBtnStyle = (t: AppTheme.Theme) => css`
  ${ButtonS.filledRectNormalAccent2(t)};
  ${ButtonS.W.u({ e: 'button', s: 'normal' }).thisUse} {
    width: fit-content;
    min-height: 34px;
    padding: 8px 14px;
    border-radius: 10px;
  }
`



const Divider = styled.div`
  grid-area: div;
  width: 100%;
  height: 1px;
  background-color: ${p => p.theme.containerNormal.c5};
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
  ${Txt.large3b};
  color: ${p => p.theme.containerAccent.bg3};
`


const CompleteProfileText = styled.div`
  grid-area: cpt;
  justify-self: stretch;
  ${Txt.large1};
  color: ${p => p.theme.containerNormal.content1a[0]};
  text-align: center;
`
