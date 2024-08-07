import { css } from '@emotion/react'
import React, { useMemo } from 'react'
import { PartnerCommunicationCharacteristics } from 'src/api/model/PartnerCommunicationCharacteristics.ts'
import { Option } from 'src/ui-data/models/Option.ts'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { SvgGradIcons } from 'src/ui/0-elements/icons/SvgGradIcons/SvgGradIcons.tsx'
import { OptionUiText } from 'src/ui-data/translations/OptionUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import ModalMultiSelectList from 'src/ui/1-widgets/modals/ModalMultiSelectList/ModalMultiSelectList'
import OptionItem from 'src/ui/1-widgets/OptionItem/OptionItem.tsx'
import { ValidationWrapRenderProps } from 'src/mini-libs/form-validation/components/ValidationWrap.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import CommunicationTwoPeopleGradIc = SvgGradIcons.CommunicationTwoPeopleGradIc
import col = EmotionCommon.col







const overlayName = 'partnerCommunicationCharacteristics'



export type PartnerCommunicationCharacteristicsOptionValues =
  PartnerCommunicationCharacteristics
export type PartnerCommunicationCharacteristicsUiOptions =
  Option<PartnerCommunicationCharacteristicsOptionValues>[]


const ProfilePartnerCommunicationCharacteristicsOption = React.memo(
  (props: ValidationWrapRenderProps<PartnerCommunicationCharacteristicsOptionValues[]>) => {
    const titleText = useUiValues(TitleUiText)
    const optionText = useUiValues(OptionUiText)
    
    const text = useMemo(() => ({
      partnerCommunicationCharacteristics: titleText.partnerCommunicationCharacteristics,
      honestyAndOpenness: optionText.honestyAndOpenness,
      respectAndAttention: optionText.respectAndAttention,
      intelligenceAndEducation: optionText.intelligenceAndEducation,
      compatibilityOfInterests: optionText.compatibilityOfInterests,
      notSelected: optionText.notSelected,
    }), [titleText, optionText])
    
    
    
    const options = useMemo(
      () => [
        {
          value: 'HONESTY_AND_OPENNESS',
          text: text.honestyAndOpenness,
        }, {
          value: 'RESPECT_AND_ATTENTION',
          text: text.respectAndAttention,
        }, {
          value: 'INTELLIGENCE_AND_EDUCATION',
          text: text.intelligenceAndEducation,
        }, {
          value: 'COMPATIBILITY_OF_INTERESTS',
          text: text.compatibilityOfInterests,
        },
      ] satisfies PartnerCommunicationCharacteristicsUiOptions,
      [text]
    )
    
    
    const { isOpen, open, close } = useOverlayUrl(overlayName)
    
    const value = props.value
      .map(v => options.find(o => o.value === v))
      .filter(o => !!o)
      .map(o => o!.text)
      .join(', ')
      || text.notSelected
    
    
    return (
      <>
        
        <OptionItem
          icon={<CommunicationTwoPeopleGradIc />}
          title={text.partnerCommunicationCharacteristics}
          value={value}
          onClick={open}
        />
        
        
        <ModalMultiSelectList
          isOpen={isOpen}
          close={close}
          title={text.partnerCommunicationCharacteristics}
          options={options}
          selected={props.value}
          setSelected={props.setValue}
        />
        
      </>
    )
  }
)
export default ProfilePartnerCommunicationCharacteristicsOption



const selectItemsContainer = css`
  ${col};
  padding-bottom: 20px;
  gap: 10px;
`
