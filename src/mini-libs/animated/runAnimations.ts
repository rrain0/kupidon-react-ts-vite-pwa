
/*
TODO Идеи для оптимизации
 1) Заранее вычислять всё (на каждый драг эвент) и чтобы raf только брал значение и применял к элементам

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



