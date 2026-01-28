/**
 * Get a required environment variable
 *
 * @throws Error if the environment variable is not set
 *
 * @example
 * ```typescript
 * const apiUrl = env("API_URL")
 * ```
 */
export function env(name: string): string {
  const value = process.env[name]
  if (value === undefined || value === "") {
    throw new Error(`Environment variable ${name} is not set`)
  }
  return value
}

export type EnvAsIntegerOptions = {
  optional?: boolean
  min?: number
  max?: number
}

/**
 * Get an environment variable as an integer
 *
 * @throws Error if the environment variable is not set (unless optional is true)
 * @throws Error if the value is not a valid integer
 * @throws Error if the value is outside the min/max range
 *
 * @example
 * ```typescript
 * // Required integer
 * const port = envAsInteger("PORT")
 *
 * // Optional integer with validation
 * const timeout = envAsInteger("TIMEOUT", { optional: true, min: 1000, max: 30000 })
 * ```
 */
export function envAsInteger(
  name: string,
  options?: EnvAsIntegerOptions
): number | undefined {
  const { optional = false, min, max } = options ?? {}

  const value = process.env[name]

  if (value === undefined || value === "") {
    if (optional) {
      return undefined
    }
    throw new Error(`Environment variable ${name} is not set`)
  }

  const parsed = parseInt(value, 10)

  if (isNaN(parsed)) {
    throw new Error(
      `Environment variable ${name} is not a valid integer: ${value}`
    )
  }

  if (min !== undefined && parsed < min) {
    throw new Error(
      `Environment variable ${name} value ${parsed} is less than minimum ${min}`
    )
  }

  if (max !== undefined && parsed > max) {
    throw new Error(
      `Environment variable ${name} value ${parsed} is greater than maximum ${max}`
    )
  }

  return parsed
}
