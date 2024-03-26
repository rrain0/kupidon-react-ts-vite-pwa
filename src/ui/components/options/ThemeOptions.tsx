import React, { useCallback, useMemo } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { ThemeRecoil } from 'src/recoil/state/ThemeRecoil.ts'
import { ThemeSettingsRecoil } from 'src/recoil/state/ThemeSettingsRecoil.ts'
import {
  OptionContainer,
  optionIcon,
  optionIconSmall,
} from 'src/ui/components/options/OptionsCommon.tsx'
import { ApplicationSettingsUiText } from 'src/ui/pages/ApplicationSettings/uiText.ts'
import { useUiValues } from 'src/ui/ui-text/useUiText.ts'
import { SvgIcons } from 'src/ui/widgets/icons/SvgIcons.tsx'
import DayNightIc = SvgIcons.DayNightIc
import DayIc = SvgIcons.DayIc
import MoonIc = SvgIcons.MoonIc
import { AppTheme } from 'src/ui/theme/AppTheme.ts'
import RadioInput from 'src/ui/widgets/inputs/RadioInput/RadioInput.tsx'
import RadioInputGroup from 'src/ui/widgets/inputs/RadioInput/RadioInputGroup.tsx'
import { RadioInputStyle } from 'src/ui/widgets/inputs/RadioInput/RadioInputStyle.ts'
import ThemeType = AppTheme.Type




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
          icon: <DayNightIc css={optionIcon}/>,
    },{
        value: 'light',
          text: uiText.lightTheme.text,
          icon: <DayIc css={optionIcon}/>,
      },{
        value: 'dark',
          text: uiText.darkTheme.text,
          icon: <MoonIc css={optionIconSmall}/>,
      }
    ] satisfies { value: ThemeType|'system', [prop: string]: any }[]
      if (!theme.systemThemeAvailable) opts = opts.filter(it=>it.value!=='system')
      return opts
    },
    [uiText, theme.systemThemeAvailable]
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
        <OptionContainer>
          {opt.icon}
          {opt.text}
        </OptionContainer>
      </RadioInput>) }
  </RadioInputGroup>
})
export default ThemeOptions

