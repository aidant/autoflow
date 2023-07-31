import { getUserById } from '$lib/db-user'
import { decrypt } from '$lib/util-jwe'
import { jwk } from '$lib/util-jwk'
import { redirect } from '@sveltejs/kit'
import { stringify } from 'uuid'
import type { LayoutServerLoad } from './$types'

export const load = (async ({ cookies }) => {
  const cookie = cookies.get('user')

  if (!cookie) {
    throw redirect(302, '/user/login')
  }

  let userId: string
  try {
    userId = stringify(await decrypt(await jwk(), cookie))
  } catch (error) {
    cookies.delete('user', { path: '/' })
    throw redirect(302, '/user/login')
  }

  const user = getUserById({ id: userId })

  if (!user) {
    throw redirect(302, '/user/login')
  }

  return {
    user: {
      username: user.username,
      organisationId: user.organisationId,
    },
  }
}) satisfies LayoutServerLoad
