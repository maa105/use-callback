import { useRef } from 'react'
import {
  Handler,
  KeyGetter,
  MapFunction,
  UseCallbackMapperItemsState,
  UseCallbackMapperItemState,
  UseDynamicBindedCallbackMapperState
} from './typings'

const useDynamicBindedCallbackMapper = (...bindArgs: any[]) => {
  const ref = useRef<UseDynamicBindedCallbackMapperState>()
  const current = ref.current
  if (current) {
    current.bindArgs = bindArgs
    return current.mapper
  }
  const itemsMutable: UseCallbackMapperItemsState = {}
  let maxKeyCount = 0
  const mutable: any = {
    bindArgs,
    mapper: (array: Array<Object>, mapFunction: MapFunction) => {
      ++maxKeyCount
      const mapped = array.map((item, index, array) => {
        const key = mutable.getKey(item)
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
            return mutable.handler?.call(
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
  const mapper = mutable.mapper
  mapper.setHandler = (handler: Handler) => {
    mutable.handler = handler
    delete mapper.setHandler
  }
  mapper.setKeyGetter = (keyGetter: string | KeyGetter) => {
    if (typeof keyGetter === 'string') {
      mutable.getKey = (obj: any) => obj[keyGetter]
    } else {
      mutable.getKey = keyGetter
    }
    delete mapper.setKeyGetter
  }
  ref.current = mutable
  return mapper
}

export default useDynamicBindedCallbackMapper
