import styled from '@emotion/styled'
import { RouteBuilder } from '@mini-libs/route-builder/RouteBuilder.tsx'
import { UiValues } from '@mini-libs/ui-text/UiText.ts'
import { flexStyle } from '@util/react/short-props/style/flexStyle.ts'
import React, { useMemo } from 'react'
import { QrcodeSVG } from 'react-qrcode-pretty'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { ActionUiText } from 'src/ui-data/translations/ActionUiText.ts'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import ImgSpark from 'src/ui/0-elements/ImgSpark/ImgSpark.tsx'
import { ImgSparkS6 } from 'src/ui/0-elements/ImgSpark/ImgSparkS6.ts'
import ContactButton from 'src/ui/1-widgets/ContactButton/ContactButton.tsx'
import { ProfileSharePageParts } from 'src/ui/2-pages/Profile/ProfileShare/ProfileSharePage.parts.ts'
import PageContentLayout from 'src/ui/components/page/PageContentLayout.tsx'
import PageLayout from 'src/ui/components/page/PageLayout.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import { useAppZustand } from 'src/zustand/app/AppZustand.ts'
import { useAuthZustand } from 'src/zustand/auth/AuthZustand.ts'
import use = RouteBuilder.use
import RootRoute = AppRoutes.RootRoute
import full = RouteBuilder.full




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




const ProfileSharePage = React.memo(() => {
  const lang = useAppZustand(s => s.langs[0])
  const titleText = useUiValues(TitleUiText)
  const actionText = useUiValues(ActionUiText)
  
  const { id, name, ava } = useAuthZustand(s => s.user!)
  
  const uiValues = useMemo(() => ({
    completeYourProfile: staticUiValues.completeYourProfile,
    completeProfileInFewSteps: staticUiValues.completeProfileInFewSteps,
  }), [])
  const uiText = useUiValues(uiValues)
  
  const frontendHttpsHostPort = `https://${window.location.host}`
  
  const urlShare = `${frontendHttpsHostPort}${RootRoute.profile.id.userId[use](id).overview[full]()}`
  
  return (
    <>
    
      <PageLayout col data-display-name='ProfileSharePage'>
        <PageContentLayout colSm styleInner={{ gap: 16 }}>
          
          <InfoCard wFull hCt col g={16} center>
            
            <Flex wCt hCt relative>
              {/* https://www.npmjs.com/package/react-qrcode-pretty?activeTab=readme */}
              {/* https://qrcodepretty.gn.dev.br/ */}
              <QrcodeSVG
                value={urlShare}
                //value='react-qrcode-pretty'
                level='M'
                variant={{
                  eyes: 'circle',
                  body: 'fluid',
                }}
                color={{
                  eyes: '#ffb818',
                  body: '#dfaf8e',
                }}
                colorEffect={{
                  eyes: 'gradient-light-diagonal',
                  body: 'gradient-light-diagonal',
                }}
                padding={16}
                margin={0}
                size={220}
                bgColor='#161941'
                bgRounded
              />
              
              <ImgSpark css={ImgSparkS6.t(avaS)} src={ava}/>
            </Flex>
            
            {/* TODO Translation */}
            <ContactButton
              contact={{ type: 'copy', text: 'Копировать ссылку', data: urlShare }}
            />
          </InfoCard>
          
        </PageContentLayout>
      </PageLayout>
      
      {/* <BottomFloatingBar/> */}
      
    </>
  )
})
ProfileSharePage.displayName = 'ProfileSharePage'
export default ProfileSharePage


// TODO card variants or styles
const InfoCard = styled(Flex)(({ theme: t }) => [
  ProfileSharePageParts.cardS,
  flexStyle({
    relative: true,
    background: t.boxDefault.bg,
    gap: 0,
  }),
])

const avaS: AppWidgetStyle = t => [
  ImgSparkS6.S.img.square.auto.normal,
  {
    imgFrame: {
      position: 'absolute',
      top: '50%', left: '50%',
      transform: 'translate(-50%, -50%)',
      sz: '25%',
      bgColor: '#161941',
      borderRadius: 999999,
      border: '5px solid #161941',
    },
  },
]


