


export type Position = { t: number, x: number, y: number }



export class Velocity {
  // В начале хранятся самые недавние движения
  positions: Position[] = []
  
  constructor(public interval = 150) { }
  
  add(position: Position) {
    this.positions.unshift(position)
    this.clearOld()
  }
  
  get() {
    const pos = this.positions, len = pos.length
    const vels: { dt: number, velx: number, vely: number }[] = []
    let dtTotal = 0
    for (let i = 1; i < len; i++) {
      const p = pos[i - 1], c = pos[i]
      const dt = c.t - p.t
      dtTotal += dt
      vels.push({ dt, velx: (c.x - p.x) / dt, vely: (c.y - p.y) / dt })
    }
    return vels.reduce((acc, v) => {
      const fr = v.dt / dtTotal
      acc.velx += v.velx * fr
      acc.vely += v.vely * fr
      return acc
    }, { velx: 0, vely: 0 })
  }
  
  clearOld() {
    const pos = this.positions, len = pos.length
    if (len) {
      const startTime = pos[0].t
      let end = len
      for (let i = 1; i < len && end === len; i++) {
        if (pos[i].t > startTime + this.interval) end = i
      }
      this.positions = pos.slice(0, end)
    }
  }
  
  clear() { this.positions.length = 0 }
}

