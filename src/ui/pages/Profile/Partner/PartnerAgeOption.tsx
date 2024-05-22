import React, { useMemo } from 'react'
import { PartnerAge } from 'src/api/model/PartnerAge.ts'
import { Option } from 'src/ui/model/Option.ts'
import ModalRadio from 'src/ui/widgets/modal-element/ModalRadio/ModalRadio.tsx'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/useOverlayUrl.ts'
import { SvgGradIcons } from 'src/ui/elements/icons/SvgGradIcons/SvgGradIcons.tsx'
import { OptionUiText } from 'src/ui/ui-values/OptionUiText.ts'
import { TitleUiText } from 'src/ui/ui-values/TitleUiText.ts'
import OptionItem from 'src/ui/elements/OptionAndValueItem/OptionItem.tsx'
import { ValidationWrapRenderProps } from '@util/form-validation/ValidationWrap.tsx'
import { useUiValues } from '@util/ui-text/useUiText.ts'
import HourglassGradIc = SvgGradIcons.HourglassGradIc







const overlayName = 'age'

export type PartnerAgeOptionValues = PartnerAge | ''
export type PartnerAgeUiOptions = Option<PartnerAgeOptionValues>[]


const PartnerAgeOption =
React.memo(
(props: ValidationWrapRenderProps<PartnerAgeOptionValues>)=>{
  const optionText = useUiValues(OptionUiText)
  const titleText = useUiValues(TitleUiText)
  const text = useMemo(() => ({
    yearsOld: optionText.yearsOld.toLowerCase(),
    notSelected: optionText.notSelected,
  }), [optionText])
  
  
  const partnerAgeOptions = useMemo(
    ()=>[
      {
        value: '18_TO_25',
        text: `18-25 ${text.yearsOld}`,
      },{
        value: '25_TO_30',
        text: `25-30 ${text.yearsOld}`,
      },{
        value: '30_TO_35',
        text: `30-35 ${text.yearsOld}`,
      },{
        value: '35_TO_40',
        text: `35-40 ${text.yearsOld}`,
      },{
        value: '40_MORE',
        text: `40+ ${text.yearsOld}`,
      },{
        value: '',
        text: text.notSelected,
      }
    ] satisfies PartnerAgeUiOptions,
    [text]
  )
  
  
  
  const { isOpen, open, close } = useOverlayUrl(overlayName)
  
  
  return <>
    <OptionItem
      icon={<HourglassGradIc />}
      title={titleText.partnerAge}
      value={partnerAgeOptions.find(opt => opt.value === props.value)?.text.toLowerCase() ?? ''}
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
export default PartnerAgeOption


