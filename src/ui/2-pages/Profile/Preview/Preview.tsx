import React from 'react'
import ProfileShowcase from 'src/ui/1-widgets/ProfileShowcase/ProfileShowcase.tsx'
import { Pages } from 'src/ui/components/Pages/Pages.ts'
import { ProfilePageValidation } from 'src/ui/2-pages/Profile/validation.ts'
import FormValues = ProfilePageValidation.FormValues




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
    <Pages.AddSafeInsets>
      <ProfileShowcase
        photos={photos}
        name={name}
        birthDate={birthDate}
        gender={gender}
        aboutMe={aboutMe}
      />
    </Pages.AddSafeInsets>
  )
})
export default Preview




