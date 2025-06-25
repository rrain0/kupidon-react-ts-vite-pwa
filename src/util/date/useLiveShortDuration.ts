import {
  addMonths,
  addYears,
  differenceInCalendarMonths,
  differenceInCalendarYears,
  differenceInDays, differenceInHours, differenceInMinutes,
  differenceInSeconds,
  differenceInWeeks,
} from 'date-fns'
import { useEffect, useState } from 'react'
import { TypeU } from 'src/util/common/TypeU.ts'
import { JsU } from 'src/util/js/JsU.ts'
import Pu = TypeU.Pu
import isdef = TypeU.isdef
import maxTimeout = JsU.maxTimeout



export type Duration = Pu<{
  seconds: number
  minutes: number
  hours: number
  days: number
  weeks: number
  months: number
  years: number
}>

export const useLiveShortDuration = (date: string | undefined): Duration | undefined => {
  
  const [duration, setDuration] = (
    useState(() => date ? getShortDurationUntilNow(date) : undefined)
  )
  
  useEffect(() => {
    setDuration(date ? getShortDurationUntilNow(date) : undefined)
  }, [date])
  
  useEffect(() => {
    if (isdef(date) && duration) {
      const timeout = (() => {
        const dateMs = +new Date(date)
        const nowMs = Date.now()
        const { years, months, weeks, days, hours, minutes, seconds } = duration
        if (years) return Math.min(+addYears(dateMs, years + 1) - nowMs, maxTimeout)
        if (months) return Math.min(+addMonths(dateMs, months + 1) - nowMs, maxTimeout)
        if (weeks) return dateMs + (weeks + 1) * 1000 * 60 * 60 * 24 * 7 - nowMs
        if (days) return dateMs + (days + 1) * 1000 * 60 * 60 * 24 - nowMs
        if (hours) return dateMs + (hours + 1) * 1000 * 60 * 60 - nowMs
        if (minutes) return dateMs + (minutes + 1) * 1000 * 60 - nowMs
        return dateMs + ((seconds ?? 0) + 1) * 1000 - nowMs
      })()
      if (isdef(timeout)) {
        const timerId = setTimeout(() => setDuration(getShortDurationUntilNow(date)), timeout)
        return () => clearTimeout(timerId)
      }
    }
  }, [duration])
  
  return duration
}


const getShortDurationUntilNow = (date: string): Duration => {
  const now = new Date()
  const years = differenceInCalendarYears(now, date)
  if (years) return { years }
  const months = differenceInCalendarMonths(now, date)
  if (months) return { months }
  const weeks = differenceInWeeks(now, date)
  if (weeks) return { weeks }
  const days = differenceInDays(now, date)
  if (days) return { days }
  const hours = differenceInHours(now, date)
  if (hours) return { hours }
  const minutes = differenceInMinutes(now, date)
  if (minutes) return { minutes }
  const seconds = differenceInSeconds(now, date)
  return { seconds }
}

