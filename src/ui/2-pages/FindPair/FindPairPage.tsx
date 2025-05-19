import { TypeU } from '@util/common/TypeU.ts'
import React from 'react'
import ProfileCardsStackList, {
  ProfileCardsStackListItem,
} from 'src/ui/1-widgets/ProfileShowcase/ProfileCardsStackList.tsx'
import PageContentLayout from 'src/ui/components/Pages/PageContentLayout.tsx'
import PageLayout from 'src/ui/components/Pages/PageLayout.tsx'
import Pu = TypeU.Pu




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
export default FindPairPage



