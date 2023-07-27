import type { User } from '$lib/db-user'
import { ValidationError } from '$lib/error-validation'
import { formValidation } from '$lib/form-validation-server'
import {
  UsernameAndPasswordSchema,
  type UsernameAndPassword,
} from '$lib/schema-username-and-password'
import { encrypt } from '$lib/util-jwe'
import { jwk } from '$lib/util-jwk'
import { fail, redirect, type RequestEvent } from '@sveltejs/kit'
import { parse } from 'uuid'

export const createAction =
  (db: (credentials: UsernameAndPassword) => Promise<User>) =>
  async ({ cookies, request }: RequestEvent) => {
    let user: User
    try {
      const form = formValidation(await request.formData(), UsernameAndPasswordSchema)
      user = await db(form)
    } catch (error) {
      if (error instanceof ValidationError) {
        return fail(422, (error as ValidationError<UsernameAndPassword>).details)
      } else {
        throw error
      }
    }

    cookies.set('user', await encrypt(await jwk(), parse(user.id)), {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 * 2,
    })

    throw redirect(302, '/app')
  }
