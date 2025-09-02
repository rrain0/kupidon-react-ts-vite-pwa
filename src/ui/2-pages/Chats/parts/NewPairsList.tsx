import styled from '@emotion/styled'
import { virtualOffset } from '@utils/css/virtualOffset.ts'
import React from 'react'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import Gap from 'src/ui/0-elements/basic-elements/Gap.tsx'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import HeaderArrow from 'src/ui/0-elements/HeaderArrow/HeaderArrow.tsx'
import { HeaderArrowS } from 'src/ui/0-elements/HeaderArrow/HeaderArrowS.ts'
import AvaButton from 'src/ui/1-widgets/avatars/Ava/AvaButton.tsx'
import AppLink from 'src/ui/components/app-router/AppLink.tsx'
import { offsetToPageContentPaddings } from 'src/ui/components/page/offsetToPageContentPaddings.ts'
import { ReactU } from '@utils/react/ReactU.ts'
import ClassStyle = ReactU.ClassStyle
import Txt = EmotionCommon.Txt
import max1Line = EmotionCommon.max1Line
import max1LineBox = EmotionCommon.max1LineBox
import noScrollbars = EmotionCommon.noScrollbars
import RootRoute = AppRoutes.RootRoute
import use = RouteBuilder.use







export type NewPairItem = {
  id: string
  ava?: string | undefined
  name: string
  online?: boolean | undefined
  createdAt: string
}


export type NewPairsListProps = {
  newPairItems: NewPairItem[]
} & ClassStyle

export const NewPairsList = React.memo((props: NewPairsListProps) => {
  const {
    className, style,
    newPairItems,
  } = props
  
  return (
    <Flex col>
      <Flex row align
        data-display-name='NewPairsList'
        className={className}
        style={style}
      >
        <NewPairsText>
          {/* TODO Translation */}
          {'Новые пары'}
        </NewPairsText>
        <Gap grow/>
        <HeaderArrow css={[HeaderArrowS.secondary, ButtonS6.t(allButtonS)]}>
          {/* TODO Translation */}
          {'Все'}
        </HeaderArrow>
      </Flex>
    
      <Gap h={14}/>
      
      <Flex row>
        <Flex row g={23}
          css={[
            offsetToPageContentPaddings({ h: true }),
            virtualOffset({ t: 8 }),
            { overflow: 'auto' },
            noScrollbars,
          ]}
        >
          {newPairItems.map(({ id, ava, name, online }) => (
            <Flex w={66} key={id} col noShrink align g={7}>
              <AppLink toFull={RootRoute.chat.userId.id[use](id)}>
                <AvaButton alignedStretch noShrink shadow
                  id={id} ava={ava} online={online} mutualSympathy
                />
              </AppLink>
              <NameBox><Name>{name}</Name></NameBox>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Flex>
  )
})
NewPairsList.displayName = 'NewPairsList'
export default NewPairsList



const NewPairsText = styled.div`
  ${Txt.s20Bold};
`


const allButtonS: AppWidgetStyle = {
  button: {
    minHeight: 0,
    ...virtualOffset({ v: 8 }),
  },
}



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



