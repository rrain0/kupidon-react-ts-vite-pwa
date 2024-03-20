import { FileUtils } from 'src/utils/file/FileUtils'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import readToDataUrl = FileUtils.blobToDataUrl
import empty = TypeUtils.empty


/*
 todo add object URL
  URL.createObjectURL(fileObj);
 
 */
export class ImageSrc {
  private constructor(
    public id: number,
    public file?: File|empty,
    public remoteUrl?: string|empty,
    public dataUrl?: string|empty,
  ) { }
  
  // как только создаём изображение из файла, то сразу загружаем его
  // потом берём url с помощью getUrl()
  static async fromFile(id: number, file: File){
    const im = new ImageSrc(id, file)
    await im.fetchUrl()
    return im
  }
  
  static of(data: {
    id: number,
    file?: File|empty,
    remoteUrl?: string|empty,
    dataUrl?: string|empty,
  }){
    return new ImageSrc(data.id, data.file, data.remoteUrl, data.dataUrl)
  }
  
  async fetchUrl(){
    if (this.dataUrl) return this.dataUrl
    if (this.remoteUrl) return this.remoteUrl
    if (this.file) {
      return this.dataUrl = await readToDataUrl(this.file)
    }
  }
  
  getUrl(){
    if (this.dataUrl) return this.dataUrl
    if (this.remoteUrl) return this.remoteUrl
  }
}

