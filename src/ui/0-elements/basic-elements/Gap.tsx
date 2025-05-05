import { withDefaults } from '@util/react/withDefaults.tsx'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'




const Gap = withDefaults({ 'data-display-name': 'Gap' }, Flex)
Gap.displayName = 'Gap'
export default Gap