<script lang="ts">
  import { draggable, type Position } from '$lib/action-draggable'
  import type { Writable } from 'svelte/store'

  export let position: Writable<Position>
</script>

<div
  class="ring-2 rounded-lg ring-text/25 bg-text/5 backdrop-blur-xl shadow-2xl shadow-text/5 w-96 h-96 absolute"
  style="transform: translate(-50%, -50%) translate({$position.x}px, {$position.y}px)"
>
  <div
    use:draggable={position}
    class="bg-background/5 rounded-t-lg"
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
