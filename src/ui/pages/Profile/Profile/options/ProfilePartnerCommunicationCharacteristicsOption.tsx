import { css } from '@emotion/react'
import React, { useCallback, useMemo } from 'react'
import { PartnerCommunicationCharacteristics } from 'src/api/model/PartnerCommunicationCharacteristics.ts'
import { Option } from 'src/ui-data/models/Option.ts'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon'
import ModalPortal from 'src/ui/components/modal/ModalPortal/ModalPortal'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { SvgGradIcons } from 'src/ui/elements/icons/SvgGradIcons/SvgGradIcons.tsx'
import { OptionUiText } from 'src/ui-data/translations/OptionUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import SelectItem from 'src/ui/elements/inputs/SelectItem/SelectItem'
import { SelectItemS } from 'src/ui/elements/inputs/SelectItem/SelectItemS'
import UseBottomSheetState from 'src/ui/widgets/BottomSheet/UseBottomSheetState'
import BottomSheetDialogBasic from 'src/ui/widgets/BottomSheetBasic/BottomSheetDialogBasic'
import OptionItem from 'src/ui/widgets/OptionItem/OptionItem.tsx'
import { ValidationWrapRenderProps } from 'src/mini-libs/form-validation/components/ValidationWrap.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import ModalCheckbox from 'src/ui/widgets/modals/ModalCheckbox/ModalCheckbox.tsx'
import { ArrayU } from 'src/util/common/ArrayU'
import GenderGradIc = SvgGradIcons.GenderGradIc
import col = EmotionCommon.col
import toggleTo = ArrayU.toggleTo







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
  
  
  const onChange = useCallback((value: PartnerCommunicationCharacteristicsOptionValues) => {
    props.setValue(toggleTo(props.value, value))
    /* const i = props.value.findIndex(v => v === value)
    if (i === -1) props.setValue([...props.value, value])
    else props.setValue(props.value.toSpliced(i, 1)) */
  }, [props.value, props.setValue])
  
  
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
        //icon={<GenderGradIc />}
        title={text.partnerCommunicationCharacteristics}
        value={value}
        onClick={open}
      />
      
      <UseBottomSheetState
        isOpen={!!isOpen}
        close={close}
      >{ sheetProps => (
        <ModalPortal>
          <BottomSheetDialogBasic
            {...sheetProps.sheetProps}
            header={text.partnerCommunicationCharacteristics}
          >
            <div css={selectItemsContainer}>
              {options.map((opt, i) => (
                <SelectItem
                  css={SelectItemS.normal}
                  key={opt.value}
                  onClick={() => onChange(opt.value)}
                  isSelected={props.value.includes(opt.value)}
                  indicatorsSelection={(() => {
                    if (i === 0) return options.map(it => props.value.includes(it.value))
                    return options.map((it, i2) => i === i2 && props.value.includes(it.value))
                  })()}
                >
                  {opt.text}
                </SelectItem>
              ))}
            </div>
          
          </BottomSheetDialogBasic>
        </ModalPortal>
      )}</UseBottomSheetState>
      
    </>
  )
})
export default ProfilePartnerCommunicationCharacteristicsOption



const selectItemsContainer = css`
  ${col};
  padding-bottom: 20px;
  gap: 10px;
`
