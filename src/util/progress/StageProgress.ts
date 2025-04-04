



export class StageProgress {
  
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
  
}
