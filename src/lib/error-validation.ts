export type ValidationDetails<Type> = {
  invalid: Partial<Record<keyof Type, string>>
  data?: Partial<Type>
}

export class ValidationError<Tyoe> extends Error {
  constructor(
    message: string,
    public readonly details: ValidationDetails<Tyoe>,
    options?: ErrorOptions,
  ) {
    super(message, options)
  }
}
