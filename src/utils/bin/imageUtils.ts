import imageCompression, { Options } from 'browser-image-compression'
import heic2any from 'heic2any'
import { isSafari, isMobileSafari } from 'react-device-detect'
import { trimExt } from 'src/utils/bin/fileUtils.ts'
import { StagedProgress } from 'src/utils/ui/StagedProgress.ts'
import { Cb1 } from 'src/utils/base/typeUtils.ts'



export const compressImage = async (
  imgFile: File,
  {
    onProgress = undefined as Cb1<number> | undefined,
    abortCtrl = undefined as AbortController | undefined,
  } = { },
): Promise<File> => {
  //console.log('imgFile',imgFile)
  
  const ctrl = abortCtrl
  const progress = new StagedProgress()
  progress.onProgress = p => onProgress?.(p)
  
  
  if (/^image\/(heic|heif)$/.test(imgFile.type)) {
    progress.set(0, { stages: 2, stagesWeights: [50, 50] })
    const pngFromHeicBlob = await heic2any({
      blob: imgFile,
      toType: 'image/png',
    }) as Blob
    const pngFromHeicFile = new File(
      [pngFromHeicBlob],
      trimExt(imgFile.name) + '.png',
      { type: 'image/png' },
    )
    progress.set(0, { next: true })
    imgFile = pngFromHeicFile
  }
  
  
  const customImageConvertOptions: Options = {
    maxIteration: 20,
    initialQuality: 0.95,
    maxSizeMB: 0.1,
    maxWidthOrHeight: 800,
    fileType: 'image/webp',
  }
  const convertToWebpOptions = {
    maxIteration: 20,
    initialQuality: 0.95,
    maxSizeMB: 0.4,
    maxWidthOrHeight: 2400, // 2400x1080
    useWebWorker: true,
    fileType: 'image/webp',
    ...(isSafari || isMobileSafari) && { fileType: 'image/jpeg' },
    ...ctrl?.signal && { signal: ctrl?.signal },
    onProgress: p => progress.set(p),
    
    ...customImageConvertOptions,
  } satisfies Options
  
  
  if (
    /^image\/(png|jpe?g|webp)$/.test(imgFile.type) &&
    imgFile.size <= convertToWebpOptions.maxSizeMB * 1024 * 1024
  ) {
    return imgFile
  }
  
  
  imgFile = await imageCompression(imgFile, convertToWebpOptions)
  
  
  return imgFile
}


