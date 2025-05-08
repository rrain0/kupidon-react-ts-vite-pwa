import styled from '@emotion/styled'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import { CardS } from 'src/ui/0-elements/Card/CardS.ts'
import card3S = CardS.card3S




const Card = styled(Flex)(({ theme: t }) => card3S(t))
Card.displayName = 'Card'
export default Card


