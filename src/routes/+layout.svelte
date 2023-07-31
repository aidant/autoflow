<script lang="ts">
  import '@fontsource-variable/fira-code'
  import '@fontsource-variable/fraunces'
  import '@fontsource-variable/raleway'
  import '../app.css'
</script>

<slot />

<style>
  :global(:root) {
    background-image: radial-gradient(hsl(var(--color-text) / 5%) 10%, transparent 10%),
      radial-gradient(hsl(var(--color-text) / 5%) 10%, transparent 10%);
    background-position:
      0 0,
      0.75rem 0.75rem;
    background-size: 1.5rem 1.5rem;
  }
</style>
