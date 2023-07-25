export const getEnvironmentVariable = (name: string): string | null => {
  return import.meta.env?.[name] || process.env?.[name] || null
}
