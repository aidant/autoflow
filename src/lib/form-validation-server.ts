import { ZodError, type AnyZodObject, type TypeOf } from 'zod'
import { ValidationError } from './error-validation'

export const formValidation = <Schema extends AnyZodObject>(
  form: FormData,
  schema: Schema,
): TypeOf<Schema> => {
  const data = Object.fromEntries(Object.keys(schema.shape).map((key) => [key, form.get(key)])) as {
    [Key in keyof TypeOf<Schema>]?: string
  }

  try {
    return schema.parse(data)
  } catch (error) {
    if (error instanceof ZodError) {
      throw new ValidationError(
        `Invalid ${schema.description}`,
        {
          invalid: error.issues.reduce(
            (invalid: Partial<Record<keyof TypeOf<Schema>, string>>, issue) => {
              invalid[issue.path.join('.') as keyof typeof invalid] ??= issue.message
              return invalid
            },
            {},
          ),
          data: data as Record<string, string>,
        },
        { cause: error },
      )
    } else {
      throw error
    }
  }
}
