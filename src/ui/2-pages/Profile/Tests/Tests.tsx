import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import React, { useEffect, useMemo, useState } from 'react'
import { WidgetStyleCommon } from 'src/ui-data/style/WidgetStyleCommon.ts'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
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
  
  const uiText = useMemo(() => ({
    yourPersonalityType: 'Ваш тип личности',
    thisTestHelpsYouRealizeYourPreferences:
      // eslint-disable-next-line @stylistic/max-len
      'Этот тест поможет вам понять ваши личностные качества и предпочтения. Результаты будут использованы для улучшения совместимости с другими пользователями',
    yourPersonalityTypeIsUnknown:
      'Ваш тип личности неизвестен, пройдите тест чтобы определить ваш тип личности',
    takeTheTest: 'Пройти тест',
  }), [])
  
  
  const [testState, setTestState] = useState('notStarted' as 'notStarted' | 'paused' | 'completed')
  
  
  return (
    <>
      <Pages.SafeInsets>
        <Pages.ContentForm onSubmit={props.onFormSubmitCallback}>
        
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
            
            
            <Card3 css={yourPersonalityTypeIsUnknownCardS}>
              <ManWithHugeHeartBox>
                <img
                  src={manWithHugeHeart}
                  alt="Man with huge heart"
                />
              </ManWithHugeHeartBox>
              
              <InfoCardTextCenter>
                {uiText.yourPersonalityTypeIsUnknown}
              </InfoCardTextCenter>
            </Card3>
            
            {testState === 'notStarted' && (
              <Button
                css={ButtonS6.t(ButtonS6.S.filled.rect.lg.accent3)}
                onClick={() => console.log('take the test')}
                
                /*
                onPointerDown={ev => {
                  console.log('onPointerDown #', ev.pointerId)
                }}
                
                onPointerEnter={ev => {
                  console.log('onPointerEnter #', ev.pointerId)
                }}
                onPointerLeave={ev => {
                  console.log('onPointerLeave #', ev.pointerId)
                }}
                onPointerOut={ev => {
                  console.log('onPointerOut #', ev.pointerId)
                }}
                onPointerOver={ev => {
                  console.log('onPointerOver #', ev.pointerId)
                }}
                onPointerMove={ev => {
                  console.log('onPointerMove #', ev.pointerId)
                }}
                
                onPointerCancel={ev => {
                  console.log('onPointerCancel #', ev.pointerId)
                }}
                onPointerUp={ev => {
                  console.log('onPointerUp #', ev.pointerId)
                }}
                 */
              >
                {uiText.takeTheTest}
              </Button>
            )}
            
            
          
          </div>
        
        </Pages.ContentForm>
      </Pages.SafeInsets>
      
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
const ManWithHugeHeartBox = styled.div`
  width: 86%;
  ${flexC};
`








export const TopButtonBarFrame = styled.section`
  ${fixedTop};
  z-index: 10;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: end;
  background: ${p => p.theme.boxNormal.bg[0]}cc;
  gap: 10px;
  pointer-events: none;
  &>*{ pointer-events: auto; }
`
