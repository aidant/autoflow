import * as kv from './db-kv.js'
import { decode, encode } from './util-encoding.js'
import * as jwe from './util-jwe.js'
import { jwk } from './util-jwk.js'

export const get = async (name: string): Promise<Uint8Array | null> => {
  const encrypted = kv.get(`autoflow:secret:kv:${name}`)

  if (!encrypted) return null

  return await jwe.decrypt(await jwk(), decode(encrypted))
}

export const set = async <Secret extends Uint8Array>(
  name: string,
  secret: Secret,
): Promise<Secret> => {
  kv.set(`autoflow:secret:kv:${name}`, encode(await jwe.encrypt(await jwk(), secret)))

  return secret
}

export const ensure = async (name: string, secret: Uint8Array): Promise<Uint8Array> => {
  const encrypted = kv.ensure(
    `autoflow:secret:kv:${name}`,
    encode(await jwe.encrypt(await jwk(), secret)),
  )

  return await jwe.decrypt(await jwk(), decode(encrypted))
}
