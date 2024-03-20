import { ArrayUtils } from 'src/utils/common/ArrayUtils'
import NonEmptyArr = ArrayUtils.NonEmptyArr






export namespace ValidationCore {
  
  export type Values = { [field: string]: unknown }
  export type ValuesWithFromServer<Vs extends Values> =
    Vs extends { fromServer?: undefined | { values: Vs } } ? Vs : never
  
  
  /**
   * @returns {'ok' | undefined | void} - валидатор не обнаружил ошибок
   * @returns {PartialFailureData} - валидатор обнаружил ошибку и вернул этот объект с ошибкой,
   * последующие валидаторы для этого поля не будут запущены.
   */
  export type Validator
  <Vs extends Values> = [
    NonEmptyArr<keyof Vs>,
    (values: any[]) => ('ok' | undefined | void) | PartialFailureData<Vs>
  ]
  
  export type Validators<Vs extends Values> = Validator<Vs>[]
  
  export type Failures<Vs extends Values> = Failure<Vs>[]
  
  
  
  export type FailureType = 'default'|'initial'|'normal'|'server'
  
  export class Failure<Vs extends Values> {
    
    static getAwaitDelay(created: Date, delay: number): Promise<void> {
      return new Promise(
        resolve=>setTimeout(resolve, +created + delay - +new Date())
      )
    }
    
    constructor(data: FailureData<Vs>) {
      this.msg = data.msg
      this.code = data.code
      this.extra = data.extra
      this.usedFields = data.usedFields
      this.usedValues = data.usedValues
      this.type = data.type ?? 'normal'
      this.errorFields = data.errorFields ?? this.usedFields
      this.highlight = data.highlight ?? (()=>{
        if (['normal','server'].includes(this.type)) return true
        return false
      })()
      this.notify = data.notify ?? (()=>{
        if (['normal','server'].includes(this.type)) return true
        return false
      })()
      this.canSubmit = data.canSubmit ?? (()=>{
        if (this.type==='server') return true
        return false
      })()
      this.created = data.created ?? new Date()
      this.delay = data.delay ?? 0
      this.awaitDelay = Failure.getAwaitDelay(this.created, this.delay)
    }
    
    
    readonly code: string
    readonly msg: string|undefined
    readonly extra: any
    readonly usedFields: NonEmptyArr<keyof Vs>
    readonly usedValues: NonEmptyArr<any>
    readonly type: FailureType
    readonly errorFields: (keyof Vs)[]
    readonly highlight: boolean
    readonly notify: boolean
    readonly canSubmit: boolean
    readonly created: Date
    readonly delay: number
    readonly awaitDelay: Promise<void>
    
    get id(){
      return `failure-${this.code}`
    }
    get isDelayed(){
      return this.delayedFor > 0
    }
    get delayedFor(){
      const showTime = +this.created + this.delay
      const now = +new Date()
      const delay = showTime - now
      return Math.max(delay,0)
    }
    
    copy(update?: Partial<FailureData<Vs>> | undefined): Failure<Vs> {
      const u = update
      return new Failure({
        code: u && 'code' in u ? u.code : this.code,
        msg: u && 'msg' in u ? u.msg : this.msg,
        extra: u && 'extra' in u ? u.extra : this.extra,
        usedFields: u && 'usedFields' in u ? u.usedFields : this.usedFields,
        usedValues: u && 'usedValues' in u ? u.usedValues : this.usedValues,
        type: u && 'type' in u ? u.type : this.type,
        errorFields: u && 'errorFields' in u ? u.errorFields : this.errorFields,
        highlight: u && 'highlight' in u ? u.highlight : this.highlight,
        notify: u && 'notify' in u ? u.notify : this.notify,
        canSubmit: u && 'canSubmit' in u ? u.canSubmit : this.canSubmit,
        created: u && 'created' in u ? u.created : this.created,
        delay: u && 'delay' in u ? u.delay : this.delay,
      })
    }
  }
  
  
  
  
  
  
  
  
  /**
   * @param code - error main code, eg 'incorrect', 'login-already-exists'
   * @param msg - message to display to user
   * @param usedFields - fields used to validate
   * @param usedValues - values used to validate
   * @param extra - some extra data of any type if needed
   * @param errorFields - highlight this fields - failure is applied for this fields
   * @param highlight - highlight field with this error
   * @param notify - show error notification
   * @param canSubmit - can you submit if this error exists?
   * @param created - failure creation timestamp (Date object)
   * @param delay - delay to show (ms)
   */
  export type FailureData<Vs extends Values> = {
    code: string
    msg?: string | undefined
    // extra failure data if needed
    extra?: any | undefined
    type?: FailureType | undefined
    
    // использованные для валидации поля
    usedFields: NonEmptyArr<keyof Vs>
    // использованные для валидации значения полей
    usedValues: NonEmptyArr<any>
    // поля, которые выделить как ошибочные
    errorFields?: (keyof Vs)[] | undefined
    
    highlight?: boolean | undefined
    notify?: boolean | undefined
    canSubmit?: boolean | undefined
    created?: Date | undefined
    delay?: number | undefined
  }
  
  
  
  
  
  export class PartialFailureData<Vs extends Values> {
    constructor(data: {
      code: string,
      msg?: string | undefined,
      // extra failure data if needed
      extra?: any | undefined,
      type?: FailureType | undefined,
      
      // использованные для валидации поля
      usedFields?: NonEmptyArr<keyof Vs> | undefined,
      // использованные для валидации значения полей
      usedValues?: NonEmptyArr<any> | undefined,
      // поля, которые выделить как ошибочные
      errorFields?: (keyof Vs)[] | undefined,
      
      highlight?: boolean | undefined,
      notify?: boolean | undefined,
      canSubmit?: boolean | undefined,
      created?: Date | undefined,
      delay?: number | undefined,
    }) {
      this.code = data.code
      this.msg = data.msg
      this.extra = data.extra
      this.type = data.type
      this.usedFields = data.usedFields
      this.usedValues = data.usedValues
      this.errorFields = data.errorFields
      this.highlight = data.highlight
      this.notify = data.notify
      this.canSubmit = data.canSubmit
      this.created = data.created
      this.delay = data.delay
    }
    
    code: string
    msg?: string | undefined
    // extra failure data if needed
    extra?: any | undefined
    type?: FailureType | undefined
    // использованные для валидации поля
    usedFields?: NonEmptyArr<keyof Vs> | undefined
    // использованные для валидации значения полей
    usedValues?: NonEmptyArr<any> | undefined
    // поля, которые выделить как ошибочные
    errorFields?: (keyof Vs)[] | undefined
    highlight?: boolean | undefined
    notify?: boolean | undefined
    canSubmit?: boolean | undefined
    created?: Date | undefined
    delay?: number | undefined
  }
  
  
  
}