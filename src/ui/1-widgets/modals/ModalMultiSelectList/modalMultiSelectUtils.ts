import { Option } from 'src/ui-data/models/Option'
import { IndicatorSelection } from 'src/ui/0-elements/select-item/SelectItem/SelectItem'


export type GetIndicatorsData<T extends string> =
  (options: Option<T>[], option: Option<T>, optionI: number, isSelected: boolean) => IndicatorSelection[]

export const getIndicatorsDataDefault = (
  <T extends string>(): GetIndicatorsData<T> =>
    (options, option, optionI, isSelected) => {
      return options.map((it, i) => {
        if (!isSelected) return false
        //if (option.id !== it.id) return 1
        if (option.id !== it.id) return false
        return true
      })
    }
)()

export type GetCommonIndicatorsData<T extends string> =
  (options: Option<T>[], selected: T[]) => IndicatorSelection[]

export const getCommonIndicatorsDataDefault = (
  <T extends string>(): GetCommonIndicatorsData<T> =>
    (options, selected) => {
      return options.map((it, i) => {
        if (selected.includes(it.id)) return true
        return false
      })
    }
)()
