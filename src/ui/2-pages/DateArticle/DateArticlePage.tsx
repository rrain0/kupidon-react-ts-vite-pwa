import styled from '@emotion/styled'
import React, { useMemo } from 'react'
import { UiValues } from 'src/mini-libs/ui-text/UiText.ts'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { DateArticle } from 'src/ui-data/special/date-article/DateArticlesData.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { StyleVals } from 'src/ui-data/style/StyleVals.ts'
import ImgSpark from 'src/ui/0-elements/ImgSpark/ImgSpark.tsx'
import { ImgSparkS6 } from 'src/ui/0-elements/ImgSpark/ImgSparkS6.ts'
import BottomFloatingBar from 'src/ui/components/screen-bars/BottomFloatingBar.tsx'
import BackButton from 'src/ui/components/screen-bars/parts/BackButton.tsx'
import { Pages } from 'src/ui/components/Pages/Pages'
import PageScrollbars from 'src/ui/1-widgets/Scrollbars/PageScrollbars'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import { Hdrs } from 'ui/0-elements/basic-elements/Hdrs'
import Txt = EmotionCommon.Txt
import parse from 'html-react-parser'



export const LocationOverlayName = 'location'

const uiVals = {
  insightsAndPlacesForDate: {
    'ru-RU': 'Идеи и места',
  },
  features: {
    'ru-RU': 'Особенности',
  },
  bonusesFromKupidon: {
    'ru-RU': 'Бонусы от «Купидон»',
  },
  contactInformation: {
    'en-US': 'Contact information',
    'ru-RU': 'Контактная информация',
  },
  copyAddress: {
    'en-US': 'Copy address',
    'ru-RU': 'Скопировать адрес',
  },
} satisfies UiValues


export type DateArticlePageProps = {
  article: DateArticle
}
const DateArticlePage = React.memo((props: DateArticlePageProps) => {
  const { article } = props
  
  const uiValues = useMemo(() => ({
    pageTitle: article.title,
  }), [article])
  const uiText = useUiValues(uiValues)
  
  return (
    <>
    
      <Pages.PageGrad>
        <Pages.AddSafeInsets>
          <Pages.ContentColSm style={{ gap: 0 }}>
            
            <Pages.PageHeaderWithLeftRightItems>
              <BackButton/>
              <Hdrs.Page>{uiText.pageTitle}</Hdrs.Page>
              <div css={{ width: 50, height: 50 }}/>
            </Pages.PageHeaderWithLeftRightItems>
            
            <div style={{ height: 34 }}/>
            
            <ImgSpark
              css={ImgSparkS6.t(imgSparkS)}
              src={article.picture}
            />
            
            <div style={{ height: 19 }}/>
            
            <Title>
              {uiText.pageTitle}
            </Title>
            
            <div style={{ height: 7 }}/>
            
            <div style={{ height: 17 }}/>
            
            {parse(article.content)}
            
          </Pages.ContentColSm>
        </Pages.AddSafeInsets>
        
        <PageScrollbars/>
      </Pages.PageGrad>
      
      
      <BottomFloatingBar settingsButton/>
      
    </>
  )
})
export default DateArticlePage



const imgSparkS: AppWidgetStyle = [
  ImgSparkS6.S.img.img.wFull.normal, {
    imgFrame: { ratio: 1.570, r: StyleVals.cardRadius },
  },
]

const Title = styled.div`
  // TODO Theme
  color: black;
  ${Txt.s20Bold};
`

