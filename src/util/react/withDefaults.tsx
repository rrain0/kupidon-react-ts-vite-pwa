import React from 'react'
import { TypeU } from 'src/util/common/TypeU.ts'
import PartialDefaults = TypeU.PartialDefaults
import HtmlDataAttrs = TypeU.HtmlDataAttrs






export const withDefaults = <
  P extends object = object,
  DefaultP extends Partial<P> & HtmlDataAttrs = Partial<P> & HtmlDataAttrs,
  // Provided default props become optional
  OutP extends PartialDefaults<P, DefaultP> = PartialDefaults<P, DefaultP>,
>(
  defaultProps: DefaultP, Component: React.FC<P>,
): React.FC<OutP> => {
  // ⚠️ Need 'as any' because builtin Partial<T> allows
  // any prop of any value outside of keyof T (is it TS bug?)
  return (props: OutP) => <Component {...(defaultProps as any)} {...props}/>
}



//
// const MyImg = styled.img`
//   position: absolute;
//   left: 0;
//   top: 0;
//   width: 200px;
//   height: auto;
// `
//
// const MyComponent = (props: {
//   count: number
//   text: string
//   hidden?: boolean | undefined
//   isError?: boolean | undefined
// }) => <></>
//
// // ✅ Correct
// const MyComponentWithDefaults = withDefaults(MyComponent, { text: 'text', isError: true })
//
// // ❌ Must be error but it is correct
// const _MyComponentWithDefaults = withDefaults(MyComponent, { text: 'text', isError: true, a: 1 })
// // ⚠️ builtin Partial<T> allows any prop of any value outside of keyof T (is it TS bug?)
// /*
//  Not works:
//    type Partial<T extends object> = {
//    [Prop in string]?: Prop extends keyof T ? T[Prop] : never
//  }
//  Not supported:
//  type Partial<T> = {
//    [P in keyof T]?: T[P]
//    [...Rest in string]: never
//  }
//  */
//
// // ✅ Correct ⚠️ Error - TS2322: Type number is not assignable to type string
// const __MyComponentWithDefaults = withDefaults(MyComponent, { text: 1, isError: true })




//
// const UsageExample = () => {
//   return (
//     <>
//       {/* ✅ Correct */}
//       <MyImg/>
//       {/* ✅ Correct */}
//       <MyImgWithSrc src={isagi} alt="Isagi"/>
//
//       {/* ✅ Correct ⚠️ Error - Property count is missing in type {} but required in type */}
//       <MyComponentWithDefaults/>
//       {/* ✅ Correct ⚠️ Error - TS2322: Type string is not assignable to type number */}
//       <MyComponentWithDefaults count="one" hidden/>
//       {/* ✅ Correct */}
//       <MyComponentWithDefaults count={1}/>
//       {/* ✅ Correct */}
//       <MyComponentWithDefaults count={1} hidden/>
//       {/* ✅ Correct */}
//       <MyComponentWithDefaults count={1} text="text" isError={false}/>
//     </>
//   )
// }




//
// // ❌ - Deprecated - <Component>.default props
// // @ts-ignore
// MyImg.defaultProps = { src: nextUp }
//
// // ✅ Wrap component
// type Props<T extends React.ElementType> = React.ComponentPropsWithRef<T>
// const MyImgWithSrc = (props: Props<typeof MyImg>) => (
//   <MyImg {...props} src={nextUp} alt="Fire on black"/>
// )
//
//
// const withDefaultsNotTyped = (Component, defaultProps) => (props) => (
//   <Component {...defaultProps} {...props}/>
// )
//
//
// function f1<O1 extends object = object, O2 extends O1 = O1>(o1: O1, o2: O2) { }
// f1({ a: 1, b: undefined }, { a: 2, c: undefined, d: 1 })
//
//
// function f2<O1 extends object = object, O2 extends { [P in keyof O1]?: O1[P] } = O1>(o1: O1, o2: O2) { }
// f2({ a: 1, b: undefined }, { a: 2, c: undefined, d: 1 })


