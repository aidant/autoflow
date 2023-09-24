<script
  lang="ts"
  context="module"
>
  export interface Edge {
    id: string
    from: { x: number; y: number }
    to: { x: number; y: number }
  }
</script>

<script lang="ts">
  export let edge: Edge

  $: d = Math.abs((edge.to.x - edge.from.x) / 2)
</script>

<path
  class="stroke-text/25 stroke-2 fill-none"
  d="M{edge.from.x},{edge.from.y} C{edge.from.x + d},{edge.from.y} {edge.to.x - d},{edge.to.y} {edge
    .to.x},{edge.to.y}"
/>
