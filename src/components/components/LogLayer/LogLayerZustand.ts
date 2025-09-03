import { create } from 'zustand'




export type LogLayerZustand = string[]
export const useLogLayerZustand = create<LogLayerZustand>(() => [])


// HOW TO USE
// useLogLayerZustand.setState(prev => [...prev, 'DATA TO LOG'])


