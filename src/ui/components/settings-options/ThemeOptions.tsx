import React, { useCallback, useMemo } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { ThemeRecoil } from 'src/recoil/state/ThemeRecoil.ts'
import { ThemeSettingsRecoil } from 'src/recoil/state/ThemeSettingsRecoil.ts'
import { ApplicationSettingsUiText } from 'src/ui/pages/ApplicationSettings/uiText.ts'
import { useUiValues } from '@util/ui-text0/useUiText.ts'
import { SvgIcons } from 'src/ui/elements/icons/SvgIcons.tsx'
import DayNightIc = SvgIcons.DayNightIc
import DayIc = SvgIcons.DayIc
import MoonIc = SvgIcons.MoonIc
import { AppTheme } from '@util/theme/AppTheme.ts'
import RadioInput from 'src/ui/elements/inputs/RadioInput/RadioInput.tsx'
import RadioInputGroup from 'src/ui/elements/inputs/RadioInput/RadioInputGroup.tsx'
import { RadioInputStyle } from 'src/ui/elements/inputs/RadioInput/RadioInputStyle.ts'
import ThemeType = AppTheme.Type
import { SettingsOptions } from './SettingsOptions'




const ThemeOptions = React.memo(
()=>{
  const theme = useRecoilValue(ThemeRecoil)
  const [themeSettings, setThemeSettings] = useRecoilState(ThemeSettingsRecoil)
  
  
  const uiText = useUiValues(ApplicationSettingsUiText)
  
  
  const themeOptions = useMemo(
    ()=>{
      let opts = [
        {
          value: 'system',
          text: uiText.systemTheme.text,
          icon: <DayNightIc css={SettingsOptions.icon}/>,
    },{
        value: 'light',
          text: uiText.lightTheme.text,
          icon: <DayIc css={SettingsOptions.icon}/>,
      },{
        value: 'dark',
          text: uiText.darkTheme.text,
          icon: <MoonIc css={SettingsOptions.iconSmall}/>,
      }
    ] satisfies { value: ThemeType|'system', [prop: string]: any }[]
      return opts
    },
    [uiText]
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

