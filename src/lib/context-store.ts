import { getContext, setContext } from 'svelte'
import type { Readable } from 'svelte/store'

const symbols: Record<string, symbol> = {}

export const createContextStore = <Store extends Readable<unknown>>(name: string, store: Store) => {
  return setContext((symbols[name] ??= Symbol(name)), store)
}

export const getContextStore = <Store extends Readable<unknown>>(name: string): Store => {
  return getContext((symbols[name] ??= Symbol(name)))
}
