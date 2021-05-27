import React, { useRef, useState } from 'react'
import { fireEvent, render } from '@testing-library/react'
import useFixedCallback from '../useFixedCallback'
import useBindedCallback from '../useBindedCallback'
import useDynamicBindedCallback from '../useDynamicBindedCallback'
import useBindedCallbackMapper from '../useBindedCallbackMapper'
import useDynamicBindedCallbackMapper from '../useDynamicBindedCallbackMapper'
import useFixedCallbackMapper from '../useFixedCallbackMapper'

describe('useFixedCallback', () => {
  const initTest = () => {
    const callbacks: any[] = []
    const Child = ({ onClick, children }: any) => {
      return <button onClick={onClick}>{children}</button>
    }
    const TestComponent = ({ onClick }: any) => {
      const [count, setCount] = useState(0)
      const callback = useFixedCallback((e) => {
        e.persist()
        setCount(count + 1)
        return onClick(count, e)
      })
      callbacks.push(callback)
      return (
        <>
          <span data-testid='counter-value'>{count}</span>
          <Child onClick={callback}>Ola</Child>
        </>
      )
    }
    return { callbacks, TestComponent }
  }
  it('callback identiy remains the same', async () => {
    const { callbacks, TestComponent } = initTest()
    const onClick = jest.fn()
    const { findByText } = render(<TestComponent onClick={onClick} />)

    const button = await findByText('Ola')
    fireEvent.click(button)

    expect(callbacks.length).toEqual(2)
    expect(callbacks[0]).toStrictEqual(callbacks[1])
  })

  it('handler is called with correct args', async () => {
    const { TestComponent } = initTest()
    const onClick = jest.fn()
    const { findByText, findByTestId } = render(
      <TestComponent onClick={onClick} />
    )

    const button = await findByText('Ola')
    fireEvent.click(button)

    const span = await findByTestId('counter-value')
    expect(span.innerHTML).toEqual('1')

    expect(onClick.mock.calls[0][0]).toEqual(0)
    expect(onClick.mock.calls[0][1].type).toEqual('click')

    fireEvent.click(button)

    expect(span.innerHTML).toEqual('2')

    expect(onClick.mock.calls[1][0]).toEqual(1)
    expect(onClick.mock.calls[1][1].type).toEqual('click')
  })
})

describe('useBindedCallback', () => {
  const initTest = () => {
    const callbacks: any[] = []
    const Child = ({ onClick, children }: any) => {
      return <button onClick={onClick}>{children}</button>
    }
    const TestComponent = ({ onClick }: any) => {
      const [count, setCount] = useState(0)
      const callback = useBindedCallback(
        (setCount, onClick, count, e) => {
          e.persist()
          setCount(count + 1)
          return onClick(count, e)
        },
        setCount,
        onClick,
        count
      )
      callbacks.push(callback)
      return (
        <>
          <span data-testid='counter-value'>{count}</span>
          <Child onClick={callback}>Ola</Child>
        </>
      )
    }
    return { callbacks, TestComponent }
  }
  it('callback identiy remains the same', async () => {
    const { callbacks, TestComponent } = initTest()
    const onClick = jest.fn()
    const { findByText } = render(<TestComponent onClick={onClick} />)

    const button = await findByText('Ola')
    fireEvent.click(button)

    expect(callbacks.length).toEqual(2)
    expect(callbacks[0]).toStrictEqual(callbacks[1])
  })

  it('handler is called with correct args', async () => {
    const { TestComponent } = initTest()
    const onClick = jest.fn()
    const { findByText, findByTestId } = render(
      <TestComponent onClick={onClick} />
    )

    const button = await findByText('Ola')
    fireEvent.click(button)

    const span = await findByTestId('counter-value')
    expect(span.innerHTML).toEqual('1')

    expect(onClick.mock.calls[0][0]).toEqual(0)
    expect(onClick.mock.calls[0][1].type).toEqual('click')

    fireEvent.click(button)

    expect(span.innerHTML).toEqual('2')

    expect(onClick.mock.calls[1][0]).toEqual(1)
    expect(onClick.mock.calls[1][1].type).toEqual('click')
  })
})

describe('useDynamicBindedCallback', () => {
  const initTest = () => {
    const callbacks: any[] = []
    const Child = ({ onClick, children }: any) => {
      return <button onClick={onClick}>{children}</button>
    }
    const TestComponent = ({ onClick }: any) => {
      const [count, setCount] = useState(0)
      const callback = useDynamicBindedCallback(setCount, onClick, count)
      // eslint-disable-next-line no-unused-expressions
      callback.setHandler?.(
        (
          setCount: Function,
          onClick: Function,
          count: number,
          e: React.MouseEvent
        ) => {
          e.persist()
          setCount(count + 1)
          return onClick(count, e)
        }
      )
      callbacks.push(callback)
      return (
        <>
          <span data-testid='counter-value'>{count}</span>
          <Child onClick={callback}>Ola</Child>
        </>
      )
    }
    return { callbacks, TestComponent }
  }
  it('callback identiy remains the same', async () => {
    const { callbacks, TestComponent } = initTest()
    const onClick = jest.fn()
    const { findByText } = render(<TestComponent onClick={onClick} />)

    const button = await findByText('Ola')
    fireEvent.click(button)

    expect(callbacks.length).toEqual(2)
    expect(callbacks[0]).toStrictEqual(callbacks[1])
  })

  it('handler is called with correct args', async () => {
    const { TestComponent } = initTest()
    const onClick = jest.fn()
    const { findByText, findByTestId } = render(
      <TestComponent onClick={onClick} />
    )

    const button = await findByText('Ola')
    fireEvent.click(button)

    const span = await findByTestId('counter-value')
    expect(span.innerHTML).toEqual('1')

    expect(onClick.mock.calls[0][0]).toEqual(0)
    expect(onClick.mock.calls[0][1].type).toEqual('click')

    fireEvent.click(button)

    expect(span.innerHTML).toEqual('2')

    expect(onClick.mock.calls[1][0]).toEqual(1)
    expect(onClick.mock.calls[1][1].type).toEqual('click')
  })
})

describe('useFixedCallbackMapper', () => {
  const initTest = () => {
    const mappers: any[] = []
    const Child = React.memo(({ onClick, label }: any) => {
      const countRef = useRef(0)
      ++countRef.current
      return (
        <button data-testid='child-button' onClick={onClick}>
          {label}
          <br />
          [RenderCount:{countRef.current}]
        </button>
      )
    })
    const TestComponent = ({ items, onItemClick }: any) => {
      const [count, setCount] = useState(0)
      const mapper = useFixedCallbackMapper(
        (item: Object, e: React.MouseEvent) => {
          e.persist()
          setCount(count + 1)
          return onItemClick(item, count, e)
        },
        'id'
      )
      mappers.push(mapper)
      return (
        <div data-testid='root'>
          <span data-testid='counter-value'>{count}</span>
          {mapper(items, (key: string, callback: Function, item: any) => (
            <Child key={key} onClick={callback} label={item.name} />
          ))}
        </div>
      )
    }
    return { mappers, TestComponent }
  }

  it('callback identiy remains the same', async () => {
    const { mappers, TestComponent } = initTest()
    const onClick = jest.fn()
    const items = [
      { id: 1, name: 'Item1' },
      { id: 2, name: 'Item2' },
      { id: 3, name: 'Item3' }
    ]
    const { findByTestId, findAllByTestId } = render(
      <TestComponent onItemClick={onClick} items={items} />
    )

    const root = await findByTestId('root')
    const buttons = await findAllByTestId('child-button')
    expect(buttons.length).toEqual(3)

    expect(root.outerHTML).toMatchSnapshot()

    fireEvent.click(buttons[0])

    expect(root.outerHTML).toMatchSnapshot()
    for (let i = 1; i < mappers.length; i++) {
      expect(mappers[0]).toStrictEqual(mappers[i])
    }

    fireEvent.click(buttons[1])

    expect(root.outerHTML).toMatchSnapshot()
    for (let i = 1; i < mappers.length; i++) {
      expect(mappers[0]).toStrictEqual(mappers[i])
    }

    fireEvent.click(buttons[2])

    expect(root.outerHTML).toMatchSnapshot()
    for (let i = 1; i < mappers.length; i++) {
      expect(mappers[0]).toStrictEqual(mappers[i])
    }
  })

  it('handler is called with correct args', async () => {
    const { TestComponent } = initTest()
    const onClick = jest.fn()
    const items = [
      { id: 1, name: 'Item1' },
      { id: 2, name: 'Item2' },
      { id: 3, name: 'Item3' }
    ]
    const { findByTestId, findAllByTestId } = render(
      <TestComponent onItemClick={onClick} items={items} />
    )

    const buttons = await findAllByTestId('child-button')
    const span = await findByTestId('counter-value')

    expect(span.innerHTML).toEqual('0')

    fireEvent.click(buttons[0])

    expect(span.innerHTML).toEqual('1')

    expect(onClick.mock.calls[0][0] === items[0]).toEqual(true)
    expect(onClick.mock.calls[0][1]).toEqual(0)
    expect(onClick.mock.calls[0][2].type).toEqual('click')

    fireEvent.click(buttons[2])

    expect(span.innerHTML).toEqual('2')

    expect(onClick.mock.calls[1][0] === items[2]).toEqual(true)
    expect(onClick.mock.calls[1][1]).toEqual(1)
    expect(onClick.mock.calls[1][2].type).toEqual('click')
  })
})

describe('useBindedCallbackMapper', () => {
  const initTest = () => {
    const mappers: any[] = []
    const Child = React.memo(({ onClick, label }: any) => {
      const countRef = useRef(0)
      ++countRef.current
      return (
        <button data-testid='child-button' onClick={onClick}>
          {label}
          <br />
          [RenderCount:{countRef.current}]
        </button>
      )
    })
    const TestComponent = ({ items, onItemClick }: any) => {
      const [count, setCount] = useState(0)
      const mapper = useBindedCallbackMapper(
        (item: Object, count: number, e: React.MouseEvent) => {
          e.persist()
          setCount(count + 1)
          return onItemClick(item, count, e)
        },
        'id',
        count
      )
      mappers.push(mapper)
      return (
        <div data-testid='root'>
          <span data-testid='counter-value'>{count}</span>
          {mapper(items, (key: string, callback: Function, item: any) => (
            <Child key={key} onClick={callback} label={item.name} />
          ))}
        </div>
      )
    }
    return { mappers, TestComponent }
  }

  it('callback identiy remains the same', async () => {
    const { mappers, TestComponent } = initTest()
    const onClick = jest.fn()
    const items = [
      { id: 1, name: 'Item1' },
      { id: 2, name: 'Item2' },
      { id: 3, name: 'Item3' }
    ]
    const { findByTestId, findAllByTestId } = render(
      <TestComponent onItemClick={onClick} items={items} />
    )

    const root = await findByTestId('root')
    const buttons = await findAllByTestId('child-button')
    expect(buttons.length).toEqual(3)

    expect(root.outerHTML).toMatchSnapshot()

    fireEvent.click(buttons[0])

    expect(root.outerHTML).toMatchSnapshot()
    for (let i = 1; i < mappers.length; i++) {
      expect(mappers[0]).toStrictEqual(mappers[i])
    }

    fireEvent.click(buttons[1])

    expect(root.outerHTML).toMatchSnapshot()
    for (let i = 1; i < mappers.length; i++) {
      expect(mappers[0]).toStrictEqual(mappers[i])
    }

    fireEvent.click(buttons[2])

    expect(root.outerHTML).toMatchSnapshot()
    for (let i = 1; i < mappers.length; i++) {
      expect(mappers[0]).toStrictEqual(mappers[i])
    }
  })

  it('handler is called with correct args', async () => {
    const { TestComponent } = initTest()
    const onClick = jest.fn()
    const items = [
      { id: 1, name: 'Item1' },
      { id: 2, name: 'Item2' },
      { id: 3, name: 'Item3' }
    ]
    const { findByTestId, findAllByTestId } = render(
      <TestComponent onItemClick={onClick} items={items} />
    )

    const buttons = await findAllByTestId('child-button')
    const span = await findByTestId('counter-value')

    expect(span.innerHTML).toEqual('0')

    fireEvent.click(buttons[0])

    expect(span.innerHTML).toEqual('1')

    expect(onClick.mock.calls[0][0] === items[0]).toEqual(true)
    expect(onClick.mock.calls[0][1]).toEqual(0)
    expect(onClick.mock.calls[0][2].type).toEqual('click')

    fireEvent.click(buttons[2])

    expect(span.innerHTML).toEqual('2')

    expect(onClick.mock.calls[1][0] === items[2]).toEqual(true)
    expect(onClick.mock.calls[1][1]).toEqual(1)
    expect(onClick.mock.calls[1][2].type).toEqual('click')
  })
})

describe('useDynamicBindedCallbackMapper', () => {
  const initTest = () => {
    const mappers: any[] = []
    const Child = React.memo(({ onClick, label }: any) => {
      const countRef = useRef(0)
      ++countRef.current
      return (
        <button data-testid='child-button' onClick={onClick}>
          {label}
          <br />
          [RenderCount:{countRef.current}]
        </button>
      )
    })
    const TestComponent = ({ items, onItemClick }: any) => {
      const [count, setCount] = useState(0)
      const mapper = useDynamicBindedCallbackMapper(count)
      // eslint-disable-next-line no-unused-expressions
      mapper.setHandler?.(
        (item: Object, count: number, e: React.MouseEvent) => {
          e.persist()
          setCount(count + 1)
          return onItemClick(item, count, e)
        }
      )
      // eslint-disable-next-line no-unused-expressions
      mapper.setKeyGetter?.(({ id }: any) => id)
      mappers.push(mapper)
      return (
        <div data-testid='root'>
          <span data-testid='counter-value'>{count}</span>
          {mapper(items, (key: string, callback: Function, item: any) => (
            <Child key={key} onClick={callback} label={item.name} />
          ))}
        </div>
      )
    }
    return { mappers, TestComponent }
  }

  it('callback identiy remains the same', async () => {
    const { mappers, TestComponent } = initTest()
    const onClick = jest.fn()
    const items = [
      { id: 1, name: 'Item1' },
      { id: 2, name: 'Item2' },
      { id: 3, name: 'Item3' }
    ]
    const { findByTestId, findAllByTestId } = render(
      <TestComponent onItemClick={onClick} items={items} />
    )

    const root = await findByTestId('root')
    const buttons = await findAllByTestId('child-button')
    expect(buttons.length).toEqual(3)

    expect(root.outerHTML).toMatchSnapshot()

    fireEvent.click(buttons[0])

    expect(root.outerHTML).toMatchSnapshot()
    for (let i = 1; i < mappers.length; i++) {
      expect(mappers[0]).toStrictEqual(mappers[i])
    }

    fireEvent.click(buttons[1])

    expect(root.outerHTML).toMatchSnapshot()
    for (let i = 1; i < mappers.length; i++) {
      expect(mappers[0]).toStrictEqual(mappers[i])
    }

    fireEvent.click(buttons[2])

    expect(root.outerHTML).toMatchSnapshot()
    for (let i = 1; i < mappers.length; i++) {
      expect(mappers[0]).toStrictEqual(mappers[i])
    }
  })

  it('handler is called with correct args', async () => {
    const { TestComponent } = initTest()
    const onClick = jest.fn()
    const items = [
      { id: 1, name: 'Item1' },
      { id: 2, name: 'Item2' },
      { id: 3, name: 'Item3' }
    ]
    const { findByTestId, findAllByTestId } = render(
      <TestComponent onItemClick={onClick} items={items} />
    )

    const buttons = await findAllByTestId('child-button')
    const span = await findByTestId('counter-value')

    expect(span.innerHTML).toEqual('0')

    fireEvent.click(buttons[0])

    expect(span.innerHTML).toEqual('1')

    expect(onClick.mock.calls[0][0] === items[0]).toEqual(true)
    expect(onClick.mock.calls[0][1]).toEqual(0)
    expect(onClick.mock.calls[0][2].type).toEqual('click')

    fireEvent.click(buttons[2])

    expect(span.innerHTML).toEqual('2')

    expect(onClick.mock.calls[1][0] === items[2]).toEqual(true)
    expect(onClick.mock.calls[1][1]).toEqual(1)
    expect(onClick.mock.calls[1][2].type).toEqual('click')
  })
})
