import { useEffect } from 'react'


export const useLog = (...args: any[]) => useEffect(() => console.log(...args), args)

