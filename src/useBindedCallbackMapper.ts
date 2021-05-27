import { useRef } from 'react'
import {
  Handler,
  KeyGetter,
  MapFunction,
  Mapper,
  UseBindedCallbackMapperState,
  UseCallbackMapperItemsState,
  UseCallbackMapperItemState
} from './typings'

const useBindedCallbackMapper = (
  handler: Handler,
  keyGetter: string | KeyGetter,
  ...bindArgs: any[]
): Mapper => {
  const ref = useRef<UseBindedCallbackMapperState>()
  const current = ref.current
  if (current) {
    current.handler = handler
    current.bindArgs = bindArgs
    return current.mapper
  }
  const itemsMutable: UseCallbackMapperItemsState = {}
  const getKey: KeyGetter =
    typeof keyGetter === 'string' ? (obj: Object) => obj[keyGetter] : keyGetter
  let maxKeyCount = 0
  const mutable: UseBindedCallbackMapperState = {
    handler,
    bindArgs,
    mapper: (array: Array<Object>, mapFunction: MapFunction) => {
      ++maxKeyCount
      const mapped = array.map((item, index, array) => {
        const key = getKey(item)
        const itemMutable = itemsMutable[key]
        if (itemMutable) {
          ++itemMutable.count
          itemMutable.item = item
          return mapFunction(key, itemMutable.callback, item, index, array)
        }
        const currentItemMutable: UseCallbackMapperItemState = {
          count: maxKeyCount,
          item,
          callback: function (this: any, ...args: any[]) {
            mutable.handler.call(
              this,
              currentItemMutable.item,
              ...mutable.bindArgs,
              ...args
            )
          }
        }
        itemsMutable[key] = currentItemMutable
        return mapFunction(key, currentItemMutable.callback, item, index, array)
      })
      const deletedKeys = []
      for (const key in itemsMutable) {
        if (itemsMutable[key].count < maxKeyCount) {
          deletedKeys.push(key)
        }
      }
      deletedKeys.forEach((key) => {
        delete itemsMutable[key]
      })
      return mapped
    }
  }
  ref.current = mutable
  return mutable.mapper
}

export default useBindedCallbackMapper
