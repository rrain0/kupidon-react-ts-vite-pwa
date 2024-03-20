import { useLayoutEffect, useMemo, useState } from 'react'
import { ArrayUtils } from 'src/utils/common/ArrayUtils'
import NonEmptyArr = ArrayUtils.NonEmptyArr




/*
  https://datatracker.ietf.org/doc/html/rfc5646
  
  Page 7:
   These conventions include:
   
   o  [ISO639-1] recommends that language codes be written in lowercase
   ('mn' Mongolian).
   
   o  [ISO15924] recommends that script codes use lowercase with the
   initial letter capitalized ('Cyrl' Cyrillic).
   
   o  [ISO3166-1] recommends that country codes be capitalized ('MN'
   Mongolia).
   
   Page 65:
   Tag to truncate: zh-Latn-CN-variant1-a-extend1-x-wadegile-private1
   1. zh-Latn-CN-variant1-a-extend1-x-wadegile
   2. zh-Latn-CN-variant1-a-extend1
   3. zh-Latn-CN-variant1
   4. zh-Latn-CN
   5. zh-Latn
   6. zh
   
   Page 80+: others examples
*/


/*

  Examples:
  navigator.language => "ru-RU"
  navigator.languages => ["ru-RU", "en", "en-us", "en-US", "zh-CN", "ja-JP"]

*/



// returns array of at least 1 language or undefined
export const useLangDetector = (): NonEmptyArr<string> | undefined => {
  
  const [browserLangs,setBrowserLangs] = useState(()=>getBrowserLangs())
  
  
  useLayoutEffect(()=>{
    const onLangChange = ()=>setBrowserLangs(getBrowserLangs())
    window.addEventListener('languagechange',onLangChange)
    return ()=>window.removeEventListener('languagechange',onLangChange)
  },[])
  
  
  const langs = useMemo(
    ()=>browserLangs?.map(it=>{
        if (it.startsWith('en')) return 'en-US'
        if (it.startsWith('ru')) return 'ru-RU'
        return it
    }),
    [browserLangs]
  ) as NonEmptyArr<string> | undefined
  
  //return useMemo(()=>["ja-JP"],[])
  //return undefined
  return langs
}


const getBrowserLangs = (): NonEmptyArr<string> | undefined => {
  let langs: readonly string[] | undefined = navigator.languages
  if (!langs?.length && navigator.language)
    langs = [navigator.language]
  if (!langs?.length) langs = undefined
  return langs as NonEmptyArr<string> | undefined
}
