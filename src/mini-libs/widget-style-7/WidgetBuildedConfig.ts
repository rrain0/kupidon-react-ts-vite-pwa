import {
  WidgetConfig, WidgetConfigWidgetStates, WidgetElemConfigNodes, WidgetElemName,
  WidgetSelectorToElemPropReplacers, WidgetSelectorToElemStateReplacers,
} from 'src/mini-libs/widget-style-7/WidgetConfig.ts'




export class WidgetElem<
  const out Ss extends WidgetSelectorToElemStateReplacers = WidgetSelectorToElemStateReplacers,
  const out Ps extends WidgetSelectorToElemPropReplacers = WidgetSelectorToElemPropReplacers,
> {
  constructor(
    // 'className' without dot
    public className: string,
    public states: Ss = { } as Ss,
    public props: Ps = { } as Ps,
    public upSelector?: string | undefined,
    public upElem?: WidgetElem | undefined,
  ) { }
  
  static of<
    const Ss extends WidgetSelectorToElemStateReplacers,
    const Ps extends WidgetSelectorToElemPropReplacers,
  >(params: {
    className: string,
    states?: Ss | undefined,
    props?: Ps | undefined,
    upSelector?: string | undefined,
    upElem?: WidgetElem | undefined,
  }): WidgetElem<Ss, Ps> {
    return new WidgetElem<Ss, Ps>(
      params.className, params.states, params.props, params.upSelector, params.upElem
    )
  }
  
  get n() { return this.className }
  get ss() { return this.states }
  get ps() { return this.props }
}






export type WidgetBuiltElemsRecord = Record<WidgetElemName, WidgetElem>
export type BuiltWidget = {
  elems: WidgetBuiltElemsRecord
  states: WidgetConfigWidgetStates
}



export function buildWidget(widgetConfig: WidgetConfig): BuiltWidget {
  const builtElems: WidgetBuiltElemsRecord = { }
  Object.entries(widgetConfig.elems).forEach(([name, conf]) => {
    const builtElem = WidgetElem.of({
      className: conf.className,
      states: conf.states,
      props: conf.props,
    })
    builtElems[name] = builtElem
    buildWidgetElemsFromNodes(conf.nodes, builtElem, builtElems)
  })
  return { elems: builtElems, states: widgetConfig.widgetStates ?? { } }
}
export function buildWidgetElemsFromNodes(
  nodesConfig: WidgetElemConfigNodes,
  upElem: WidgetElem,
  builtElems: WidgetBuiltElemsRecord,
) {
  nodesConfig && Object.entries(nodesConfig).forEach(([sel, elems]) => (
    Object.entries(elems).forEach(([name, conf]) => {
      const builtElem = WidgetElem.of({
        className: conf.className,
        upSelector: sel,
        upElem: upElem,
        states: conf.states,
        props: conf.props,
      })
      builtElems[name] = builtElem
      buildWidgetElemsFromNodes(conf.nodes, builtElem, builtElems)
    })
  ))
}

