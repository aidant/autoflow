import { createAction } from '$lib/component-login'
import { getUserByUsernameAndPassword } from '$lib/db-user'
import type { Actions } from '@sveltejs/kit'

export const actions = {
  default: createAction(getUserByUsernameAndPassword),
} satisfies Actions
