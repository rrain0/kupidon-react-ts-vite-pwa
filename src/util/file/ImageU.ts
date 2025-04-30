import imageCompression, { Options } from 'browser-image-compression'
import heic2any from 'heic2any'
import { isSafari, isMobileSafari } from 'react-device-detect'
import { FileU } from 'src/util/file/FileU.ts'
import { TypeU } from 'src/util/common/TypeU.ts'
import { StageProgress } from 'src/util/progress/StageProgress.ts'
import CallbackParam = TypeU.Callback1
import trimExtension = FileU.trimExtension




export namespace ImageU {
  
  
  
  export const compress = async (
    imgFile: File,
    {
      onProgress = undefined as CallbackParam<number> | undefined,
      abortCtrl = undefined as AbortController | undefined,
    } = { },
  ): Promise<File> => {
    //console.log('imgFile',imgFile)
    
    const ctrl = abortCtrl
    const progress = new StageProgress()
    progress.onProgress = p => onProgress?.(p)
    
    
    if (/^image\/(heic|heif)$/.test(imgFile.type)) {
      progress.set(0, { stages: 2, stagesWeights: [50, 50] })
      const pngFromHeicBlob = await heic2any({
        blob: imgFile,
        toType: 'image/png',
      }) as Blob
      const pngFromHeicFile = new File(
        [pngFromHeicBlob],
        trimExtension(imgFile.name) + '.png',
        { type: 'image/png' },
      )
      progress.set(0, { next: true })
      imgFile = pngFromHeicFile
    }
    
    
    const maxSzMb = 0.4
    const maxSzB = maxSzMb * 1024 * 1024
    
    if (/^image\/(png|jpe?g|webp)$/.test(imgFile.type) && imgFile.size <= maxSzB) {
      return imgFile
    }
    
    
    const convertToWebpOptions: Options = {
      maxIteration: 20,
      initialQuality: 0.95,
      maxSizeMB: 0.4, // 0.4 MB
      maxWidthOrHeight: 2400, // 2400x1080
      // maxSizeMB: 0.1,
      // maxWidthOrHeight: 800,
      useWebWorker: true,
      fileType: 'image/webp',
      ...(isSafari || isMobileSafari) && { fileType: 'image/jpeg' },
      ...ctrl?.signal && { signal: ctrl?.signal },
      onProgress: p => progress.set(p),
    }
    imgFile = await imageCompression(imgFile, convertToWebpOptions)
    
    
    return imgFile
  }
  
  
  
}
