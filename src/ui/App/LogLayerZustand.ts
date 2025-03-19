import { create } from 'zustand'




export type LogLayerZustand = string[]
export const useLogLayerZustand = create<LogLayerZustand>(() => [])


// HOW TO USE
// const setLogData = useLogLayerZustand.setState
// setLogData(prev => [...prev, 'DATA TO LOG'])


