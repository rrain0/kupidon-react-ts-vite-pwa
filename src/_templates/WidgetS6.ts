import {
  AppWidgetStyle, combinePartsToTypeSizeColor,
  WidgetStyle,
  WidgetStyleObj,
} from 'src/mini-libs/widget-style-6/WidgetStyle.ts'




/* export */ namespace WidgetS6 {
  
  
  export namespace Parts {
    export const base: WidgetStyleObj = { }
    
    export namespace Type {
      
      export namespace typeName {
        export namespace Shape {
          export namespace shapeName {
            //export const baseSize: WidgetStyleObj = { ...base }
            export namespace Size {
              // type: typeName, shape: shapeName, size: md
              export const md: WidgetStyle = [base, {
              
              }]
              // type: typeName, shape: shapeName, size: lg
              export const lg: WidgetStyle = [base, {
              
              }]
            }
          }
        }
        
        export const baseColor: AppWidgetStyle = t => ({ })
        export namespace Color {
          // type: typeName, color: normal
          export const normal: AppWidgetStyle = t => [baseColor, {
          
          }]
          // type: typeName, color: accent
          export const accent: AppWidgetStyle = t => [baseColor, {
          
          }]
        }
      }
      
    }
  }
  
  export const S = combinePartsToTypeSizeColor(Parts)
  
  
}


