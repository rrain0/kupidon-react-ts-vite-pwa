import { age } from 'src/utils/date/dateUtils.ts'



export const getAge = (birthDate?: string): string => {
  if (!birthDate) return ''
  return `${age(birthDate) ?? ''}`
}

export const nameCommaAge = (name?: string, birthDate?: string) => {
  const age = getAge(birthDate)
  const nameAge = [name, age].filter(it => it).join(', ')
  return nameAge
}
