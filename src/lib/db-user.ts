import { default as argon2 } from 'argon2'
import { DateTime } from 'luxon'
import { parse, stringify, v4 as uuidv4 } from 'uuid'
import { createOrganisation } from './db-organisation.js'
import {
  db,
  type ColumnType,
  type Create,
  type DB,
  type Get,
  type NotNull,
  type Schema,
} from './db.js'

export type UserSchema = Schema<{
  username: ColumnType<NotNull<string>>
  password: ColumnType<NotNull<string>>

  organisationId: ColumnType<{
    db: Uint8Array
    create: string | undefined
    get: string
    set: string | undefined
  }>
}>

export type User = Get<UserSchema>

db.exec(
  `CREATE TABLE IF NOT EXISTS "User" (${[
    '"id" BLOB NOT NULL PRIMARY KEY',
    '"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP',
    '"updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP',
    '"username" TEXT NOT NULL UNIQUE',
    '"password" TEXT NOT NULL',
    '"organisationId" BLOB NOT NULL',
    'CONSTRAINT "User.organisationId" FOREIGN KEY ("organisationId") REFERENCES "Organisation" ("id") ON DELETE CASCADE ON UPDATE CASCADE',
  ].join(', ')})`,
)

db.exec(`CREATE UNIQUE INDEX IF NOT EXISTS "User.username" ON "User" ("username")`)

const convert = (row: DB<UserSchema>): User => {
  return {
    id: stringify(row.id),
    createdAt: DateTime.fromSQL(row.createdAt, { zone: 'UTC' }).toJSDate(),
    updatedAt: DateTime.fromSQL(row.updatedAt, { zone: 'UTC' }).toJSDate(),

    username: row.username,
    password: row.password,

    organisationId: stringify(row.organisationId),
  }
}

const createUserStatement = db.prepare(
  'INSERT INTO "User" ("id", "username", "password", "organisationId") VALUES (?, ?, ?, ?) RETURNING *',
)

export const createUser = async (user: Create<UserSchema>): Promise<User> => {
  const row = createUserStatement.get(
    parse(uuidv4()),
    user.username,
    await argon2.hash(user.password, { type: argon2.argon2id }),
    parse(
      user.organisationId || createOrganisation({ name: `${user.username}'s organisation` }).id,
    ),
  ) as DB<UserSchema>

  return convert(row)
}

const getUserByIdStatement = db.prepare('SELECT * FROM "User" WHERE "id" = ?')

export const getUserById = (user: Pick<User, 'id'>): User | null => {
  const row = getUserByIdStatement.get(parse(user.id)) as DB<UserSchema> | null

  if (!row) return null

  return convert(row)
}

const getUserByUsernameAndPasswordStatement = db.prepare(
  'SELECT * FROM "User" WHERE "username" = ?',
)

export const getUserByUsernameAndPassword = async (
  credentials: Pick<User, 'username' | 'password'>,
): Promise<User | null> => {
  const row = getUserByUsernameAndPasswordStatement.get(
    credentials.username,
  ) as DB<UserSchema> | null

  if (!row) return null

  const user = convert(row)

  const isPasswordCorrect = await argon2.verify(user.password, credentials.password, {
    type: argon2.argon2id,
  })

  if (!isPasswordCorrect) return null

  return user
}
