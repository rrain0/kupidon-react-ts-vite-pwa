import * as CSS from 'csstype'


declare namespace React {
  
  /*
  Fix type for css custom properties for cases like:
  <Component
    style={{
      '--bg': `url(${someBg})`,
    }}
  >
  */
  export interface CSSProperties extends CSS.Properties<string | number> {
    [Prop in `--${string}`]: string | number
  }
  
}
