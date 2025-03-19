import { css } from '@emotion/react'
import styled from '@emotion/styled'
import spendingTimeGuitar from '@im/picture/spending-time--guitar.png'
import { MathU } from '@util/common/MathU.ts'
import { RangeU } from '@util/common/RangeU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { useEvent } from '@util/react/useEvent.ts'
import { useElemRefGetSet } from '@util/view/useElemRefGetSet.ts'
import React, { useMemo, useState } from 'react'
import { Link, Navigate, useSearchParams } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { MbtiUiText } from 'src/ui-data/translations/MbtiUiText.ts'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import { IconButtonS6 } from 'src/ui/0-elements/buttons/IconButton/IconButtonS6.ts'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import ImgSpark from 'src/ui/0-elements/ImgSpark/ImgSpark.tsx'
import { ImgSparkS6 } from 'src/ui/0-elements/ImgSpark/ImgSparkS6.ts'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar.tsx'
import { useAuthZustand } from 'src/zustand/auth/AuthZustand.ts'
import { useMbtiZustand } from 'src/zustand/mbti/MbtiZustand.ts'
import Txt = EmotionCommon.Txt
import row = EmotionCommon.row
import col = EmotionCommon.col
import { Pages } from 'ui/components/Pages/Pages'
import exists = TypeU.exists
import flexC = EmotionCommon.flexC
import RootRoute = AppRoutes.RootRoute
import use = RouteBuilder.use
import fullAnySearchParams = RouteBuilder.fullAnySearchParams
import gridC = EmotionCommon.gridC
import ArrowAngledRoundedIc = SvgIconsPack.ArrowAngledRoundedIc
import attrExists = TypeU.attrExists
import notExists = TypeU.notExists
import round1 = MathU.round1
import resetH = EmotionCommon.resetH
import rowE = EmotionCommon.rowE



const transitionTime = 200


const MbtiTestingPage = React.memo(() => {
  
  const mbtiUiText = useUiValues(MbtiUiText)
  
  const uiText = useMemo(() => {
    return {
      saveAndExit: 'Сохранить и выйти',
      needAnswerHonestly: 'Важно отвечать на вопросы честно, выбрав тот вариант, который лучше всего описывает вас',
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
  
  const setMbti = useMbtiZustand.setState
  const answers = useMbtiZustand(s => s.answers)
  const totalCnt = useMbtiZustand(s => s.totalCnt)
  const testState = useMbtiZustand(s => s.getTestState())
  const cntUnanswered = useMbtiZustand(s => s.getCntUnanswered())
  
  const [goBackAfterCompletion] = useState(testState !== 'completed')
  
  const progress = round1((1 - cntUnanswered / totalCnt) * 100)
  
  
  const getNext = (answers: (null | number)[], since: number = 0) => {
    let first: number | undefined
    let firstSince: number | undefined
    for (let i = 0; i < totalCnt; i++) {
      const ai = answers[i]
      if (notExists(ai)) {
        if (notExists(first)) first = i
        if (notExists(firstSince) && i >= since) firstSince = i
      }
    }
    if (exists(firstSince)) return firstSince
    if (exists(first)) return first
    return RangeU.loop(since, [0, totalCnt])
  }
  
  const [transition, setTransition] = useState(null as null | 'fwd' | 'back')
  const [curr, setCurr] = useState(() => getNext(
    answers, testState === 'completed' ? totalCnt - 1 : 0
  ))
  const [displayed, setDisplayed] = useState(curr)
  
  const setNext = (next: number) => {
    if (next > curr) {
      setCurr(next)
      setTransition('fwd')
    }
    else if (next < curr) {
      setCurr(next)
      setTransition('back')
    }
    else setTransition(null)
  }
  
  const fwd = () => {
    const next = RangeU.loop(curr + 1, [0, totalCnt])
    setNext(next)
  }
  
  const back = () => {
    const next = RangeU.loop(curr - 1, [0, totalCnt])
    setNext(next)
  }
  
  const next = (answers: (null | number)[]) => {
    setMbti(prev => ({ ...prev, answers }))
    const next = getNext(answers, curr + 1)
    setNext(next)
  }
  
  const answerA = () => {
    const newAnswers = [...answers]
    newAnswers[curr] = 0
    next(newAnswers)
  }
  const answerB = () => {
    const newAnswers = [...answers]
    newAnswers[curr] = 1
    next(newAnswers)
  }
  
  
  const [getQuestionTitle, , questionTitleRef] = useElemRefGetSet()
  
  useEvent(() => {
    let stale = false
    setTimeout(() => {
      if (!stale) setDisplayed(curr)
    }, transitionTime)
    const el = getQuestionTitle()
    if (el && transition) {
      el.style.transition = 'none'
      el.style.transform = 'translateX(0)'
      el.style.opacity = '1'
      requestAnimationFrame(() => {
        if (stale) return
        el.style.transition =
          `transform ${transitionTime}ms ease-out, opacity ${transitionTime}ms ease-out`
        el.style.transform =
          `translateX(${transition === 'fwd' ? '-' : ''}100px)`
        el.style.opacity = '0'
        el.ontransitionend = () => requestAnimationFrame(() => {
          if (stale) return
          el.ontransitionend = null
          setDisplayed(curr)
          el.style.transition = 'none'
          el.style.transform =
            `translateX(${transition === 'fwd' ? '' : '-'}100px)`
          el.style.opacity = '0'
          requestAnimationFrame(() => {
            if (stale) return
            el.style.transition =
              `transform ${transitionTime}ms ease-in, opacity ${transitionTime}ms ease-in`
            el.style.transform = 'translateX(0)'
            el.style.opacity = '1'
            setTransition(null)
          })
        })
      })
    }
    return () => {
      stale = true
      setDisplayed(curr)
    }
  }, [curr], false)
  
  
  
  const authUserId = useAuthZustand(s => s!.user.id)
  const [searchParams] = useSearchParams()
  
  return (
    <>
      {testState == 'completed' && goBackAfterCompletion && (
        <Navigate
          to={RootRoute.profile.id.userId[use](authUserId)
            .tests[fullAnySearchParams](searchParams)
          }
          replace
        />
      )}
    
      <Pages.PageGrad>
        <Pages.AddSafeInsets>
          <Pages.ContentColSm css={css`gap: 30px;`}>
            {exists(displayed) && (
              <div
                data-display-name="MbtiPage"
                css={css`${col}`}
              >
                
                <InfoText>
                  {uiText.needAnswerHonestly}
                </InfoText>
                
                <div style={{ height: 18 }} />
                
                <ProgressBox>
                  <LineProgressFrame>
                    <LineProgress style={{ width: `${progress}%` }} />
                  </LineProgressFrame>
                  <LinePercent>{progress}%</LinePercent>
                </ProgressBox>
                
                <div style={{ height: 36 }} />
                
                <QuestionNumberBox>
                  <Button
                    css={IconButtonS6.t(backS)}
                    onClick={back}
                  >
                    <ArrowAngledRoundedIc />
                  </Button>
                  <QuestionNumber>
                    {displayed + 1} {uiText.question.toLowerCase()}
                  </QuestionNumber>
                  <Button
                    css={IconButtonS6.t(IconButtonS6.S.filled.round.lg.normal4)}
                    onClick={fwd}
                  >
                    <ArrowAngledRoundedIc />
                  </Button>
                </QuestionNumberBox>
                
                <div style={{ height: 26 }} />
                
                <ImgSpark
                  css={ImgSparkS6.t(pictureS)}
                  src={spendingTimeGuitar}
                />
                
                <QuestionTitleBox>
                  <QuestionTitle ref={questionTitleRef}>
                    {uiText.questions[displayed].q}
                  </QuestionTitle>
                </QuestionTitleBox>
                
                <Button
                  css={ButtonS6.t(answerAS)}
                  data-selected={attrExists(answers[displayed] === 0)}
                  disabled={curr !== displayed}
                  data-locked={attrExists(curr !== displayed)}
                  onClick={answerA}
                >
                  {uiText.questions[displayed].a}
                </Button>
                
                <div style={{ height: 20 }} />
                
                <Button
                  css={ButtonS6.t(answerBS)}
                  data-selected={attrExists(answers[displayed] === 1)}
                  disabled={curr !== displayed}
                  data-locked={attrExists(curr !== displayed)}
                  onClick={answerB}
                >
                  {uiText.questions[displayed].b}
                </Button>
                
                <div style={{ height: 28 }} />
                
                <div css={rowE}>
                  <Link
                    to={RootRoute.profile.id.userId[use](authUserId)
                      .tests[fullAnySearchParams](searchParams)
                    }
                  >
                    <Button
                      css={ButtonS6.t(ButtonS6.S.filled.rounded.sm.danger)}
                    >
                      {uiText.saveAndExit}
                    </Button>
                  </Link>
                </div>
              
              
              </div>
            )}
          </Pages.ContentColSm>
        </Pages.AddSafeInsets>
      </Pages.PageGrad>
      
      <BottomButtonBar settingsBtnLeft />
    </>
  )
})
MbtiTestingPage.displayName = 'MbtiPage'
export default MbtiTestingPage




const InfoText = styled.div`
  ${Txt.s17};
  color: ${p => p.theme.page.ctSec};
  text-align: center;
`



const ProgressBox = styled.div`
  grid-area: prog;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
  align-items: center;
`
const LineProgressFrame = styled.div`
  width: 100%;
  height: 8px;
  border-radius: 999999px;
  ${row};
  background-color: ${p => p.theme.boxSecondary.bg};
`
const LineProgress = styled.div`
  width: 0;
  height: 100%;
  border-radius: inherit;
  transition: width ${transitionTime}ms ease-in-out;
  background-color: ${p => p.theme.boxSecondary.ct};
`
const LinePercent = styled.div`
  ${Txt.s24Bold};
  color: ${p => p.theme.page.ct2};
`




const QuestionNumberBox = styled.div`
  ${gridC};
  grid-template-columns: auto 1fr auto;
`
const backS: AppWidgetStyle = [IconButtonS6.S.filled.round.lg.normal4, {
  iconRotate: '0.5turn',
}]
const QuestionNumber = styled.h5`
  ${resetH};
  ${gridC};
  ${Txt.s20Bold};
`


const pictureS: AppWidgetStyle = t => [ImgSparkS6.S.img.img.auto.normal, {
  imgFrame: { w: 'full', h: 'auto', ratio: 1.645, r: 15 },
}]


const QuestionTitleBox = styled.div`
  height: 92px;
  ${flexC};
`
const QuestionTitle = styled.h5`
  ${resetH};
  text-align: center;
  ${Txt.s20Bold600};
`

const answerAS: AppWidgetStyle = [ButtonS6.S.filled.rect.lg.main, {
  //buttonBgColor: '#46b9f2',
  buttonBgColor: '#229EDC',
  buttonColor: '#FFFFFF',
  selected: {
    buttonOutline: '3px solid #229EDC',
    buttonOutlineOffset: '3px',
  },
  inFocus: {
    buttonBgColor: '#229EDC',
    buttonColor: '#FFFFFF',
  },
  locked: {
    buttonBgColor: '#229EDC',
    buttonColor: '#FFFFFF',
  },
}]
const answerBS: AppWidgetStyle = [ButtonS6.S.filled.rect.lg.main, {
  //buttonBgColor: '#c845e9',
  buttonBgColor: '#AD28CE',
  buttonColor: '#FFFFFF',
  selected: {
    buttonOutline: '3px solid #AD28CE',
    buttonOutlineOffset: '3px',
  },
  inFocus: {
    buttonBgColor: '#AD28CE',
    buttonColor: '#FFFFFF',
  },
  locked: {
    buttonBgColor: '#AD28CE',
    buttonColor: '#FFFFFF',
  },
}]





