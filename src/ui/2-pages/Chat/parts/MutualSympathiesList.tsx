import styled from '@emotion/styled'
import { CssU } from '@util/css/CssU.ts'
import React from 'react'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import Gap from 'src/ui/0-elements/basic-elements/Gap.tsx'
import Ava from 'src/ui/1-widgets/avatars/Ava/Ava.tsx'
import { offsetToPageContentPaddings } from 'src/ui/components/Pages/offsetToPageContentPaddings.ts'
import { ReactU } from 'src/util/react/ReactU'
import ClassStyle = ReactU.ClassStyle
import Txt = EmotionCommon.Txt
import max1Line = EmotionCommon.max1Line
import max1LineBox = EmotionCommon.max1LineBox
import noScrollbars = EmotionCommon.noScrollbars
import virtualOffset = CssU.virtualOffset







export type MutualSympathiesItem = {
  id: string
  ava?: string | undefined
  online?: boolean | undefined
  name: string
}


export type MutualSympathiesListProps = {
  mutualSympathiesItems: MutualSympathiesItem[]
} & ClassStyle

export const MutualSympathiesList = React.memo((props: MutualSympathiesListProps) => {
  const {
    className, style,
    mutualSympathiesItems,
  } = props
  
  return (
    <Flex col>
      <Flex row align
        data-display-name='MutualSympathiesList'
        className={className}
        style={style}
      >
      
      </Flex>
    
      <Gap h={14}/>
      
      <Flex row>
        <Flex row g={23}
          css={[
            offsetToPageContentPaddings({ h: true }),
            virtualOffset({ t: 4 }),
            { overflow: 'auto' },
            noScrollbars,
          ]}
        >
          {mutualSympathiesItems.slice(0, 7).map(({ id, ava, name, online }) => (
            <Flex w={66} key={id} col noShrink align g={7}>
              <Ava id={id} ava={ava} online={online} mutualSympathy/>
              <NameBox><Name>{name}</Name></NameBox>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Flex>
  )
})
MutualSympathiesList.displayName = 'MutualSympathiesList'
export default MutualSympathiesList





const NameBox = styled.div`
  ${max1LineBox};
`
const Name = styled.div`
  ${Txt.s17Bold};
  ${max1Line};
  // TODO Theme
  color: black;
  text-align: center;
`





