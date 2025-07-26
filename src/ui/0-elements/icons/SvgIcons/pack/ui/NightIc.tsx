import { generateSvgIcon } from 'src/ui/0-elements/icons/SvgIcons/SvgIcon.tsx'
import NightSvg from '@ic/normal/ui/moon.svg?react'




const NightIc = generateSvgIcon(NightSvg)
NightIc.displayName = 'NightIc'
export default NightIc