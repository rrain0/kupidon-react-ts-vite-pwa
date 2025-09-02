import { FileU } from 'src/utils/file/FileU.ts'
import getExtensionFromMimeType = FileU.mimeToExt


export type DataUrl = {
  props: string[]
  data: string
  mimeType: string
  preferredExt: string
  isBase64: boolean
}



export const getDataUrlProps = (url = ''): DataUrl | undefined => {
  const schemeSeparatorIdx = url.indexOf(':')
  if (schemeSeparatorIdx === -1) {
    return undefined
    //throw new Error("Url must have scheme separator ':'")
  }
  
  const scheme = url.substring(0, schemeSeparatorIdx)
  if (scheme !== 'data') {
    return undefined
    //throw new Error("Data Url scheme must be 'data'")
  }
  
  const path = url.substring(schemeSeparatorIdx+1)
  const dataSeparatorIdx = path.indexOf(',')
  if (dataSeparatorIdx === -1) {
    return undefined
    //throw new Error("Data Url must have data separator ','")
  }
  
  const props: DataUrl = {
    props: [], data: '', mimeType: '', preferredExt: '', isBase64: false,
  }
  
  props.data = path.substring(dataSeparatorIdx + 1)
  const propsStr = path.substring(0, dataSeparatorIdx)
  
  props.props = propsStr.split(';')
  
  props.mimeType = props.props[0] ?? ''
  props.preferredExt = getExtensionFromMimeType(props.mimeType)
  props.isBase64 = props.props.slice(-1)[0] === 'base64'
  
  return props
}


