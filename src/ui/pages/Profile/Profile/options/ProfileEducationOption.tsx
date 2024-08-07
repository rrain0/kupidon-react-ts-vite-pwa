import React, { useMemo } from 'react'
import { Education } from 'src/api/model/Education.ts'
import { Option } from 'src/ui-data/models/Option.ts'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { SvgGradIcons } from 'src/ui/elements/icons/SvgGradIcons/SvgGradIcons.tsx'
import { OptionUiText } from 'src/ui-data/translations/OptionUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import ModalSingleSelectList
  from 'src/ui/widgets/modals/ModalSingleSelectList/ModalSingleSelectList'
import OptionItem from 'src/ui/widgets/OptionItem/OptionItem.tsx'
import { ValidationWrapRenderProps } from 'src/mini-libs/form-validation/components/ValidationWrap.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import EducationGradIc = SvgGradIcons.EducationGradIc





const overlayName = 'education'



export type EducationOptionValues = Education | ''
export type EducationUiOptions = Option<EducationOptionValues>[]


const ProfileEducationOption = React.memo(
  (props: ValidationWrapRenderProps<EducationOptionValues>) => {
    const optionText = useUiValues(OptionUiText)
    const titleText = useUiValues(TitleUiText)
    
    const text = useMemo(() => ({
      notSelected: optionText.notSelected,
      notSelectedL: optionText.notSelected.toLowerCase(),
      primarySchoolEducation: optionText.primarySchoolEducation,
      secondarySchoolEducation: optionText.secondarySchoolEducation,
      specializedSecondarySchoolEducation: optionText.specializedSecondarySchoolEducation,
      incompleteHigherEducation: optionText.incompleteHigherEducation,
      higherEducation: optionText.higherEducation,
    }), [optionText, titleText])
    
    
    const options = useMemo(
      () => [
        {
          value: 'HIGHER_EDUCATION',
          text: text.higherEducation,
        }, {
          value: 'INCOMPLETE_HIGHER_EDUCATION',
          text: text.incompleteHigherEducation,
        }, {
          value: 'SPECIALIZED_SECONDARY_EDUCATION',
          text: text.specializedSecondarySchoolEducation,
        }, {
          value: 'SECONDARY_SCHOOL_EDUCATION',
          text: text.secondarySchoolEducation,
        }, {
          value: 'PRIMARY_SCHOOL_EDUCATION',
          text: text.primarySchoolEducation,
        }, {
          value: '',
          text: text.notSelected,
        },
      ] satisfies EducationUiOptions,
      [text]
    )
    
    
    
    const { isOpen, open, close } = useOverlayUrl(overlayName)
    const value = options.find(opt => opt.value === props.value)?.text ?? ''
    
    return (
      <>
        <OptionItem
          icon={<EducationGradIc />}
          title={titleText.education}
          value={value}
          onClick={open}
        />
        
        
        <ModalSingleSelectList
          isOpen={isOpen}
          close={close}
          title={titleText.education}
          options={options}
          selected={props.value}
          setSelected={props.setValue}
        />
      </>
    )
  }
)
export default ProfileEducationOption



