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



const SummaryPageFeatureCards = React.memo(
  () => {
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
  }
)
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
  ${Txt.lg17Bold};
`
const FeatureCardText = styled.div`
  grid-area: text;
  align-self: center;
  ${Txt.md14};
`
const featureCardButtonS: AppWidgetStyle = [ButtonS6.S.filled.rect.md.accent2, {
  button: {
    gridArea: 'btn', w: 160, hMin: 35,
    ...WidgetStyleCommon.Txt.md14Bold,
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


const PremiumCard = styled.div`
  ${featureCardS};
  background: linear-gradient(170.72deg,
    ${p => p.theme.boxWine.bg[0]} 7.42%,
    ${p => p.theme.boxWine.bg[1]} 131.56%
  );
  color: ${p => p.theme.boxWine.ct};
`
const premiumCardButtonS: AppWidgetStyle = t => [featureCardButtonS, {
  buttonBgColor: t.boxWithWine.bg,
  buttonColor: t.boxWithWine.ct,
  rippleColor: t.boxWithWine.ctRipple,
  inFocus: {
    buttonBgColor: t.boxWithWine.bg,
    buttonBgIm: `linear-gradient(
      to bottom right,
      ${t.boxWithWine.bgFc[1]} 65%,
      ${t.boxWithWine.bgFc[0]} 100%
    )`,
    buttonColor: t.boxWithWine.ctFc,
  },
}]
const PremiumCardIc = styled(FeatureCardIc)`
  background-image: url(${heartLocks});
`




const InviteFriendsCard = styled.div`
  ${featureCardS};
  background: linear-gradient(180deg,
    ${p => p.theme.boxViolet.bg[0]} 0%,
    ${p => p.theme.boxViolet.bg[1]} 100%
  );
  color: ${p => p.theme.boxViolet.ct};
`
const inviteFriendsCardButtonS: AppWidgetStyle = t => [featureCardButtonS, {
  buttonBgColor: t.boxWithViolet.bg,
  buttonColor: t.boxWithViolet.ct,
  rippleColor: t.boxWithViolet.ctRipple,
  inFocus: {
    buttonBgColor: t.boxWithViolet.bg,
    buttonBgIm: `linear-gradient(
      to bottom right,
      ${t.boxWithViolet.bgFc[1]} 65%,
      ${t.boxWithViolet.bgFc[0]} 100%
    )`,
    buttonColor: t.boxWithViolet.ctFc,
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
    ${p => p.theme.boxBlue.bg[0]} 0%,
    ${p => p.theme.boxBlue.bg[1]} 107.78%
  );
  color: ${p => p.theme.boxBlue.ct};
`
const socialNetworksCardButtonS: AppWidgetStyle = t => [featureCardButtonS, {
  buttonBgColor: t.boxWithBlue.bg,
  buttonColor: t.boxWithBlue.ct,
  rippleColor: t.boxWithBlue.ctRipple,
  inFocus: {
    buttonBgColor: t.boxWithBlue.bg,
    buttonBgIm: `linear-gradient(
      to bottom right,
      ${t.boxWithBlue.bgFc[1]} 65%,
      ${t.boxWithBlue.bgFc[0]} 100%
    )`,
    buttonColor: t.boxWithBlue.ctFc,
  },
}]
const SocialNetworksCardIc = styled(FeatureCardIc)`
  background-image: url(${social});
  width: 140%;
  height: 100%;
  background-size: contain;
  margin-left: -20%;
`
