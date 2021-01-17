import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { getDynamoDbClient } from '@libs/dynamodb';
import { APIGatewayProxyResult } from 'aws-lambda';

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const dynamoDbClient = getDynamoDbClient()

  return new Promise<APIGatewayProxyResult>((resolve, reject) => {
    dynamoDbClient.put({
      TableName: 'fetishism',
      Item: {
        name: event.body.fetishism
      },
    }, (err, data) => {
      if (err) {
        console.error('error: ', err)
        reject(err.message)
        return
      }
      console.log('data: ', data)
      resolve(formatJSONResponse({
        message: `Received your fetishism: "${event.body.fetishism}"`,
        event,
      }))
    })

  })
}

export const main = middyfy(hello);
