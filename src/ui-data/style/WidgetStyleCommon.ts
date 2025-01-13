

export namespace WidgetStyleCommon {
  
  const reset = (() => {
    const reset = {
      //appearance: 'none',
      boxSizing: 'border-box',
      bg: null,
      border: null,
      outline: null,
      boxShadow: null,
      m: null,
      p: null,
      g: null,
      '-webkit-tap-highlight-color': 'transparent',
    }
    return {
      ...reset,
      before: reset,
      after: reset,
    }
  })()
  
}

