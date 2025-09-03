import { withDefaults } from '@utils/react/withDefaults.tsx'
import Flex from 'src/components/elems/basic-elements/Flex.tsx'




const Gap = withDefaults(Flex, {
  'data-display-name': 'Gap',
})
Gap.displayName = 'Gap'
export default Gap