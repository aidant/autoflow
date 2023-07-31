<script lang="ts">
  import { default as Workflow } from '$lib/component-workflow.svelte'
  import { writable } from 'svelte/store'

  const position = writable({ x: 0, y: 0 })
</script>

<main class="relative m-auto max-w-0 max-h-0">
  <Workflow bind:position={$position} />
</main>
