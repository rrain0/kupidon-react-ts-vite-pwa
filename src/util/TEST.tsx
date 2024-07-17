import React from 'react'



export { }


/* Write here what you wanna test */



const withDefaultsNotTyped = (defaultProps, Component) => React.forwardRef(
  (props, forwardedRef) => {
    return <Component {...defaultProps} {...props} ref={forwardedRef} />
  }
)

/*
Don't know how to type ref
const withDefaults =
  <FC extends React.FC<P>, P extends object>
  (defaultProps: NoInfer<PropsWithoutRef<P>>, Component: FC): FC =>
    React.forwardRef<React.ElementRef<FC>, React.ComponentPropsWithoutRef<P>>(
      (props, forwardedRef) => {
        return <Component {...defaultProps} {...props} ref={forwardedRef} />
      }
    )
*/




function test() {
  const obj1 = {
    name: 'aaaa',
  }
  const ageName = 'age' as const
  const objAddGetAge = {
    get [ageName]() { return 8 },
  }
  const obj2 = {
    ...obj1,
    ...objAddGetAge,
  }
  console.log(obj2.age)
}




export function SmartBerryTestTasks() {
  const groupBy = <T extends string | number, K extends string | number>
  (arr: T[], filter: (val: T) => K): Record<K, T[]> => {
    const obj = { } as Record<K, T[]>
    arr.forEach(v => {
      const key = filter(v)
      ;(obj[key] ??= []).push(v)
    })
    return obj
  }
  
  
  const compress = (numbers: number[]): string => {
    const sorted = numbers.toSorted((a, b) => a - b)
    console.log('sorted', sorted)
    if (!sorted.length) return ''
    if (sorted.length === 1) return sorted[0] + ''
    const ranges: number[][] = [[sorted[0]]]
    let startIdx = 0
    for (let i = 1; i <= sorted.length; i++) {
      if (i === sorted.length || sorted[i] !== sorted[i-1] + 1) {
        if (startIdx !== i - 1) {
          ranges[ranges.length - 1].push(sorted[i - 1])
        }
        if (i === sorted.length) break
        ranges.push([sorted[i]])
        startIdx = i
      }
    }
    return ranges.map(r => r.join('-')).join(',')
  }
  
  console.log('compress([1, 4, 5, 2, 3, 9, 8, 11, 0])', compress([1, 4, 5, 2, 3, 9, 8, 11, 0]))
  console.log('compress([1, 4, 3, 2])', compress([1, 4, 3, 2]))
  console.log('compress([1, -4, 3, -2, 0])', compress([1, -4, 3, -2, 0]))
  
  
  
  const canMakePalindrome = (str: string): boolean => {
    let skipLeft = 0
    let skipRight = 0
    for (let i = 0; i < str.length / 2; i++) {
      const l = i + skipLeft
      const r = str.length - 1 - i - skipRight
      if (str[l] !== str[r]) {
        if (!skipLeft && !skipRight) {
          //if (l === r - 1) return false
          if (str[l] === str[r-1]) {
            skipRight = 1
          }
          else if (str[l+1] === str[r]) {
            skipLeft = 1
          }
          else return false
        }
        else return false
      }
    }
    return true
  }
  
  
  console.log('canMakePalindrome("aaab")', canMakePalindrome('aaab'))
  console.log('canMakePalindrome("xyz")', canMakePalindrome('xyz'))
  console.log('canMakePalindrome("axyza")', canMakePalindrome('axyza'))
  console.log('canMakePalindrome("xyaz")', canMakePalindrome('xyaz'))
  console.log('canMakePalindrome("xayaz")', canMakePalindrome('xayaz'))
  console.log('canMakePalindrome("abab")', canMakePalindrome('abab'))
  
}
