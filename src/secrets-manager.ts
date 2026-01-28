import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager"
import assert from "assert"
import { logger } from "./logger"

export const client = new SecretsManagerClient({})

export async function getSecret(secretName: string): Promise<string> {
  try {
    const response = await client.send(
      new GetSecretValueCommand({
        SecretId: secretName,
      })
    )
    const value = response.SecretString
    assert(value, "SecretString value not found")
    return value
  } catch (error) {
    logger.error("getSecret", { error, secretName })
    // For a list of exceptions thrown, see
    // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
    throw error
  }
}

export async function getSecretAsObject<T = unknown>(
  secretName: string
): Promise<T> {
  const value = await getSecret(secretName)
  try {
    return JSON.parse(value)
  } catch (error) {
    throw Error(`Cannot parse secret ${secretName}. Expected JSON.`)
  }
}
