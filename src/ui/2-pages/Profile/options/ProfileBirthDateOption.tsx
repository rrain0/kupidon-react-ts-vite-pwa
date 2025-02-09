import { TypeU } from '@util/common/TypeU.ts'
import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { LangRecoil } from 'src/recoil/state/LangRecoil'
import ModalInput from 'src/ui/1-widgets/modals/ModalInput/ModalInput.tsx'
import { useOverlayUrl } from 'src/ui/components/action-providers/UseOverlayUrl/hook/useOverlayUrl.ts'
import { SvgGradIconsPack } from 'src/ui/0-elements/icons/SvgGradIcons/SvgGradIconsPack.tsx'
import { PlaceholderUiText } from 'src/ui-data/translations/PlaceholderUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import OptionItem from 'src/ui/1-widgets/OptionItem/OptionItem.tsx'
import { ValidationWrapRenderProps } from 'src/mini-libs/form-validation/components/ValidationWrap.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import { DateU } from 'src/util/date/DateU'
import GiftBoxGradIc = SvgGradIconsPack.GiftBoxGradIc
import attrExists = TypeU.attrExists




const overlayName = 'profileBirthDate'


const ProfileBirthDateOption = React.memo((props: ValidationWrapRenderProps<string>) => {
  const lang = useRecoilValue(LangRecoil).langs[0]
  const titleText = useUiValues(TitleUiText)
  const placeholderText = useUiValues(PlaceholderUiText)
  
  const [saved, setSaved] = useState(props.value)
  
  const age = DateU.ageYears(props.value, lang)
  
  const { isOpen, open, close } = useOverlayUrl(overlayName)
  
  const onOpen = () => {
    setSaved(props.value)
    open()
  }
  const onCancel = () => {
    // TODO access initial value
    props.setValue(saved)
  }
  
  return (
    <>
      <OptionItem
        icon={<GiftBoxGradIc />}
        title={titleText.age}
        value={age}
        data-error={attrExists(props.highlight)}
        onClick={onOpen}
      />
      
      <ModalInput
        title={titleText.birthDate}
        isOpen={isOpen}
        onClose={close}
        onClear={() => props.setValue('')}
        onCancel={onCancel}
        
        autoFocus
        inputMode="numeric"
        placeholder={placeholderText.birthDate.toLowerCase()}
        {...props.inputProps}
        hasError={props.highlight}
        onBlur={ev => {
          ev.currentTarget.focus()
          props.inputProps.onBlur()
        }}
      />
    
    </>
  )
})
export default ProfileBirthDateOption


