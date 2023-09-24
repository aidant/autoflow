<script lang="ts">
  import { default as Handle } from './component-handle.svelte'

  export let id: string
  export let label: string
</script>

<div class="flex flex-row items-center">
  <Handle
    {id}
    placement="left"
    class="mt-7"
  />

  <div class="w-[1.125rem] h-0.5 mt-7 ml-0.5 bg-text/25" />

  <label class="flex-grow mr-7">
    {label}

    <input
      class="mt-1 block w-full rounded border-2 border-text/25 bg-background px-4 py-2 text-current"
      type="text"
    />
  </label>
</div>
