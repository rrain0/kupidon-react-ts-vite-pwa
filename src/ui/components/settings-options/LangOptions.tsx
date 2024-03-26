import React, { useCallback, useMemo } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { LangRecoil } from 'src/recoil/state/LangRecoil.ts'
import { LangSettingsRecoil } from 'src/recoil/state/LangSettingsRecoil.ts'
import { QuickSettingsUiText } from 'src/ui/widgets/QuickSettings/uiText.ts'
import { CountryFlag } from 'src/ui/lang/CountryFlag.ts'
import { Lang } from 'src/ui/lang/Lang.ts'
import { useUiValues } from 'src/ui/ui-text/useUiText.ts'
import { SvgIcons } from 'src/ui/elements/icons/SvgIcons.tsx'
import RadioInput from 'src/ui/elements/inputs/RadioInput/RadioInput.tsx'
import RadioInputGroup from 'src/ui/elements/inputs/RadioInput/RadioInputGroup.tsx'
import { RadioInputStyle } from 'src/ui/elements/inputs/RadioInput/RadioInputStyle.ts'
import AppLangType = Lang.AppLangType
import BrowserIc = SvgIcons.BrowserIc
import { SettingsOptions } from './SettingsOptions'



const LangOptions = React.memo(()=>{
  
  const lang = useRecoilValue(LangRecoil)
  const [langSettings, setLangSettings] = useRecoilState(LangSettingsRecoil)
  
  
  const uiText = useUiValues(QuickSettingsUiText)
  
  
  const languageOptions = useMemo(
    ()=>{
      
      let opts = [
        {
          value: 'system',
          text: uiText.systemLanguage.text,
          icon: <BrowserIc css={SettingsOptions.icon}/>,
        },{
          value: 'ru-RU',
          text: uiText.russian.text,
          icon: <SettingsOptions.FlagIcon src={CountryFlag['ru-RU']}/>,
        },{
          value: 'en-US',
          text: uiText.english.text,
          icon: <SettingsOptions.FlagIcon src={CountryFlag['en-US']}/>,
        }
      ] satisfies { value: AppLangType|'system', [prop: string]: any }[]
      if (!lang.availableSystemLangs?.length) opts = opts.filter(it=>it.value!=='system')
      return opts
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
  
  
  return <RadioInputGroup>
    { languageOptions.map(opt =>
      <RadioInput
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
        <SettingsOptions.Container>
          {opt.icon}
          {opt.text}
        </SettingsOptions.Container>
      </RadioInput>
    )}
  </RadioInputGroup>
})
export default LangOptions


