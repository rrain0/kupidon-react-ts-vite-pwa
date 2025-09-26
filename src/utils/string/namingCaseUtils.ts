


export const camelCaseToKebabCase = (str: string) => (
  // '$&' - заменяется на найденную подстроку (найденный match)
  str.replace(/\p{Lu}|\d+/gu, '-$&').toLowerCase()
)
export const kebabCaseToCamelCase = (str: string) => (
  str.replace(/-./g, match => match[1].toUpperCase())
)



// 'placeSubType0123aHTMLanguage'.split(/(?<=\p{Ll}|\p{Lu})(?=\p{Lu}|\d+)/u) =>
// ['place', 'Sub', 'Type', '0123a', 'H', 'T', 'M', 'Language']
export const camelCaseToWords = (str: string) => (
  str.split(/(?<=\p{Ll}|\p{Lu})(?=\p{Lu}|\d+)/u)
)
