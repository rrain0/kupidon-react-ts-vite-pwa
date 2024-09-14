import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
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
import heartLocks from '@img/sign/heart-locks.svg'
import share from '@img/sign/share.svg'
import social from '@img/sign/social.svg'



const SummaryPage = React.memo(
  () => {
    const lang = useRecoilValue(LangRecoil).langs[0]
    const titleText = useUiValues(TitleUiText)
    const actionText = useUiValues(ActionUiText)
    
    const profile = MockData.profile
    const progress = 45
    const completeProfileDescriptionText = 'Завешите описание профиля'
    const completeProfileInCoupleSteps = 'Дополните профиль всего за пару шагов'
    const premiumSubscription = 'Премиум подписка'
    const unlockAllPossibilitiesWithPremium = 'Разблокируй все возможности Купидона с премиум подпиской!'
    const findOutMore = 'Узнать подробнее'
    const inviteYourFriends = 'Пригласи своих друзей'
    const maybeTheyAreLookingForOtherHalf = 'Возможно они так же ищут вторую половинку'
    const ourSocialNetworks = 'Наши социальные сети'
    const joinSocialNetworksToStayUpToDate =
      'Присоединяйся к нашим социальным сетям, чтобы всегда быть в курсе новостей'
    const invite = 'Пригласить'
    const goto = 'Перейти'
    
    const [displayedProgress, setDisplayedProgress] = useState(5)
    
    useEffect(() => setDisplayedProgress(progress), [])
    
    const auth = useRecoilValue(AuthRecoil)
    const authId = auth!.user.id
    
    const info = [profile.city, DateU.age(profile.birthDate, lang)]
      .filter(it => it)
      .join(', ')
    
    
    
    return (
      <>
      
        <Pages.Page>
          <Pages.SafeInsets>
            <Pages.Content css={pageContentS}>
              
              <InfoCard>
                
                <Ava src={profile.ava}/>
                
                <Name>{profile.name}</Name>
                <UserActionsConsumer>
                  <Link to={RootRoute.profile.id.userId[use](authId).preview[full]()}>
                    <Eye>
                      <Button css={ButtonS.textRoundBigNormal}>
                        <EyeWideIc css={eyeIcS} />
                      </Button>
                    </Eye>
                  </Link>
                </UserActionsConsumer>
                <Info>{info}</Info>
                
                <Link to={RootRoute.profile.id.userId[use](authId).profile[full]()}>
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
              
              
              <PremiumCard>
                <FeatureCardName>{premiumSubscription}</FeatureCardName>
                <FeatureCardText>{unlockAllPossibilitiesWithPremium}</FeatureCardText>
                <Button css={premiumCardButtonS}>{findOutMore}</Button>
                <FeatureCardIcBox>
                  <PremiumCardIc />
                </FeatureCardIcBox>
              </PremiumCard>
              
              <InviteFriendsCard>
                <FeatureCardName>{inviteYourFriends}</FeatureCardName>
                <FeatureCardText>{maybeTheyAreLookingForOtherHalf}</FeatureCardText>
                <Button css={inviteFriendsCardButtonS}>{invite}</Button>
                <FeatureCardIcBox>
                  <InviteFriendsCardIc  />
                </FeatureCardIcBox>
              </InviteFriendsCard>
              
              <SocialNetworksCard>
                <FeatureCardName>{ourSocialNetworks}</FeatureCardName>
                <FeatureCardText>{joinSocialNetworksToStayUpToDate}</FeatureCardText>
                <Button css={socialNetworksCardButtonS}>{goto}</Button>
                <FeatureCardIcBox>
                  <SocialNetworksCardIc />
                </FeatureCardIcBox>
              </SocialNetworksCard>
              
            
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

const cardStyle = css`
  padding: 16px;
  border-radius: 20px;
`

const InfoCard = styled.div`
  ${cardStyle};
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
    '.    .    .    .    .   ' 13.5px
    'harr harr harr harr harr' auto
    '.    .    .    .    .   ' 13.5px
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


const cardMinH = 136
const featureCardS = css`
  ${cardStyle};
  min-height: ${cardMinH}px;
  padding: 0 16px 0 0;
  display: grid;
  grid:
    'icon .   ' 12px
    'icon name' auto
    'icon .   ' 4px
    'icon text' 1fr
    'icon .   ' 10px
    'icon btn ' auto
    'icon .   ' 10px
   / 118px 1fr;
  gap: 0;
`
const FeatureCardName = styled.div`
  grid-area: name;
  ${Txt.large2c};
`
const FeatureCardText = styled.div`
  grid-area: text;
  align-self: center;
  ${Txt.normal2};
`
const featureCardButtonS = (t: AppTheme.Theme) => css`
  ${ButtonS.filledRectNormalAccent2(t)};
  ${ButtonS.W.u({ e: 'button', s: 'normal' }).thisUse} {
    grid-area: btn;
    width: 160px;
    min-height: 35px;
    ${Txt.normal2c};
  }
`
const FeatureCardIcBox = styled.div`
  grid-area: icon;
  place-self: center start;
  width: 100%;
  height: ${cardMinH}px;
  position: relative;
  overflow: hidden;
`
const FeatureCardIc = styled.div`
  position: absolute;
  width: 160%;
  height: 100%;
  margin-left: -40%;
  background-position: left center;
  background-size: cover;
  background-repeat: no-repeat;
`


const PremiumCard = styled.div`
  ${featureCardS};
  background: linear-gradient(170.72deg,
    ${p => p.theme.boxPink.bg[0]} 7.42%,
    ${p => p.theme.boxPink.bg[1]} 131.56%
  );
  color: ${p => p.theme.boxPink.c};
`
const premiumCardButtonS = (t: AppTheme.Theme) => css`
  ${featureCardButtonS(t)};
  ${ButtonS.S.Filled.Rect.addColor({
    bg: t.boxWithPink.bg,
    c: t.boxWithPink.c,
    cRipple: t.containerNormal.content4[0],
    bgFocus: t.boxWithPink.bg,
    bgImFocus: `linear-gradient(
      to bottom right,
      ${t.boxWithPink.bgFocus[1]} 50%,
      ${t.boxWithPink.bgFocus[0]} 100%
    )`,
    cFocus: t.boxWithPink.cFocus,
  })};
`
const PremiumCardIc = styled(FeatureCardIc)`
  background-image: url(${heartLocks});
`


const InviteFriendsCard = styled.div`
  ${featureCardS};
  background: linear-gradient(180deg,
    ${p => p.theme.boxViolet.bg[0]} 0%,
    ${p => p.theme.boxViolet.bg[1]} 100%
  );
  color: ${p => p.theme.boxViolet.c};
`
const inviteFriendsCardButtonS = (t: AppTheme.Theme) => css`
  ${featureCardButtonS(t)};
  ${ButtonS.S.Filled.Rect.addColor({
    bg: t.boxWithViolet.bg,
    c: t.boxWithViolet.c,
    cRipple: t.containerNormal.content4[0],
    bgFocus: t.boxWithViolet.bg,
    bgImFocus: `linear-gradient(
      to bottom right,
      ${t.boxWithViolet.bgFocus[1]} 50%,
      ${t.boxWithViolet.bgFocus[0]} 100%
    )`,
    cFocus: t.boxWithViolet.cFocus,
  })};
`
const InviteFriendsCardIc = styled(FeatureCardIc)`
  background-image: url(${share});
  width: 150%;
  height: 100%;
  margin-left: -35%;
  margin-top: 10%;
`

const SocialNetworksCard = styled.div`
  ${featureCardS};
  background: linear-gradient(180deg,
    ${p => p.theme.boxBlue.bg[0]} 0%,
    ${p => p.theme.boxBlue.bg[1]} 107.78%
  );
  color: ${p => p.theme.boxBlue.c};
`
const socialNetworksCardButtonS = (t: AppTheme.Theme) => css`
  ${featureCardButtonS(t)};
  ${ButtonS.S.Filled.Rect.addColor({
    bg: t.boxWithBlue.bg,
    c: t.boxWithBlue.c,
    cRipple: t.containerNormal.content4[0],
    bgFocus: t.boxWithBlue.bg,
    bgImFocus: `linear-gradient(
      to bottom right,
      ${t.boxWithBlue.bgFocus[1]} 50%,
      ${t.boxWithBlue.bgFocus[0]} 100%
    )`,
    cFocus: t.boxWithBlue.cFocus,
  })};
`
const SocialNetworksCardIc = styled(FeatureCardIc)`
  background-image: url(${social});
  width: 140%;
  height: 100%;
  background-size: contain;
  margin-left: -20%;
`

