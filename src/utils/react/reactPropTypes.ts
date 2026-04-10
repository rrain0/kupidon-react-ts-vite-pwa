import React from 'react'
import type { Pu } from 'src/utils/base/tsUtils.ts'



export type ChildrenPropType = React.ReactNode
export type StylePropType = React.CSSProperties
export type ClassNamePropType = string

export type ChildrenProp = Pu<{ children: ChildrenPropType }>
export type StyleProp = Pu<{ style: StylePropType }>
export type ClassNameProp = Pu<{ className: ClassNamePropType }>
