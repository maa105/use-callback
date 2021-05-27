export type Handler = (...args: any[]) => any
export type Callback = (...args: any[]) => any
export type KeyGetter = (arg0: Object) => string

export type DynamicCallback = {
  (...args: any[]): any
  setHandler?: (handler: Handler) => void
}
export type Mapper = (
  array: Array<Object>,
  mapFunction: MapFunction
) => Array<any>
export type DynamicMapper = {
  (array: Array<Object>, mapFunction: MapFunction): Array<any>
  setHandler?: (handler: Handler) => void
  setKeyGetter?: (keyGetter: string | KeyGetter) => void
}

export type MapFunction = (
  key: string,
  callback: Callback,
  item: Object,
  index: number,
  array: Array<Object>
) => any

type UseFixedCallbackState = {
  handler: Handler
  callback: Callback
}
type UseBindedCallbackState = {
  handler: Handler
  callback: Callback
  bindArgs: any[]
}
type UseDynamicBindedCallbackState = {
  handler: Handler
  callback: DynamicCallback
  bindArgs: any[]
}
export type UseFixedCallbackMapperState = {
  handler: Handler
  mapper: Mapper
}
export type UseBindedCallbackMapperState = {
  handler: Handler
  mapper: Mapper
  bindArgs: any[]
}
export type UseDynamicBindedCallbackMapperState = {
  handler?: Handler
  getKey?: (obj: Object) => string
  mapper: DynamicMapper
  bindArgs: any[]
}
export type UseCallbackMapperItemState = {
  count: number
  item: Object
  callback: Callback
}
export type UseCallbackMapperItemsState = {
  [key: string]: UseCallbackMapperItemState
}
