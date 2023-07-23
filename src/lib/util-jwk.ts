import type { JWK } from 'jose'
import { generateKeyPair } from 'node:crypto'
import { decode, encode } from './util-encoding'

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
