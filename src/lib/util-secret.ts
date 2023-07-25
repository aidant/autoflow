import type { JWK } from 'jose'
import * as kv from './db-kv.js'
import { decode, encode } from './util-encoding.js'
import { getEnvironmentVariable } from './util-environment-variable.js'
import * as jwe from './util-jwe.js'
import * as jwk from './util-jwk.js'

const key = async (): Promise<JWK> => {
  const AUTOFLOW_JWK = getEnvironmentVariable('AUTOFLOW_JWK')

  if (AUTOFLOW_JWK) {
    return JSON.parse(AUTOFLOW_JWK)
  }

  return jwk.import(kv.ensure('autoflow:secret:jwk', jwk.export(await jwk.create())))
}

export const get = async (name: string): Promise<Uint8Array | null> => {
  const encrypted = kv.get(`autoflow:secret:kv:${name}`)

  if (!encrypted) return null

  return await jwe.decrypt(await key(), decode(encrypted))
}

export const set = async <Secret extends Uint8Array>(
  name: string,
  secret: Secret,
): Promise<Secret> => {
  kv.set(`autoflow:secret:kv:${name}`, encode(await jwe.encrypt(await key(), secret)))

  return secret
}

export const ensure = async (name: string, secret: Uint8Array): Promise<Uint8Array> => {
  const encrypted = kv.ensure(
    `autoflow:secret:kv:${name}`,
    encode(await jwe.encrypt(await key(), secret)),
  )

  return await jwe.decrypt(await key(), decode(encrypted))
}
