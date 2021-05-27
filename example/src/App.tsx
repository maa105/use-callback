import React, { useRef, useState } from 'react'

import {
  useFixedCallback,
  useBindedCallback,
  useDynamicBindedCallback,
  useFixedCallbackMapper,
  useBindedCallbackMapper,
  useDynamicBindedCallbackMapper
} from 'use-callback-maa'

type ChildProps = {
  label: string
  onClick: React.MouseEventHandler
}
type Item = {
  id: string
  label: string
}
type Items = Array<Item>

const Child = React.memo(({ onClick, label }: ChildProps) => {
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

const UseFixedCallbackTest = () => {
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

const UseBindedCallbackTest = () => {
  const [counter, setCounter] = useState(0)
  const onClick = useBindedCallback(
    (
      setCounter: React.Dispatch<React.SetStateAction<number>>,
      counter: number,
      e: React.MouseEvent
    ) => {
      e.stopPropagation()
      setCounter(counter + 1)
    },
    setCounter,
    counter
  )
  // OR like below. This way the handler will not be recreated on each render
  // const onClick = useBindedCallback(counterSetter, setCounter, counter)
  return (
    <div>
      <div>Counter: {counter}</div>
      <Child onClick={onClick} label='Click Me' />
    </div>
  )
}

const counterSetter = (
  setCounter: React.Dispatch<React.SetStateAction<number>>,
  counter: number
) => setCounter(counter + 1)
const UseBindedCallbackTest2 = () => {
  const [counter, setCounter] = useState(0)
  const onClick = useBindedCallback(counterSetter, setCounter, counter)
  return (
    <div>
      <div>Counter: {counter}</div>
      <Child onClick={onClick} label='Click Me' />
    </div>
  )
}

const UseDynamicBindedCallbackTest = () => {
  const [counter, setCounter] = useState(0)
  const onClick = useDynamicBindedCallback(setCounter, counter)
  onClick.setHandler?.(
    (
      setCounter: React.Dispatch<React.SetStateAction<number>>,
      counter: number,
      e: React.MouseEvent
    ) => {
      e.stopPropagation()
      setCounter(counter + 1)
    }
  )

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

const UseFixedCallbackMapperTest = () => {
  const [counter, setCounter] = useState(0)
  const [items, setItems] = useState(() => [
    { id: '1', label: 'Item 1' },
    { id: '2', label: 'Item 2' },
    { id: '3', label: 'Item 3' }
  ])

  const mapper = useFixedCallbackMapper((item: Item, e: React.MouseEvent) => {
    e.stopPropagation()
    setCounter(counter + 1)
    if (counter % 6 === 1) {
      setItems(
        items.map((itm: Item) => {
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
      setItems(items.filter(({ id }: Item) => id !== item.id))
    }
  }, 'id')

  return (
    <div>
      <b>Every second click will do something.</b>{' '}
      <i>
        Cycled actions: update clicked -&gt; create new -&gt; delete clicked
      </i>
      <div>Counter: {counter}</div>
      {mapper(
        items,
        (
          key: string,
          callback: React.MouseEventHandler,
          item: Item
          // i: number,
          // items: Items
        ) => (
          <Child key={key} onClick={callback} label={item.label} />
        )
      )}
    </div>
  )
}

const useBindedCallbackMapperHandler = (
  item: Item,
  counter: number,
  setCounter: React.Dispatch<React.SetStateAction<number>>,
  items: Items,
  setItems: React.Dispatch<React.SetStateAction<Items>>,
  e: React.MouseEvent
) => {
  e.stopPropagation()
  setCounter(counter + 1)
  if (counter % 6 === 1) {
    setItems(
      items.map((itm: Item) => {
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
    setItems(items.filter(({ id }: Item) => id !== item.id))
  }
}
const UseBindedCallbackMapperTest = () => {
  const [counter, setCounter] = useState(0)
  const [items, setItems] = useState(() => [
    { id: '1', label: 'Item 1' },
    { id: '2', label: 'Item 2' },
    { id: '3', label: 'Item 3' }
  ])

  const mapper = useBindedCallbackMapper(
    useBindedCallbackMapperHandler,
    'id',
    counter,
    setCounter,
    items,
    setItems
  )

  return (
    <div>
      <b>Every second click will do something.</b>{' '}
      <i>
        Cycled actions: update clicked -&gt; create new -&gt; delete clicked
      </i>
      <div>Counter: {counter}</div>
      {mapper(
        items,
        (
          key: string,
          callback: React.MouseEventHandler,
          item: Item
          // i: number,
          // items: Items
        ) => (
          <Child key={key} onClick={callback} label={item.label} />
        )
      )}
    </div>
  )
}

const UseDynamicBindedCallbackMapperTest = () => {
  const [counter, setCounter] = useState(0)
  const [items, setItems] = useState(() => [
    { id: '1', label: 'Item 1' },
    { id: '2', label: 'Item 2' },
    { id: '3', label: 'Item 3' }
  ])

  const mapper = useDynamicBindedCallbackMapper(counter, items) // setCounter and setItems have fixed identities not need to bind them
  mapper.setKeyGetter?.('id')
  mapper.setHandler?.(
    (item: Item, counter: number, items: Items, e: React.MouseEvent) => {
      e.stopPropagation()
      setCounter(counter + 1)
      if (counter % 6 === 1) {
        setItems(
          items.map((itm: Item) => {
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
        setItems(items.filter(({ id }: Item) => id !== item.id))
      }
    }
  )

  return (
    <div>
      <b>Every second click will do something.</b>{' '}
      <i>
        Cycled actions: update clicked -&gt; create new -&gt; delete clicked
      </i>
      <div>Counter: {counter}</div>
      {mapper(
        items,
        (
          key: string,
          callback: React.MouseEventHandler,
          item: Item
          // i: number,
          // items: Items
        ) => (
          <Child key={key} onClick={callback} label={item.label} />
        )
      )}
    </div>
  )
}

const App = () => {
  return (
    <div>
      <h2>Note</h2>
      <div>
        Render count should nerver change for the first 4. The last 3 render
        count only change when label is updated (denoted by
        [Updates@&lt;number&gt;]).{' '}
        <i>Counter is incremented by 1 on each click</i>
      </div>
      <h2>Tests</h2>
      <hr />
      useFixedCallback:
      <UseFixedCallbackTest />
      <hr />
      useBindedCallback:
      <UseBindedCallbackTest />
      <hr />
      useBindedCallback (with global handler):
      <UseBindedCallbackTest2 />
      <hr />
      useDynamicBindedCallback:
      <UseDynamicBindedCallbackTest />
      <hr />
      useFixedCallbackMapper:
      <UseFixedCallbackMapperTest />
      <hr />
      useBindedCallbackMapper:
      <UseBindedCallbackMapperTest />
      <hr />
      useDynamicBindedCallbackMapper:
      <UseDynamicBindedCallbackMapperTest />
      <hr />
    </div>
  )
}

export default App
