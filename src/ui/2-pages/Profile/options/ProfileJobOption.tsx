import React, { useMemo, useState } from 'react'
import { Job } from 'src/api/model/Job.ts'
import { Option } from 'src/ui-data/models/Option.ts'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import {
  SvgGradIcons,
} from 'src/ui/0-elements/icons/SvgGradIcons/SvgGradIcons.tsx'
import { OptionUiText } from 'src/ui-data/translations/OptionUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import ModalSingleSelectList
  from 'src/ui/1-widgets/modals/ModalSingleSelectList/ModalSingleSelectList'
import OptionItem from 'src/ui/1-widgets/OptionItem/OptionItem.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import WorkSuitcaseGradIc = SvgGradIcons.WorkSuitcaseGradIc







const overlayName = 'profileJob'



export type JobOptionValues = Job | ''
export type JobUiOptions = Option<JobOptionValues>[]


const ProfileJobOption = React.memo(
  () => {
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
          id: 'I_WORK_FOR_HIRE',
          text: text.iWorkForHire,
        },
        {
          id: 'WORK_FOR_MYSELF',
          text: text.workForMyself,
        },
        {
          id: 'TEMPORARILY_UNEMPLOYED',
          text: text.temporaryUnemployed,
        },
        {
          id: '',
          text: text.notSelected,
        },
      ] satisfies JobUiOptions,
      [text]
    )
    
    
    const [saved, setSaved] = useState<JobOptionValues>('')
    const [selected, setSelected] = useState(saved)
    
    const onCancel = () => setSelected(saved)
    
    const { isOpen, open, close } = useOverlayUrl(overlayName)
    
    const onClose = () => {
      setSaved(selected)
      close()
    }
    
    const value = options.find(opt => opt.id === selected)?.text ?? ''
    
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
          close={onClose}
          title={titleText.job}
          options={options}
          selected={selected}
          setSelected={setSelected}
          notSelectedValue=""
          onCancel={onCancel}
        />
      </>
    )
  }
)
export default ProfileJobOption



