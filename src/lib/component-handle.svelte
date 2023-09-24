<script
  lang="ts"
  context="module"
>
  import { onMount } from 'svelte'
  import { writable, type Writable } from 'svelte/store'
  import type { Position } from './action-draggable'
  import { getContextStore } from './context-store'

  export let handles = writable<Record<string, { x: number; y: number }>>({})
</script>

<script lang="ts">
  export let id: string
  export let placement: 'left' | 'right'

  let classNameExternal: string
  export { classNameExternal as class }

  $: classNameInternal =
    placement === 'left'
      ? 'w-4 -ml-2 h-4 bg-background/5 rounded-full cursor-crosshair ring-text/25 ring-2 [clip-path:inset(-100%_-100%_-100%_50%)]'
      : 'w-4 ml-auto -mr-2 h-4 bg-background/5 rounded-full cursor-crosshair ring-text/25 ring-2 [clip-path:inset(-100%_50%_-100%_-150%)]'

  let el: HTMLDivElement

  const position = getContextStore<Writable<Position>>('position')

  $: {
    if (el && el.offsetParent) {
      const parent = el.offsetParent.getBoundingClientRect()
      const self = el.getBoundingClientRect()

      let x = self.x - parent.x + $position.x - parent.width / 2 + self.width / 2
      let y = self.y - parent.y + $position.y - parent.height / 2 + self.height / 2

      switch (placement) {
        case 'left': {
          x -= 2
          break
        }
        case 'right': {
          x += 2
          break
        }
      }

      $handles[id] = { x, y }
    }
  }

  onMount(() => {
    $handles[id] = el?.getBoundingClientRect()
  })
</script>

<div
  bind:this={el}
  class="{classNameExternal} {classNameInternal}"
/>
