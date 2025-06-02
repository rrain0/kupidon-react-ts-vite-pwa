


export type WidgetElemName = `$${string}`



export type WidgetElemConfig = {
  className: string
  nodes?: undefined | {
    [downSelector: string]: {
      [name: WidgetElemName]: WidgetElemConfig
    }
  }
  states?: undefined | {
  
  }
}



export type WidgetElements = {
  [name: WidgetElemName]: WidgetElemConfig
}





// TODO Style - new widget config
const ButtonS7Elems = {
  $button: {
    className: 'rruiButton',
    nodes: {
      '>': {
        $border: {
          className: 'rruiBorder',
          nodes: {
            '>': {
              $ripple: {
                className: 'rruiRippleFrame',
              },
            },
          },
        },
      },
    },
    
    states: {
      ':$selected': { },
      ':$inFocus': { },
      ':$hover': { },
      ':$locked': { },
      ':$error': { },
    },
    
  },
} satisfies WidgetElements

const button = ButtonS7Elems.$button




const ButtonS7Config = {
  elems: ButtonS7Elems,
  widgetStates: {
  
  },
  states: { // global states
  
  },
}












/*
 STATE ORDER (in CSS):
 normal
 :checked / selected
 inFocus (:hover or :active or :focus-visible)
 :hover
 :active
 :focus
 :focus-visible
 :read-only
 :disabled
 locked - это короткий disabled (используется disabled + locked),
          например во время layout transition.
          Здесь кнопку нельзя нажать, но выглядит она как обычно.
 error
 */
