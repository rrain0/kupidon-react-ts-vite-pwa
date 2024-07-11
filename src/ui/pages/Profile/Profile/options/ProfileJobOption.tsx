import React, { useMemo } from 'react'
import { Job } from 'src/api/model/Job.ts'
import { Option } from 'src/ui-data/models/Option.ts'
import ModalRadio from 'src/ui/widgets/modals/ModalRadio/ModalRadio.tsx'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/useOverlayUrl.ts'
import {
  SvgGradIcons,
} from 'src/ui/elements/icons/SvgGradIcons/SvgGradIcons.tsx'
import { OptionUiText } from 'src/ui-data/translations/OptionUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import OptionItem from 'src/ui/widgets/OptionItem/OptionItem.tsx'
import { ValidationWrapRenderProps } from 'src/mini-libs/form-validation/components/ValidationWrap.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import WorkSuitcaseGradIc = SvgGradIcons.WorkSuitcaseGradIc







const overlayName = 'job'



export type JobOptionValues = Job | ''
export type JobUiOptions = Option<JobOptionValues>[]


const ProfileJobOption =
React.memo(
(props: ValidationWrapRenderProps<JobOptionValues>) => {
  const optionText = useUiValues(OptionUiText)
  const titleText = useUiValues(TitleUiText)
  
  const text = useMemo(()=>({
    iWorkForHire: optionText.iWorkForHire,
    workForMyself: optionText.workForMyself,
    temporaryUnemployed: optionText.temporaryUnemployed,
    notSelected: optionText.notSelected,
  }), [optionText, titleText])
  
  
  const jobOptions = useMemo(
    ()=>[
      {
        value: 'I_WORK_FOR_HIRE',
        text: text.iWorkForHire,
      },{
        value: 'WORK_FOR_MYSELF',
        text: text.workForMyself,
      },{
        value: 'TEMPORARILY_UNEMPLOYED',
        text: text.temporaryUnemployed,
      },{
        value: '',
        text: text.notSelected,
      }
    ] satisfies JobUiOptions,
    [text]
  )
  
  
  
  const { isOpen, open, close } = useOverlayUrl(overlayName)
  const value = jobOptions.find(opt => opt.value === props.value)?.text ?? ''
  
  return <>
    <OptionItem
      icon={<WorkSuitcaseGradIc />}
      title={titleText.job}
      value={value}
      onClick={open}
    />
    
    <ModalRadio
      isOpen={isOpen}
      close={close}
      title={titleText.job}
      options={jobOptions}
      value={props.value}
      onSelect={props.setValue}
    />
  </>
})
export default ProfileJobOption



