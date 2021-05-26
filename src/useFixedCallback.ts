import { useRef } from 'react'
import { Handler, UseFixedCallbackState } from './typings'

const useFixedCallback = (handler: Handler) => {
  const ref = useRef<UseFixedCallbackState>()
  const current = ref.current
  if (current) {
    current.handler = handler
    return current.callback
  }
  const mutable: any = {
    handler
  }
  const callback = function (this: any, ...args: any[]) {
    return mutable.handler.apply(this, args)
  }
  mutable.callback = callback
  ref.current = mutable
  return callback
}

export default useFixedCallback
