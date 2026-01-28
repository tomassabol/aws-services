import {
  AppConfigClient,
  GetApplicationCommand,
} from "@aws-sdk/client-appconfig"
import { logger } from "./logger"

export const appConfigClient = new AppConfigClient({})

export const getApplication = async (applicationId: string) => {
  try {
    return await appConfigClient.send(
      new GetApplicationCommand({
        ApplicationId: applicationId,
      })
    )
  } catch (error) {
    logger.error("getApplication", { error, applicationId })
    throw error
  }
}
