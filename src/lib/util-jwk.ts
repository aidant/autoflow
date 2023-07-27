import type { JWK } from 'jose'
import { generateKeyPair } from 'node:crypto'
import * as kv from './db-kv.js'
import { decode, encode } from './util-encoding.js'
import { getEnvironmentVariable } from './util-environment-variable.js'

export const create = async (): Promise<JWK> => {
  return await {
    then: (resolve: (privateKey: JWK) => void, reject: (error: unknown) => void) => {
      generateKeyPair('ec', { namedCurve: 'secp521r1' }, (error, publicKey, privateKey) => {
        if (error) {
          reject(error)
        } else {
          resolve(
            Object.assign(
              Object.create(null),
              { alg: 'ECDH-ES+A256KW' },
              privateKey.export({ format: 'jwk' }),
            ),
          )
        }
      })
    },
  }
}

const importKey = (key: Uint8Array): JWK => {
  return JSON.parse(decode(key))
}

export { importKey as import }

const exportKey = (jwk: JWK): Uint8Array => {
  return encode(JSON.stringify(jwk))
}

export { exportKey as export }

export const jwk = async (): Promise<JWK> => {
  const AUTOFLOW_JWK = getEnvironmentVariable('AUTOFLOW_JWK')

  if (AUTOFLOW_JWK) {
    return JSON.parse(AUTOFLOW_JWK)
  }

  return importKey(kv.ensure('autoflow:jwk', exportKey(await create())))
}
