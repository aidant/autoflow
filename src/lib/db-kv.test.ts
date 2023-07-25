import { describe, expect, it } from 'vitest'
import { ensure, get, set } from './db-kv.js'
import { decode, encode } from './util-encoding.js'

describe('Database KV', () => {
  describe('ensure', () => {
    it('will create but not override', () => {
      const result1 = ensure('test', encode('foo'))
      const result2 = ensure('test', encode('bar'))

      expect(decode(result1)).toEqual('foo')
      expect(decode(result2)).toEqual('foo')
    })
  })

  describe('set', () => {
    it('will override', () => {
      const result = set('test', encode('bar'))

      expect(decode(result)).toEqual('bar')
    })
  })

  describe('get', () => {
    it('returns the value', () => {
      const result = get('test')

      expect(decode(result!)).toEqual('bar')
    })

    it('returns null', () => {
      const result = get('null')

      expect(result).toBeNull()
    })
  })
})
