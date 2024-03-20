import { TypeUtils } from 'src/utils/common/TypeUtils'
import exists = TypeUtils.exists




export class Progress {
  stage = 1 // 1..stages
  stages = 1 // 1..inf
  progress = 0 // 0..100
  stagesWeights = [100] // (0..100)[]; stagesWeights.len must be gte than 'stages'
  
  constructor(stages?: number, stagesWeights?: number[]) {
    if (exists(stages)) this.stages = stages
    if (exists(stagesWeights)) this.stagesWeights = stagesWeights
  }
  
  get value(){
    let total = 0 // 0..100
    this.stagesWeights.forEach((sMaxP,i)=>{
      const s = i+1
      if (this.stage>s) total += sMaxP
      else if (this.stage===s) total += this.progress * sMaxP/100
    })
    return total
  }
  
}