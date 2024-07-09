import React, { useCallback, useMemo } from 'react'
import { useRecoilState } from 'recoil'
import { ThemeSettingsRecoil } from 'src/recoil/state/ThemeSettingsRecoil.ts'
import { useUiValues } from '@util/ui-text/useUiText.ts'
import { SvgIcons } from 'src/ui/elements/icons/SvgIcons/SvgIcons.tsx'
import DayNightIc = SvgIcons.DayNightIc
import DayIc = SvgIcons.DayIc
import MoonIc = SvgIcons.MoonIc
import { AppTheme } from '@util/theme/AppTheme.ts'
import RadioInput from 'src/ui/elements/inputs/RadioInput/RadioInput.tsx'
import RadioInputGroup from 'src/ui/elements/inputs/RadioInputGroup/RadioInputGroup.tsx'
import { RadioInputStyle } from 'src/ui/elements/inputs/RadioInput/RadioInputStyle.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import ThemeType = AppTheme.Type
import { SettingsOptions } from './SettingsOptions'




const ThemeOptions = React.memo(
()=>{
  const [themeSettings, setThemeSettings] = useRecoilState(ThemeSettingsRecoil)
  
  
  const titleText = useUiValues(TitleUiText)
  
  
  const themeOptions = useMemo(
    ()=>{
      let opts = [
        {
          value: 'system',
          text: titleText.systemTheme,
          icon: <DayNightIc css={SettingsOptions.icon}/>,
    },{
        value: 'light',
          text: titleText.lightTheme,
          icon: <DayIc css={SettingsOptions.icon}/>,
      },{
        value: 'dark',
          text: titleText.darkTheme,
          icon: <MoonIc css={SettingsOptions.iconSmall}/>,
      }
    ] satisfies { value: ThemeType|'system', [prop: string]: any }[]
      return opts
    },
    [titleText]
  )
  const themeOptionChecked = useCallback(
    function (value: ThemeType|'system') {
      return themeSettings.setting === 'system' && value === 'system'
        || themeSettings.setting === 'manual' && value === themeSettings.manualSetting
    },
    [themeSettings]
  )
  
  
  return <RadioInputGroup>
    { themeOptions.map(opt =>
      <RadioInput
        css={RadioInputStyle.radio}
        childrenPosition="start"
        checked={themeOptionChecked(opt.value)}
        value={opt.value}
        key={opt.value}
        onChange={ev => {
          setThemeSettings(s => ({
            ...s,
            setting: opt.value === 'system' ? 'system' : 'manual',
            manualSetting: opt.value === 'system' ? s.manualSetting : opt.value,
          }))
        }}
      >
        <SettingsOptions.Container>
          {opt.icon}
          {opt.text}
        </SettingsOptions.Container>
      </RadioInput>) }
  </RadioInputGroup>
})
export default ThemeOptions

