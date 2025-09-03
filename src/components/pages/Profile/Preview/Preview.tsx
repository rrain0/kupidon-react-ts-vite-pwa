import React from 'react'
import { GenderA } from 'src/models/api/GenderA.ts'
import { MediaInArrayDUC } from '@libs/media/Media.ts'
import Flex from '@libs/short-propsed/components/Flex.tsx'
import ProfileCards from 'src/components/widgets/ProfileCards/ProfileCards.tsx'
import PageContentLayout from 'src/components/components/page/PageContentLayout.tsx'




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