import type { AWS } from '@serverless/typescript';

import { postFetishism } from './src/functions';

const serverlessConfiguration: AWS = {
  service: 'full-fetishism-adder-backend',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    },
    offline: {
      httpsProtocol: 'dev-certs',
      httpPort: 4000
    },
    dynamodb: {
      stages: ['dev'],
      start: {
        port: 5000,
        inMemory: true,
        migrate: true
      }
    }
  },
  plugins: ['serverless-webpack', 'serverless-offline', 'serverless-dynamodb-local'],
  resources: {
    Resources: {
      DynamoDbTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          AttributeDefinitions: [
            {
              AttributeName: 'name',
              AttributeType: 'S',
            },
          ],
          KeySchema: [
            {
              AttributeName: 'name',
              KeyType: 'HASH',
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
          TableName: 'fetishism'
        },
      },
    },
  },
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    region: 'ap-northeast-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: ['dynamodb:PutItem'],
        Resource: 'arn:aws:dynamodb:${opt:region, self:provider.region}:*:table/fetishism'
      }
    ]
  },
  functions: { postFetishism }
}

module.exports = serverlessConfiguration;
