import { useLayoutEffect, useState } from 'react'
import { ArrayU } from 'src/util/common/ArrayU.ts'
import NonEmptyArr = ArrayU.NonEmptyArr




// returns an array of at least 1 language
export const useLangDetector = (): NonEmptyArr<string> => {
  
  const [browserLangs, setBrowserLangs] = useState(navigator.languages)
  //const [browserLangs, setBrowserLangs] = useState(["ja-JP"])
  
  
  useLayoutEffect(() => {
    const onLangChange = () => setBrowserLangs(navigator.languages)
    //const onLangChange = () => setBrowserLangs(["ja-JP"])
    window.addEventListener('languagechange', onLangChange)
    return () => window.removeEventListener('languagechange', onLangChange)
  }, [])
  
  
  return browserLangs as NonEmptyArr<string>
}






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

