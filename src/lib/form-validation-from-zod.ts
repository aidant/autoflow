import type { ZodString } from 'zod'

export const formValidationFromZod = <Schema extends ZodString>(
  el: HTMLInputElement,
  schema: Schema,
) => {
  let dirty = false

  const check = () => {
    const result = schema.safeParse(el.value)
    const message = !result.success ? result.error.issues[0].message : ''
    el.setCustomValidity(message)
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
