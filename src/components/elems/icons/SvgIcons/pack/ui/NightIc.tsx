import { generateSvgIcon } from 'src/components/elems/icons/SvgIcons/SvgIcon.tsx'
import NightSvg from '@ic/normal/ui/moon.svg?react'




const NightIc = generateSvgIcon(NightSvg)
NightIc.displayName = 'NightIc'
export default NightIc