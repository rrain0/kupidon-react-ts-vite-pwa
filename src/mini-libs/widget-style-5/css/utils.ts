

/*
 States order to select in CSS:
   normal - no selector
   checked / selected - :checked / :selected
   focus - :focus
   focusVisible - :focus-visible
   hover - :hover
   active - :active - applied to button during press
   readOnly - :read-only
   disabled - :disabled
   error - [error]
 */


export function useThis(used: string) { return used && `&${used}` }

