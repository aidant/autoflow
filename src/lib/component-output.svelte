<script lang="ts">
  import { default as Handle } from './component-handle.svelte'

  export let id: string
  export let label: string
  export let value: string
</script>

<div class="flex flex-row items-center">
  <div class="flex-grow ml-7">
    <p>
      {label}
    </p>

    <span
      class="mt-1 block w-full rounded border-2 border-text/25 bg-transparent px-4 py-2 text-current"
    >
      {value}
    </span>
  </div>

  <div class="w-[1.125rem] h-0.5 mt-7 mr-0.5 bg-text/25" />

  <Handle
    {id}
    placement="right"
    class="mt-7"
  />
</div>
