import React, { useMemo, useState } from 'react'
import { GenderA } from 'src/models/api/GenderA.ts'
import { Option } from 'src/models/ui/Option.ts'
import GenderGradIc from 'src/components/elems/icons/GradSvgIcons/pack/special/GenderGradIc.tsx'
import { useOverlayUrl } from 'src/components/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { OptionUiText } from 'src/locales/translations/OptionUiText.ts'
import { TitleUiText } from 'src/locales/translations/TitleUiText.ts'
import ModalSingleSelectList
  from 'src/components/widgets/modals/ModalSingleSelectList/ModalSingleSelectList'
import OptionItem from 'src/components/widgets/OptionItem/OptionItem.tsx'
import { FormFieldWrapRenderProps } from 'src/mini-libs/form-data/components/FormFieldWrap.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'





const overlayName = 'gender'



export type GenderOptionValues = GenderA | ''
export type GenderUiOptions = Option<GenderA>[]


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



