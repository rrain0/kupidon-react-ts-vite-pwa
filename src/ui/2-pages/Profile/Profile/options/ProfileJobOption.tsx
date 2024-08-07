import React, { useMemo } from 'react'
import { Job } from 'src/api/model/Job.ts'
import { Option } from 'src/ui-data/models/Option.ts'
import ModalRadio from 'src/ui/1-widgets/modals/ModalRadio/ModalRadio.tsx'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import {
  SvgGradIcons,
} from 'src/ui/0-elements/icons/SvgGradIcons/SvgGradIcons.tsx'
import { OptionUiText } from 'src/ui-data/translations/OptionUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import ModalSingleSelectList
  from 'src/ui/1-widgets/modals/ModalSingleSelectList/ModalSingleSelectList'
import OptionItem from 'src/ui/1-widgets/OptionItem/OptionItem.tsx'
import { ValidationWrapRenderProps } from 'src/mini-libs/form-validation/components/ValidationWrap.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import WorkSuitcaseGradIc = SvgGradIcons.WorkSuitcaseGradIc







const overlayName = 'job'



export type JobOptionValues = Job | ''
export type JobUiOptions = Option<JobOptionValues>[]


const ProfileJobOption = React.memo(
  (props: ValidationWrapRenderProps<JobOptionValues>) => {
    const optionText = useUiValues(OptionUiText)
    const titleText = useUiValues(TitleUiText)
    
    const text = useMemo(() => ({
      iWorkForHire: optionText.iWorkForHire,
      workForMyself: optionText.workForMyself,
      temporaryUnemployed: optionText.temporaryUnemployed,
      notSelected: optionText.notSelected,
    }), [optionText, titleText])
    
    
    const options = useMemo(
      () => [
        {
          value: 'I_WORK_FOR_HIRE',
          text: text.iWorkForHire,
        }, {
          value: 'WORK_FOR_MYSELF',
          text: text.workForMyself,
        }, {
          value: 'TEMPORARILY_UNEMPLOYED',
          text: text.temporaryUnemployed,
        }, {
          value: '',
          text: text.notSelected,
        },
      ] satisfies JobUiOptions,
      [text]
    )
    
    
    
    const { isOpen, open, close } = useOverlayUrl(overlayName)
    const value = options.find(opt => opt.value === props.value)?.text ?? ''
    
    return (
      <>
        <OptionItem
          icon={<WorkSuitcaseGradIc />}
          title={titleText.job}
          value={value}
          onClick={open}
        />
        
        
        <ModalSingleSelectList
          isOpen={isOpen}
          close={close}
          title={titleText.job}
          options={options}
          selected={props.value}
          setSelected={props.setValue}
        />
      </>
    )
  }
)
export default ProfileJobOption



