import { arrEq } from 'src/utils/base/array/arrayUtils.ts'
import { stringifyEq } from 'src/utils/base/jsUtils.ts'



let prevLog
export const noRepeatLog = (...args: any[]) => {
  if (!stringifyEq(prevLog, args)) {
    prevLog = args
    console.log(...args)
  }
}

let prevLog2
export const noRepeatLog2 = (...args: any[]) => {
  if (!arrEq(args, prevLog2)) {
    prevLog2 = args
    console.log(...args)
  }
}

