<script lang="ts">
  import { default as Settings } from '$lib/svg-cog-6-tooth.svelte'
  import type { LayoutData } from './$types'

  export let data: LayoutData
</script>

<div class="flex flex-row justify-between h-screen w-screen overflow-clip p-3 gap-4">
  <menu
    class="max-w-xs w-full bg-text/5 backdrop-blur-xl rounded-lg ring-2 ring-text/25 flex flex-col z-10"
  >
    <div class="mt-auto m-4 flex flex-row gap-4">
      <div class="bg-secondary w-8 h-8 rounded-full" />
      <span class="self-center">
        {data.user.username}
      </span>
      <button class="ml-auto rounded-full">
        <Settings class="w-8 h-8 text-text/50" />
      </button>
    </div>
  </menu>
  <slot />
</div>
