
/*
TODO Идеи для оптимизации
 1) Попробовать вместо обхода графа вычмсляемых значений сразу складывать массив готовых функций
 в AnimatedValue. Причём индекс будет фиксированный для каждого Computed: len
 */

type UpdateFun = (time: number) => void

const anims = new Set<UpdateFun>()

let isUpdating = false

const updateAnims = (time: number) => {
  //console.time(`raf ${time}`)
  for (const a of anims) a(time)
  //console.timeEnd(`raf end ${time}`)
  if (anims.size) requestAnimationFrame(updateAnims)
  else isUpdating = false
  //console.log('size', anims.size)
}

export const addAnimation = (anim: UpdateFun) => {
  anims.add(anim)
  if (!isUpdating) {
    isUpdating = true
    requestAnimationFrame(updateAnims)
  }
}

export const removeAnimation = (anim: UpdateFun) => {
  //console.log('anims.has(anim)', anims.has(anim))
  anims.delete(anim)
}



