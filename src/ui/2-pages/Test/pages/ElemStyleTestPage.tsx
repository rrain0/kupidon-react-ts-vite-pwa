import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useMemo, useState } from 'react'
import { ElemStyle } from 'src/mini-libs/widget-style/ElemStyle'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar'
import { Pages } from 'src/ui/components/Pages/Pages'



const ElemStyleTestPage = React.memo(
  () => {
    
    const [inputStyle, setInputStyle] = useState(`
    {
      "bg": "#c0ffee",
      "size": "full",
      "hoverBg": "green"
    }
    `)
    
    const transformedStyle = useMemo(() => {
      try {
        return ElemStyle.transformObjectStyle(JSON.parse(inputStyle))
      }
      catch (ex: any) {
        return ex?.toString()
      }
    }, [inputStyle])
    
    return (
      <>
        
        <Pages.SimplePage>
          <Pages.ContentFill>
            
            
            <div>Element Style</div>
            
            <Textarea
              value={inputStyle}
              onChange={ev => setInputStyle(ev.currentTarget.value)}
            />
            
            <Text>
              {transformedStyle}
            </Text>
            
            <Box>
              <div css={css(transformedStyle)} />
            </Box>
            
          
          </Pages.ContentFill>
        </Pages.SimplePage>
        
        
        <BottomButtonBar settingsBtn/>
        
      </>
    )
  }
)
export default ElemStyleTestPage



const Textarea = styled.textarea`
  width: 500px;
  height: 500px;
`

const Text = styled.div`
  width: 100%;
  height: fit-content;
`

const Box = styled.div`
  width: 400px;
  height: 200px;
  border: 2px solid black;
`

