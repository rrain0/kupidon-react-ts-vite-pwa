import { TypeU } from '@utils/common/TypeU.ts'
import { StyleValue } from '@libs/widget-style-6/WidgetStyle.ts'
import RecordRo = TypeU.RecordRo
import isdef = TypeU.isdef






export type TransformPropValue = (propValue: StyleValue) => StyleValue


export class WidgetMedia {
  readonly type = 'media' as const
  readonly isAtomic = true as const
  
  constructor(readonly media: string) { }
  
  static ofQuery(query: string) {
    return new WidgetMedia(query)
  }
  
}

export class WidgetElem<
  const out Ps extends RecordRo<string, WidgetProp> = any,
  const out Ss extends RecordRo<string, WidgetAnyStateTransformer> = any
> {
  readonly type = 'elem' as const
  readonly isAtomic = true as const
  
  constructor(
    // 'className' without dot
    readonly className: string,
    readonly states?: Ss | undefined,
    readonly props?: Ps | undefined,
    readonly upSelector?: string | undefined,
    readonly upElem?: WidgetElem | undefined,
  ) { }
  
  static of<
    const Ps extends RecordRo<string, WidgetProp>,
    const Ss extends RecordRo<string, WidgetAnyStateTransformer>
  >(params: {
    className: string,
    states?: Ss | undefined,
    props?: Ps | undefined,
    upSelector?: string | undefined,
    upElem?: WidgetElem | undefined,
  }): WidgetElem<Ps, Ss> {
    return new WidgetElem<Ps, Ss>(
      params.className, params.states, params.props, params.upSelector, params.upElem
    )
  }
  
  get n() { return this.className }
  get ss() { return this.states }
  get ps() { return this.props }
}

export class WidgetPseudoElem {
  readonly type = 'pseudoElem' as const
  readonly isAtomic = true as const
  
  constructor(readonly pseudoElem: string) { }
  
  static ofName(name: string) {
    return new WidgetPseudoElem(name)
  }
}

export class WidgetPseudo {
  readonly type = 'pseudo' as const
  readonly isAtomic = true as const
  
  constructor(readonly pseudo: string) { }
  
  static ofName(name: string) {
    return new WidgetPseudo(name)
  }
}

export class WidgetAttr {
  readonly type = 'attr' as const
  readonly isAtomic = true as const
  
  constructor(
    readonly attr: string,
    readonly values?: Record<string, any> | undefined,
  ) { }
  
  static of(name: string, values?: Record<string, any> | undefined) {
    return new WidgetAttr(name, values)
  }
  
  get n() { return this.attr }
}

export class WidgetProp<const out Vs extends string = any> {
  readonly type = 'prop' as const
  readonly isAtomic = true as const
  
  constructor(
    // full prop name: 'background-color', '--color'
    readonly prop: string,
    readonly transformValue?: TransformPropValue | undefined,
  ) { }
  
  static ofName<const Vs extends string = any>(
    name: string,
    transformValue?: TransformPropValue | undefined
  ) {
    return new WidgetProp<Vs>(name, transformValue)
  }
  
  get n() { return this.prop }
  
  // var(--prop)
  // var(--prop, defaultValue)
  var(defaultValue?: string): string {
    const nameAndDefault = [this.prop]
    if (isdef(defaultValue)) nameAndDefault.push(defaultValue)
    return `var(${nameAndDefault.join(', ')})`
  }
}
export type WidgetPropValueType<WP extends WidgetProp> =
  WP extends WidgetProp<infer Vs> ? Vs : never



export class WidgetMultiAnyTransformer {
  readonly type = 'widget' as const
  readonly isAtomic = false as const
  
  constructor(
    readonly transform: () => WidgetTransformerList,
    readonly title?: string | undefined,
    readonly states?: Record<string, WidgetAnyStateTransformer> | undefined,
    readonly values?: Record<string, any> | undefined,
    readonly props?: Record<string, WidgetProp> | undefined,
  ) { }
  
  static of(params: {
    transform: () => WidgetTransformerList,
    title?: string | undefined,
    states?: Record<string, WidgetAnyStateTransformer> | undefined,
    values?: Record<string, any> | undefined,
    props?: Record<string, WidgetProp> | undefined,
  }) {
    return new WidgetMultiAnyTransformer(
      params.transform, params.title, params.states, params.values, params.props,
    )
  }
}

export class WidgetMultiStateTransformer {
  readonly type = 'state' as const
  readonly isAtomic = false as const
  
  constructor(
    readonly transform: (stateValue?: string) => WidgetTransformerList,
    readonly title?: string | undefined,
    readonly values?: Record<string, any> | undefined,
  ) { }
  
  static of(params: {
    transform: (stateValue?: string) => WidgetTransformerList,
    title: string,
    values?: Record<string, any> | undefined,
  }) {
    return new WidgetMultiStateTransformer(params.transform, params.title, params.values)
  }
}

export class WidgetMultiPropTransformer {
  readonly type = 'prop' as const
  readonly isAtomic = false as const
  
  constructor(
    readonly transform: (propValue: StyleValue) => WidgetTransformerList,
    readonly title?: string | undefined,
  ) { }
  
  static of(params: {
    transform: (propValue: StyleValue) => WidgetTransformerList,
    title?: string | undefined,
  }) {
    return new WidgetMultiPropTransformer(params.transform, params.title)
  }
}



export class WidgetStateValue {
  readonly type = 'stateValue' as const
  constructor(readonly value: string) { }
  
  static of(value: string) {
    return new WidgetStateValue(value)
  }
}
export class WidgetPropValue {
  readonly type = 'propValue' as const
  constructor(readonly value: StyleValue) { }
  
  static of(value: StyleValue) {
    return new WidgetPropValue(value)
  }
}



export type WidgetAtomicTransformer =
  | WidgetMedia
  | WidgetElem
  | WidgetPseudoElem
  | WidgetPseudo
  | WidgetAttr
  | WidgetProp
  | WidgetStateValue
  | WidgetPropValue

export type WidgetMultiTransformer =
  | WidgetMultiAnyTransformer
  | WidgetMultiStateTransformer
  | WidgetMultiPropTransformer


export type WidgetTransformer = WidgetAtomicTransformer | WidgetMultiTransformer
export type WidgetTransformerList = (WidgetTransformer | WidgetTransformerList)[][]


export type WidgetAnyStateTransformer =
  | WidgetPseudoElem
  | WidgetPseudo
  | WidgetAttr
  | WidgetMultiStateTransformer

export type WidgetAnyPropTransformer =
  | WidgetProp
  | WidgetMultiPropTransformer



