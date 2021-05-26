import { useRef } from 'react'
import { Handler, UseBindedCallbackState } from './typings'

const useBindedCallback = (handler: Handler, ...bindArgs: any[]) => {
  const ref = useRef<UseBindedCallbackState>()
  const current = ref.current
  if (current) {
    current.handler = handler
    current.bindArgs = bindArgs
    return current.callback
  }
  const mutable: any = {
    handler,
    bindArgs
  }
  const callback = function (this: any, ...args: any[]) {
    return mutable.handler.call(this, ...mutable.bindArgs, ...args)
  }
  mutable.callback = callback
  ref.current = mutable
  return callback
}

export default useBindedCallback
