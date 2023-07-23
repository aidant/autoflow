import { onMount } from 'svelte'
import { writable, type Readable } from 'svelte/store'

export type Event<Data, Initializer> =
  | { type: 'connecting'; data: Initializer }
  | { type: 'connected'; data: Initializer }
  | { type: 'message'; data: Data }
  | { type: 'error'; data: null }

export const sse = <Data, Initalizer>(
  path: string,
  initial: Initalizer,
): Readable<Event<Data, Initalizer>> => {
  const store = writable<Event<Data, Initalizer>>({ type: 'connecting', data: initial })

  onMount(() => {
    const stream = new EventSource(path)

    const handleOpen = () => {
      store.set({ type: 'connected', data: initial })
    }

    const handleMessage = (event: MessageEvent) => {
      store.set({ type: 'message', data: JSON.parse(event.data) })
    }

    const handleError = () => {
      stream.removeEventListener('open', handleOpen)
      stream.removeEventListener('message', handleMessage)
      stream.removeEventListener('error', handleError)

      store.set({ type: 'error', data: null })
    }

    stream.addEventListener('open', handleOpen)
    stream.addEventListener('message', handleMessage)
    stream.addEventListener('error', handleError)

    return () => {
      stream.removeEventListener('open', handleOpen)
      stream.removeEventListener('message', handleMessage)
      stream.removeEventListener('error', handleError)
      stream.close()
    }
  })

  return store
}
