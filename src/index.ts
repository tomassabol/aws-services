// API Config
export { getApiConfigFromSecret, type ApiConfig } from "./api-config"

// AppConfig
export { appConfigClient, getApplication } from "./appconfig"

// DynamoDB
export { client as dynamodbClient, documentClient } from "./dynamodb"

// Environment Variables
export { env, envAsInteger, type EnvAsIntegerOptions } from "./env"

// EventBridge
export { client as eventBridgeClient, sendEvent } from "./eventbridge"

// Logger
export { logger, logStreamData } from "./logger"

// Promise Utilities
export {
  isFulfilled,
  isRejected,
  getFulfilledValues,
  getRejectedReasons,
} from "./promise"

// S3
export { client as s3Client, putObjectToS3, getObjectFromS3 } from "./s3"

// Secrets Manager
export {
  client as secretsManagerClient,
  getSecret,
  getSecretAsObject,
} from "./secrets-manager"

// Service Name
export { getServiceName, setServiceName } from "./service-name"

// SNS
export { snsClient, publishMessageToSNS } from "./sns"

// SQS
export { client as sqsClient, sendSqsMessage } from "./sqs"

// SSM
export {
  client as ssmClient,
  getSsmParameters,
  type SSMParameters,
} from "./ssm"

// Try-Catch
export { tryCatch, tryCatchSync, type TryCatchResult } from "./try-catch"
