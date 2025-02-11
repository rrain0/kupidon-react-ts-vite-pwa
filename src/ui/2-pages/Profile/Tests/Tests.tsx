import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { MbtiRecoil, MbtiRecoilComputed } from 'src/recoil/state/MbtiRecoil.ts'
import { MbtiData } from 'src/ui-data/MbtiData.ts'
import { WidgetStyleCommon } from 'src/ui-data/style/WidgetStyleCommon.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import ModalDialog from 'src/ui/1-widgets/modals/ModalDialog/ModalDialog.tsx'
import PersonalityCompatibility
  from 'src/ui/2-pages/Profile/Tests/parts/PersonalityCompatibility.tsx'
import {
  useOverlayUrl
} from 'src/ui/components/action-providers/UseOverlayUrl/hook/useOverlayUrl.ts'
import { Pages } from 'src/ui/components/Pages/Pages.ts'
import Card3 from 'src/ui/0-elements/cards/Card3.tsx'
import ProfilePageTabHeader from 'src/ui/2-pages/Profile/ProfilePageTabHeader.tsx'
import { ProfilePageValidation } from 'src/ui/2-pages/Profile/validation.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { TypeU } from 'src/util/common/TypeU.ts'
import { useFormFailures } from 'src/mini-libs/form-validation/hooks/useFormFailures.ts'
import { FormProps } from 'src/mini-libs/form-validation/hooks/useFormValuesProps.ts'
import { ActionUiText } from 'src/ui-data/translations/ActionUiText.ts'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import col = EmotionCommon.col
import FormValues = ProfilePageValidation.FormValues
import Callback1 = TypeU.Callback1
import Callback = TypeU.Callback
import { CardTitleNormal } from '../parts/CardTitle'
import row = EmotionCommon.row
import Txt = EmotionCommon.Txt
import pinkHeartWithExclamation from 'src/res/im/ic/pink-heart-with-exclamation.svg'
import manWithHugeHeart from 'src/res/im/ic/man-with-huge-heart.svg'
import colC = EmotionCommon.colC
import flexC = WidgetStyleCommon.flexC
import gridStackC = EmotionCommon.gridStackC
import RootRoute = AppRoutes.RootRoute
import fullAnySearchParams = RouteBuilder.fullAnySearchParams



const ResetMbtiTestOverlayName = 'resetMbtiTest'



export type TestsProps = {
  validationProps: ReturnType<typeof useFormFailures<FormValues>>['validationProps']
  onFormSubmitCallback: Callback1<React.FormEvent>
  submit: Callback
  canSubmit: boolean
  formProps: FormProps
  isLoading: boolean
  tabIdx: number
}


const Tests = React.memo((props: TestsProps) => {
  
  const setMbti = useSetRecoilState(MbtiRecoil)
  const { testState, mbtiType } = useRecoilValue(MbtiRecoilComputed)
  const mbtiData = MbtiData[mbtiType ?? 'INTP']
  
  
  const actionText = useUiValues(ActionUiText)
  const mbtiTypeUiText = useUiValues(mbtiData.uiText)
  
  
  const uiText = useMemo(() => ({
    yourPersonalityType: 'Ваш тип личности',
    thisTestHelpsYouRealizeYourPreferences:
      // eslint-disable-next-line @stylistic/max-len
      'Этот тест поможет вам понять ваши личностные качества и предпочтения. Результаты будут использованы для улучшения совместимости с другими пользователями',
    yourPersonalityTypeIsUnknown:
      'Ваш тип личности неизвестен, пройдите тест чтобы определить ваш тип личности',
    personalityTypeName: mbtiTypeUiText.name,
    takeTheTest: 'Пройти тест',
    continue: 'Продолжить',
    startOver: 'Начать заново',
    startTheTestAgain: 'Начать тест заново',
    resetTestAndStartAgain: 'Удалить результаты текущего тестирования и начать заново?',
  }), [mbtiTypeUiText])
  
  
  const color = mbtiData.color
  
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  
  const resetMbtiTestDialog = useOverlayUrl(ResetMbtiTestOverlayName)
  const resetTestAndStartAgain = useCallback(() => {
    setMbti(prev => ({ ...prev, answers: [] }))
    resetMbtiTestDialog.close(() => {
      navigate(RootRoute.test.mbti[fullAnySearchParams](searchParams))
    })
  }, [])
  
  
  return (
    <>
      <Pages.SafeInsets>
        <Pages.Content css={css`gap: 30px;`}>
          
          <ProfilePageTabHeader thisTabIdx={props.tabIdx} />
          
          <div css={col} style={{ gap: 25 }}>
        
        
            <Card3 css={thisTestHelpsYouRealizeCardS}>
              <PinkHeartWithExclamationBox>
                <img
                  src={pinkHeartWithExclamation}
                  alt="Pink heart with exclamation mark"
                  style={{ height: 34 }}
                />
              </PinkHeartWithExclamationBox>
              
              <InfoCardText>
                {uiText.thisTestHelpsYouRealizeYourPreferences}
              </InfoCardText>
            </Card3>
            
            
            <CardTitleNormal>{uiText.yourPersonalityType}</CardTitleNormal>
            
            
            {!mbtiType && (
              <Card3 css={yourPersonalityTypeIsUnknownCardS}>
                <ManWithHugeHeart
                  src={manWithHugeHeart}
                  alt="Man with huge heart"
                />
                
                <InfoCardTextCenter>
                  {uiText.yourPersonalityTypeIsUnknown}
                </InfoCardTextCenter>
              </Card3>
            )}
            
            {mbtiType && (
              <>
                <Card3 css={yourPersonalityTypeCardS}>
                  
                  <PersonalityTypePictureBox>
                    <PersonalityTypePicture
                      src={mbtiData.picture}
                      alt={mbtiType}
                    />
                  </PersonalityTypePictureBox>
                  
                  <PersonalityTypeTextBox
                    style={{ color: color }}
                  >
                    <PersonalityTypeCodeName>
                      {mbtiType}
                    </PersonalityTypeCodeName>
                    <PersonalityTypeName>
                      {uiText.personalityTypeName}
                    </PersonalityTypeName>
                  </PersonalityTypeTextBox>
                
                </Card3>
                
                <ShortDescription>{mbtiTypeUiText.shortDescription}</ShortDescription>
              </>
            )}
            
            {testState === 'idle' && (
              <Link to={RootRoute.test.mbti[fullAnySearchParams](searchParams)}>
                <Button
                  css={ButtonS6.t(ButtonS6.S.filled.rect.lg.accent3)}
                >
                  {uiText.takeTheTest}
                </Button>
              </Link>
            )}
            {testState === 'paused' && (
              <div css={css`${col}; gap: 15px;`}>
                <Link to={RootRoute.test.mbti[fullAnySearchParams](searchParams)}>
                  <Button
                    css={ButtonS6.t(ButtonS6.S.filled.rect.lg.accent3)}
                  >
                    {uiText.continue}
                  </Button>
                </Link>
                <Button
                  css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal3)}
                  onClick={resetMbtiTestDialog.open}
                >
                  {uiText.startOver}
                </Button>
              </div>
            )}
            
            {testState === 'completed' && (
              <div css={css`${col}; gap: 15px;`}>
                <PersonalityCompatibility
                  compatibility="high"
                  compatibles={mbtiData.highCompatibility}
                  percent="100-75%"
                />
                <PersonalityCompatibility
                  compatibility="medium"
                  compatibles={mbtiData.mediumCompatibility}
                  percent="75-55%"
                />
                {/* <PersonalityCompatibility
                  compatibility="low"
                  compatibles={['INTJ', 'ENTP', 'ISFP']}
                  percent="55-25%"
                /> */}
              </div>
            )}
            
            {testState === 'completed' && (
              <Button
                css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal3)}
                onClick={resetMbtiTestDialog.open}
              >
                {uiText.startTheTestAgain}
              </Button>
            )}
          
          </div>
          
        </Pages.Content>
      </Pages.SafeInsets>
      
      
      <ModalDialog
        isOpen={resetMbtiTestDialog.isOpen}
        title={uiText.resetTestAndStartAgain}
        onModal={resetMbtiTestDialog.close}
        onBack={resetMbtiTestDialog.close}
        onDangerYes={resetTestAndStartAgain}
      />
      
      
      {/* <LeftBottomButtonBar>
        <Button
          css={IconButtonS6.t(IconButtonS6.S.trans.round.lg.normal2)}
          onClick={() => {
          
          }}
        >
          <GearIc />
        </Button>
      </LeftBottomButtonBar> */}
    </>
  )
})
export default Tests



const InfoCardText = styled.div`
  ${Txt.sm13};
  color: #858585;
`
const InfoCardTextCenter = styled(InfoCardText)`
  text-align: center;
`


const thisTestHelpsYouRealizeCardS = css`
  padding: 12px 16px;
  ${row};
  gap: 19px;
`
const PinkHeartWithExclamationBox = styled.div`
  height: 100%;
  ${flexC};
`


const yourPersonalityTypeIsUnknownCardS = css`
  padding: 23px 16px;
  ${colC};
  gap: 28px;
`
const ManWithHugeHeart = styled.img`
  width: 86%;
`


const yourPersonalityTypeCardS = (t: AppTheme.Theme) => css`
  padding: 0;
  ${colC};
  ${gridStackC};
  gap: 5px;
  background-color: ${t.type === 'light' ? '#ffffff' : '#f0f0f0'};
`
const PersonalityTypePictureBox = styled.div`
  width: 100%;
  padding: 60px 0px 24px;
  ${colC};
`
const PersonalityTypePicture = styled.img`
  width: 100%;
  height: auto;
  aspect-ratio: 1.331;
`
const PersonalityTypeTextBox = styled.div`
  width: 100%;
  height: 100%;
  padding: 17px;
  ${colC};
  gap: 5px;
`
const PersonalityTypeCodeName = styled.div`
  ${Txt.lg36Bold};
`
const PersonalityTypeName = styled.div`
  ${Txt.lg24Bold};
`

const ShortDescription = styled.div`
  color: #000000;
  ${Txt.s17Bold};
`


