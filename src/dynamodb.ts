import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb"

export const client: DynamoDBClient = new DynamoDBClient({})

export const documentClient: DynamoDBDocumentClient =
  DynamoDBDocumentClient.from(client)
