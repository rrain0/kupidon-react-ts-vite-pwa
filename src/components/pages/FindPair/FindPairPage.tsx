
import React from 'react'
import ProfileCardsStackList, {
  ProfileCardsStackListItem,
} from 'src/components/widgets/ProfileCards/ProfileCardsStackList.tsx'
import PageContentLayout from 'src/components/components/page/PageContentLayout.tsx'
import PageLayout from 'src/components/components/page/PageLayout.tsx'
import { Pu } from '@utils/base/math/typeUtils.ts'




export type FindPairPageProps = Pu<{
  items: ProfileCardsStackListItem[]
  startI: number
}>


const FindPairPage = React.memo(({ items, startI }: FindPairPageProps) => {
  
  return (
    <PageLayout vp>
      <PageContentLayout full>
        
        <ProfileCardsStackList items={items} initialItemI={startI}/>
      
      </PageContentLayout>
    </PageLayout>
  )
})
FindPairPage.displayName = 'FindPairPage'
export default FindPairPage



