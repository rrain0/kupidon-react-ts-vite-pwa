import { DateU } from 'src/util/date/DateU.ts'



export const getAge = (birthDate?: string): string => {
  if (!birthDate) return ''
  const age = DateU.age(birthDate)
  return `${age ?? ''}`
}

export const nameCommaAge = (name?: string, birthDate?: string) => {
  const age = getAge(birthDate)
  const nameAge = [name, age].filter(it => it).join(', ')
  return nameAge
}
