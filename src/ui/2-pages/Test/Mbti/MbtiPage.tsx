import { css } from '@emotion/react'
import styled from '@emotion/styled'
import spendingTimeGuitar from '@im/picture/spending-time--guitar.png'
import React from 'react'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import { CardTitleNormal } from 'src/ui/2-pages/Profile/parts/CardTitle.tsx'
import Txt = EmotionCommon.Txt
import row = EmotionCommon.row
import rowWrap = EmotionCommon.rowWrap
import rowC = EmotionCommon.rowC
import col = EmotionCommon.col
import { Pages } from 'ui/components/Pages/Pages'



const MbtiPage = React.memo(() => {
  
  return (
    <>
      <Pages.SafeInsets>
        <Pages.Content css={css`gap: 30px;`}>
          <div
            data-display-name="MbtiPage"
            css={css`${col}`}
          >
            
            <Picture src={spendingTimeGuitar} />
            
            <div style={{ height: 41 }} />
            
            <QuestionTitle>Вы предпочитаете:</QuestionTitle>
            
            <div style={{ height: 35 }} />
            
            <Button css={ButtonS6.t(answerV1)}>
              Общаться с людьми
            </Button>
            
            <div style={{ height: 20 }} />
            
            <Button css={ButtonS6.t(answerV2)}>
              Проводить время в одиночку
            </Button>
          
          </div>
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

