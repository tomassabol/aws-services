import { S3, PutObjectCommandOutput } from "@aws-sdk/client-s3"
import { logger } from "./logger"

export const client = new S3({})

export async function putObjectToS3(params: {
  bucket: string
  key: string
  body: string | Uint8Array | Buffer
  contentEncoding: string
  contentType: string
}): Promise<PutObjectCommandOutput> {
  const { bucket, key, body, contentEncoding, contentType } = params

  try {
    return await client.putObject({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentEncoding: contentEncoding,
      ContentType: contentType,
    })
  } catch (error) {
    logger.error("putObjectToS3", {
      error,
      params: { bucket, key, contentEncoding, contentType },
    })
    throw error
  }
}

export async function getObjectFromS3(params: {
  bucket: string
  key: string
}): Promise<Uint8Array> {
  try {
    const { bucket, key } = params

    const result = await client.getObject({
      Bucket: bucket,
      Key: key,
    })

    const body = result.Body

    if (body === undefined) {
      logger.error("Body not found", { params })
      throw new Error("Body not found")
    }

    return await body.transformToByteArray()
  } catch (error) {
    logger.error("getObjectFromS3", { error, params })
    throw error
  }
}
