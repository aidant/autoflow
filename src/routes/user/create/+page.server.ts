import { createAction } from '$lib/component-login'
import { createUser } from '$lib/db-user'
import { UsernameAndPasswordCreateSchema } from '$lib/schema-username-and-password'
import type { Actions } from '@sveltejs/kit'

export const actions = {
  default: createAction(createUser, UsernameAndPasswordCreateSchema),
} satisfies Actions
