import React, { useMemo, useState } from 'react'
import { Education } from 'src/api/model/Education.ts'
import { Option } from 'src/ui-data/models/Option.ts'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { GradSvgIconsPack } from 'src/ui/0-elements/icons/GradSvgIcons/GradSvgIconsPack.tsx'
import { OptionUiText } from 'src/ui-data/translations/OptionUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import ModalSingleSelectList
  from 'src/ui/1-widgets/modals/ModalSingleSelectList/ModalSingleSelectList'
import OptionItem from 'src/ui/1-widgets/OptionItem/OptionItem.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import EducationGradIc = GradSvgIconsPack.EducationGradIc





const overlayName = 'profileEducation'



export type EducationOptionValues = Education | ''
export type EducationUiOptions = Option<EducationOptionValues>[]


const ProfileEducationOption = React.memo(() => {
  const optionText = useUiValues(OptionUiText)
  const titleText = useUiValues(TitleUiText)
  
  const text = useMemo(() => ({
    notSelected: optionText.notSelected,
    notSelectedL: optionText.notSelected.toLowerCase(),
    secondarySchoolEducation: optionText.secondarySchoolEducation,
    specializedSecondarySchoolEducation: optionText.specializedSecondarySchoolEducation,
    higherEducation: optionText.higherEducation,
    academicDegree: optionText.academicDegree,
  }), [optionText, titleText])
  
  
  const options = useMemo(() => [
    {
      id: 'SECONDARY_SCHOOL_EDUCATION',
      text: text.secondarySchoolEducation,
    },
    {
      id: 'SPECIALIZED_SECONDARY_EDUCATION',
      text: text.specializedSecondarySchoolEducation,
    },
    {
      id: 'HIGHER_EDUCATION',
      text: text.higherEducation,
    },
    {
      id: 'ACADEMIC_DEGREE_EDUCATION',
      text: text.academicDegree,
    },
    {
      id: '',
      text: text.notSelected,
    },
  ] satisfies EducationUiOptions, [text])
  
  
  
  const [saved, setSaved] = useState<EducationOptionValues>('')
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
        icon={<EducationGradIc/>}
        title={titleText.education}
        value={value}
        onClick={open}
      />
      
      
      <ModalSingleSelectList
        isOpen={isOpen}
        onClose={onClose}
        title={titleText.education}
        options={options}
        selected={selected}
        setSelected={setSelected}
        notSelectedValue={''}
        onCancel={onCancel}
      />
    </>
  )
})
export default ProfileEducationOption



