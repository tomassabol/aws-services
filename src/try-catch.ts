export type TryCatchResult<T, E = Error> =
  | { data: T; error: null }
  | { data: null; error: E }

/**
 * Functional error handling without try-catch blocks
 *
 * @example
 * ```typescript
 * // Async function
 * const result = await tryCatch(someAsyncFunction())
 * if (result.error) {
 *   console.error(result.error)
 * } else {
 *   console.log(result.data)
 * }
 *
 * // Sync function
 * const result = tryCatch(() => someSyncFunction())
 * if (result.error) {
 *   // Handle error
 * } else {
 *   // Use data
 * }
 * ```
 */
export async function tryCatch<T, E = Error>(
  promiseOrFn: Promise<T> | (() => T)
): Promise<TryCatchResult<T, E>> {
  try {
    if (typeof promiseOrFn === "function") {
      const data = promiseOrFn()
      return { data, error: null }
    }
    const data = await promiseOrFn
    return { data, error: null }
  } catch (error) {
    return { data: null, error: error as E }
  }
}

/**
 * Synchronous version of tryCatch for non-async functions
 *
 * @example
 * ```typescript
 * const result = tryCatchSync(() => JSON.parse(jsonString))
 * if (result.error) {
 *   console.error("Invalid JSON")
 * } else {
 *   console.log(result.data)
 * }
 * ```
 */
export function tryCatchSync<T, E = Error>(fn: () => T): TryCatchResult<T, E> {
  try {
    const data = fn()
    return { data, error: null }
  } catch (error) {
    return { data: null, error: error as E }
  }
}
