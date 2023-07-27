<script lang="ts">
  let className: string

  export { className as class }
</script>

<div
  class="ring-2 rounded-lg ring-text ring-opacity-10 bg-text bg-opacity-5 shadow-2xl shadow-primary/20 {className}"
>
  <slot />
</div>
