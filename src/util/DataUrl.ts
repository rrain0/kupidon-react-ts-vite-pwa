





export class DataUrl {
  readonly props: string[]
  readonly data: string
  readonly mimeType: string
  readonly isBase64: boolean
  
  constructor(dataUrl: string) {
    const schemeSeparatorIdx = dataUrl.indexOf(":")
    if (schemeSeparatorIdx===-1)
      throw new Error("Url must have scheme separator ':'")
    
    const scheme = dataUrl.substring(0,schemeSeparatorIdx)
    if (scheme!=="data")
      throw new Error("Data Url scheme must be 'data'")
    
    const path = dataUrl.substring(schemeSeparatorIdx+1)
    const dataSeparatorIdx = path.indexOf(",")
    if (dataSeparatorIdx===-1)
      throw new Error("Data Url must have data separator ','")
    
    this.data = path.substring(dataSeparatorIdx+1)
    const propsStr = path.substring(0,dataSeparatorIdx)
    
    this.props = propsStr.split(";")
    
    this.mimeType = this.props[0] ?? ''
    this.isBase64 = this.props.slice(-1)[0] === "base64"
  }
  
}

