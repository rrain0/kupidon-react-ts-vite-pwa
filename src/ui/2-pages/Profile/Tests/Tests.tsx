import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { PersonalityType } from 'src/api/model/PersonalityType.ts'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import React, { useEffect, useMemo, useState } from 'react'
import { PersonalityTypeData } from 'src/ui-data/PersonalityTypeData.ts'
import { WidgetStyleCommon } from 'src/ui-data/style/WidgetStyleCommon.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { PersonalityTypeUiText } from 'src/ui-data/translations/PersonalityTypeUiText.ts'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import { IconButtonS6 } from 'src/ui/0-elements/buttons/IconButton/IconButtonS6.ts'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import LeftBottomButtonBar from 'src/ui/1-widgets/LeftBottomButtonBar/LeftBottomButtonBar.tsx'
import PersonalityCompatibility
  from 'src/ui/2-pages/Profile/Tests/parts/PersonalityCompatibility.tsx'
import TestQuestions from 'src/ui/2-pages/Profile/Tests/parts/TestQuestions.tsx'
import { Pages } from 'src/ui/components/Pages/Pages.ts'
import Card3 from 'src/ui/0-elements/cards/Card3.tsx'
import ProfilePageTabHeader from 'src/ui/2-pages/Profile/ProfilePageTabHeader.tsx'
import { ProfilePageValidation } from 'src/ui/2-pages/Profile/validation.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { TypeU } from 'src/util/common/TypeU.ts'
import { useFormFailures } from 'src/mini-libs/form-validation/hooks/useFormFailures.ts'
import { FormProps } from 'src/mini-libs/form-validation/hooks/useFormValuesProps.ts'
import ValidationWrap from 'src/mini-libs/form-validation/components/ValidationWrap.tsx'
import { ActionUiText } from 'src/ui-data/translations/ActionUiText.ts'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import col = EmotionCommon.col
import FormValues = ProfilePageValidation.FormValues
import fixedTop = EmotionCommon.fixedTop
import Callback1 = TypeU.Callback1
import Callback = TypeU.Callback
import { CardTitleNormal, CardTitleSecondary } from '../parts/CardTitle'
import row = EmotionCommon.row
import Txt = EmotionCommon.Txt
import pinkHeartWithExclamation from 'src/res/im/ic/pink-heart-with-exclamation.svg'
import manWithHugeHeart from 'src/res/im/ic/man-with-huge-heart.svg'
import colC = EmotionCommon.colC
import flexC = WidgetStyleCommon.flexC
import gridStackC = EmotionCommon.gridStackC
import GearIc = SvgIconsPack.GearIc





export type DateProps = {
  validationProps: ReturnType<typeof useFormFailures<FormValues>>['validationProps']
  onFormSubmitCallback: Callback1<React.FormEvent>
  submit: Callback
  canSubmit: boolean
  formProps: FormProps
  isLoading: boolean
  tabIdx: number
}


const Tests = React.memo((props: DateProps) => {
  
  const actionText = useUiValues(ActionUiText)
  
  const [personalityType, setPersonalityType] = useState<PersonalityType | null>(null)
  
  const personalityTypeUiText = useUiValues(PersonalityTypeUiText[personalityType ?? 'ESTJ'])
  
  const uiText = useMemo(() => ({
    yourPersonalityType: 'Ваш тип личности',
    thisTestHelpsYouRealizeYourPreferences:
      // eslint-disable-next-line @stylistic/max-len
      'Этот тест поможет вам понять ваши личностные качества и предпочтения. Результаты будут использованы для улучшения совместимости с другими пользователями',
    yourPersonalityTypeIsUnknown:
      'Ваш тип личности неизвестен, пройдите тест чтобы определить ваш тип личности',
    personalityTypeName: personalityTypeUiText.name,
    takeTheTest: 'Пройти тест',
    continue: 'Проджолжить',
    startOver: 'Начать заново',
    startTheTestAgain: 'Начать тест заново',
  }), [personalityTypeUiText])
  
  const [testState, setTestState] = useState(
    'completed' as 'notStarted' | 'testing' | 'paused' | 'completed'
  )
  
  const color = PersonalityTypeData[personalityType ?? 'INTP'].color
  
  
  return (
    <>
      <Pages.SafeInsets>
        <Pages.Content css={css`gap: 30px;`}>
          
          {testState === 'testing' && (
            <TestQuestions />
          )}
          
          {testState !== 'testing' && (
            <>
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
                
                
                {!personalityType && (
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
                
                {personalityType && (
                  <Card3 css={yourPersonalityTypeCardS}>
                    
                    <PersonalityTypePictureBox>
                      <PersonalityTypePicture
                        src={PersonalityTypeData[personalityType].picture}
                        alt={personalityType}
                      />
                    </PersonalityTypePictureBox>
                    
                    <PersonalityTypeTextBox
                      style={{ color: color }}
                    >
                      <PersonalityTypeCodeName>
                        {personalityType}
                      </PersonalityTypeCodeName>
                      <PersonalityTypeName>
                        {uiText.personalityTypeName}
                      </PersonalityTypeName>
                    </PersonalityTypeTextBox>
                  
                  </Card3>
                )}
                
                {testState === 'notStarted' && (
                  <Button
                    css={ButtonS6.t(ButtonS6.S.filled.rect.lg.accent3)}
                    onClick={() => setTestState('testing')}
                  >
                    {uiText.takeTheTest}
                  </Button>
                )}
                {testState === 'paused' && (
                  <div css={css`${col}; gap: 15px;`}>
                    <Button
                      css={ButtonS6.t(ButtonS6.S.filled.rect.lg.accent3)}
                      onClick={() => console.log('0')}
                    >
                      {uiText.continue}
                    </Button>
                    <Button
                      css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal3)}
                      onClick={() => console.log('0')}
                    >
                      {uiText.startOver}
                    </Button>
                  </div>
                )}
                {testState === 'completed' && (
                  <Button
                    css={ButtonS6.t(ButtonS6.S.filled.rect.lg.accent3)}
                    onClick={() => setTestState('testing')}
                  >
                    {uiText.startTheTestAgain}
                  </Button>
                )}
                
                {testState === 'completed' && (
                  <div css={css`${col}; gap: 15px;`}>
                    <PersonalityCompatibility
                      compatibility="high"
                      compatibles={['INTJ', 'ENTP', 'ISFP']}
                      percent="100-75%"
                    />
                    <PersonalityCompatibility
                      compatibility="medium"
                      compatibles={['INTJ', 'ENTP', 'ISFP']}
                      percent="75-55%"
                    />
                    <PersonalityCompatibility
                      compatibility="low"
                      compatibles={['INTJ', 'ENTP', 'ISFP']}
                      percent="55-25%"
                    />
                  </div>
                )}
              
              </div>
            </>
          )}
          
          
        
        </Pages.Content>
      </Pages.SafeInsets>
      
      
      <LeftBottomButtonBar>
        <Button
          css={IconButtonS6.t(IconButtonS6.S.trans.round.lg.normal2)}
          onClick={() => {
            console.log(testState)
            if (testState === 'notStarted') {
              setTestState('paused')
              setPersonalityType(null)
            }
            if (testState === 'paused') {
              setTestState('completed')
              setPersonalityType('INTP')
            }
            if (testState === 'completed') {
              setTestState('notStarted')
              setPersonalityType(null)
            }
            // TODO Pointer click fix does not work properly
            /* else {
              setTestState('notStarted')
              setPersonalityType(null)
            } */
            if (testState === 'testing') {
              setTestState('notStarted')
              setPersonalityType(null)
            }
          }}
        >
          <GearIc />
        </Button>
      </LeftBottomButtonBar>
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


