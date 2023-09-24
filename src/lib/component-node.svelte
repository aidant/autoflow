<script lang="ts">
  import { draggable, type Position } from '$lib/action-draggable'
  import type { Writable } from 'svelte/store'
  import { default as InputText } from './component-input-text.svelte'
  import { default as Output } from './component-output.svelte'
  import { createContextStore } from './context-store'

  export let position: Writable<Position>
  createContextStore('position', position)

  export let input: boolean

  const inputId = crypto.randomUUID()
  const outputId = crypto.randomUUID()
</script>

<div
  class="ring-2 rounded-lg ring-text/25 bg-text/5 backdrop-blur-xl shadow-2xl shadow-text/5 absolute max-w-sm w-screen"
  style="transform: translate(-50%, -50%) translate({$position.x}px, {$position.y}px)"
>
  <div
    use:draggable={position}
    class="bg-background/5 rounded-t-lg"
  >
    <h1 class="font-serif text-lg px-4 py-1">Weather</h1>
  </div>
  <hr class="border border-text/25" />

  <div class="flex flex-col gap-4 my-4">
    {#if input}
      <InputText
        id={inputId}
        label="Location"
      />
    {/if}
    {#if !input}
      <Output
        id={outputId}
        label="Temperature"
        value="35º"
      />
    {/if}
  </div>
</div>
