


export namespace CssUtils {
  
  
  const keywords = ['fit-header','fit-content','free']
  const units = ['%','px']
  const keywordPattern = `(?<keyword>${keywords.map(it=>`(${it})`).join('|')})`
  const numberPattern = `(?<number>(\\+|-)?((\\d)*\\.)?\\d+(e(\\+|-)?\\d+)?)`
  const unitPattern = `(?<unit>${units.map(it=>`(${it})`).join('|')})`
  const pattern = new RegExp(`^(${keywordPattern}|(${numberPattern}${unitPattern}?))$`,'i')
  //const pattern = /^((?<keyword>(fit-content))|((?<value>(\+|-)?((\d)*\.)?\d+(e(\+|-)?\d+)?)(?<unit>(%)|(px))?))$/i
  
  export type CssValue = { type: 'keyword', value: string }
    | { type: 'numeric', value: string, unit: string|undefined }
  export const parseCssStringValue = (cssStringValue: string): CssValue|undefined => {
    pattern.lastIndex = 0
    const match = cssStringValue.match(pattern)
    
    /*
     '-.2e-.1' => null
     '-.2e-1' => match with groups: {keyword: undefined, number: '-.2e-1', unit: undefined}
     '0' => match with groups: {keyword: undefined, number: '0', unit: undefined}
     '1e6' => match with groups: {keyword: undefined, number: '1e6', unit: undefined}
     '1e+6' => match with groups: {keyword: undefined, number: '1e+6', unit: undefined}
     '1e-6' => match with groups: {keyword: undefined, number: '1e-6', unit: undefined}
     '-50.1%' => match with groups: {keyword: undefined, number: '-50.1', unit: '%'}
     '+50.1%' => match with groups: {keyword: undefined, number: '+50.1', unit: '%'}
     '50.1%' => match with groups: {keyword: undefined, number: '50.1', unit: '%'}
     '50.%' => null
     '.1%' => match with groups: {keyword: undefined, number: '.1', unit: '%'}
     '.%' => null
     '-.1' => match with groups: {keyword: undefined, number: '-.1', unit: undefined}
     'fit-content' => {keyword: 'fit-content', number: undefined, unit: undefined}
     */
    //console.log('match',match)
    //console.log('groups',match?.groups)
    
    if (match?.groups?.keyword)
      return { type: 'keyword', value: match.groups.keyword }
    if (match?.groups?.number)
      return { type: 'numeric', value: match.groups.number, unit: match?.groups?.unit }
    return undefined
  }
  
  
}
