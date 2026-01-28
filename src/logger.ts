import { Logger } from "@aws-lambda-powertools/logger"

const noLogger = {
  log: () => undefined,
  debug: () => undefined,
  info: () => undefined,
  error: () => undefined,
  warn: () => undefined,
} as typeof console

export const logger =
  process.env.JEST_WORKER_ID === undefined || process.env.TEST_LOGGER
    ? new Logger({ logLevel: "DEBUG" })
    : noLogger

/**
 * Log stream data with a message prefix
 * Useful for Lambda event processing when logging stream payloads
 *
 * @example
 * ```typescript
 * logStreamData("Processing stream", streamData)
 * ```
 */
export function logStreamData(message: string, data: unknown): void {
  logger.info(message, { streamData: data })
}
