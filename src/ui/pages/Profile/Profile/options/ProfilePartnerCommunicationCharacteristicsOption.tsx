import React, { useCallback, useMemo } from 'react'
import { PartnerCommunicationCharacteristics } from 'src/api/model/PartnerCommunicationCharacteristics.ts'
import { Option } from 'src/ui-data/models/Option.ts'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { SvgGradIcons } from 'src/ui/elements/icons/SvgGradIcons/SvgGradIcons.tsx'
import { OptionUiText } from 'src/ui-data/translations/OptionUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import OptionItem from 'src/ui/widgets/OptionItem/OptionItem.tsx'
import { ValidationWrapRenderProps } from 'src/mini-libs/form-validation/components/ValidationWrap.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import ModalCheckbox from 'src/ui/widgets/modals/ModalCheckbox/ModalCheckbox.tsx'
import GenderGradIc = SvgGradIcons.GenderGradIc







const overlayName = 'partnerCommunicationCharacteristics'



export type PartnerCommunicationCharacteristicsOptionValues =
  PartnerCommunicationCharacteristics
export type PartnerCommunicationCharacteristicsUiOptions =
  Option<PartnerCommunicationCharacteristicsOptionValues>[]


const ProfilePartnerCommunicationCharacteristicsOption =
React.memo(
(props: ValidationWrapRenderProps<PartnerCommunicationCharacteristicsOptionValues[]>) => {
  const titleText = useUiValues(TitleUiText)
  const optionText = useUiValues(OptionUiText)
  
  const text = useMemo(()=>({
    partnerCommunicationCharacteristics: titleText.partnerCommunicationCharacteristics,
    honestyAndOpenness: optionText.honestyAndOpenness,
    respectAndAttention: optionText.respectAndAttention,
    intelligenceAndEducation: optionText.intelligenceAndEducation,
    compatibilityOfInterests: optionText.compatibilityOfInterests,
    notSelected: optionText.notSelected,
  }), [titleText, optionText])
  
  
  
  const options = useMemo(
    ()=>[
      {
        value: 'HONESTY_AND_OPENNESS',
        text: text.honestyAndOpenness,
      },{
        value: 'RESPECT_AND_ATTENTION',
        text: text.respectAndAttention,
      },{
        value: 'INTELLIGENCE_AND_EDUCATION',
        text: text.intelligenceAndEducation,
      },{
        value: 'COMPATIBILITY_OF_INTERESTS',
        text: text.compatibilityOfInterests,
      }
    ] satisfies PartnerCommunicationCharacteristicsUiOptions,
    [text]
  )
  
  
  const onChange = useCallback((value: PartnerCommunicationCharacteristicsOptionValues) => {
    const i = props.value.findIndex(v => v === value)
    if (i === -1) props.setValue([...props.value, value])
    else props.setValue(props.value.toSpliced(i, 1))
  }, [props.value, props.setValue])
  
  
  const { isOpen, open, close } = useOverlayUrl(overlayName)
  let value = props.value
    .map(v => options.find(o => o.value === v))
    .filter(o => !!o)
    .map(o => o!.text)
    .join(', ')
  value ||= text.notSelected
  
  
  return <>
    <OptionItem
      //icon={<GenderGradIc />}
      title={text.partnerCommunicationCharacteristics}
      value={value}
      onClick={open}
    />
    
    <ModalCheckbox
      isOpen={isOpen}
      close={close}
      title={text.partnerCommunicationCharacteristics}
      options={options}
      checked={props.value}
      onChange={onChange}
    />
    
  </>
})
export default ProfilePartnerCommunicationCharacteristicsOption



