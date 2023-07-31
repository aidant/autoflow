<script lang="ts">
  type Position = { x: number; y: number }

  export let position: Position

  let initial: Position | null = null

  const handlePointerDown = (event: PointerEvent) => {
    initial = {
      x: event.pageX,
      y: event.pageY,
    }
  }

  const handlePointerUp = () => {
    initial = null
  }

  const handlePointerMove = (event: PointerEvent) => {
    if (!initial) return

    const x = event.pageX - initial.x
    const y = event.pageY - initial.y

    initial = {
      x: event.pageX,
      y: event.pageY,
    }

    position.x += x
    position.y += y
  }
</script>

<svelte:window
  on:pointerup={handlePointerUp}
  on:pointermove={handlePointerMove}
/>

<div
  class="ring-2 rounded-lg ring-text/25 bg-text/5 backdrop-blur-xl shadow-2xl shadow-text/5 w-96 h-96 translate-x-[var(--position-x)] translate-y-[var(--position-y)]"
  style="--position-x: {position.x}px; --position-y: {position.y}px"
>
  <div
    on:pointerdown={handlePointerDown}
    class="bg-background/5 rounded-t-lg cursor-grab"
  >
    <h1 class="font-serif text-lg px-4 py-1">Weather</h1>
  </div>
  <hr class="border border-text/25" />

  <div class="flex flex-col gap-4 mt-8">
    <div
      class="w-4 -ml-2 h-4 bg-background/5 rounded-full ring-text/25 ring-2 [clip-path:inset(-100%_-100%_-100%_50%)] cursor-grab"
    ></div>
    <div
      class="w-4 -ml-2 h-4 bg-background/5 rounded-full ring-text/25 ring-2 [clip-path:inset(-100%_-100%_-100%_50%)] cursor-grab"
    ></div>
    <div
      class="w-4 -ml-2 h-4 bg-background/5 rounded-full ring-text/25 ring-2 [clip-path:inset(-100%_-100%_-100%_50%)] cursor-grab"
    ></div>
  </div>
</div>
