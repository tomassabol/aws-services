// AppConfig
export { appConfigClient, getApplication } from "./appconfig"

// DynamoDB
export { client as dynamodbClient, documentClient } from "./dynamodb"

// EventBridge
export { client as eventBridgeClient, sendEvent } from "./eventbridge"

// Logger
export { logger } from "./logger"

// S3
export { client as s3Client, putObjectToS3, getObjectFromS3 } from "./s3"

// Secrets Manager
export {
  client as secretsManagerClient,
  getSecret,
  getSecretAsObject,
} from "./secrets-manager"

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
