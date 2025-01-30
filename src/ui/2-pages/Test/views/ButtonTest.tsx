import styled from '@emotion/styled'
import React from 'react'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar'
import { Pages } from 'src/ui/components/Pages/Pages'
import col = EmotionCommon.col
import rowWrap = EmotionCommon.rowWrap





const ButtonTest = React.memo(() => {
  
  return (
    <>
      
      <Pages.SimplePage>
        <Pages.ContentFill>
          
          
          <div>Buttons showcase</div>
          
          <BlocksContainer>
            {Object.entries(AllButtonStyles).flatMap(([typeName, shapes]) =>
              Object.entries(shapes).flatMap(([shapeName, sizes]) => (
                Object.entries(sizes).map(([sizeName, colors]) => (
                  <Buttons key={typeName + shapeName + sizeName}>
                    {Object.entries(colors as object).map(([colorName, style]) => (
                      <ButtonDescription key={colorName}>
                        <div>Type: {typeName}, Shape: {shapeName}</div>
                        <div>Size: {sizeName}, Color: {colorName}</div>
                        <ButtonBox css={{ width: sizeName === 'Big' ? 350 : 200 }}>
                          <Button css={ButtonS6.t(style)}>Button</Button>
                        </ButtonBox>
                      </ButtonDescription>
                    ))}
                  </Buttons>
                ))
              ))
            )}
          </BlocksContainer>
        
        </Pages.ContentFill>
      </Pages.SimplePage>
      
      
      <BottomButtonBar settingsBtn />
    
    </>
  )
})
export default ButtonTest

const BlocksContainer = styled.div`
  ${rowWrap};
  gap: 30px;
`

const Buttons = styled.div`
  ${col};
  gap: 10px;
`
const ButtonDescription = styled.div`
  ${col};
  width: 400px;
  gap: 10px;
`
const ButtonBox = styled.div`
  height: fit-content;
`




namespace AllButtonStyles {
  export namespace Filled {
    export namespace Rect {
      export namespace Big {
        export const main: AppWidgetStyle = ButtonS6.S.Filled.Rect.Big.main
        export const accent: AppWidgetStyle = ButtonS6.S.Filled.Rect.Big.accent
        export const normal: AppWidgetStyle = ButtonS6.S.Filled.Rect.Big.normal
        export const danger: AppWidgetStyle = ButtonS6.S.Filled.Rect.Big.danger
        export const normal2: AppWidgetStyle = ButtonS6.S.Filled.Rect.Big.normal2
        export const accent2: AppWidgetStyle = ButtonS6.S.Filled.Rect.Big.accent2
      }
      export namespace Normal {
        export const main: AppWidgetStyle = ButtonS6.S.Filled.Rect.Normal.main
        export const accent: AppWidgetStyle = ButtonS6.S.Filled.Rect.Normal.accent
        export const normal: AppWidgetStyle = ButtonS6.S.Filled.Rect.Normal.normal
        export const danger: AppWidgetStyle = ButtonS6.S.Filled.Rect.Normal.danger
        export const normal2: AppWidgetStyle = ButtonS6.S.Filled.Rect.Normal.normal2
        export const accent2: AppWidgetStyle = ButtonS6.S.Filled.Rect.Normal.accent2
      }
    }
    export namespace Rounded {
      export namespace Normal {
        export const main: AppWidgetStyle = ButtonS6.S.Filled.Rounded.Normal.main
        export const accent: AppWidgetStyle = ButtonS6.S.Filled.Rounded.Normal.accent
        export const normal: AppWidgetStyle = ButtonS6.S.Filled.Rounded.Normal.normal
        export const danger: AppWidgetStyle = ButtonS6.S.Filled.Rounded.Normal.danger
        export const normal2: AppWidgetStyle = ButtonS6.S.Filled.Rounded.Normal.normal2
        export const accent2: AppWidgetStyle = ButtonS6.S.Filled.Rounded.Normal.accent2
      }
      export namespace Normal2 {
        export const main: AppWidgetStyle = ButtonS6.S.Filled.Rounded.Normal2.main
        export const accent: AppWidgetStyle = ButtonS6.S.Filled.Rounded.Normal2.accent
        export const normal: AppWidgetStyle = ButtonS6.S.Filled.Rounded.Normal2.normal
        export const danger: AppWidgetStyle = ButtonS6.S.Filled.Rounded.Normal2.danger
        export const normal2: AppWidgetStyle = ButtonS6.S.Filled.Rounded.Normal2.normal2
        export const accent2: AppWidgetStyle = ButtonS6.S.Filled.Rounded.Normal2.accent2
      }
      export namespace Small {
        export const main: AppWidgetStyle = ButtonS6.S.Filled.Rounded.Small.main
        export const accent: AppWidgetStyle = ButtonS6.S.Filled.Rounded.Small.accent
        export const normal: AppWidgetStyle = ButtonS6.S.Filled.Rounded.Small.normal
        export const danger: AppWidgetStyle = ButtonS6.S.Filled.Rounded.Small.danger
        export const normal2: AppWidgetStyle = ButtonS6.S.Filled.Rounded.Small.normal2
        export const accent2: AppWidgetStyle = ButtonS6.S.Filled.Rounded.Small.accent2
      }
    }
    export namespace Round {
      export namespace Normal {
        export const main: AppWidgetStyle = ButtonS6.S.Filled.Round.Normal.main
        export const accent: AppWidgetStyle = ButtonS6.S.Filled.Round.Normal.accent
        export const normal: AppWidgetStyle = ButtonS6.S.Filled.Round.Normal.normal
        export const danger: AppWidgetStyle = ButtonS6.S.Filled.Round.Normal.danger
        export const normal2: AppWidgetStyle = ButtonS6.S.Filled.Round.Normal.normal2
        export const accent2: AppWidgetStyle = ButtonS6.S.Filled.Round.Normal.accent2
      }
      export namespace Big2 {
        export const main: AppWidgetStyle = ButtonS6.S.Filled.Round.Big2.main
        export const accent: AppWidgetStyle = ButtonS6.S.Filled.Round.Big2.accent
        export const normal: AppWidgetStyle = ButtonS6.S.Filled.Round.Big2.normal
        export const danger: AppWidgetStyle = ButtonS6.S.Filled.Round.Big2.danger
        export const normal2: AppWidgetStyle = ButtonS6.S.Filled.Round.Big2.normal2
        export const accent2: AppWidgetStyle = ButtonS6.S.Filled.Round.Big2.accent2
      }
    }
  }
  export namespace Outlined {
    export namespace Rounded {
      export namespace Normal {
        export const accent: AppWidgetStyle = ButtonS6.S.Outlined.Rounded.Normal.accent
        export const normal: AppWidgetStyle = ButtonS6.S.Outlined.Rounded.Normal.normal
      }
      export namespace Small {
        export const accent: AppWidgetStyle = ButtonS6.S.Outlined.Rounded.Small.accent
        export const normal: AppWidgetStyle = ButtonS6.S.Outlined.Rounded.Small.normal
      }
    }
  }
  export namespace Text {
    export namespace Rect {
      export namespace Big {
        export const normal: AppWidgetStyle = ButtonS6.S.Text.Rect.Big.normal
        export const normal2: AppWidgetStyle = ButtonS6.S.Text.Rect.Big.normal2
      }
      export namespace Normal {
        export const normal: AppWidgetStyle = ButtonS6.S.Text.Rect.Normal.normal
        export const normal2: AppWidgetStyle = ButtonS6.S.Text.Rect.Normal.normal2
      }
    }
    export namespace Rounded {
      export namespace Normal {
        export const normal: AppWidgetStyle = ButtonS6.S.Text.Rounded.Normal.normal
        export const normal2: AppWidgetStyle = ButtonS6.S.Text.Rounded.Normal.normal2
      }
      export namespace Small {
        export const normal: AppWidgetStyle = ButtonS6.S.Text.Rounded.Small.normal
        export const normal2: AppWidgetStyle = ButtonS6.S.Text.Rounded.Small.normal2
      }
      export namespace Normal2 {
        export const normal: AppWidgetStyle = ButtonS6.S.Text.Rounded.Normal2.normal
        export const normal2: AppWidgetStyle = ButtonS6.S.Text.Rounded.Normal2.normal2
      }
      export namespace Normal2Uppercase {
        export const normal: AppWidgetStyle = ButtonS6.S.Text.Rounded.Normal2Uppercase.normal
        export const normal2: AppWidgetStyle = ButtonS6.S.Text.Rounded.Normal2Uppercase.normal2
      }
    }
    export namespace Round {
      export namespace Big {
        export const normal: AppWidgetStyle = ButtonS6.S.Text.Round.Big.normal
        export const normal2: AppWidgetStyle = ButtonS6.S.Text.Round.Big.normal2
      }
      export namespace Big2 {
        export const normal: AppWidgetStyle = ButtonS6.S.Text.Round.Big2.normal
        export const normal2: AppWidgetStyle = ButtonS6.S.Text.Round.Big2.normal2
      }
    }
  }
}