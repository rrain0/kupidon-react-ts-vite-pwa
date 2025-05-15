import styled from '@emotion/styled'
import { withDefaults } from '@util/react/withDefaults.tsx'
import React from 'react'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import Gap from 'src/ui/0-elements/basic-elements/Gap.tsx'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar'
import BackBtn from 'src/ui/components/BottomButtonBar/parts/BackBtn.tsx'
import PageContentLayout from 'src/ui/components/Pages/PageContentLayout.tsx'
import PageLayout from 'src/ui/components/Pages/PageLayout.tsx'
import { Pages } from 'src/ui/components/Pages/Pages'
import PageScrollbars from 'src/ui/1-widgets/Scrollbars/PageScrollbars'
import { Hdrs } from 'ui/0-elements/basic-elements/Hdrs'
import Txt = EmotionCommon.Txt





const LikedMePage = React.memo(() => {
  
  
  return (
    <>
      
      <PageLayout col>
        <PageContentLayout colSm>
          
          <Pages.PageHeaderWithLeftRightItems>
            {/* TODO virtual offset for back btn */}
            <BackBtn/>
            <Hdrs.Page>{'Лайки'}</Hdrs.Page>
            <div css={{ width: 50, height: 50 }}/>
          </Pages.PageHeaderWithLeftRightItems>
          
          <Gap h={24}/>
          
          <TextOpenPossibilityToView aligned='stretch' col align>
            {'Откройте возможноть просматривать анкеты, которые вас лайкнули вместе с Купидон Premium'}
          </TextOpenPossibilityToView>
          
          <Gap h={16}/>
          
          <CardList aligned='stretch'>
            <LikedMeCard/>
            <LikedMeCard/>
            <LikedMeCard/>
            <LikedMeCard/>
            <LikedMeCard/>
            <LikedMeCard/>
          </CardList>
        
        </PageContentLayout>
        
        <PageScrollbars/>
      </PageLayout>
      
      
      <BottomButtonBar/>
    
    </>
  )
})
LikedMePage.displayName = 'LikedMePage'
export default LikedMePage





const TextOpenPossibilityToView = withDefaults({

}, styled(Flex)(({ theme: t }) => [Txt.s16, {
  textAlign: 'center',
  color: t.page.ctSec,
}]))



const CardList = styled(Flex)({
  aligned: 'stretch',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 16,
})



const LikedMeCard = React.memo(() => {
  
  return (
    <Flex pos='rel' ratio={171 / 217} r={15} style={{ backgroundColor: 'indianred' }}>
    
    </Flex>
  )
})

