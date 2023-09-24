<script lang="ts">
  import { default as Edge, type Edge as IEdge } from './component-edge.svelte'

  export let edges: IEdge[]
</script>

<svg class="overflow-visible">
  {#each edges as edge (edge.id)}
    <Edge {edge} />
  {/each}
</svg>
