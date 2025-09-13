import mime from 'mime'



export const pathToFilename = (path: string): string => {
  return path.match(/(?<=^|[/])[^/]*$/)?.[0] ?? ''
}
export const pathToExt = (path: string): string => {
  return path.match(/(?<=[.])[^.]*$/)?.[0] ?? ''
}
export const trimExt = (fileName: string): string => {
  return fileName.replace(/[.][^.]*$/, '')
}



export const mimeToExt = (mimeType: string): string => {
  return mime.getExtension(mimeType) ?? ''
}
export const extToMime = (extension: string): string => {
  return mime.getType(extension) ?? ''
}