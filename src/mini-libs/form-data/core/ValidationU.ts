



export namespace ValidationU {
  
  
  const emailPattern = /^[^\s@]+@[^\s@]+$/
  export const isValidEmail = (email?: string) => email && emailPattern.test(email)
  
  
  export const isValidPwd = (pwd?: string) => pwd && pwd.length >= 6
  
  
  const isPositiveInt = (i: number) => Number.isSafeInteger(i) && i > 0
  const isPositiveOrZeroInt = (i: number) => Number.isSafeInteger(i) && i >= 0
  
  

}
