import styled from '@emotion/styled'
import Flex from '@libs/short-propsed/components/Flex.tsx'
import { CardS } from 'src/components/elems/Card/CardS.ts'
import card3S = CardS.card3S




const Card = styled(Flex)(({ theme: t }) => card3S(t))
Card.displayName = 'Card'
export default Card


