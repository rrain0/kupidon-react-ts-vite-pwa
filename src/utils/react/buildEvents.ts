import { ObjectUtils } from 'src/utils/common/ObjectUtils'
import ObjectValuesType = ObjectUtils.ObjectValuesType
import ObjectKeysType = ObjectUtils.ObjectKeysType



type EventNameToType<El extends Element> = {
  onPointerDown: React.PointerEvent<El>
  onPointerMove: React.PointerEvent<El>
  onPointerCancel: React.PointerEvent<El>
  onPointerUp: React.PointerEvent<El>
  onPointerOut: React.PointerEvent<El>
  onPointerLeave: React.PointerEvent<El>
  
  onClick: React.MouseEvent<El, MouseEvent>
  onWheel: React.WheelEvent<El>
}

type AllEventNames<El extends Element> = ObjectKeysType<EventNameToType<El>>
type AllEvents<El extends Element> = ObjectValuesType<EventNameToType<El>>





export class EventBuilder<E extends AllEventNames<El>, El extends Element> {
  private currEventNames: E[] = []
  private eventsMap!: Map<AllEventNames<El>,((ev: AllEvents<El>)=>void)[]>
  
  
  events
  <Names extends AllEventNames<El>>
  (...events: Names[]){
    const builder = new EventBuilder<Names, El>()
    builder.currEventNames = events
    builder.eventsMap = this.eventsMap
    return builder
  }
  handlers(...handlers: ((ev: EventNameToType<El>[E])=>void)[]){
    this.eventsMap ??= new Map()
    this.currEventNames.forEach(name=>{
      if (!this.eventsMap.has(name)) this.eventsMap.set(name,[])
      this.eventsMap.get(name)!.push(...handlers as any)
    })
    return this
  }
  build(){
    return [...this.eventsMap.entries()].reduce(
      (acc,[evName,evHandlers])=>{
        acc[evName] = (ev: any)=>{
          evHandlers.forEach(handler=>handler(ev))
        }
        return acc
      },
      {}
    )
  }
}



export const eventBuilder = <El extends Element>()=>new EventBuilder<any,El>()



