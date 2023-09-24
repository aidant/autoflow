<script lang="ts">
  import { draggable } from '$lib/action-draggable'
  import { default as Node } from '$lib/component-node.svelte'
  import { writable } from 'svelte/store'
  import { default as Edges } from './component-edges.svelte'
  import { handles } from './component-handle.svelte'

  const position1 = writable({ x: -200, y: -200 })
  const position2 = writable({ x: +200, y: +200 })
  const xy = writable({ x: 0, y: 0 })

  $: [from, to] = Object.values($handles)
</script>

<main class="flex-grow flex relative">
  <div
    class="max-w-0 max-h-0 absolute inset-1/2"
    style="transform: translate({$xy.x}px, {$xy.y}px);"
  >
    <Node
      input={false}
      position={position1}
    />
    <Node
      input={true}
      position={position2}
    />
    {#if from && to}
      <Edges
        edges={[
          {
            id: 'd04273c1-896d-4d42-9a86-f9bf1c44b2d3',
            from,
            to,
          },
        ]}
      />
    {/if}
  </div>
  <div
    use:draggable={xy}
    class="x-background after:absolute after:inset-0 after:-z-10 w-full h-full"
    style="--background-x: {$xy.x}px; --background-y: {$xy.y}px;"
  />
</main>

<style>
  .x-background::after {
    background-image: radial-gradient(hsl(var(--color-text) / 5%) 10%, transparent 10%),
      radial-gradient(hsl(var(--color-text) / 5%) 10%, transparent 10%);
    background-position:
      var(--background-x) var(--background-y),
      calc(var(--background-x) + 0.75rem) calc(var(--background-y) + 0.75rem);
    background-size: 1.5rem 1.5rem;
  }
</style>
