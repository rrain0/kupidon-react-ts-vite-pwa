import styled from '@emotion/styled'
import { flexStyle } from '@util/react/short-props/style/flexStyle.ts'
import React from 'react'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import { GradSvgIconS6 } from 'src/ui/0-elements/icons/GradSvgIcons/GradSvgIconS6.ts'
import ArrowAngledRounded2GradIc
  from 'src/ui/0-elements/icons/GradSvgIcons/pack/ui/ArrowAngledRounded2GradIc.tsx'
import AddModuleIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/AddModuleIc.tsx'
import { SvgIconS6 } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS6.ts'
import PageContentLayout from 'src/ui/components/page/PageContentLayout.tsx'
import PageLayout from 'src/ui/components/page/PageLayout.tsx'
import BottomFloatingBar from 'src/ui/components/screen-bars/BottomFloatingBar.tsx'



const IconsTestPage = React.memo(() => {
  
  return (
    <>
      
      <PageLayout col css={{ '*': { userSelect: 'text' } }}>
        <PageContentLayout col>
          
          <Flex>Icons showcase</Flex>
          
          <Flex row wrap g={10}>
            {Icons.map(({ name, Icon, style }) => (
              <IconItemBox key={name}>
                <Flex grow>{name}</Flex>
                <IconBox>
                  <Icon css={style}/>
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





const iconS = SvgIconS6.t(SvgIconS6.S.icon.icon.full.normal)
const gradIconS = GradSvgIconS6.t(GradSvgIconS6.S.icon.icon.full.accent)

// TODO add all icons
const Icons = [
  // UI icons
  { name: 'AddModuleIc', Icon: AddModuleIc, style: iconS },
  
  // Special icons
  
  
  // Gradient UI ArrowAngledRounded2GradIc
  { name: 'ArrowAngledRounded2GradIc', Icon: ArrowAngledRounded2GradIc, style: gradIconS },
  
  // Gradient Special icons
  
]

