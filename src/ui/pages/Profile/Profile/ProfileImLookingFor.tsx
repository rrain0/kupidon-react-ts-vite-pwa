import { css } from '@emotion/react'
import React, { useMemo, useState } from 'react'
import UseFakePointerRef from 'src/ui/components/ActionProviders/UseFakePointerRef.tsx'
import ModalPortal from 'src/ui/components/modal/ModalPortal/ModalPortal.tsx'
import { SvgGradIcons } from 'src/ui/elements/icons/SvgGradIcons/SvgGradIcons.tsx'
import { OptionUiText } from 'src/ui/ui-values/OptionUiText.ts'
import { TitleUiText } from 'src/ui/ui-values/TitleUiText.ts'
import OptionItem from 'src/ui/widgets/OptionAndValueItem/OptionItem.tsx'
import UseBool from 'src/ui/components/UseBool/UseBool.tsx'
import { EmotionCommon } from 'src/ui/style/EmotionCommon.ts'
import { ReactUtils } from 'src/util/common/ReactUtils.ts'
import {
  ValidationWrapRenderProps
} from '@util/form-validation/ValidationWrap.tsx'
import { useUiValues } from '@util/ui-text/useUiText.ts'
import BottomSheetBasic from 'src/ui/elements/BottomSheet/BottomSheetBasic.tsx'
import UseBottomSheetState from 'src/ui/elements/BottomSheet/UseBottomSheetState.tsx'
import RadioInput from 'src/ui/elements/inputs/RadioInput/RadioInput.tsx'
import RadioInputGroup from 'src/ui/elements/inputs/RadioInput/RadioInputGroup.tsx'
import { RadioInputStyle } from 'src/ui/elements/inputs/RadioInput/RadioInputStyle.ts'
import onPointerClick = ReactUtils.onPointerClick
import col = EmotionCommon.col
import Search2GradIc = SvgGradIcons.Search2GradIc







type PreferredPeopleOption = 'notSelected'|'ofGuys'|'ofGirls'|'ofGuysAndGirls'


const ProfileImLookingFor =
React.memo(
(/* props: ValidationWrapRenderProps<PreferredPeopleOption> */)=>{
  const titleText = useUiValues(TitleUiText)
  const optionText = useUiValues(OptionUiText)
  
  
  
  /* const [preferredPeople, setPreferredPeople] =
    useState('notSelected' as PreferredPeopleOption) */
  const preferredPeopleOptions = useMemo(
    ()=>[
      {
        value: 'notSelected',
        text: optionText.notSelected,
      },{
        value: 'ofGuys',
        text: optionText.ofGuys,
      },{
        value: 'ofGirls',
        text: optionText.ofGirls,
      },{
        value: 'ofGuysAndGirls',
        text: optionText.ofGuysAndGirls,
      }
    ] satisfies { value: PreferredPeopleOption, text: string }[],
    [optionText]
  )
  
  
  
  return <UseBool>{bool =>
    <>
    
      <OptionItem
        icon={<Search2GradIc />}
        title={titleText.imLookingFor}
        value={preferredPeopleOptions.find(it => it.value === 'notSelected')!.text}
        
        //onClick={bool.setTrue}
        {...onPointerClick(bool.setTrue)}
      />
      
      {/* <UseBottomSheetState
        open={bool.value}
        onClosed={bool.setFalse}
      >
        {sheetProps =>
          <ModalPortal>
            <BottomSheetBasic
              {...sheetProps.sheetProps}
              header={uiText.gender.text}
            >
              <RadioInputGroup css={selectItemsContainer}>
                {genderOptions.map(opt => <RadioInput
                  css={RadioInputStyle.radio}
                  childrenPosition="start"
                  {...props.radioInputProps(opt.value)}
                  value={opt.value}
                  key={opt.value}
                  onClick={sheetProps.setClosing}
                >
                  <div css={selectItemText}>
                    {opt.text}
                  </div>
                </RadioInput>)}
              
              </RadioInputGroup>
            </BottomSheetBasic>
          </ModalPortal>
        }</UseBottomSheetState> */}
    </>
  }</UseBool>
})
export default ProfileImLookingFor




const selectItemsContainer = css`
  ${col};
  padding-bottom: 20px;
`
const selectItemText = css`
  flex: 1;
  padding-top: 4px;
  padding-bottom: 4px;
`