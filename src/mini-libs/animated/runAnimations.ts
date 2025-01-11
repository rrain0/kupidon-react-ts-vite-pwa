
/*
TODO Идеи для оптимизации
 1) Если значение такое же как предыдущее, то не рендерить и соответсвенно не подписываться на обновления от raf
 ???) Заранее вычислять всё (на каждый драг эвент) и чтобы raf только брал значение и применял к элементам
 */

type UpdateFun = (time: number) => void

const anims = new Set<UpdateFun>()

let isUpdating = false

const updateAnims = (time: number) => {
  anims.forEach(it => it(time))
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
  anims.delete(anim)
}



