import {
  SQSClient,
  SendMessageCommand,
  SendMessageCommandInput,
} from "@aws-sdk/client-sqs"
import { logger } from "./logger"

export const client = new SQSClient({})

export async function sendSqsMessage(params: {
  queueUrl: string
  message: string | object
}): Promise<string | undefined> {
  const { queueUrl, message } = params

  try {
    const body = typeof message === "object" ? JSON.stringify(message) : message

    const input: SendMessageCommandInput = {
      QueueUrl: queueUrl,
      MessageBody: body,
    }

    const command = new SendMessageCommand(input)

    const response = await client.send(command)
    return response.MessageId
  } catch (error) {
    logger.error("sendSqsMessage", { error, params })
    throw error
  }
}
