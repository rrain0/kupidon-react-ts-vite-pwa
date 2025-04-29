import React, { useCallback, useMemo } from 'react'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import { CountryFlag } from 'src/ui-data/translations/CountryFlag.ts'
import { Lang } from '@util/lang/Lang.ts'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import RadioInput from 'src/ui/0-elements/inputs/RadioInput/RadioInput.tsx'
import RadioInputGroup from 'src/ui/0-elements/inputs/RadioInputGroup/RadioInputGroup.tsx'
import { RadioInputStyle } from 'src/ui/0-elements/inputs/RadioInput/RadioInputStyle.ts'
import { useAppZustand } from 'src/zustand/app/AppZustand.ts'
import { useLangSettingsZustand } from 'src/zustand/settings/LangSettingsZustand.ts'
import BrowserIc = SvgIconsPack.PlanetFrameIc
import { SettingsOptions } from './SettingsOptions'



type LangSupportedOrSystem = Lang.Supported | 'system'

const LangOptions = React.memo(() => {
  
  const canUseSystemLang = useAppZustand(s => s.canUseSystemLang)
  const { type, manual } = useLangSettingsZustand()
  const setLangSettings = useLangSettingsZustand.setState
  
  
  const titleText = useUiValues(TitleUiText)
  
  
  const languageOptions = useMemo(() => {
    return [
      ...canUseSystemLang ? [{
        value: 'system',
        text: titleText.systemLanguage,
        icon: <BrowserIc css={SettingsOptions.icon}/>,
      }] as const : [],
      {
        value: 'ru-RU',
        text: titleText.russian,
        icon: <SettingsOptions.FlagIcon src={CountryFlag['ru-RU']}/>,
      },
      {
        value: 'en-US',
        text: titleText.english,
        icon: <SettingsOptions.FlagIcon src={CountryFlag['en-US']}/>,
      },
    ] satisfies { value: LangSupportedOrSystem, [prop: string]: any }[]
  }, [titleText, canUseSystemLang])
  const isLanguageOptionChecked = useCallback((value: LangSupportedOrSystem) => {
    return type === 'system' && value === 'system'
      || type === 'manual' && value === manual?.[0]
  }, [type, manual])
  
  
  return (
    <RadioInputGroup>
      {languageOptions.map(opt => (
        <RadioInput
          css={RadioInputStyle.radio}
          childrenPosition="start"
          checked={isLanguageOptionChecked(opt.value)}
          value={opt.value}
          key={opt.value}
          onChange={ev => {
            if (opt.value === 'system') setLangSettings({ type: 'system' })
            else {
              setLangSettings({
                type: 'manual',
                manual: [opt.value],
              })
            }
          }}
        >
          <SettingsOptions.Container>
            {opt.icon}
            {opt.text}
          </SettingsOptions.Container>
        </RadioInput>
      ))}
    </RadioInputGroup>
  )
})
export default LangOptions


