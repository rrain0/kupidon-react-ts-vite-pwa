import { type Cb1 } from 'src/utils/base/tsUtils.ts'



export async function fetchToByteArray(
  dataUrl: string, { abortCtrl }: { abortCtrl?: AbortController | undefined } = { },
): Promise<Uint8Array<ArrayBuffer>> {
  // @ts-expect-error
  const response = await fetch(dataUrl, { signal: abortCtrl?.signal })
  const byteArray = await response.bytes()
  return byteArray
}



export async function fetchToBlob(
  dataUrl: string, { abortCtrl }: { abortCtrl?: AbortController | undefined } = { },
): Promise<Blob> {
  // @ts-expect-error
  const response = await fetch(dataUrl, { signal: abortCtrl?.signal })
  const blob = await response.blob()
  return blob
}



export async function blobToDataUrl(
  file: Blob, { onProgress, abortCtrl }: {
    onProgress?: Cb1<number | undefined> | undefined,
    abortCtrl?: AbortController | undefined,
  } = {},
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    const onExternalAbort = () => reader.abort()
    abortCtrl?.signal.addEventListener('abort', onExternalAbort)
    reader.onprogress = ev => {
      onProgress?.(ev.lengthComputable ? ev.loaded / ev.total * 100 : undefined)
    }
    reader.onload = ev => {
      abortCtrl?.signal.removeEventListener('abort', onExternalAbort)
      resolve(ev.target?.result as string)
    }
    reader.onerror = ev => {
      abortCtrl?.signal.removeEventListener('abort', onExternalAbort)
      reject(ev)
    }
    reader.onabort = ev => {
      abortCtrl?.signal.removeEventListener('abort', onExternalAbort)
      reject(ev)
    }
    
    // Перед началом проверяем, не отменено ли оно уже
    if (abortCtrl?.signal.aborted) {
      reject(abortCtrl.signal.reason)
      return
    }
    reader.readAsDataURL(file)
  })
}



export async function blobToBuffer(
  file: Blob, { onProgress, abortCtrl }: {
    onProgress?: Cb1<number | undefined> | undefined,
    abortCtrl?: AbortController | undefined,
  } = {},
): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    const onExternalAbort = () => reader.abort()
    abortCtrl?.signal.addEventListener('abort', onExternalAbort)
    reader.onprogress = ev => {
      onProgress?.(ev.lengthComputable ? ev.loaded / ev.total * 100 : undefined)
    }
    reader.onload = ev => {
      abortCtrl?.signal.removeEventListener('abort', onExternalAbort)
      resolve(ev.target?.result as ArrayBuffer)
    }
    reader.onerror = ev => {
      abortCtrl?.signal.removeEventListener('abort', onExternalAbort)
      reject(ev)
    }
    reader.onabort = ev => {
      abortCtrl?.signal.removeEventListener('abort', onExternalAbort)
      reject(ev)
    }
    
    // Перед началом проверяем, не отменено ли оно уже
    if (abortCtrl?.signal.aborted) {
      reject(abortCtrl.signal.reason)
      return
    }
    reader.readAsArrayBuffer(file)
  })
}



export async function fetchToDataUrl(
  url: string, { abortCtrl }: { abortCtrl?: AbortController | undefined } = { },
): Promise<string> {
  // @ts-expect-error
  const response = await fetch(url, { signal: abortCtrl?.signal })
  const blob = await response.blob()
  const dataUrl = await blobToDataUrl(blob, { abortCtrl })
  return dataUrl
}
