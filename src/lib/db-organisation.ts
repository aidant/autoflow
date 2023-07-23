import { DateTime } from 'luxon'
import { parse, stringify, v4 as uuidv4 } from 'uuid'
import { db, type Create, type DB, type Get, type NotNull, type Schema } from './db.js'

export type OrganisationSchema = Schema<{
  name: NotNull<string>
}>

export type Organisation = Get<OrganisationSchema>

db.exec(
  `CREATE TABLE IF NOT EXISTS "Organisation" (${[
    '"id" BLOB NOT NULL PRIMARY KEY',
    '"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP',
    '"updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP',
    '"name" TEXT NOT NULL',
  ].join(', ')})`,
)

const convert = (row: DB<OrganisationSchema>): Organisation => {
  return {
    id: stringify(row.id),
    createdAt: DateTime.fromSQL(row.createdAt, { zone: 'UTC' }).toJSDate(),
    updatedAt: DateTime.fromSQL(row.updatedAt, { zone: 'UTC' }).toJSDate(),

    name: row.name,
  }
}

const createOrganisationStatement = db.prepare(
  'INSERT INTO "Organisation" ("id", "name") VALUES (?, ?) RETURNING *',
)

export const createOrganisation = (organisation: Create<OrganisationSchema>): Organisation => {
  const row = createOrganisationStatement.get(
    parse(uuidv4()),
    organisation.name,
  ) as DB<OrganisationSchema>

  return convert(row)
}
