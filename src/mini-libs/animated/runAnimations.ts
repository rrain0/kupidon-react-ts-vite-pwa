
/*
TODO Идеи для оптимизации
 1) Попробовать вместо обхода графа вычисляемых значений сразу собирать все функции в одну
 и складывать их в Set, при этом возвращая обратно ссылку на функцию, чтобы потом удалить её.
 2) Вычислять все значения всех AnimatedComputed сразу
 и raf только берёт готовые значения и вставляет их в DOM
 */

type UpdateFun = (time: number) => void

const anims = new Set<UpdateFun>()

let isUpdating = false

const updateAnims = (time: number) => {
  //console.time(`raf ${time}`)
  for (const a of anims) a(time)
  //console.timeEnd(`raf ${time}`)
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



