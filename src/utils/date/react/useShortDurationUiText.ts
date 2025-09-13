import { useMemo } from 'react'
import { UiValues } from '@libs/ui-text/UiText.ts'
import { useUiValues } from '@libs/ui-text/useUiText.ts'
import { rangeHas } from 'src/utils/base/math/rangeUtils.ts'
import { Duration } from 'src/utils/date/react/useLiveShortDuration.ts'



const outerUiValues = {
  secondsShort: {
    'en-US': 's',
    'ru-RU': 'с',
  },
  minutesShort: {
    'en-US': 'm',
    'ru-RU': 'м',
  },
  hoursShort: {
    'en-US': 'h',
    'ru-RU': 'ч',
  },
  daysShort: {
    'en-US': 'd',
    'ru-RU': 'д',
  },
  weeksShort: {
    'en-US': 'w',
    'ru-RU': 'н',
  },
  monthsShort: {
    'en-US': 'mo',
    'ru-RU': 'мес',
  },
  yearsShort1to4: {
    'en-US': 'y',
    'ru-RU': 'г',
  },
  yearsShort5to0: {
    'en-US': 'y',
    'ru-RU': 'л',
  },
} satisfies UiValues



export const useShortDurationUiText = (duration: Duration | undefined) => {
  
  const uiValues = useMemo(() => ({
    secondsShort: outerUiValues.secondsShort,
    minutesShort: outerUiValues.minutesShort,
    hoursShort: outerUiValues.hoursShort,
    daysShort: outerUiValues.daysShort,
    weeksShort: outerUiValues.weeksShort,
    monthsShort: outerUiValues.monthsShort,
    yearsShort1to4: outerUiValues.yearsShort1to4,
    yearsShort5to0: outerUiValues.yearsShort5to0,
  }), [])
  
  const uiText = useUiValues(uiValues)
  
  if (!duration) return ''
  const { years, months, weeks, days, hours, minutes, seconds } = duration
  if (years) {
    const lastDigit = years % 10
    if (rangeHas(lastDigit, [1, 4])) return `${years}${uiText.yearsShort1to4}`
    return `${years}${uiText.yearsShort5to0}`
  }
  if (months) return `${months}${uiText.monthsShort}`
  if (weeks) return `${weeks}${uiText.weeksShort}`
  if (days) return `${days}${uiText.daysShort}`
  if (hours) return `${hours}${uiText.hoursShort}`
  if (minutes) return `${minutes}${uiText.minutesShort}`
  if (seconds) return `${seconds}${uiText.secondsShort}`
}


