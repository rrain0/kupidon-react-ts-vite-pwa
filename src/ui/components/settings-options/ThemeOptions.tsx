import React, { useMemo } from 'react'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import DayNightIc = SvgIconsPack.DayNightIc
import DayIc = SvgIconsPack.DayIc
import MoonIc = SvgIconsPack.MoonIc
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import RadioInput from 'src/ui/0-elements/inputs/RadioInput/RadioInput.tsx'
import RadioInputGroup from 'src/ui/0-elements/inputs/RadioInputGroup/RadioInputGroup.tsx'
import { RadioInputStyle } from 'src/ui/0-elements/inputs/RadioInput/RadioInputStyle.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import { useThemeSettingsZustand } from 'src/zustand/settings/ThemeSettingsZustand.ts'
import ThemeType = AppTheme.Type
import { SettingsOptions } from './SettingsOptions'




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

