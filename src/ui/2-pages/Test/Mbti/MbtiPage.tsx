import { css } from '@emotion/react'
import styled from '@emotion/styled'
import spendingTimeGuitar from '@im/picture/spending-time--guitar.png'
import { TypeU } from '@util/common/TypeU.ts'
import { useEvent } from '@util/react/useEvent.ts'
import { useElemRefGetSet } from '@util/view/useElemRefGetSet.ts'
import React, { useEffect, useMemo, useState } from 'react'
import { useRecoilState } from 'recoil'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { TestMbtiRecoil } from 'src/recoil/state/TestMbtiRecoil.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { MbtiUiValues } from 'src/ui-data/translations/MbtiUiValues.ts'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import { CardTitleNormal } from 'src/ui/2-pages/Profile/parts/CardTitle.tsx'
import Txt = EmotionCommon.Txt
import row = EmotionCommon.row
import rowWrap = EmotionCommon.rowWrap
import rowC = EmotionCommon.rowC
import col = EmotionCommon.col
import { Pages } from 'ui/components/Pages/Pages'
import exists = TypeU.exists
import notExists = TypeU.notExists
import flexC = EmotionCommon.flexC



const MbtiPage = React.memo(() => {
  
  const mbtiUiText = useUiValues(MbtiUiValues)
  
  const uiText = useMemo(() => {
    return {
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
  
  const [mbti, setMbti] = useRecoilState(TestMbtiRecoil)
  
  const firstUnansweredQuestion = useMemo(() => {
    const a = mbti.answers
    for (let i = 0; i < 20; i++) {
      if (notExists(a[i])) return i
    }
    return undefined
  }, [mbti.answers])
  
  const [displayedQuestion, setDisplayedQuestion] = useState(firstUnansweredQuestion)
  
  const [getQuestionTitle, , questionTitleRef] = useElemRefGetSet()
  
  useEvent(() => {
    const el = getQuestionTitle()
    if (el) {
      el.style.transition = 'none'
      el.style.transform = 'translateX(0)'
      el.style.opacity = '1'
      requestAnimationFrame(() => {
        el.style.transition = 'transform 200ms ease-out, opacity 200ms ease-out'
        el.style.transform = 'translateX(-100px)'
        el.style.opacity = '0'
        el.ontransitionend = () => requestAnimationFrame(() => {
          setDisplayedQuestion(firstUnansweredQuestion)
          el.ontransitionend = null
          el.style.transition = 'none'
          el.style.transform = 'translateX(100px)'
          el.style.opacity = '0'
          requestAnimationFrame(() => {
            el.style.transition = 'transform 200ms ease-in, opacity 200ms ease-in'
            el.style.transform = 'translateX(0)'
            el.style.opacity = '1'
          })
        })
      })
    } else {
      setDisplayedQuestion(firstUnansweredQuestion)
    }
  }, [firstUnansweredQuestion], false)
  
  
  return (
    <>
      <Pages.SafeInsets>
        <Pages.Content css={css`gap: 30px;`}>
          {exists(displayedQuestion) && (
            <div
              data-display-name="MbtiPage"
              css={css`${col}`}
            >
              
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
    </>
  )
})
MbtiPage.displayName = 'MbtiPage'
export default MbtiPage



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

