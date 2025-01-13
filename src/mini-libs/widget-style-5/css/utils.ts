



export function useThis(used: string): string {
  if (!used) return ''
  return `&${used}`
}

