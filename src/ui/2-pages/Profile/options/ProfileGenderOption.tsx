import React, { useMemo, useState } from 'react'
import { Gender } from 'src/api/model/Gender.ts'
import { Option } from 'src/ui-data/models/Option.ts'
import ModalRadio from 'src/ui/1-widgets/modals/ModalRadio/ModalRadio.tsx'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { SvgGradIconsPack } from 'src/ui/0-elements/icons/SvgGradIcons/SvgGradIconsPack.tsx'
import { OptionUiText } from 'src/ui-data/translations/OptionUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import ModalSingleSelectList
  from 'src/ui/1-widgets/modals/ModalSingleSelectList/ModalSingleSelectList'
import OptionItem from 'src/ui/1-widgets/OptionItem/OptionItem.tsx'
import { FormFieldWrapRenderProps } from 'src/mini-libs/form-data/components/FormFieldWrap.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import GenderGradIc = SvgGradIconsPack.GenderGradIc





const overlayName = 'gender'



export type GenderOptionValues = Gender | ''
export type GenderUiOptions = Option<Gender>[]


const ProfileGenderOption = React.memo(
  (props: FormFieldWrapRenderProps<GenderOptionValues>) => {
    const optionText = useUiValues(OptionUiText)
    const titleText = useUiValues(TitleUiText)
    
    const text = useMemo(() => ({
      male: optionText.male,
      female: optionText.female,
      gender: titleText.gender,
    }), [titleText, optionText])
    
    
    
    const options = useMemo(() => {
      return [
        {
          id: 'MALE',
          text: text.male,
        },
        {
          id: 'FEMALE',
          text: text.female,
        },
      ] satisfies GenderUiOptions
    }, [text])
    
    
    const [saved, setSaved] = useState(props.value)
    
    const { isOpen, open, close } = useOverlayUrl(overlayName)
    
    const onOpen = () => {
      setSaved(props.value)
      open()
    }
    const onCancel = () => {
      // TODO access initial value
      props.setValue(saved)
    }
    
    const value = options.find(opt => opt.id === props.value)?.text ?? ''
    
    
    return (
      <>
        <OptionItem
          icon={<GenderGradIc/>}
          title={text.gender}
          value={value}
          onClick={onOpen}
        />
        
        
        <ModalSingleSelectList
          isOpen={isOpen}
          onClose={close}
          title={text.gender}
          options={options}
          selected={props.value}
          setSelected={props.setValue}
          onCancel={onCancel}
        />
        
        {/*
         <ModalRadio<typeof props.value>
           isOpen={isOpen}
           close={close}
           title={text.gender}
           options={options}
           value={props.value}
           onSelect={props.setValue}
         />
         */}
        
      </>
    )
  }
)
export default ProfileGenderOption



