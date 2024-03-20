



export type DateTimeData = {
  year?: number | undefined,
  month?: number | undefined,
  day?: number | undefined,
  hour?: number | undefined,
  minute?: number | undefined,
  second?: number | undefined,
  millisecond?: number | undefined,
  timezone?: number | undefined,
}


export class DateTime {
  constructor(data?:DateTimeData | undefined){ this.set(data) }
  
  set(data?: DateTimeData | undefined){
    if (data?.year!==undefined) this.year = data.year
    if (data?.month!==undefined) this.month = data.month
    if (data?.day!==undefined) this.day = data.day
    if (data?.hour!==undefined) this.hour = data.hour
    if (data?.minute!==undefined) this.minute = data.minute
    if (data?.second!==undefined) this.second = data.second
    if (data?.millisecond!==undefined) this.millisecond = data.millisecond
    if (data?.timezone!==undefined) this.timezone = data.timezone
    return this
  }
  
  year = 0 // integer (-∞,+∞) // Date fullYear: integer (-∞,+∞)
  month = 0 // integer [1,12] // Date month: integer [0,11]
  day = 0 // integer [1,28-31] // Date date: integer [1,28-31]
  hour = 0 // integer [1,23] // Date hours: integer [1,23]
  minute = 0 // integer [0,59] // Date minutes: integer [0,59]
  second = 0 // integer [0,59] // Date seconds: integer [0,59]
  millisecond = 0 // integer [0,999] // Date seconds: integer [0,999]
  timezone = 0 // integer in minutes
  
  
  
  public static fromDate(date: Date): DateTime {
    return new DateTime({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds(),
      millisecond: date.getMilliseconds(),
      timezone: -date.getTimezoneOffset(),
    })
  }
  
  public static now(): DateTime {
    return DateTime.fromDate(new Date())
  }
  
  public static from_dd_MM_yyyy(date?: string){
    const match = date?.match(dd_MM_yyyy_pattern)
    if (match) {
      const gs = match.groups
      return new DateTime({
        year: +gs!.year!,
        month: +gs!.month!,
        day: +gs!.day!
      })
    }
  }
  
  
  // from "2022-01-01T00:00" in format yyyy-MM-ddThh:mm
  public static from_yyyy_MM_dd_hh_mm(date?: string){
    const match = date?.match(yyyy_MM_dd_hh_mm_pattern)
    if (match) {
      const gs = match.groups
      return new DateTime({
        year: +gs!.year!,
        month: +gs!.month!,
        day: +gs!.day!,
        hour: +gs!.hour!,
        minute: +gs!.minute!,
      })
    }
  }
  
  // from "2022-01-01" in format yyyy-MM-dd
  public static from_yyyy_MM_dd(date?: string){
    const match = date?.match(yyyy_MM_dd_pattern)
    if (match) {
      const gs = match.groups
      return new DateTime({
        year: +gs!.year!,
        month: +gs!.month!,
        day: +gs!.day!,
      })
    }
  }
  
  
  to_yyyy_MM_dd_HH_mm_ss(){
    return `${(this.year+'').padStart(4,'0')}`
      +`-${(this.month+'').padStart(2,'0')}`
      +`-${(this.day+'').padStart(2,'0')}`
      +`T${(this.hour+'').padStart(2,'0')}`
      +`:${(this.minute+'').padStart(2,'0')}`
      +`:${(this.second+'').padStart(2,'0')}`
  }
  
  
  // to 2020-08-26T06:53:27.609+00:00
  to_yyyy_MM_dd_HH_mm_ss_SSS_XXX(){
    return `${(this.year+'').padStart(4,'0')}`
      +`-${(this.month+'').padStart(2,'0')}`
      +`-${(this.day+'').padStart(2,'0')}`
      +`T${(this.hour+'').padStart(2,'0')}`
      +`:${(this.minute+'').padStart(2,'0')}`
      +`:${(this.second+'').padStart(2,'0')}`
      +`.${(this.millisecond+'').padStart(3,'0')}`
      +this.timezoneToString()
  }
  
  to_yyyy_MM_dd_HH_mm(){
    return `${(this.year+'').padStart(4,'0')}`
      +`-${(this.month+'').padStart(2,'0')}`
      +`-${(this.day+'').padStart(2,'0')}`
      +`T${(this.hour+'').padStart(2,'0')}`
      +`:${(this.minute+'').padStart(2,'0')}`
  }
  
  // to 2023-01-01
  to_yyyy_MM_dd(divider = '-'){
    return `${(this.year+'').padStart(4,'0')}`
      + `${divider}${(this.month+'').padStart(2,'0')}`
      + `${divider}${(this.day+'').padStart(2,'0')}`
  }
  
  // to 01-01-2023
  to_dd_MM_yyyy(divider = '-'){
    return `${(this.day+'').padStart(2,'0')}`
      +`${divider}${(this.month+'').padStart(2,'0')}`
      +`${divider}${(this.year+'').padStart(4,'0')}`
  }
  
  // to 01-01-23
  to_dd_MM_yy(divider = '-'){
    return `${(this.day+'').padStart(2,'0')}`
      + `${divider}${(this.month+'').padStart(2,'0')}`
      + `${divider}${(this.year%100+'').padStart(2,'0')}`
  }
  
  timezoneToString(){
    let offset = this.timezone >= 0 ? '+' : '-'
    const hours = Math.floor(Math.abs(this.timezone)/60)
    const minutes = Math.floor(Math.abs(this.timezone%60))
    offset += hours.toString().padStart(2,'0')
    offset += ':'
    offset += minutes.toString().padStart(2,'0')
    return offset
  }
  
  getAge(other = DateTime.now()){
    let age = other.year - this.year
    const thisDate = [this.month, this.day, this.hour, this.minute, this.second]
    const otherDate = [other.month, other.day, other.hour, other.minute, other.second]
    for (let i = 0; i < thisDate.length; i++) {
      if (otherDate[i] > thisDate[i]) break
      else if (otherDate[i]===thisDate[i]) continue
      else if (otherDate[i] < thisDate[i]) {
        age--
        break
      }
    }
    return age
  }
  
  normalize(){
    const d = new Date()
    // this correctly accepts 0-99 values not as 19xx
    d.setFullYear(this.year, this.month-1, this.day)
    d.setHours(this.hour, this.minute, this.second, 0)
    this.year = d.getFullYear()
    this.month = d.getMonth()+1
    this.day = d.getDate()
    this.hour = d.getHours()
    this.minute = d.getMinutes()
    this.second = d.getSeconds()
    this.millisecond = d.getMilliseconds()
    return this
  }
  
  copy(){
    return new DateTime({
      year: this.year,
      month: this.month,
      day: this.day,
      hour: this.hour,
      minute: this.minute,
      second: this.second,
      millisecond: this.millisecond,
      timezone: this.timezone,
    })
  }
  
  eq(other: any){
    return this===other || (
      other instanceof DateTime
      && this.year === other.year
      && this.month === other.month
      && this.day === other.day
      && this.hour === other.hour
      && this.minute === other.minute
      && this.second === other.second
      && this.millisecond === other.millisecond
      && this.timezone === other.timezone
    )
  }
  
  
  static eqFrom_yyyy_MM_dd(d1: string, d2: string): boolean {
    return DateTime.from_yyyy_MM_dd(d1)
      ?.eq(DateTime.from_yyyy_MM_dd(d2))
      ?? false
  }
}


// месяц, день, час, минута, секунда могут быть в одно-или-двухсимвольном формате
// разделителем является не цифра в любом количестве
const dd_MM_yyyy_pattern =
  /^\D*(?<day>\d{1,2})\D+(?<month>\d{1,2})\D+(?<year>\d{4})\D*$/
const yyyy_MM_dd_hh_mm_pattern =
  /^\D*(?<year>\d{4})\D+(?<month>\d{1,2})\D+(?<day>\d{1,2})\D+(?<hour>\d{1,2})\D+(?<minute>\d{1,2})\D*$/
const yyyy_MM_dd_pattern =
  /^\D*(?<year>\d{4})\D+(?<month>\d{1,2})\D+(?<day>\d{1,2})\D*$/


