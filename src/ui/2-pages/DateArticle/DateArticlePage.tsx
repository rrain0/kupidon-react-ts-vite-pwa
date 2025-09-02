import styled from '@emotion/styled'
import React, { useMemo } from 'react'
import { UiValues } from 'src/mini-libs/ui-text/UiText.ts'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { DateArticle } from 'src/ui-data/special/date-article/DateArticlesData.ts'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import { StyleVals } from 'src/styles/StyleVals.ts'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import Gap from 'src/ui/0-elements/basic-elements/Gap.tsx'
import Grid from 'src/ui/0-elements/basic-elements/Grid.tsx'
import ImgSpark from 'src/ui/0-elements/ImgSpark/ImgSpark.tsx'
import { ImgSparkS6 } from 'src/ui/0-elements/ImgSpark/ImgSparkS6.ts'
import PageContentLayout from 'src/ui/components/page/PageContentLayout.tsx'
import PageLayout from 'src/ui/components/page/PageLayout.tsx'
import BottomFloatingBar from 'src/ui/components/screen-bars/BottomFloatingBar.tsx'
import BackButton from 'src/ui/components/screen-bars/parts/BackButton.tsx'
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
    
      <PageLayout col data-display-name='DateArticlePage'>
        <PageContentLayout colSm>
          
          <Grid cols='38px 1fr 38px' stretch>
            <Flex centerStart m={-13}><BackButton/></Flex>
            <Flex center><Hdrs.Page>{uiText.pageTitle}</Hdrs.Page></Flex>
            <Gap w={38}/>
          </Grid>
          
          <Gap h={34}/>
          
          <ImgSpark
            css={ImgSparkS6.t(imgSparkS)}
            src={article.picture}
          />
          
          <Gap h={19}/>
          
          <Title>
            {uiText.pageTitle}
          </Title>
          
          <Gap h={7}/>
          
          <Gap h={17}/>
          
          {parse(article.content)}
          
        </PageContentLayout>
      </PageLayout>
      
      
      <BottomFloatingBar settingsButton/>
      
    </>
  )
})
DateArticlePage.displayName = 'DateArticlePage'
export default DateArticlePage



const imgSparkS: AppWidgetStyle = [
  ImgSparkS6.S.img.img.fullW.normal, {
    imgFrame: { ratio: 1.570, r: StyleVals.cardRadius },
  },
]

const Title = styled.div`
  // TODO Theme
  color: black;
  ${Txt.s20Bold};
`

