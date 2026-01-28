/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  EventBridgeClient,
  PutEventsCommand,
} from "@aws-sdk/client-eventbridge"
import { logger } from "./logger"

export const client = new EventBridgeClient({})

export async function sendEvent(params: {
  source: string
  eventBusName: string
  eventType: string
  event: any
}) {
  const { eventBusName, eventType, event, source } = params

  const input = {
    Entries: [
      {
        EventBusName: eventBusName,
        Source: source,
        DetailType: eventType,
        Detail: JSON.stringify(event),
      },
    ],
  }

  const command = new PutEventsCommand(input)

  try {
    const result = await client.send(command)

    /* Check if there are any failed events */
    if (result.FailedEntryCount) {
      const errorDetail = result.Entries?.length
        ? `${result.Entries[0].ErrorCode}: ${result.Entries[0].ErrorMessage}}`
        : "unknown"
      throw new Error(`PutEventsCommand error ${errorDetail}`)
    }

    logger.debug("sendEvent success", { input, result })
  } catch (error) {
    logger.error("sendEvent error", { input, error })
    throw error
  }
}
