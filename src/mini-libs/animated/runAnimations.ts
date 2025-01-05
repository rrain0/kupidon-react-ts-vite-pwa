

/*
TODO when drag there constantly add and delete from set, may be delay it (throttle)?
 */


type UpdateFun = (time: number) => void

const anims = new Set<UpdateFun>()

let isUpdating = false

const updateAnims = (time: number) => {
  anims.forEach(it => it(time))
  if (anims.size) requestAnimationFrame(updateAnims)
  else isUpdating = false
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



