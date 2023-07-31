<script lang="ts">
  import { default as Login } from '$lib/component-login.svelte'
  import type { ActionData } from './$types'

  export let form: ActionData
</script>

<main class="h-screen w-screen flex flex-col justify-center items-center p-6">
  <Login
    type="create"
    {form}
  />
</main>
