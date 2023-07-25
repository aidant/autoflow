import { describe, expect, it } from 'vitest'
import { createUser, getUserById, getUserByUsernameAndPassword } from './db-user.js'

describe('Database User', () => {
  describe('createUser', () => {
    it('creates a user', async () => {
      const user = await createUser({ username: 'admin', password: 'admin' })

      expect(user).toEqual({
        id: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),

        username: 'admin',
        password: expect.any(String),

        organisationId: expect.any(String),
      })
    })
  })

  describe('getUserById', () => {
    it('gets a user', async () => {
      const { id } = await createUser({ username: 'admin2', password: 'admin2' })

      const user = getUserById({ id })

      expect(user).toEqual({
        id: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),

        username: expect.any(String),
        password: expect.any(String),

        organisationId: expect.any(String),
      })
    })

    it('returns null', () => {
      const user = getUserById({ id: '9a69a584-fdb0-4f6c-890e-7fb9d594bedc' })

      expect(user).toBeNull()
    })
  })

  describe('getUserByUsernameAndPassword', () => {
    it('verifies the username and password', async () => {
      const user1 = await getUserByUsernameAndPassword({ username: 'admin', password: 'admin' })

      expect(user1).toEqual({
        id: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),

        username: 'admin',
        password: expect.any(String),

        organisationId: expect.any(String),
      })
    })

    it('returns null for wrong username', async () => {
      const user = await getUserByUsernameAndPassword({ username: 'sudo', password: 'admin' })

      expect(user).toBeNull()
    })

    it('returns null for wrong password', async () => {
      const user = await getUserByUsernameAndPassword({ username: 'admin', password: 'sudo' })

      expect(user).toBeNull()
    })
  })
})
