import imageCompression, { Options } from 'browser-image-compression'
import heic2any from 'heic2any'
import { isSafari, isMobileSafari } from 'react-device-detect'
import { FileUtils } from 'src/utils/file/FileUtils'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import { Progress } from 'src/utils/Progress'
import CallbackParam = TypeUtils.Callback1
import trimExtension = FileUtils.trimExtension




export namespace ImageUtils {
  
  
  
  export const compress =
  async(
    imgFile: File,
    options?: {
      onProgress?: CallbackParam<number>
      abortCtrl?: AbortController
    }
  ): Promise<File> => {
    //console.log('imgFile',imgFile)
    
    const ctrl = options?.abortCtrl
    const progress = new Progress()
    const notifyProgress = ()=> options?.onProgress?.(progress.value)
    
    
    if (['image/heic','image/heif'].includes(imgFile.type)){
      progress.stages = 2
      progress.stagesWeights = [50,50]
      const pngFromHeicBlob = await heic2any({
        blob: imgFile,
        toType: 'image/png',
      }) as Blob
      const pngFromHeicFile = new File(
        [pngFromHeicBlob],
        trimExtension(imgFile.name)+'.png',
        { type: 'image/png' }
      )
      progress.stage++
      progress.progress = 0
      notifyProgress()
      imgFile = pngFromHeicFile
    }
    
    
    let webpOptions: Options = {
      maxSizeMB: 0.4,
      maxWidthOrHeight: 1600, // 1600x900 16:9
      useWebWorker: true,
      fileType: 'image/webp',
      onProgress: p => {
        progress.progress = p
        notifyProgress()
      },
    }
    if (ctrl) webpOptions.signal = ctrl.signal
    if (isSafari || isMobileSafari){
      webpOptions.fileType = 'image/jpeg'
    }
    imgFile = await imageCompression(imgFile,webpOptions)
    
    
    return imgFile
  }
  
  
  
}