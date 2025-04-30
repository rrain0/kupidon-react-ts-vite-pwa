import styled from '@emotion/styled'
import React from 'react'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import ProfileShowcase from 'src/ui/1-widgets/ProfileShowcase/ProfileShowcase.tsx'
import PageContentLayout from 'src/ui/components/Pages/PageContentLayout.tsx'
import { Pages } from 'src/ui/components/Pages/Pages.ts'
import { ProfilePageValidation } from 'src/ui/2-pages/Profile/validation.ts'
import FormValues = ProfilePageValidation.FormValues
import abs = EmotionCommon.abs
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
          <ProfileShowcase
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
  ${abs};
`