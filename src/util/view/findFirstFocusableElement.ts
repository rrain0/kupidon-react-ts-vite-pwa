



export const findFirstFocusableElement = (container: HTMLElement|SVGElement|null|undefined) => {
  if (!container) return container
  return Array.from(container.getElementsByTagName('*')).find(isFocusable) as HTMLElement|SVGElement
}

const isFocusable = item => {
  if (item.tabIndex < 0) {
    return false;
  }
  switch (item.tagName) {
    case "A":
      return !!item.href
    case "INPUT":
      return item.type !== "hidden" && !item.disabled
    case "SELECT":
    case "TEXTAREA":
    case "BUTTON":
      return !item.disabled
    default:
      return false
  }
}