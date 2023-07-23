import type { JWK } from 'jose'
import * as kv from './db-kv.js'
import { decode, encode } from './util-encoding.js'
import * as jwe from './util-jwe.js'
import * as jwk from './util-jwk.js'

const key = async (): Promise<JWK> => {
  if (import.meta.env?.['AUTOFLOW_JWK']) {
    return JSON.parse(import.meta.env['AUTOFLOW_JWK'])
  }

  if (process.env?.['AUTOFLOW_JWK']) {
    return JSON.parse(process.env['AUTOFLOW_JWK'])
  }

  return jwk.import(kv.ensure('autoflow:secret:jwk', jwk.export(await jwk.create())))
}

export const get = async (name: string): Promise<Uint8Array | null> => {
  const encrypted = kv.get(name)

  if (!encrypted) return null

  return await jwe.decrypt(await key(), decode(encrypted))
}

export const set = async <Secret extends Uint8Array>(
  name: string,
  secret: Secret,
): Promise<Secret> => {
  kv.set(name, encode(await jwe.encrypt(await key(), secret)))

  return secret
}

export const ensure = async (name: string, secret: Uint8Array): Promise<Uint8Array> => {
  const encrypted = kv.ensure(name, encode(await jwe.encrypt(jwk, secret)))

  return await jwe.decrypt(await key(), decode(encrypted))
}
