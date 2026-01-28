let serviceName: string | undefined

/**
 * Get the globally set service name
 *
 * @throws Error if service name has not been set
 *
 * @example
 * ```typescript
 * const name = getServiceName()
 * ```
 */
export function getServiceName(): string {
  if (serviceName === undefined) {
    throw new Error("Service name has not been set. Call setServiceName first.")
  }
  return serviceName
}

/**
 * Set the global service name
 *
 * @example
 * ```typescript
 * // Set in Lambda handler initialization
 * setServiceName("my-service")
 * ```
 */
export function setServiceName(name: string): void {
  serviceName = name
}
