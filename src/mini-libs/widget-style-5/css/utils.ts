

/*
 States order to select in CSS:
   normal - no selector
   checked / selected - :checked / :selected
   hover - :hover
   active - :active
   focus - :focus
   focusVisible - :focus-visible
   readOnly - :read-only
   disabled - :disabled
   error - [error]
 */


export function useThis(used: string) { return used && `&${used}` }

