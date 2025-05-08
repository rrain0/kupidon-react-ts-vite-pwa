import React from 'react'



export const noFormSubmit = {
  onSubmit: (ev: SubmitEvent | React.FormEvent) => ev.preventDefault(),
}
