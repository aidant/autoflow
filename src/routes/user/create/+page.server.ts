import { createAction } from '$lib/component-login'
import { createUser } from '$lib/db-user'
import type { Actions } from '@sveltejs/kit'

export const actions = {
  default: createAction(createUser),
} satisfies Actions
