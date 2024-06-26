import type { Writable } from 'svelte/store'

export type Position = {
  x: number
  y: number
}

export const draggable = (el: HTMLElement, position$: Pick<Writable<Position>, 'update'>) => {
  let initial: Position | null = null

  const handlePointerDown = (event: PointerEvent) => {
    if (event.buttons & 0b1) {
      initial = {
        x: event.pageX,
        y: event.pageY,
      }
    }
  }

  const handlePointerUp = () => {
    initial = null
  }

  const handlePointerMove = (event: PointerEvent) => {
    if (!initial) return

    event.preventDefault()

    position$.update((position) => {
      initial ??= {
        x: event.pageX,
        y: event.pageY,
      }

      position.x += event.pageX - initial.x
      position.y += event.pageY - initial.y

      initial = {
        x: event.pageX,
        y: event.pageY,
      }

      return position
    })
  }

  el.classList.add('cursor-grab')
  el.addEventListener('pointerdown', handlePointerDown)
  window.addEventListener('pointermove', handlePointerMove)
  window.addEventListener('pointerup', handlePointerUp)

  return {
    destroy: () => {
      el.classList.remove('cursor-grab')
      el.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    },
  }
}
