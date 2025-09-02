
declare module 'csstype' {
  
  export interface Properties<TLength = (string & {}) | 0, TTime = string & {}>
    extends StandardProperties<TLength, TTime>,
    VendorProperties<TLength, TTime>,
    ObsoleteProperties<TLength, TTime>,
    SvgProperties<TLength, TTime> {
    [Prop in `--${string}`]: string | number
  }
  
}
