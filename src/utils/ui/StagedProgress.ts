
import { isdef } from 'src/utils/base/math/typeUtils.ts'


export class StagedProgress {
  
  constructor(
    public stages = 1, // 1..inf
    public stagesWeights = [100], // (0..100)[]; 'stagesWeights.len' must be gte than 'stages'
    public stage = 1, // 1..stages
    public progress = 0, // 0..100
  ) { }
  
  get value() {
    let total = 0 // 0..100
    this.stagesWeights.forEach((sMaxP, i) => {
      const s = i + 1
      if (this.stage > s) total += sMaxP
      else if (this.stage === s) total += this.progress * sMaxP / 100
    })
    return total
  }
  
  onProgress: ((progress: number) => void) | undefined
  
  set(
    progress: number | undefined,
    {
      stage = undefined as number | undefined,
      next = false,
      stages = undefined as number | undefined,
      stagesWeights = undefined as number[] | undefined,
      notify = false, // make
    } = { },
  ) {
    if (isdef(progress)) this.progress = progress
    if (isdef(stage)) this.stage = stage
    else if (next) this.stage++
    if (isdef(stages)) this.stages = stages
    if (isdef(stagesWeights)) this.stagesWeights = stagesWeights
    if (notify) this.onProgress?.(this.value)
  }
  
}
