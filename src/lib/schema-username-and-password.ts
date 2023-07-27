import { z } from 'zod'

export const UsernameSchema = z
  .string({
    invalid_type_error: 'Username must be a string',
    required_error: 'Username is required',
  })
  .min(1, 'Username is required')
  .max(64, 'Username cannot exceed 128 characters')
  .regex(/^[a-z0-9._]*$/i, 'Username can only include letters, numbers, period, and underscore')
  .describe('username')

export const PasswordSchema = z
  .string({
    invalid_type_error: 'Password must be a string',
    required_error: 'Password is required',
  })
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password cannot exceed 128 characters')
  .describe('password')

export const UsernameAndPasswordSchema = z
  .object({
    username: UsernameSchema,
    password: PasswordSchema,
  })
  .describe('username and password')

export type UsernameAndPassword = z.infer<typeof UsernameAndPasswordSchema>
