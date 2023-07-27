<script lang="ts">
  import Container from '$lib/component-container.svelte'
  import Login from '$lib/component-login.svelte'
  import type { ActionData } from './$types'

  export let form: ActionData
</script>

<main class="h-screen w-screen flex flex-col justify-center items-center p-6">
  <Container class="max-w-sm w-full">
    <Login
      type="create"
      {form}
    />
  </Container>
</main>
