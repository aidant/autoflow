import { DateTime } from 'luxon'
import { parse, v4 as uuidv4 } from 'uuid'
import { db, type DB, type Get, type NotNull, type Schema } from './db.js'

export type KVSchema = Schema<{
  key: NotNull<string>
  value: NotNull<Uint8Array>
}>

export type KV = Get<KVSchema>

db.exec(
  `CREATE TABLE IF NOT EXISTS "KV" (${[
    '"id" BLOB NOT NULL PRIMARY KEY',
    '"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP',
    '"updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP',
    '"key" TEXT NOT NULL UNIQUE',
    '"value" BLOB NOT NULL',
  ].join(', ')})`,
)

db.exec(`CREATE UNIQUE INDEX IF NOT EXISTS "KV.key" ON "KV" ("key")`)

const getStatement = db.prepare('SELECT * FROM "KV" WHERE "key" = ?')

export const get = (key: string): Uint8Array | null => {
  const row = getStatement.get(key) as DB<KVSchema>

  if (!row) return null

  return row.value
}

const setSchema = db.prepare(
  `INSERT INTO "KV" ("id", "updatedAt", "key", "value") VALUES (?, ?, ?, ?) ON CONFLICT("key") DO UPDATE SET "value" = "excluded"."value", "updatedAt" = "excluded"."updatedAt"`,
)

export const set = <Value extends Uint8Array>(key: string, value: Value): Value => {
  setSchema.run(
    parse(uuidv4()),
    DateTime.fromJSDate(new Date())
      .toUTC()
      .toSQL({ includeOffset: false, includeOffsetSpace: false, includeZone: false }),
    key,
    value,
  )

  return value
}

const ensureSchema = db.prepare(
  `INSERT INTO "KV" ("id", "key", "value") VALUES (?, ?, ?) ON CONFLICT("key") DO UPDATE SET "key" = "excluded"."key"`,
)

export const ensure = (key: string, value: Uint8Array): Uint8Array => {
  const row = ensureSchema.get(parse(uuidv4()), key, value) as DB<KVSchema>

  return row.value
}
