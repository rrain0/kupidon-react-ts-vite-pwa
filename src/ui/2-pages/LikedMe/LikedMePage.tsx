import styled from '@emotion/styled'
import { withDefaults } from '@util/react/withDefaults.tsx'
import React, { useState } from 'react'
import { MockData } from 'src/_mock-data/MockData.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import Gap from 'src/ui/0-elements/basic-elements/Gap.tsx'
import Grid from 'src/ui/0-elements/basic-elements/Grid.tsx'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import LikedMeCard, { LikedMeCardItem } from 'src/ui/2-pages/LikedMe/parts/LikedMeCard.tsx'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar'
import BackBtn from 'src/ui/components/BottomButtonBar/parts/BackBtn.tsx'
import PageContentLayout from 'src/ui/components/Pages/PageContentLayout.tsx'
import PageLayout from 'src/ui/components/Pages/PageLayout.tsx'
import PageScrollbars from 'src/ui/1-widgets/Scrollbars/PageScrollbars'
import { Hdrs } from 'ui/0-elements/basic-elements/Hdrs'
import Txt = EmotionCommon.Txt



const {
  portraitCharmingWoman, portraitCheerfulGirl,
  portraitDarkHairedLady, portraitAttractivePrettyWoman, portraitWomanPosingHouse,
  portraitStylishBrunetteGirl,
} = MockData.peoplePortraits.record


const likedMeItems: LikedMeCardItem[] = [
  {
    id: '175dc7be-3f56-4b9d-9403-e994b72624dc',
    picture: portraitAttractivePrettyWoman,
    name: 'Алиса', birthDate: '2001-05-15',
  },
  {
    id: '97bd2cee-decf-4774-8768-b576118af713',
    picture: portraitStylishBrunetteGirl,
    name: 'Мария', birthDate: '2000-05-15',
  },
  {
    id: '5ac18ba3-fc4a-4983-a662-7b8134885ed6',
    picture: portraitWomanPosingHouse,
    name: 'Ксюша', birthDate: '2001-05-15',
  },
  {
    id: 'ee8d201d-789b-4c89-a28b-e78b282bca70',
    picture: portraitCheerfulGirl,
    name: 'Влада', birthDate: '2003-05-15',
  },
  {
    id: '3ceb9e6e-0e23-4cee-8a52-21d8d03f040d',
    picture: portraitCharmingWoman,
    name: 'Лера', birthDate: '2004-05-15',
  },
  {
    id: 'a503343a-4759-441d-aae0-3f61e2335337',
    picture: portraitDarkHairedLady,
    name: 'Настя', birthDate: '2002-05-15',
  },
]





const LikedMePage = React.memo(() => {
  
  const [locked, setLocked] = useState(true)
  
  
  return (
    <>
      
      <PageLayout col>
        <PageContentLayout colSm>
          
          
          
          <Grid cols='38px 1fr 38px' stretch>
            <Flex centerStart><BackBtn withVirtualOffset/></Flex>
            {/* TODO Translations */}
            <Flex center><Hdrs.Page>{'Лайки'}</Hdrs.Page></Flex>
            <Gap w={24}/>
          </Grid>
          
          <Gap h={24}/>
          
          {locked && (
            <>
              <TextOpenPossibilityToView alignedStretch col align>
                {/* TODO Translations */}
                {'Откройте возможноть просматривать анкеты, которые вас лайкнули, вместе с Купидон Premium'}
              </TextOpenPossibilityToView>
              
              <Gap h={16}/>
              
              <Button
                css={ButtonS6.t(ButtonS6.S.filled.rect.lg.main2)}
                onClick={() => setLocked(false)}
              >
                {/* TODO Translations */}
                {'Открыть доступ'}
              </Button>
              
              <Gap h={26}/>
            </>
          )}
          
          <CardList alignedStretch>
            {likedMeItems.map(it => {
              const { id } = it
              return (
                <LikedMeCard key={id} item={it} locked={locked}/>
              )
            })}
          </CardList>
        
        </PageContentLayout>
        
        <PageScrollbars/>
      </PageLayout>
      
      
      <BottomButtonBar settingsBtn/>
    
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


/* const openAccessButtonS: AppWidgetStyle = t => [
  Button
] */


const CardList = styled(Flex)({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 16,
})


