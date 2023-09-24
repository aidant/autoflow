import type { Writable } from 'svelte/store'

export const formValidationMessage = (el: HTMLInputElement, writable: Writable<string>) => {
  const handleInvalid = (event: Event) => {
    event.preventDefault()
    writable.set(el.validationMessage)
  }

  const handleInput = () => {
    writable.set(el.validationMessage)
  }

  const unsubscribe = writable.subscribe((message) => {
    if (message !== el.validationMessage) {
      el.setCustomValidity(message)
      el.reportValidity()
    }
  })

  el.addEventListener('input', handleInput)
  el.addEventListener('invalid', handleInvalid)

  return {
    destroy: () => {
      el.removeEventListener('invalid', handleInvalid)
      el.removeEventListener('input', handleInput)
      unsubscribe()
    },
  }
}
