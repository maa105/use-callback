# use-callback-maa

> better than useCallback that does not change its identity, with array callback mapper to get singular callbacks to array items

## Install

```bash
npm install --save use-callback-maa
```

## Demo

[See demo](https://maa105.github.io/use-callback/)

## Usage

Below is all the hooks provided. Personally I use `useFixedCallback` and `useBindedCallbackMapper` the most.

The binded ones I use when the handler is not in the scope of the component and thus I need to send it the latest props.

The dynamic ones are an API idea I had that avoids creating new function on every render (optimization? needs profiling).

### useFixedCallback(handler)

```tsx
import React, { useState } from 'react'

import { useFixedCallback } from 'use-callback-maa'

// React.memo in conjunction with useFixedCallback will prevent <Child/> from rerendering on click
const Child = React.memo(({ onClick, label }) => {
  return <button onClick={onClick}>{label}</button>
})

const Parent = () => {
  const [counter, setCounter] = useState(0)
  const onClick = useFixedCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setCounter(counter + 1)
  })
  return (
    <div>
      <div>Counter: {counter}</div>
      <Child onClick={onClick} label='Click Me' />
    </div>
  )
}

const App = () => {
  return <Parent />
}
```

### useBindedCallback(handler, ...bindArgs)

```tsx
import React, { useState } from 'react'

import { useBindedCallback } from 'use-callback-maa'

// React.memo in conjunction with useBindedCallback will prevent <Child/> from rerendering on click
const Child = React.memo(({ onClick, label }) => {
  return <button onClick={onClick}>{label}</button>
})

const counterSetter = (setCounter, counter) => setCounter(counter + 1)
const Parent = () => {
  const [counter, setCounter] = useState(0)

  // This way the handler will not be recreated on each render
  const onClick = useBindedCallback(counterSetter, setCounter, counter)

  // const onClick = useBindedCallback(
  //   (setCounter, counter, e) => {
  //     e.stopPropagation()
  //     setCounter(counter + 1)
  //   },
  //   setCounter,
  //   counter
  // )

  return (
    <div>
      <div>Counter: {counter}</div>
      <Child onClick={onClick} label='Click Me' />
    </div>
  )
}

const App = () => {
  return <Parent />
}
```

### useDynamicBindedCallback(...bindArgs)

The hooks with dynamic in their name use a new API to avoid re creating the handler on every render. But since the handler is created once the dependencies must be binded (using bindArgs).

```tsx
import React, { useState } from 'react'

import { useDynamicBindedCallback } from 'use-callback-maa'

// React.memo in conjunction with useDynamicBindedCallback will prevent <Child/> from rerendering on click
const Child = React.memo(({ onClick, label }) => {
  return <button onClick={onClick}>{label}</button>
})

const Parent = () => {
  const [counter, setCounter] = useState(0)
  const onClick = useDynamicBindedCallback(setCounter, counter)
  onClick.setHandler?.((setCounter, counter, e) => {
    e.stopPropagation()
    setCounter(counter + 1)
  })
  // setHandler will set the callback handler and then remove itself from the callback
  // so come the second render setHandler will be undefined. Hence optional chaining will
  // not call it and a new handler will not be needlessly created

  return (
    <div>
      <div>
        Counter: {counter}
        {onClick.setHandler ? 'WITH setHandler???' : ''}
      </div>
      <Child onClick={onClick} label='Click Me' />
    </div>
  )
}

const App = () => {
  return <Parent />
}
```

### useBindedCallbackMapper(handler, keyGetter: string | KeyGetter, ...bindArgs)

This method creates a mapper function that can be then used to `map` an array and provide each item in that array with a fixed identity callback. Note each item's identity is obtained using the keyGetter (which is kindof like lodash's iteratee)

Note the keyGetter is only set once on first render so please keep it constant throughout

```tsx
import React, { useState } from 'react'

import { useBindedCallbackMapper } from 'use-callback-maa'

// React.memo in conjunction with useBindedCallbackMapper will prevent <Child/> from rerendering on click
const Child = React.memo(({ onClick, label }) => {
  const renderCountRef = useRef(0)
  ++renderCountRef.current
  return (
    <button onClick={onClick}>
      {label}
      <br />
      RenderCount:{renderCountRef.current}
    </button>
  )
})

const Parent = () => {
  const [counter, setCounter] = useState(0)
  const [items, setItems] = useState(() => [
    { id: '1', label: 'Item 1' },
    { id: '2', label: 'Item 2' },
    { id: '3', label: 'Item 3' }
  ])

  const mapper = useBindedCallbackMapper(
    (item, /*, binded, args, will, show, here, */ e) => {
      e.stopPropagation()
      setCounter(counter + 1)
      if (counter % 6 === 1) {
        setItems(
          items.map((itm) => {
            return itm.id === item.id
              ? {
                  ...itm,
                  label: `${itm.label.split('[')[0]}[Updated@${counter + 1}]`
                }
              : itm
          })
        )
      }
      if (counter % 6 === 3) {
        setItems([
          ...items,
          {
            id: `${parseFloat(items[items.length - 1].id) + 1}`,
            label: `Item ${parseFloat(items[items.length - 1].id) + 1}[NEW]`
          }
        ])
      }
      if (counter % 6 === 5) {
        setItems(items.filter(({ id }) => id !== item.id))
      }
    },
    'id' /*, binded, args, comes, here */
  )

  return (
    <div>
      <b>Every second click will do something</b>
      <div>Counter: {counter}</div>
      {mapper(items, (key, callback, item, i, items) => (
        <Child key={key} onClick={callback} label={item.label} />
      ))}
    </div>
  )
}

const App = () => {
  return <Parent />
}
```

### useDynamicBindedCallbackMapper(...bindArgs)

```tsx
import React, { useState } from 'react'

import { useDynamicBindedCallbackMapper } from 'use-callback-maa'

// React.memo in conjunction with useDynamicBindedCallbackMapper will prevent <Child/> from rerendering on click
const Child = React.memo(({ onClick, label }) => {
  const renderCountRef = useRef(0)
  ++renderCountRef.current
  return (
    <button onClick={onClick}>
      {label}
      <br />
      RenderCount:{renderCountRef.current}
    </button>
  )
})

const Parent = () => {
  const [counter, setCounter] = useState(0)
  const [items, setItems] = useState(() => [
    { id: '1', label: 'Item 1' },
    { id: '2', label: 'Item 2' },
    { id: '3', label: 'Item 3' }
  ])

  const mapper = useDynamicBindedCallbackMapper(counter, items) // setCounter and setItems have fixed identities no need to bind them
  mapper.setKeyGetter?.('id')
  mapper.setHandler?.((item, counter, items, e) => {
    e.stopPropagation()
    setCounter(counter + 1)
    if (counter % 6 === 1) {
      setItems(
        items.map((itm) => {
          return itm.id === item.id
            ? {
                ...itm,
                label: `${itm.label.split('[')[0]}[Updated@${counter + 1}]`
              }
            : itm
        })
      )
    }
    if (counter % 6 === 3) {
      setItems([
        ...items,
        {
          id: `${parseFloat(items[items.length - 1].id) + 1}`,
          label: `Item ${parseFloat(items[items.length - 1].id) + 1}[NEW]`
        }
      ])
    }
    if (counter % 6 === 5) {
      setItems(items.filter(({ id }) => id !== item.id))
    }
  })

  return (
    <div>
      <b>Every second click will do something</b>
      <div>Counter: {counter}</div>
      {mapper(items, (key, callback, item, i, items) => (
        <Child key={key} onClick={callback} label={item.label} />
      ))}
    </div>
  )
}

const App = () => {
  return <Parent />
}
```

## License

MIT © [maa105](https://github.com/maa105)
