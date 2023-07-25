import { describe, expect, it } from 'vitest'
import { createOrganisation } from './db-organisation.js'

describe('Database Organisation', () => {
  describe('create', () => {
    it('creates an organisation', () => {
      const organisation = createOrganisation({ name: 'Test organisation' })

      expect(organisation).toEqual({
        id: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),

        name: 'Test organisation',
      })
    })
  })
})
