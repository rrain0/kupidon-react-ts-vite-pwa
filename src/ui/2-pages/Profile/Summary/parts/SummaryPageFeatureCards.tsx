import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon'
import { WidgetStyleCommon } from 'src/ui-data/style/WidgetStyleCommon.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme'
import { LightWine } from 'src/ui-data/theme/themes/LightWine.ts'
import { ActionUiText } from 'src/ui-data/translations/ActionUiText'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText'
import Button from 'src/ui/0-elements/buttons/Button/Button'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import { SummaryPageData } from 'src/ui/2-pages/Profile/Summary/SummaryPageData'
import Txt = EmotionCommon.Txt
import heartLocks from '@im/ic/heart-locks.svg'
import share from '@im/ic/share.svg'
import social from '@im/ic/social.svg'



const SummaryPageFeatureCards = React.memo(() => {
  const titleText = useUiValues(TitleUiText)
  const actionText = useUiValues(ActionUiText)
  
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
  
  return (
    <>
      
      <PremiumCard>
        <FeatureCardName>{premiumSubscription}</FeatureCardName>
        <FeatureCardText>{unlockAllPossibilitiesWithPremium}</FeatureCardText>
        <Button css={ButtonS6.t(premiumCardButtonS)}>{findOutMore}</Button>
        <FeatureCardIcBox>
          <PremiumCardIc />
        </FeatureCardIcBox>
      </PremiumCard>
      
      <InviteFriendsCard>
        <FeatureCardName>{inviteYourFriends}</FeatureCardName>
        <FeatureCardText>{maybeTheyAreLookingForOtherHalf}</FeatureCardText>
        <Button css={ButtonS6.t(inviteFriendsCardButtonS)}>{invite}</Button>
        <FeatureCardIcBox>
          <InviteFriendsCardIc  />
        </FeatureCardIcBox>
      </InviteFriendsCard>
      
      <SocialNetworksCard>
        <FeatureCardName>{ourSocialNetworks}</FeatureCardName>
        <FeatureCardText>{joinSocialNetworksToStayUpToDate}</FeatureCardText>
        <Button css={ButtonS6.t(socialNetworksCardButtonS)}>{goto}</Button>
        <FeatureCardIcBox>
          <SocialNetworksCardIc />
        </FeatureCardIcBox>
      </SocialNetworksCard>
    </>
  )
})
export default SummaryPageFeatureCards





const cardMinH = 136
const featureCardS = css`
  ${SummaryPageData.cardStyle};
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
  ${Txt.s17Bold600Wide};
`
const FeatureCardText = styled.div`
  grid-area: text;
  align-self: center;
  ${Txt.s14};
`
const featureCardButtonS: AppWidgetStyle = [ButtonS6.S.filled.rect.md.accent2, {
  button: {
    gridArea: 'btn', w: 160, hMin: 35,
    ...WidgetStyleCommon.Txt.s14Bold,
  },
}]
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



const cardTheme = {
  boxPink: {
    bgGrad:       ['#F0849D', '#CD617A'],
    ct:           '#FFFFFF',
  },
  boxWithPink: {
    bg:           '#FFFFFF',
    ct:           '#DD718A',
    ctRipple:     '#66666688',
    
    bgFcGrad:     ['#ffa9bd', '#ffffff'],
    ctFc:         '#DD718A',
  },
  
  boxWine: {
    bgGrad:        ['#BB2649', '#F75F82'],
    ct:            '#FFFFFF',
  },
  boxWithWine: {
    bg:            '#FFFFFF',
    ct:            '#BB2649',
    ctRipple:      '#F75F8288',
    
    bgFcGrad:      ['#F75F82', '#ffffff'],
    ctFc:          '#BB2649',
  },
  
  boxViolet: {
    bgGrad:        ['#AB6FE7', '#8B43D3'],
    ct:            '#FFFFFF',
  },
  boxWithViolet: {
    bg:            '#FFFFFF',
    ct:            '#934DD8',
    ctRipple:      '#d2abf988',
    
    bgFcGrad:      ['#d2abf9', '#ffffff'],
    ctFc:          '#934DD8',
  },
  
  boxBlue: {
    bgGrad:        ['#67A9D9', '#2E85C3'],
    ct:            '#FFFFFF',
  },
  boxWithBlue: {
    bg:            '#FFFFFF',
    ct:            '#398CC8',
    ctRipple:      '#bae2ff88',
    
    bgFcGrad:      ['#bae2ff', '#ffffff'],
    ctFc:          '#398CC8',
  },
}



const PremiumCard = styled.div`
  ${featureCardS};
  background: linear-gradient(170.72deg,
    ${cardTheme.boxWine.bgGrad[0]} 7.42%,
    ${cardTheme.boxWine.bgGrad[1]} 131.56%
  );
  color: ${cardTheme.boxWine.ct};
`
const premiumCardButtonS: AppWidgetStyle = t => [featureCardButtonS, {
  buttonBgColor: cardTheme.boxWithWine.bg,
  buttonColor: cardTheme.boxWithWine.ct,
  rippleColor: cardTheme.boxWithWine.ctRipple,
  inFocus: {
    buttonBgColor: cardTheme.boxWithWine.bg,
    buttonBgIm: `linear-gradient(
      to bottom right,
      ${cardTheme.boxWithWine.bgFcGrad[1]} 65%,
      ${cardTheme.boxWithWine.bgFcGrad} 100%
    )`,
    buttonColor: cardTheme.boxWithWine.ctFc,
  },
}]
const PremiumCardIc = styled(FeatureCardIc)`
  background-image: url(${heartLocks});
`




const InviteFriendsCard = styled.div`
  ${featureCardS};
  background: linear-gradient(180deg,
    ${cardTheme.boxViolet.bgGrad[0]} 0%,
    ${cardTheme.boxViolet.bgGrad[1]} 100%
  );
  color: ${cardTheme.boxViolet.ct};
`
const inviteFriendsCardButtonS: AppWidgetStyle = t => [featureCardButtonS, {
  buttonBgColor: cardTheme.boxWithViolet.bg,
  buttonColor: cardTheme.boxWithViolet.ct,
  rippleColor: cardTheme.boxWithViolet.ctRipple,
  inFocus: {
    buttonBgColor: cardTheme.boxWithViolet.bg,
    buttonBgIm: `linear-gradient(
      to bottom right,
      ${cardTheme.boxWithViolet.bgFcGrad[1]} 65%,
      ${cardTheme.boxWithViolet.bgFcGrad} 100%
    )`,
    buttonColor: cardTheme.boxWithViolet.ctFc,
  },
}]
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
    ${cardTheme.boxBlue.bgGrad[0]} 0%,
    ${cardTheme.boxBlue.bgGrad[1]} 107.78%
  );
  color: ${cardTheme.boxBlue.ct};
`
const socialNetworksCardButtonS: AppWidgetStyle = t => [featureCardButtonS, {
  buttonBgColor: cardTheme.boxWithBlue.bg,
  buttonColor: cardTheme.boxWithBlue.ct,
  rippleColor: cardTheme.boxWithBlue.ctRipple,
  inFocus: {
    buttonBgColor: cardTheme.boxWithBlue.bg,
    buttonBgIm: `linear-gradient(
      to bottom right,
      ${cardTheme.boxWithBlue.bgFcGrad[1]} 65%,
      ${cardTheme.boxWithBlue.bgFcGrad} 100%
    )`,
    buttonColor: cardTheme.boxWithBlue.ctFc,
  },
}]
const SocialNetworksCardIc = styled(FeatureCardIc)`
  background-image: url(${social});
  width: 140%;
  height: 100%;
  background-size: contain;
  margin-left: -20%;
`
