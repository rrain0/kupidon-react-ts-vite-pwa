import styled from '@emotion/styled'
import { flexStyle } from '@util/react/short-props/style/flexStyle.ts'
import React from 'react'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import { GradSvgIconS6 } from 'src/ui/0-elements/icons/GradSvgIcons/GradSvgIconS6.ts'
import { GradSvgIconsPack } from 'src/ui/0-elements/icons/GradSvgIcons/GradSvgIconsPack.tsx'
import { SvgIconS6 } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS6.ts'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import PageContentLayout from 'src/ui/components/Pages/PageContentLayout.tsx'
import PageLayout from 'src/ui/components/Pages/PageLayout.tsx'
import BottomFloatingBar from 'src/ui/components/screen-bars/BottomFloatingBar.tsx'



const IconsTestPage = React.memo(() => {
  
  return (
    <>
      
      <PageLayout col css={{ '*': { userSelect: 'text' } }}>
        <PageContentLayout col>
          
          <Flex>Icons showcase</Flex>
          
          <Flex row wrap g={10}>
            {Object.entries(SvgIconsPack).map(([name, Icon]) => (
              <IconItemBox key={name}>
                <Flex grow>{name}</Flex>
                <IconBox>
                  <Icon css={SvgIconS6.t([SvgIconS6.S.icon.icon.full.normal])}/>
                </IconBox>
              </IconItemBox>
            ))}
          </Flex>
          
          <Flex>Grad Icons showcase</Flex>
          
          <Flex row wrap g={10}>
            {Object.entries(GradSvgIconsPack).map(([name, Icon]) => (
              <IconItemBox key={name}>
                <Flex grow>{name}</Flex>
                <IconBox>
                  <Icon css={GradSvgIconS6.t(GradSvgIconS6.S.icon.icon.full.accent)}/>
                </IconBox>
              </IconItemBox>
            ))}
          </Flex>
        
        </PageContentLayout>
      </PageLayout>
      
      
      <BottomFloatingBar settingsButton/>
    
    </>
  )
})
IconsTestPage.displayName = 'IconsTestPage'
export default IconsTestPage


const IconItemBox = styled(Flex)(flexStyle({
  col: true, align: true, w: 200, h: 110, rad: 10, p: 4, g: 4,
  border: '2px solid #5f6b82',
}))
const IconBox = styled(Flex)(flexStyle({
  col: true, sz: 50, rad: 10, p: 4, g: 10,
  border: '2px solid #5f6b82',
}))

