import { describe, expect, it } from 'vitest'
import { decode, encode } from './util-encoding.js'
import { ensure, get, set } from './util-secret.js'

describe('Utility Secret', () => {
  describe('ensure', () => {
    it('will create but not override', async () => {
      const result1 = await ensure('test', encode('foo'))
      const result2 = await ensure('test', encode('bar'))

      expect(decode(result1)).toEqual('foo')
      expect(decode(result2)).toEqual('foo')
    })
  })

  describe('set', () => {
    it('will override', async () => {
      const result = await set('test', encode('bar'))

      expect(decode(result)).toEqual('bar')
    })
  })

  describe('get', () => {
    it('returns the value', async () => {
      const result = await get('test')

      expect(decode(result!)).toEqual('bar')
    })
  })
})
