export const sse = <T>(
  generator: (options: { signal: AbortSignal }) => AsyncIterator<T, void, never>,
): Response => {
  const controller = new AbortController()

  let iterator: AsyncIterator<T>

  return new Response(
    new ReadableStream({
      start: (stream) => {
        try {
          iterator = generator({ signal: controller.signal })
        } catch (error) {
          stream.error(error)
        }
      },

      pull: async (stream) => {
        try {
          const { value, done } = await iterator.next()

          if (done) {
            stream.close()
          } else {
            stream.enqueue(value)
          }
        } catch (error) {
          stream.error(error)
        }
      },

      cancel: () => {
        controller.abort()
      },
    }),
    {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
      },
    },
  )
}
