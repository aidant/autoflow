<script lang="ts">
  import { draggable } from '$lib/action-draggable'
  import { default as Workflow } from '$lib/component-workflow.svelte'
  import { writable } from 'svelte/store'

  const position1 = writable({ x: -200, y: -200 })
  const position2 = writable({ x: +200, y: +200 })
  const xy = writable({ x: 0, y: 0 })
</script>

<main class="flex-grow flex relative">
  <div
    class="max-w-0 max-h-0 absolute inset-1/2"
    style="transform: translate({$xy.x}px, {$xy.y}px);"
  >
    <Workflow position={position1} />
    <Workflow position={position2} />
  </div>
  <div
    use:draggable={xy}
    class="x-background after:absolute after:inset-0 after:-z-10 w-full h-full"
  />
</main>

<style>
  .x-background::after {
    background-image: radial-gradient(hsl(var(--color-text) / 5%) 10%, transparent 10%),
      radial-gradient(hsl(var(--color-text) / 5%) 10%, transparent 10%);
    background-position:
      0 0,
      0.75rem 0.75rem;
    background-size: 1.5rem 1.5rem;
  }
</style>
