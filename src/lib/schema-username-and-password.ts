import { z } from 'zod'

export const UsernameLoginSchema = z
  .string({
    invalid_type_error: 'Username must be a string',
    required_error: 'Username is required',
  })
  .describe('username')
  .min(1, 'Username is required')

export const PasswordLoginSchema = z
  .string({
    invalid_type_error: 'Password must be a string',
    required_error: 'Password is required',
  })
  .describe('password')
  .min(1, 'Password is required')

export const UsernameAndPasswordLoginSchema = z
  .object({
    username: UsernameLoginSchema,
    password: PasswordLoginSchema,
  })
  .describe('username and password')

export type UsernameAndPassword = z.infer<typeof UsernameAndPasswordLoginSchema>

export const UsernameCreateSchema = UsernameLoginSchema.max(
  64,
  'Username cannot exceed 128 characters',
).regex(/^[a-z0-9._]*$/i, 'Username can only include letters, numbers, period, and underscore')

export const PasswordCreateSchema = PasswordLoginSchema.min(
  8,
  'Password must be at least 8 characters',
).max(128, 'Password cannot exceed 128 characters')

export const UsernameAndPasswordCreateSchema = z
  .object({
    username: UsernameCreateSchema,
    password: PasswordCreateSchema,
  })
  .describe('username and password')
