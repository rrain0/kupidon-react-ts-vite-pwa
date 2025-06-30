import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ObjectU } from '@util/common/ObjectU.ts'
import { Link, useNavigate, useSearchParams } from 'react-router'
import { MbtiType } from 'src/model/MbtiType.ts'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import React, { useCallback, useMemo } from 'react'
import { MbtiTypeData } from 'src/ui-data/special/mbti/MbtiTypeData.ts'
import { WidgetStyleCommon } from 'src/ui-data/style/WidgetStyleCommon.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import { CardS } from 'src/ui/0-elements/Card/CardS.ts'
import ModalDialog from 'src/ui/1-widgets/modals/ModalDialog/ModalDialog.tsx'
import PersonalityCompatibility
  from 'src/ui/2-pages/Profile/Tests/parts/PersonalityCompatibility.tsx'
import PageContentLayout from 'src/ui/components/Pages/PageContentLayout.tsx'
import {
  useOverlayUrl
} from 'src/ui/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import Card from 'src/ui/0-elements/Card/Card.tsx'
import ProfilePageTabHeader from 'src/ui/2-pages/Profile/ProfilePageTabHeader.tsx'
import { ProfilePageValidation } from 'src/ui/2-pages/Profile/validation.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { TypeU } from 'src/util/common/TypeU.ts'
import { useFormData } from 'src/mini-libs/form-data/hooks/useFormData.ts'
import { FormProps } from 'src/mini-libs/form-data/hooks/useFormDerivedData.ts'
import { ActionUiText } from 'src/ui-data/translations/ActionUiText.ts'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import col = EmotionCommon.col
import FormValues = ProfilePageValidation.FormValues
import Callback1 = TypeU.Callback1
import Callback = TypeU.Callback
import row = EmotionCommon.row
import Txt = EmotionCommon.Txt
import pinkHeartWithExclamation from 'src/res/im/ic/pink-heart-with-exclamation.svg'
import manWithHugeHeart from 'src/res/im/ic/man-with-huge-heart.svg'
import { useMbtiZustand } from 'src/zustand/mbti/MbtiZustand.ts'
import colC = EmotionCommon.colC
import flexC = WidgetStyleCommon.flexC
import gridStackC = EmotionCommon.gridStackC
import RootRoute = AppRoutes.RootRoute
import fullAnySearchParams = RouteBuilder.fullAnySearchParams
import { Hdrs } from 'ui/0-elements/basic-elements/Hdrs'
import card2S = CardS.card2S
import ObjectEntries = ObjectU.ObjectEntries



const ResetMbtiTestOverlayName = 'resetMbtiTest'



export type TestsProps = {
  formFieldWrapProps: ReturnType<typeof useFormData<FormValues>>['formFieldWrapProps']
  onFormSubmitCallback: Callback1<React.FormEvent>
  submit: Callback
  canSubmit: boolean
  formProps: FormProps
  isLoading: boolean
  tabIdx: number
}


const Tests = React.memo((props: TestsProps) => {
  
  const setMbti = useMbtiZustand.setState
  const testState = useMbtiZustand(s => s.getTestState())
  const mbtiType = useMbtiZustand(s => s.getMbtiType())
  const mbtiData = MbtiTypeData[mbtiType ?? 'INTP']
  
  
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
    changeAnswers: 'Изменить ответы',
    startTheTestAgain: 'Начать тест заново',
    resetTestAndStartAgain: 'Удалить результаты текущего тестирования и начать заново?',
  }), [mbtiTypeUiText])
  
  
  const color = mbtiData.color
  
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  
  const resetMbtiTestDialog = useOverlayUrl(ResetMbtiTestOverlayName)
  const resetTestAndStartAgain = useCallback(() => {
    setMbti({ answers: [] })
    resetMbtiTestDialog.closeWithAction(() => {
      navigate(RootRoute.test.mbti[fullAnySearchParams](searchParams))
    })
  }, [])
  
  
  return (
    <>
      <PageContentLayout colSm styleInner={{ gap: 30 }}>
          
        <ProfilePageTabHeader mainTabI={props.tabIdx}/>
        
        <div css={[col, { gap: 25 }]}>
        
      
          <Card css={thisTestHelpsYouRealizeCardS}>
            <PinkHeartWithExclamationBox>
              <img
                src={pinkHeartWithExclamation}
                alt='Pink heart with exclamation mark'
                style={{ height: 34 }}
              />
            </PinkHeartWithExclamationBox>
            
            <InfoCardText>
              {uiText.thisTestHelpsYouRealizeYourPreferences}
            </InfoCardText>
          </Card>
          
          
          <Hdrs.PageSec>{uiText.yourPersonalityType}</Hdrs.PageSec>
          
          
          {!mbtiType && (
            <Card css={cardS}>
              <ManWithHugeHeart
                src={manWithHugeHeart}
                alt='Man with huge heart'
              />
              
              <InfoCardTextCenter>
                {uiText.yourPersonalityTypeIsUnknown}
              </InfoCardTextCenter>
            </Card>
          )}
          
          {mbtiType && (
            <>
              <Card css={yourPersonalityTypeCardS}>
                
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
              
              </Card>
              
              <ShortDescription>{mbtiTypeUiText.shortDescription}</ShortDescription>
            </>
          )}
          
          {testState === 'idle' && (
            <Link to={RootRoute.test.mbti[fullAnySearchParams](searchParams)}>
              <Button
                css={ButtonS6.t(ButtonS6.S.filled.rect.lg.accent)}
              >
                {uiText.takeTheTest}
              </Button>
            </Link>
          )}
          {testState === 'paused' && (
            <div css={css`${col}; gap: 15px;`}>
              <Link to={RootRoute.test.mbti[fullAnySearchParams](searchParams)}>
                <Button
                  css={ButtonS6.t(ButtonS6.S.filled.rect.lg.accent)}
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
                compatibility='high'
                compatibles={mbtiData.highCompatibility}
              />
              <PersonalityCompatibility
                compatibility='medium'
                compatibles={mbtiData.mediumCompatibility}
              />
              {/* <PersonalityCompatibility
                compatibility="low"
                compatibles={['INTJ', 'ENTP', 'ISFP']}
                percent="55-25%"
              /> */}
            </div>
          )}
          
          <MiniTypesBox>
            {ObjectEntries(MbtiTypeData).map(([type, data]) => (
              <TypeComponent key={type} type={type}/>
            ))}
          </MiniTypesBox>
          
          {testState === 'completed' && (
            <>
              <Link to={RootRoute.test.mbti[fullAnySearchParams](searchParams)}>
                <Button
                  css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal3)}
                >
                  {uiText.changeAnswers}
                </Button>
              </Link>
              <Button
                css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal3)}
                onClick={resetMbtiTestDialog.open}
              >
                {uiText.startTheTestAgain}
              </Button>
            </>
          )}
          
        </div>
        
      </PageContentLayout>
      
      
      <ModalDialog
        isOpen={resetMbtiTestDialog.isOpen}
        title={uiText.resetTestAndStartAgain}
        onModal={resetMbtiTestDialog.close}
        onBack={resetMbtiTestDialog.close}
        onDangerYes={resetTestAndStartAgain}
      />
      
      
      {/* <LeftBottomButtonBar>
        <Button
          css={IconButtonS6.t(IconButtonS6.S.trans.round.lg.secondary)}
          onClick={() => {
          
          }}
        >
          <GearIc/>
        </Button>
      </LeftBottomButtonBar> */}
    </>
  )
})
export default Tests




const cardS = css`
  padding: 23px 16px;
  ${colC};
  gap: 28px;
`

const InfoCardText = styled.div`
  ${Txt.s13};
  color: ${p => p.theme.boxSecondary4.ct};
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


const ManWithHugeHeart = styled.img`
  width: 86%;
`


const yourPersonalityTypeCardS = (t: AppTheme.Theme) => css`
  padding: 0;
  ${colC};
  ${gridStackC};
  gap: 5px;
  background-color: ${t.boxWhite.bg};
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
  ${Txt.s36Bold};
`
const PersonalityTypeName = styled.div`
  ${Txt.s24Bold};
`

const ShortDescription = styled.div`
  ${Txt.s17Bold};
`




const MiniTypesBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px 22px;
`

const MiniTypeCard = styled(Card)`
  ${p => card2S(p.theme)};
  padding: 8px;
  background-color: ${p => p.theme.boxWhite.bg};
  color: ${p => p.theme.boxWhite.ct2};
  ${colC};
  gap: 0;
`
const MiniTypeCode = styled.div`
  ${Txt.s22Bold};
`
const MiniTypeName = styled.div`
  ${Txt.s17Bold};
`
const MiniTypePicture = styled.img`
  height: 79px;
  width: auto;
`
const MiniTypeDescription = styled.div`
  ${Txt.s11Bold};
  text-align: center;
  line-height: 1.18;
`

type TypeComponentProps = { type: MbtiType }
const TypeComponent = React.memo(({ type }: TypeComponentProps) => {
  const uiText = useUiValues(MbtiTypeData[type].uiText)
  
  return (
    <MiniTypeCard>
      
      <MiniTypeCode style={{ color: MbtiTypeData[type].color }}>
        {type}
      </MiniTypeCode>
      <MiniTypeName style={{ color: MbtiTypeData[type].color }}>
        {uiText.name}
      </MiniTypeName>
      
      <div style={{ height: 9 }}/>
      
      <MiniTypePicture src={MbtiTypeData[type].icon}/>
      
      <div style={{ height: 7 }}/>
      
      <MiniTypeDescription>
        {uiText.shortDescription}
      </MiniTypeDescription>
      
    </MiniTypeCard>
  )
})
