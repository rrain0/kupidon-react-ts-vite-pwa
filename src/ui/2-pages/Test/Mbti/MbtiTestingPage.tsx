import { css } from '@emotion/react'
import styled from '@emotion/styled'
import spendingTimeGuitar from '@im/picture/spending-time--guitar.png'
import { TypeU } from '@util/common/TypeU.ts'
import { useEvent } from '@util/react/useEvent.ts'
import { useElemRefGetSet } from '@util/view/useElemRefGetSet.ts'
import React, { useMemo, useState } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil.ts'
import { MbtiRecoil, MbtiRecoilComputed } from 'src/recoil/state/MbtiRecoil.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { MbtiUiText } from 'src/ui-data/translations/MbtiUiText.ts'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import { IconButtonS6 } from 'src/ui/0-elements/buttons/IconButton/IconButtonS6.ts'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import { CardTitleNormal } from 'src/ui/2-pages/Profile/parts/CardTitle.tsx'
import Txt = EmotionCommon.Txt
import row = EmotionCommon.row
import rowWrap = EmotionCommon.rowWrap
import rowC = EmotionCommon.rowC
import col = EmotionCommon.col
import { Pages } from 'ui/components/Pages/Pages'
import exists = TypeU.exists
import flexC = EmotionCommon.flexC
import RootRoute = AppRoutes.RootRoute
import use = RouteBuilder.use
import fullAnySearchParams = RouteBuilder.fullAnySearchParams
import gridC = EmotionCommon.gridC
import ArrowAngledRoundedIc = SvgIconsPack.ArrowAngledRoundedIc



const MbtiTestingPage = React.memo(() => {
  
  const mbtiUiText = useUiValues(MbtiUiText)
  
  const uiText = useMemo(() => {
    return {
      question: 'Вопрос',
      questions: [
        {
          q: mbtiUiText.question1,
          a: mbtiUiText.question1AnswerA,
          b: mbtiUiText.question1AnswerB,
        },
        {
          q: mbtiUiText.question2,
          a: mbtiUiText.question2AnswerA,
          b: mbtiUiText.question2AnswerB,
        },
        {
          q: mbtiUiText.question3,
          a: mbtiUiText.question3AnswerA,
          b: mbtiUiText.question3AnswerB,
        },
        {
          q: mbtiUiText.question4,
          a: mbtiUiText.question4AnswerA,
          b: mbtiUiText.question4AnswerB,
        },
        {
          q: mbtiUiText.question5,
          a: mbtiUiText.question5AnswerA,
          b: mbtiUiText.question5AnswerB,
        },
        {
          q: mbtiUiText.question6,
          a: mbtiUiText.question6AnswerA,
          b: mbtiUiText.question6AnswerB,
        },
        {
          q: mbtiUiText.question7,
          a: mbtiUiText.question7AnswerA,
          b: mbtiUiText.question7AnswerB,
        },
        {
          q: mbtiUiText.question8,
          a: mbtiUiText.question8AnswerA,
          b: mbtiUiText.question8AnswerB,
        },
        {
          q: mbtiUiText.question9,
          a: mbtiUiText.question9AnswerA,
          b: mbtiUiText.question9AnswerB,
        },
        {
          q: mbtiUiText.question10,
          a: mbtiUiText.question10AnswerA,
          b: mbtiUiText.question10AnswerB,
        },
        {
          q: mbtiUiText.question11,
          a: mbtiUiText.question11AnswerA,
          b: mbtiUiText.question11AnswerB,
        },
        {
          q: mbtiUiText.question12,
          a: mbtiUiText.question12AnswerA,
          b: mbtiUiText.question12AnswerB,
        },
        {
          q: mbtiUiText.question13,
          a: mbtiUiText.question13AnswerA,
          b: mbtiUiText.question13AnswerB,
        },
        {
          q: mbtiUiText.question14,
          a: mbtiUiText.question14AnswerA,
          b: mbtiUiText.question14AnswerB,
        },
        {
          q: mbtiUiText.question15,
          a: mbtiUiText.question15AnswerA,
          b: mbtiUiText.question15AnswerB,
        },
        {
          q: mbtiUiText.question16,
          a: mbtiUiText.question16AnswerA,
          b: mbtiUiText.question16AnswerB,
        },
        {
          q: mbtiUiText.question17,
          a: mbtiUiText.question17AnswerA,
          b: mbtiUiText.question17AnswerB,
        },
        {
          q: mbtiUiText.question18,
          a: mbtiUiText.question18AnswerA,
          b: mbtiUiText.question18AnswerB,
        },
        {
          q: mbtiUiText.question19,
          a: mbtiUiText.question19AnswerA,
          b: mbtiUiText.question19AnswerB,
        },
        {
          q: mbtiUiText.question20,
          a: mbtiUiText.question20AnswerA,
          b: mbtiUiText.question20AnswerB,
        },
      ],
    }
  }, [mbtiUiText])
  
  const setMbti = useSetRecoilState(MbtiRecoil)
  const { firstUnanswered, testState } = useRecoilValue(MbtiRecoilComputed)
  
  
  const [displayedQuestion, setDisplayedQuestion] = useState(firstUnanswered)
  
  const [getQuestionTitle, , questionTitleRef] = useElemRefGetSet()
  
  useEvent(() => {
    let stale = false
    const ms = 200
    setTimeout(() => {
      if (!stale) setDisplayedQuestion(firstUnanswered)
    }, ms)
    const el = getQuestionTitle()
    if (el) {
      el.style.transition = 'none'
      el.style.transform = 'translateX(0)'
      el.style.opacity = '1'
      requestAnimationFrame(() => {
        if (stale) return
        el.style.transition = `transform ${ms}ms ease-out, opacity ${ms}ms ease-out`
        el.style.transform = 'translateX(-100px)'
        el.style.opacity = '0'
        el.ontransitionend = () => requestAnimationFrame(() => {
          if (stale) return
          el.ontransitionend = null
          setDisplayedQuestion(firstUnanswered)
          el.style.transition = 'none'
          el.style.transform = 'translateX(100px)'
          el.style.opacity = '0'
          requestAnimationFrame(() => {
            if (stale) return
            el.style.transition = `transform ${ms}ms ease-in, opacity ${ms}ms ease-in`
            el.style.transform = 'translateX(0)'
            el.style.opacity = '1'
          })
        })
      })
    }
    return () => { stale = true }
  }, [firstUnanswered], false)
  
  const authUserId = useRecoilValue(AuthRecoil)!.user.id
  const [searchParams] = useSearchParams()
  
  return (
    <>
      {testState == 'completed' && (
        <Navigate
          to={RootRoute.profile.id.userId[use](authUserId)
            .tests[fullAnySearchParams](searchParams)
          }
          replace
        />
      )}
      
      {testState !== 'completed' && (
        <Pages.SafeInsets>
          <Pages.Content css={css`gap: 30px;`}>
            {exists(displayedQuestion) && (
              <div
                data-display-name="MbtiPage"
                css={css`${col}`}
              >
                
                <QuestionNumberBox>
                  <Button
                    css={IconButtonS6.t(IconButtonS6.S.filled.round.lg.normal2)}
                  >
                    <ArrowAngledRoundedIc />
                  </Button>
                  <QuestionNumber>
                    {displayedQuestion + 1} {uiText.question.toLowerCase()}
                  </QuestionNumber>
                  <Button
                    css={IconButtonS6.t(IconButtonS6.S.filled.round.lg.normal2)}
                  >
                    <ArrowAngledRoundedIc />
                  </Button>
                </QuestionNumberBox>
                
                <div style={{ height: 26 }} />
                
                <Picture src={spendingTimeGuitar} />
                
                <div style={{ height: 6 }} />
                
                <QuestionTitleBox>
                  <QuestionTitle ref={questionTitleRef}>
                    {uiText.questions[displayedQuestion].q}
                  </QuestionTitle>
                </QuestionTitleBox>
                
                <Button
                  css={ButtonS6.t(answerV1)}
                  onClick={() => setMbti(prev => {
                    const a = [...prev.answers]
                    a[displayedQuestion] = 0
                    return { ...prev, answers: a }
                  })}
                >
                  {uiText.questions[displayedQuestion].a}
                </Button>
                
                <div style={{ height: 20 }} />
                
                <Button
                  css={ButtonS6.t(answerV2)}
                  onClick={() => setMbti(prev => {
                    const a = [...prev.answers]
                    a[displayedQuestion] = 1
                    return { ...prev, answers: a }
                  })}
                >
                  {uiText.questions[displayedQuestion].b}
                </Button>
              
              </div>
            )}
          </Pages.Content>
        </Pages.SafeInsets>
      )}
      
    </>
  )
})
MbtiTestingPage.displayName = 'MbtiPage'
export default MbtiTestingPage




const QuestionNumberBox = styled.div`
  ${gridC};
  grid-template-columns: auto 1fr auto;
`
const QuestionNumber = styled.div`
  ${gridC};
  // TODO Theme
  color: #000000;
  ${Txt.lg20bold};
`


const Picture = styled.img`
  width: 100%;
  height: auto;
  aspect-ratio: 1.645;
  border-radius: 15px;
  object-position: center;
  object-fit: cover;
`


const QuestionTitleBox = styled.div`
  height: 92px;
  ${flexC};
`
const QuestionTitle = styled(CardTitleNormal)`
  ${Txt.s20bold2};
`

const answerV1: AppWidgetStyle = [ButtonS6.S.filled.rect.lg.main, {
  buttonBgColor: '#229EDC',
  buttonColor: '#FFFFFF',
  inFocus: {
    buttonBgColor: '#21b4fe',
    buttonColor: '#FFFFFF',
  },
}]
const answerV2: AppWidgetStyle = [ButtonS6.S.filled.rect.lg.main, {
  buttonBgColor: '#AD28CE',
  buttonColor: '#FFFFFF',
  inFocus: {
    buttonBgColor: '#d137f8',
    buttonColor: '#FFFFFF',
  },
}]


const Title = styled.div`
  ${Txt.lg16Bold};
`

const List = styled.div`
  ${row};
  gap: 15px;
`

const Types = styled.div`
  ${rowWrap};
  flex: 1;
  gap: 15px;
`
const TypeBox = styled.div`
  min-height: 30px;
  background-color: #ffffff;
  border-radius: 999999px;
  padding: 5.5px 18px;
  ${rowC};
`
const TypeContent = styled.div`
  color: #171717;
  ${Txt.lg16Bold};
  
`

const Percent = styled.div`
  color: #171717;
  ${Txt.s15Bold};
`

