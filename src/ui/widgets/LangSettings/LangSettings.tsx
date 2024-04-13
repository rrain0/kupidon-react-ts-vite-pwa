import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useCallback, useMemo } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { LangSettingsUiText } from 'src/ui/widgets/LangSettings/uiText.ts'
import { Lang } from 'src/ui/lang/Lang.ts'
import { AppTheme } from 'src/ui/theme/AppTheme.ts'
import { CountryFlag } from 'src/ui/lang/CountryFlag.ts'
import { useUiValues } from 'src/ui/ui-text/useUiText.ts'
import BottomSheetBasic from 'src/ui/elements/BottomSheet/BottomSheetBasic.tsx'
import UseBottomSheetState from 'src/ui/elements/BottomSheet/UseBottomSheetState.tsx'
import { SvgIcons } from 'src/ui/elements/icons/SvgIcons.tsx'
import { SvgIcStyle } from 'src/ui/elements/icons/SvgIcStyle.ts'
import RadioInput from 'src/ui/elements/inputs/RadioInput/RadioInput.tsx'
import { RadioInputStyle } from 'src/ui/elements/inputs/RadioInput/RadioInputStyle.ts'
import { LangRecoil } from 'src/recoil/state/LangRecoil.ts'
import { LangSettingsRecoil } from 'src/recoil/state/LangSettingsRecoil.ts'
import { EmotionCommon } from 'src/ui/style/EmotionCommon.ts'
import { TypeUtils } from 'src/util/common/TypeUtils.ts'
import Setter = TypeUtils.Callback1
import col = EmotionCommon.col
import row = EmotionCommon.row
import Theme = AppTheme.Theme
import BrowserIc = SvgIcons.BrowserIc
import PartialUndef = TypeUtils.PartialUndef
import AppLangType = Lang.AppLangType





export type LangSettingsProps = {
  open: boolean
  setOpen: Setter<boolean>
} & PartialUndef<{
  closeable: boolean
}>



const LangSettings =
React.memo(
(props: LangSettingsProps)=>{
  
  
  const lang = useRecoilValue(LangRecoil)
  
  const [langSettings, setLangSettings] = useRecoilState(LangSettingsRecoil)
  
  
  const uiText = useUiValues(LangSettingsUiText)
  const languageOptions = useMemo(
    ()=>{
      let text = [
        {
          value: 'system',
          text: uiText.systemLanguage.text,
        },{
          value: 'ru-RU',
          text: uiText.russian.text,
        },{
          value: 'en-US',
          text: uiText.english.text,
        }
      ] satisfies { value: AppLangType|'system', text: string }[]
      if (!lang.availableSystemLangs?.length) text = text.filter(it=>it.value!=='system')
      return text
    },
    [uiText, lang.availableSystemLangs]
  )
  const isLanguageOptionChecked = useCallback(
    function (value: AppLangType|'system') {
      return langSettings.setting === 'system' && value === 'system'
        || langSettings.setting === 'manual' && value === langSettings.manualSetting?.[0]
    },
    [langSettings]
  )
  
  
  
  
  return <>
    <UseBottomSheetState open={props.open} onClosed={()=>props.setOpen(false)}>
      { ({ sheetProps })=>
      <BottomSheetBasic
        {...sheetProps}
        closeable={props.closeable}
        header={<div css={css`height: 1em;`}/>}
      >
        <div css={css`
          ${col};
          padding-bottom: 20px;
        `}
        >
          
          
          {
            languageOptions.map(opt => <RadioInput
              css={RadioInputStyle.radio}
              childrenPosition="start"
              checked={isLanguageOptionChecked(opt.value)}
              value={opt.value}
              key={opt.value}
              onChange={ev => {
                if (opt.value === 'system') setLangSettings({
                  ...langSettings,
                  setting: 'system',
                })
                else {
                  setLangSettings({
                    setting: 'manual',
                    manualSetting: [opt.value],
                  })
                }
              }}
            >
              <OptionContainer>
                {opt.value !== 'system' && <Flag src={CountryFlag[opt.value]}/>}
                {opt.value === 'system' && <BrowserIc css={icon}/>}
                {opt.text}
              </OptionContainer>
            </RadioInput>)
          }
          
          
        
        </div>
      </BottomSheetBasic>}
    </UseBottomSheetState>
  </>
})
export default LangSettings



const OptionContainer = styled.div`
  flex: 1;
  padding-top: 4px;
  padding-bottom: 4px;
  ${row};
  gap: 0.3em;
  align-items: center;
`
const Flag = styled.img`
  width: 1.333em;
  aspect-ratio: 4/3;
  object-position: center;
  object-fit: cover;
  vertical-align: middle;
`
const icon = (t:Theme)=>css`
  ${SvgIcStyle.El.thiz.icon} {
    width: 1.333em;
    ${SvgIcStyle.Prop.prop.color}: ${t.page.content2[0]};
  }
`