import { SNSClient, PublishCommand } from "@aws-sdk/client-sns"
import { logger } from "./logger"

export const snsClient = new SNSClient({})

export const publishMessageToSNS = async (params: {
  topicArn: string
  message: string
  options?: object
}) => {
  try {
    const { topicArn, message, options } = params
    return await snsClient.send(
      new PublishCommand({
        TopicArn: topicArn,
        Message: message,
        ...options,
      })
    )
  } catch (error) {
    logger.error("publishMessageToSNS", { error, params })
    throw error
  }
}
