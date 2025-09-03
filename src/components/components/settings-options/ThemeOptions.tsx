import React, { useMemo } from 'react'
import { useUiValues } from '@libs/ui-text/useUiText.ts'
import DayIc from 'src/components/elems/icons/SvgIcons/pack/ui/DayIc.tsx'
import DayNightIc from 'src/components/elems/icons/SvgIcons/pack/ui/DayNightIc.tsx'
import { AppTheme } from 'src/styles/themes/AppTheme.ts'
import MoonIc from 'src/components/elems/icons/SvgIcons/pack/ui/MoonIc.tsx'
import RadioInput from 'src/components/elems/inputs/RadioInput/RadioInput.tsx'
import RadioInputGroup from 'src/components/elems/inputs/RadioInputGroup/RadioInputGroup.tsx'
import { RadioInputStyle } from 'src/components/elems/inputs/RadioInput/RadioInputStyle.ts'
import { TitleUiText } from 'src/locales/translations/TitleUiText.ts'
import { useThemeSettingsZustand } from 'src/zustand/settings/ThemeSettingsZustand.ts'
import ThemeType = AppTheme.Type
import { SettingsOptions } from './SettingsOptions.tsx'




const ThemeOptions = React.memo(() => {
  const { type, manual } = useThemeSettingsZustand()
  const setThemeSettings = useThemeSettingsZustand.setState
  
  
  const titleText = useUiValues(TitleUiText)
  
  
  const themeOptions = useMemo(() => {
    const opts = [
      {
        value: 'system',
        text: titleText.systemTheme,
        icon: <DayNightIc css={SettingsOptions.icon}/>,
      },
      {
        value: 'light',
        text: titleText.lightTheme,
        icon: <DayIc css={SettingsOptions.icon}/>,
      },
      {
        value: 'dark',
        text: titleText.darkTheme,
        icon: <MoonIc css={SettingsOptions.iconSmall}/>,
      },
    ] satisfies { value: ThemeType|'system', [prop: string]: any }[]
    return opts
  }, [titleText])
  
  const themeOptionChecked = (value: ThemeType | 'system') => {
    return type === 'system' && value === 'system'
      || type === 'manual' && value === manual
  }
  
  
  return (
    <RadioInputGroup>
      { themeOptions.map(opt => (
        <RadioInput
          css={RadioInputStyle.radio}
          childrenPosition="start"
          checked={themeOptionChecked(opt.value)}
          value={opt.value}
          key={opt.value}
          onChange={ev => {
            setThemeSettings({
              type: opt.value === 'system' ? 'system' : 'manual',
              ...opt.value !== 'system' && { manual: opt.value },
            })
          }}
        >
          <SettingsOptions.Container>
            {opt.icon}
            {opt.text}
          </SettingsOptions.Container>
        </RadioInput>
      )) }
    </RadioInputGroup>
  )
})
export default ThemeOptions

