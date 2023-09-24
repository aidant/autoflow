<script lang="ts">
  import { enhance } from '$app/forms'
  import { writable } from 'svelte/store'
  import type { ZodString } from 'zod'
  import type { ValidationDetails } from './error-validation'
  import { formValidationMessage } from './form-validation-message'
  import { formValidator, zodSchemaToValidator } from './form-validator'
  import {
    PasswordCreateSchema,
    PasswordLoginSchema,
    UsernameCreateSchema,
    UsernameLoginSchema,
    type UsernameAndPassword,
  } from './schema-username-and-password'

  export let type: 'login' | 'create'

  export let form: ValidationDetails<UsernameAndPassword> | null

  const errorMessageForUsername = writable('')
  const errorMessageForPassword = writable('')

  $: if (form?.invalid?.username) $errorMessageForUsername = form.invalid.username
  $: if (form?.invalid?.password) $errorMessageForPassword = form.invalid.password

  let UsernameSchema: ZodString
  let PasswordSchema: ZodString

  $: {
    if (type === 'login') {
      UsernameSchema = UsernameLoginSchema
      PasswordSchema = PasswordLoginSchema
    }
    if (type === 'create') {
      UsernameSchema = UsernameCreateSchema
      PasswordSchema = PasswordCreateSchema
    }
  }
</script>

<form
  use:enhance
  class="flex flex-col gap-4 px-8 pt-8 pb-5 ring-2 rounded-lg ring-text/25 bg-text bg-opacity-5 shadow-2xl shadow-primary/20 w-full max-w-sm backdrop-blur-lg"
  method="POST"
>
  <h1 class="font-serif text-3xl text-center font-medium">
    {#if type === 'login'}
      Welcome back
    {/if}

    {#if type === 'create'}
      Create an account
    {/if}
  </h1>
  <hr class="border border-text/25 my-2" />

  <div>
    <label>
      Username

      <input
        use:formValidator={zodSchemaToValidator(UsernameSchema)}
        use:formValidationMessage={errorMessageForUsername}
        type="text"
        name="username"
        aria-required="true"
        aria-invalid={$errorMessageForUsername ? 'true' : 'false'}
        value={form?.data?.username || ''}
      />
    </label>
    {#if $errorMessageForUsername}
      <span class="text-sm">{$errorMessageForUsername}</span>
    {/if}
  </div>

  <div>
    <label>
      Password

      <input
        use:formValidator={zodSchemaToValidator(PasswordSchema)}
        use:formValidationMessage={errorMessageForPassword}
        type="password"
        name="password"
        aria-required="true"
        aria-invalid={$errorMessageForPassword ? 'true' : 'false'}
        value={form?.data?.password || ''}
      />
    </label>
    {#if $errorMessageForPassword}
      <span class="text-sm">{$errorMessageForPassword}</span>
    {/if}
  </div>

  <button
    class="text-white bg-primary mt-5 rounded px-4 py-2"
    type="submit"
  >
    {#if type === 'login'}
      Login
    {/if}

    {#if type === 'create'}
      Create account
    {/if}
  </button>

  <span class="text-sm text-center mt-2">
    {#if type === 'login'}
      Don't have an account?
      <a
        class="underline underline-offset-2 decoration-primary decoration-2 hover:underline-offset-1 hover:decoration-4 rounded focus:outline-offset-0"
        href="/user/create"
      >
        Create one.
      </a>
    {/if}

    {#if type === 'create'}
      Already have an account?
      <a
        class="underline underline-offset-2 decoration-primary decoration-2 hover:underline-offset-1 hover:decoration-4 rounded focus:outline-offset-0"
        href="/user/login"
      >
        Login.
      </a>
    {/if}
  </span>
</form>

<style lang="postcss">
  input {
    @apply mt-1 block w-full rounded border-2 border-text/25 bg-background px-4 py-2 text-current;
  }

  input[aria-invalid='true'] {
    @apply border-dashed border-primary;
  }
</style>
