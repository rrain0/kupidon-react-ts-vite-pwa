import React, { useCallback, useMemo } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { LangRecoil } from 'src/recoil/state/LangRecoil.ts'
import { LangSettingsRecoil } from 'src/recoil/state/LangSettingsRecoil.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import { CountryFlag } from 'src/ui-data/translations/CountryFlag.ts'
import { Lang } from '@util/lang/Lang.ts'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import { SvgIcons } from 'src/ui/elements/icons/SvgIcons/SvgIcons.tsx'
import RadioInput from 'src/ui/elements/inputs/RadioInput/RadioInput.tsx'
import RadioInputGroup from 'src/ui/elements/inputs/RadioInputGroup/RadioInputGroup.tsx'
import { RadioInputStyle } from 'src/ui/elements/inputs/RadioInput/RadioInputStyle.ts'
import BrowserIc = SvgIcons.BrowserIc
import { SettingsOptions } from './SettingsOptions'



const LangOptions = React.memo(()=>{
  
  const lang = useRecoilValue(LangRecoil)
  const [langSettings, setLangSettings] = useRecoilState(LangSettingsRecoil)
  
  
  const titleText = useUiValues(TitleUiText)
  
  
  const languageOptions = useMemo(
    ()=>{
      let opts = [
        {
          value: 'system',
          text: titleText.systemLanguage,
          icon: <BrowserIc css={SettingsOptions.icon}/>,
        },{
          value: 'ru-RU',
          text: titleText.russian,
          icon: <SettingsOptions.FlagIcon src={CountryFlag['ru-RU']}/>,
        },{
          value: 'en-US',
          text: titleText.english,
          icon: <SettingsOptions.FlagIcon src={CountryFlag['en-US']}/>,
        }
      ] satisfies { value: Lang.Supported|'system', [prop: string]: any }[]
      if (!lang.matchedSystemLangs?.length) opts = opts.filter(it=>it.value!=='system')
      return opts
    },
    [titleText, lang.matchedSystemLangs]
  )
  const isLanguageOptionChecked = useCallback(
    function (value: Lang.Supported|'system') {
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


