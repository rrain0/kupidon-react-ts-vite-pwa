import styled from '@emotion/styled'
import React from 'react'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import ProfileCards from 'src/ui/1-widgets/ProfileCards/ProfileCards.tsx'
import PageContentLayout from 'src/ui/components/page/PageContentLayout.tsx'
import { ProfilePageValidation } from 'src/ui/2-pages/Profile/validation.ts'
import FormValues = ProfilePageValidation.FormValues
import absTlwh = EmotionCommon.absTlwh
import full = EmotionCommon.full




export type PreviewProps = {
  formValues: FormValues
}



const Preview = React.memo((props: PreviewProps) => {
  const {
    photos,
    name,
    birthDate,
    gender,
    aboutMe,
  } = props.formValues
  
  
  return (
    <PageContentLayout full>
      <StackFrame>
        <StackFrame2>
          <ProfileCards
            photos={photos}
            name={name}
            birthDate={birthDate}
            gender={gender}
            aboutMe={aboutMe}
          />
        </StackFrame2>
      </StackFrame>
      
    </PageContentLayout>
  )
})
export default Preview





const StackFrame = styled.div`
  position: relative;
  ${full};
`
const StackFrame2 = styled.div`
  ${absTlwh};
`