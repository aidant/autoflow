import { default as Database } from 'better-sqlite3'

export const db = new Database(':memory:')

db.pragma('journal_mode = WAL')

export type ColumnType<
  T extends { db: unknown; create: unknown; get: unknown; set: unknown } = {
    db: unknown
    create: unknown
    get: unknown
    set: unknown
  },
> = T

export type PrimaryKey = { db: Uint8Array; create: never; get: string; set: never }
export type At = { db: string; create: never; get: Date; set: never }
export type NotNull<T> = { db: T; create: T; get: T; set: T | undefined }
export type Nullable<T> = { db: T | null; create: T | undefined; get: T | null; set: T | undefined }

export type Schema<T> = Merge<
  {
    id: ColumnType<PrimaryKey>
    createdAt: ColumnType<At>
    updatedAt: ColumnType<At>
  } & T
>

export type SchemaConstraint = Record<string, ColumnType>

type _<Type> = Type

type Merge<Type> = _<{ [Key in keyof Type]: Type[Key] }>

type KeysWhereValue<Type, Value> = {
  [key in keyof Type]: Value extends Type[key] ? key : never
}[keyof Type]

type Optional<T> = Partial<Pick<T, KeysWhereValue<T, undefined>>>

type Required<T> = Omit<T, KeysWhereValue<T, undefined>>

type OptionalUndefined<T> = Merge<Optional<T> & Required<T>>

type RemoveNever<Type> = { [Key in keyof Type as Type[Key] extends never ? never : Key]: Type[Key] }

export type DB<Schema extends SchemaConstraint> = OptionalUndefined<
  RemoveNever<{
    [Column in keyof Schema]: Schema[Column]['db']
  }>
>
export type Create<Schema extends SchemaConstraint> = OptionalUndefined<
  RemoveNever<{
    [Column in keyof Schema]: Schema[Column]['create']
  }>
>
export type Get<Schema extends SchemaConstraint> = OptionalUndefined<
  RemoveNever<{
    [Column in keyof Schema]: Schema[Column]['get']
  }>
>
export type Set<Schema extends SchemaConstraint> = OptionalUndefined<
  RemoveNever<{
    [Column in keyof Schema]: Schema[Column]['set']
  }>
>
