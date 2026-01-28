import { SSMClient, GetParametersCommand } from "@aws-sdk/client-ssm"
import assert = require("assert")

export const client = new SSMClient({})

export type SSMParameters = {
  [name: string]: string
}

/**
 * Get a list of parameters from SSM Parameter Store
 *
 * @example
 * ```typescript
 * const params = await getSsmParameters({
 *   first: "/my-params/first",
 *   second: "/my-params/second",
 * })
 *
 * // params = { first: "value1", second: "value2" }
 * ```
 */

export async function getSsmParameters<T extends SSMParameters>(
  parameters: T
): Promise<T> {
  /*
   * Fetch parameters from SSM
   */

  const command = new GetParametersCommand({
    Names: Object.values(parameters),
  })

  const output = await client.send(command)

  /*
   * Map returned parameters to result object
   */

  const result: Record<string, string> = {}
  output.Parameters?.forEach((outputParam) => {
    assert(
      typeof outputParam.Value === "string",
      `Received invalid value of SSM parameter ${outputParam.Name}`
    )
    const entry = Object.entries(parameters).find(
      ([_key, value]) => value === outputParam.Name
    )
    assert(entry, `Received invalid SSM parameter ${outputParam.Name}`)
    const [key] = entry
    result[key] = outputParam.Value
  })

  /*
   * Check that all parameters were received
   */

  const notFoundParams = Object.keys(parameters).filter(
    (key) => false === Object.hasOwn(result, key)
  )

  if (notFoundParams.length > 0) {
    throw new Error(
      `Cannot obtain SSM parameters: ${notFoundParams.join(", ")}`
    )
  }

  return result as T
}
