



export namespace ValidationValidators {
  
  
  const emailPattern = /^[^\s@]+@[^\s@]+$/
  export const isValidEmail = (email: string|undefined) => email && emailPattern.test(email)
  
  
  export const isValidPwd = (pwd: string|undefined) => pwd && pwd.length>=6
  
  
  const isPositiveInt = (i: number) => Number.isSafeInteger(i) && i>0
  const isPositiveOrZeroInt = (i: number) => Number.isSafeInteger(i) && i>=0
  
  

}
