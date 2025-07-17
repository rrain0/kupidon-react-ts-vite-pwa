import React from 'react'
import { GenderA } from 'src/model/api/GenderA.ts'
import { MediaInArrayDUC } from 'src/ui-data/models/media/Media.ts'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import ProfileCards from 'src/ui/1-widgets/ProfileCards/ProfileCards.tsx'
import PageContentLayout from 'src/ui/components/page/PageContentLayout.tsx'




export type PreviewProps = {
  photos: MediaInArrayDUC[]
  name: string
  birthDate: string
  gender: GenderA | ''
  aboutMe: string
}



const Preview = React.memo((props: PreviewProps) => {
  const {
    photos,
    name,
    birthDate,
    gender,
    aboutMe,
  } = props
  
  
  return (
    <PageContentLayout full data-display-name='Preview'>
      {/* StackFrame */}
      <Flex full relative noOverflow>
        {/* StackFrame2 */}
        <Flex absTlwh>
          <ProfileCards
            photos={photos}
            name={name}
            birthDate={birthDate}
            gender={gender}
            aboutMe={aboutMe}
          />
        </Flex>
      </Flex>
    </PageContentLayout>
  )
})
Preview.displayName = 'Preview'
export default Preview