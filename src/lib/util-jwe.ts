import { CompactEncrypt, compactDecrypt, importJWK, type JWK } from 'jose'

export const encrypt = async (jwk: JWK, payload: Uint8Array): Promise<string> => {
  return await new CompactEncrypt(payload)
    .setProtectedHeader({ alg: jwk.alg!, enc: 'A256GCM' })
    .encrypt(await importJWK(jwk))
}

export const decrypt = async (jwk: JWK, jwe: string): Promise<Uint8Array> => {
  const result = await compactDecrypt(jwe, await importJWK(jwk))
  return result.plaintext
}
