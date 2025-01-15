import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useMemo, useState } from 'react'
import { testDevWidgetStyle4 } from 'src/mini-libs/widget-style-4/style/WidgetStyle.ts'
import { ElemStyle } from 'src/mini-libs/widget-style/ElemStyle'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar'
import { Pages } from 'src/ui/components/Pages/Pages'



const ElemStyleTestPage = React.memo(() => {
  
  const [inputStyle, setInputStyle] = useState(`
  {
    "background": "#c0ffee",
    "size": "full",
    "hoverFrameBg": "green",
    "boxSz": "50%",
    "boxBg": "white"
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
          
          <button onClick={testDevWidgetStyle4}>Test</button>
          
          
          <div>Element Style</div>
          
          <Textarea
            value={inputStyle}
            onChange={ev => setInputStyle(ev.currentTarget.value)}
          />
          
          <Text>
            {transformedStyle}
          </Text>
          
          <Box>
            <MainTestFrame
              className="frame"
              css={css(transformedStyle)}
            >
              <MainTestBox
                className="box"
              />
            </MainTestFrame>
          </Box>
          
          <TestBox1>TestBox1</TestBox1>
          <TestBox2>TestBox2</TestBox2>
        
        </Pages.ContentFill>
      </Pages.SimplePage>
      
      
      <BottomButtonBar settingsBtn />
      
    </>
  )
})
export default ElemStyleTestPage



const Textarea = styled.textarea`
  width: 500px;
  height: 300px;
  padding: 10px;
`

const Text = styled.div`
  --var-angle: 0turn;
  @property --prop-angle {
    syntax: '<angle>';
    inherits: false;
    initial-value: 0turn;
  }
  width: 100%;
  height: fit-content;
  white-space: pre-line;
`

const Box = styled.div`
  width: 400px;
  height: 200px;
  border: 2px solid black;
`

const MainTestFrame = styled.div`

`
const MainTestBox = styled.div`

`

const TestBox1 = styled.div`
  width: 200px;
  height: 200px;
  background: aquamarine;
  @media (pointer: fine) {
    @media (hover: hover) {
      :hover {
        background: red;
      }
    }
  }
`


const TestBox2 = styled.div`
  width: 200px;
  height: 200px;
  background: aquamarine;
  @media ((pointer: fine)) and ((hover: hover)) {
    :hover {
      background: red;
    }
  }
`
