



export namespace StyleVals {
  
  export const cardRadius = 15
  
  export const itemListGap = 10
  export const itemListGapPx = `${itemListGap}px`
  
  export const minRatioLand = 16 / 9
  export const maxRatioLand = 4 / 3
  export const minRatioPort = 9 / 16
  export const maxRatioPort = 3 / 4
  
  export const shadowSz = '0px 4px 15px 0px'
  export const shadowLightSz = '0px 2px 7.3px 0px'
  
  // z-indices
  export const modalFloor100 = 100
  export const modalFloor500 = 500
  export const modalFloor1k = 1000
  export const modalFloor2k = 2000
  
  export const modalFloor10k = 10000
  
  
  // Easings https://easings.net/
  // От меньшего наклона к большему: sine, quad, circ, cubic, quart, quint, expo, back
  export const easeOutSine = 'cubic-bezier(0.39, 0.575, 0.565, 1)'
  
  export const easeInOutCirc = 'cubic-bezier(0.785, 0.135, 0.15, 0.86)'
  
  export const easeOutCubic = 'cubic-bezier(0.215, 0.61, 0.355, 1)'
  export const easeInOutCubic = 'cubic-bezier(0.645, 0.045, 0.355, 1)'
  
  export const easeInQuart = 'cubic-bezier(0.5, 0, 0.75, 0)'
  export const easeOutQuart = 'cubic-bezier(0.5, 0, 0.75, 0)'
  export const easeInOutQuart = 'cubic-bezier(0.77, 0, 0.175, 1)'
  
  export const easeOutExpo = 'cubic-bezier(0.16, 1, 0.3, 1)'
  
}
