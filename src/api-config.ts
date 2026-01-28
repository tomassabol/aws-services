import { getSecretAsObject } from "./secrets-manager"

export type ApiConfig = {
  baseURL: string
  apiKey: string
}

/**
 * Get API configuration from AWS Secrets Manager
 *
 * @example
 * ```typescript
 * const config = await getApiConfigFromSecret("my-api-secret")
 * // Returns { baseURL: "https://api.example.com", apiKey: "..." }
 * ```
 */
export function getApiConfigFromSecret(secretName: string): Promise<ApiConfig> {
  return getSecretAsObject<ApiConfig>(secretName)
}
