import styled from '@emotion/styled'
import spendingTimeGuitar from '@im/picture/spending-time--guitar.png'
import { MathU } from '@utils/base/MathU.ts'
import { RangeU } from '@utils/base/RangeU.ts'
import { TypeU } from '@utils/base/TypeU.ts'
import { useElemRefGetSet } from '@utils/view/useElemRefGetSet.ts'
import React, { useEffect, useMemo, useState } from 'react'
import { AppRoutes } from 'src/configs/AppRoutes.ts'
import { RouteBuilder } from '@libs/route-builder/RouteBuilder.tsx'
import { useUiValues } from '@libs/ui-text/useUiText.ts'
import { AppWidgetStyle } from '@libs/widget-style-6/WidgetStyle.ts'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import { MbtiUiText } from 'src/locales/translations/MbtiUiText.ts'
import Flex from 'src/components/elems/basic-elements/Flex.tsx'
import Button from 'src/components/elems/buttons/Button/Button.tsx'
import { ButtonS6 } from 'src/components/elems/buttons/Button/ButtonS6.ts'
import { IconButtonS6 } from 'src/components/elems/buttons/IconButton/IconButtonS6.ts'
import ImgSpark from 'src/components/elems/ImgSpark/ImgSpark.tsx'
import { ImgSparkS6 } from 'src/components/elems/ImgSpark/ImgSparkS6.ts'
import AppLink from 'src/components/components/app-router/AppLink.tsx'
import AppNavigate from 'src/components/components/app-router/AppNavigate.tsx'
import PageContentLayout from 'src/components/components/page/PageContentLayout.tsx'
import PageLayout from 'src/components/components/page/PageLayout.tsx'
import BottomFloatingBar from 'src/components/components/screen-bars/BottomFloatingBar.tsx'
import { useAuthZustand } from 'src/zustand/auth/AuthZustand.ts'
import { useMbtiZustand } from 'src/zustand/mbti/MbtiZustand.ts'
import Txt = EmotionCommon.Txt
import row = EmotionCommon.row
import flexC = EmotionCommon.flexC
import RootRoute = AppRoutes.RootRoute
import use = RouteBuilder.use
import gridC = EmotionCommon.gridC
import ArrowAngledRoundedIc from 'src/components/elems/icons/SvgIcons/pack/ui/ArrowAngledRoundedIc.tsx'
import toEmptyAttr = TypeU.toEmptyAttr
import rf1 = MathU.rf1
import resetH = EmotionCommon.resetH
import isdef = TypeU.isdef
import isnull = TypeU.isnull
import isundef = TypeU.isundef
import Setter = TypeU.Setter



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
  
  const progress = rf1((1 - cntUnanswered / totalCnt) * 100)
  
  
  const getNext = (answers: (null | number)[], since: number = 0) => {
    let first: number | undefined
    let firstSince: number | undefined
    for (let i = 0; i < totalCnt; i++) {
      const ai = answers[i]
      if (isnull(ai)) {
        if (isundef(first)) first = i
        if (isundef(firstSince) && i >= since) firstSince = i
      }
    }
    if (isdef(firstSince)) return firstSince
    if (isdef(first)) return first
    return RangeU.loop(since, [0, totalCnt])
  }
  
  const [curr, setCurr] = useState(() => getNext(
    answers, testState === 'completed' ? totalCnt - 1 : 0
  ))
  const [displayed, setDisplayed] = useState(curr)
  
  const { setTransition, setElem: setQuestionTitle } = useShiftAnimation(curr, setDisplayed)
  
  const setNext = (next: number) => {
    if (next > curr) {
      setCurr(next)
      setTransition({ v: 'fwd' })
    }
    else if (next < curr) {
      setCurr(next)
      setTransition({ v: 'back' })
    }
    else setTransition({ v: undefined })
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
  
  
  
  const authUserId = useAuthZustand(s => s.user!.id)
  
  return (
    <>
      {testState == 'completed' && goBackAfterCompletion && (
        <AppNavigate
          toFull={RootRoute.profile.id.userId[use](authUserId).tab.tests}
          replace
        />
      )}
      
      <PageLayout col data-display-name='MbtiPage'>
        <PageContentLayout colSm grow>
          <Flex col g={30}>
            {isdef(displayed) && (
              <Flex col>
                
                <InfoText>
                  {uiText.needAnswerHonestly}
                </InfoText>
                
                <div style={{ height: 18 }}/>
                
                <ProgressBox>
                  <LineProgressFrame>
                    <LineProgress style={{ width: `${progress}%` }}/>
                  </LineProgressFrame>
                  <LinePercent>{progress}%</LinePercent>
                </ProgressBox>
                
                <div style={{ height: 36 }}/>
                
                <QuestionNumberBox>
                  <Button
                    css={IconButtonS6.t(backS)}
                    onClick={back}
                  >
                    <ArrowAngledRoundedIc/>
                  </Button>
                  <QuestionNumber>
                    {displayed + 1} {uiText.question.toLowerCase()}
                  </QuestionNumber>
                  <Button
                    css={IconButtonS6.t(IconButtonS6.S.filled.round.lg.normal4)}
                    onClick={fwd}
                  >
                    <ArrowAngledRoundedIc/>
                  </Button>
                </QuestionNumberBox>
                
                <div style={{ height: 26 }}/>
                
                <ImgSpark
                  css={ImgSparkS6.t(pictureS)}
                  src={spendingTimeGuitar}
                />
                
                <QuestionTitleBox>
                  <QuestionTitle ref={setQuestionTitle}>
                    {uiText.questions[displayed].q}
                  </QuestionTitle>
                </QuestionTitleBox>
                
                <Button
                  css={ButtonS6.t(answerAS)}
                  data-selected={toEmptyAttr(answers[displayed] === 0)}
                  disabled={curr !== displayed}
                  data-locked={toEmptyAttr(curr !== displayed)}
                  onClick={answerA}
                >
                  {uiText.questions[displayed].a}
                </Button>
                
                <div style={{ height: 20 }}/>
                
                <Button
                  css={ButtonS6.t(answerBS)}
                  data-selected={toEmptyAttr(answers[displayed] === 1)}
                  disabled={curr !== displayed}
                  data-locked={toEmptyAttr(curr !== displayed)}
                  onClick={answerB}
                >
                  {uiText.questions[displayed].b}
                </Button>
                
                <div style={{ height: 28 }}/>
                
                <Flex row justifyCt='end'>
                  <AppLink
                    toFull={RootRoute.profile.id.userId[use](authUserId).tab.tests}
                  >
                    <Button
                      css={ButtonS6.t(ButtonS6.S.filled.rounded.sm.danger)}
                    >
                      {uiText.saveAndExit}
                    </Button>
                  </AppLink>
                </Flex>
              
              
              </Flex>
            )}
          </Flex>
        </PageContentLayout>
      </PageLayout>
      
      <BottomFloatingBar settingsButtonLeft/>
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





const useShiftAnimation = (curr: number, setDisplayed: Setter<number>) => {
  const [getElem, setElem] = useElemRefGetSet()
  
  type Transition = undefined | 'fwd' | 'back'
  const [transition, setTransition] = useState<{ v: Transition }>({ v: undefined })
  
  
  useEffect(() => {
    const el = getElem()
    if (el && transition.v) {
      let stale = false
      const isFwd = transition.v === 'fwd'
      const time = transitionTime
      el.style.transition = 'none'
      el.style.transform = 'translateX(0)'
      el.style.opacity = '1'
      requestAnimationFrame(() => {
        if (stale) return
        el.style.transition = `transform ${time}ms ease-out, opacity ${time}ms ease-out`
        el.style.transform = `translateX(${isFwd ? '-' : ''}100px)`
        el.style.opacity = '0'
        el.ontransitionend = ev => {
          if (ev.target === el) requestAnimationFrame(() => {
            if (stale) return
            el.ontransitionend = null
            setDisplayed(curr)
            el.style.transition = 'none'
            el.style.transform = `translateX(${isFwd ? '' : '-'}100px)`
            el.style.opacity = '0'
            requestAnimationFrame(() => {
              if (stale) return
              el.style.transition = `transform ${time}ms ease-in, opacity ${time}ms ease-in`
              el.style.transform = 'translateX(0)'
              el.style.opacity = '1'
              setTransition(curr => curr === transition ? { v: undefined } : curr)
            })
          })
        }
      })
      return () => {
        stale = true
        setDisplayed(curr)
      }
    }
  }, [transition])
  
  return { setTransition, setElem }
}



