import type { ZodString } from 'zod'

export const zodSchemaToValidator = (schema: ZodString) => {
  return (value: string) => {
    const result = schema.safeParse(value)
    return !result.success ? result.error.issues[0].message : ''
  }
}

export const formValidator = (el: HTMLInputElement, validator: (value: string) => string) => {
  let dirty = false

  const check = () => {
    el.setCustomValidity(validator(el.value))
    el.reportValidity()
  }

  const handleInput = () => {
    dirty = true

    if (el.validationMessage) {
      check()
    }
  }

  const handleFocusOut = () => {
    if (dirty) {
      check()
    }
  }

  const handleSubmit = () => {
    dirty = false
  }

  el.addEventListener('input', handleInput)
  el.addEventListener('focusout', handleFocusOut)
  el.addEventListener('submit', handleSubmit)

  return {
    destroy: () => {
      el.removeEventListener('input', handleInput)
      el.removeEventListener('focusout', handleFocusOut)
      el.removeEventListener('submit', handleSubmit)
    },
  }
}
