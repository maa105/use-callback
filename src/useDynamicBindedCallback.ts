import { useRef } from 'react'
import {
  DynamicCallback,
  Handler,
  UseDynamicBindedCallbackState
} from './typings'

const useDynamicBindedCallback = (...bindArgs: any[]): DynamicCallback => {
  const ref = useRef<UseDynamicBindedCallbackState>()
  const current = ref.current
  if (current) {
    current.bindArgs = bindArgs
    return current.callback
  }
  const mutable: any = { bindArgs }
  const callback: DynamicCallback = function (this: any, ...args: any[]) {
    return mutable.handler.call(this, ...mutable.bindArgs, ...args)
  }
  callback.setHandler = (handler: Handler) => {
    mutable.handler = handler
    delete callback.setHandler
  }
  mutable.callback = callback
  ref.current = mutable
  return callback
}

export default useDynamicBindedCallback
