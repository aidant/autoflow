import { createAction } from '$lib/component-login'
import { getUserById, getUserByUsernameAndPassword } from '$lib/db-user'
import { UsernameAndPasswordLoginSchema } from '$lib/schema-username-and-password'
import { decrypt } from '$lib/util-jwe'
import { jwk } from '$lib/util-jwk'
import { redirect, type Actions } from '@sveltejs/kit'
import { stringify } from 'uuid'
import type { PageServerLoad } from './$types'

export const load = (async ({ cookies }) => {
  const cookie = cookies.get('user')

  if (!cookie) {
    return
  }

  let userId: string
  try {
    userId = stringify(await decrypt(await jwk(), cookie))
  } catch (error) {
    cookies.delete('user', { path: '/' })
    return
  }

  const user = getUserById({ id: userId })

  if (!user) {
    return
  }

  throw redirect(302, '/app')
}) satisfies PageServerLoad

export const actions = {
  default: createAction(getUserByUsernameAndPassword, UsernameAndPasswordLoginSchema),
} satisfies Actions
