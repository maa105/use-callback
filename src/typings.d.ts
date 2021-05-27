export type Handler = (...args: any[]) => any
export type Callback = (...args: any[]) => any
export type KeyGetter = (arg0: any) => string

export type DynamicCallback = {
  (...args: any[]): any
  setHandler?: (handler: Handler) => void
}
export type Mapper = (array: Array<any>, mapFunction: MapFunction) => Array<any>
export type DynamicMapper = {
  (array: Array<any>, mapFunction: MapFunction): Array<any>
  setHandler?: (handler: Handler) => void
  setKeyGetter?: (keyGetter: string | KeyGetter) => void
}

export type MapFunction = (
  key: string,
  callback: Callback,
  item: any,
  index: number,
  array: Array<any>
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
  getKey?: (obj: any) => string
  mapper: DynamicMapper
  bindArgs: any[]
}
export type UseCallbackMapperItemState = {
  count: number
  item: any
  callback: Callback
}
export type UseCallbackMapperItemsState = {
  [key: string]: UseCallbackMapperItemState
}
