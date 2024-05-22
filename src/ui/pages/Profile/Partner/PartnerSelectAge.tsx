import React, { useMemo } from 'react'
import { PartnerAge } from 'src/api/model/PartnerAge.ts'
import ModalRadio, { Option } from 'src/ui/components/modal-element/ModalRadio/ModalRadio.tsx'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/useOverlayUrl.ts'
import { SvgGradIcons } from 'src/ui/elements/icons/SvgGradIcons/SvgGradIcons.tsx'
import { OptionUiText } from 'src/ui/ui-values/OptionUiText.ts'
import { TitleUiText } from 'src/ui/ui-values/TitleUiText.ts'
import OptionItem from 'src/ui/widgets/OptionAndValueItem/OptionItem.tsx'
import { ValidationWrapRenderProps } from '@util/form-validation/ValidationWrap.tsx'
import { useUiValues } from '@util/ui-text/useUiText.ts'
import HourglassGradIc = SvgGradIcons.HourglassGradIc







const overlayName = 'age'

export type PartnerAgeOptionValues = PartnerAge | ''
export type PartnerAgeUiOptions = Option<PartnerAgeOptionValues>[]


const PartnerSelectAge =
React.memo(
(props: ValidationWrapRenderProps<PartnerAgeOptionValues>)=>{
  const optionText = useUiValues(OptionUiText)
  const titleText = useUiValues(TitleUiText)
  
  
  
  const partnerAgeOptions = useMemo(
    ()=>[
      {
        value: '18-25',
        text: `18-25 ${optionText.yearsOld}`,
      },{
        value: '25-30',
        text: `25-30 ${optionText.yearsOld}`,
      },{
        value: '30-35',
        text: `30-35 ${optionText.yearsOld}`,
      },{
        value: '35-40',
        text: `35-40 ${optionText.yearsOld}`,
      },{
        value: '40+',
        text: `40+ ${optionText.yearsOld}`,
      },{
        value: '',
        text: optionText.notSelected,
      }
    ] satisfies PartnerAgeUiOptions,
    [optionText]
  )
  
  
  
  const { isOpen, open, close } = useOverlayUrl(overlayName)
  
  
  return <>
    <OptionItem
      icon={<HourglassGradIc />}
      title={titleText.partnerAge}
      value={partnerAgeOptions.find(opt => opt.value === props.value)?.text ?? ''}
      onClick={open}
    />
    
    <ModalRadio
      isOpen={isOpen}
      close={close}
      title={titleText.partnerAge}
      options={partnerAgeOptions}
      radioInputProps={(value: PartnerAgeOptionValues)=>props.radioInputProps(value)}
    />
  </>
})
export default PartnerSelectAge


