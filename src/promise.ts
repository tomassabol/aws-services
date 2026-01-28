/**
 * Type guard for fulfilled promises in Promise.allSettled results
 *
 * @example
 * ```typescript
 * const results = await Promise.allSettled([promise1, promise2])
 * const fulfilled = results.filter(isFulfilled)
 * ```
 */
export function isFulfilled<T>(
  result: PromiseSettledResult<T>
): result is PromiseFulfilledResult<T> {
  return result.status === "fulfilled"
}

/**
 * Type guard for rejected promises in Promise.allSettled results
 *
 * @example
 * ```typescript
 * const results = await Promise.allSettled([promise1, promise2])
 * const rejected = results.filter(isRejected)
 * ```
 */
export function isRejected<T>(
  result: PromiseSettledResult<T>
): result is PromiseRejectedResult {
  return result.status === "rejected"
}

/**
 * Extract fulfilled values from Promise.allSettled results
 *
 * @example
 * ```typescript
 * const results = await Promise.allSettled([promise1, promise2, promise3])
 * const values = getFulfilledValues(results) // T[]
 * ```
 */
export function getFulfilledValues<T>(results: PromiseSettledResult<T>[]): T[] {
  return results.filter(isFulfilled).map((result) => result.value)
}

/**
 * Extract rejection reasons from Promise.allSettled results
 *
 * @example
 * ```typescript
 * const results = await Promise.allSettled([promise1, promise2, promise3])
 * const errors = getRejectedReasons(results) // unknown[]
 * ```
 */
export function getRejectedReasons<T>(
  results: PromiseSettledResult<T>[]
): unknown[] {
  return results.filter(isRejected).map((result) => result.reason)
}
