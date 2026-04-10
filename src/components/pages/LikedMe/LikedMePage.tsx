import styled from '@emotion/styled'

import { useAsCallback } from '@utils/react/state/base/useAsCallback.ts'
import React, { useCallback } from 'react'
import { useSearchParams } from 'react-router'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import Flex from '@libs/style-as-short-props/elems/Flex.tsx'
import Gap from '@libs/style-as-short-props/elems/Gap.tsx'
import Grid from '@libs/style-as-short-props/elems/Grid.tsx'
import Button from 'src/components/elems/buttons/Button/Button.tsx'
import { ButtonS6 } from 'src/components/elems/buttons/Button/ButtonS6.ts'
import LikedMeCard, { LikedMeCardItem } from 'src/components/pages/LikedMe/parts/LikedMeCard.tsx'
import BottomFloatingBar from 'src/components/components/screen-bars/BottomFloatingBar.tsx'
import BackButton from 'src/components/components/screen-bars/parts/BackButton.tsx'
import PageContentLayout from 'src/components/components/page/PageContentLayout.tsx'
import PageLayout from 'src/components/components/page/PageLayout.tsx'
import PageScrollbars from 'src/components/widgets/Scrollbars/PageScrollbars'
import { Hdrs } from 'components/elems/basic-elements/Hdrs'
import Txt = EmotionCommon.Txt
import { Pu } from '@utils/base/tsUtils.ts'
import { Cb } from '@utils/base/tsUtils.ts'





export type LikedMePageProps = Pu<{
  items: LikedMeCardItem[]
  locked: boolean
  unlock: Cb
  setSelected: (i: number) => void
}>

const LikedMePage = React.memo(({
  items, locked, unlock, setSelected,
}: LikedMePageProps) => {
  
  const [search, setSearch] = useSearchParams()
  
  const onSelect = useCallback((i: number) => {
    setSelected?.(i)
    const newSearch = new URLSearchParams(search)
    newSearch.set('likedMeViewMode', 'full')
    setSearch(newSearch)
  }, [setSelected, search, setSearch])
  
  const loading = !items
  const noItems = !items?.length
  
  return (
    <>
      
      <PageLayout col>
        <PageContentLayout colSm>
          
          
          
          <Grid cols='38px 1fr 38px' stretch>
            <Flex centerStart m={-13}><BackButton/></Flex>
            {/* TODO Translation */}
            <Flex center><Hdrs.Page>{'Лайки'}</Hdrs.Page></Flex>
            <Gap w={38}/>
          </Grid>
          
          <Gap h={24}/>
          
          {(() => {
            if (loading) return <div>Загрузка...</div>
            if (noItems) return <div>Пусто</div>
            return (
              <>
                {locked && (
                  <>
                    <TextOpenPossibilityToView alignedStretch col align>
                      {/* TODO Translation */}
                      {'Откройте возможноть просматривать анкеты, которые вас лайкнули, вместе с Купидон Premium'}
                    </TextOpenPossibilityToView>
                    
                    <Gap h={16}/>
                    
                    <Button
                      css={ButtonS6.t(ButtonS6.S.filled.rect.lg.main2)}
                      onClick={() => unlock?.()}
                    >
                      {/* TODO Translation */}
                      {'Открыть доступ'}
                    </Button>
                    
                    <Gap h={26}/>
                  </>
                )}
                
                <Grid alignedStretch cols='1fr 1fr' g={16}>
                  {items.map((it, i) => {
                    const { id } = it
                    return (
                      <LikedMeListItem
                        key={id}
                        item={it}
                        i={i}
                        locked={locked}
                        onSelect={onSelect}
                      />
                    )
                  })}
                </Grid>
              </>
            )
          })()}
          
        
        </PageContentLayout>
        
        <PageScrollbars/>
      </PageLayout>
      
      
      <BottomFloatingBar settingsButton/>
    
    </>
  )
})
LikedMePage.displayName = 'LikedMePage'
export default LikedMePage





const TextOpenPossibilityToView = styled(Flex)(({ theme: t }) => [
  Txt.s16, {
    textAlign: 'center',
    color: t.page.ctSec,
  },
])






type LikedMeListItemProps = {
  item: LikedMeCardItem
  i: number
} & Pu<{
  locked: boolean
  onSelect: (i: number) => void
}>

const LikedMeListItem = React.memo(({
  item, i, locked, ...restProps
}: LikedMeListItemProps) => {
  const { id } = item
  const onSelect = useAsCallback(() => restProps.onSelect?.(i))
  return <LikedMeCard key={id} item={item} locked={locked} onSelect={onSelect}/>
})




