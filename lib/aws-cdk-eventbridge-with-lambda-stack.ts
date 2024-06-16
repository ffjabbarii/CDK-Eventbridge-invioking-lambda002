import { Stack, StackProps, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_lambda as lambda } from 'aws-cdk-lib';
import { Rule, Schedule } from 'aws-cdk-lib/aws-events';
import { LambdaFunction } from 'aws-cdk-lib/aws-events-targets';
import {NodejsFunction} from "aws-cdk-lib/aws-lambda-nodejs"
import * as path from 'path';

export class AwsCdkEventbridgeWithLambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const interval_in_minutes = this.node.tryGetContext('interval_in_minutes');



    console.log("interval_in_minutes");


    //const myFunction = new lambda.Function(this, 'function-name', {
    const myFunction = new NodejsFunction(this, "function-name", {
      runtime: lambda.Runtime.NODEJS_16_X,
      entry: path.join(__dirname, `/../lambdas/index.ts`),
      memorySize: 128,
      timeout: Duration.seconds(30),
      handler: 'handler',
      //code: lambda.Code.fromAsset(path.join(__dirname, '/../lambda')),
      //code: lambda.Code.fromAsset('lambda'),
      environment: {
        interval_in_minutes: interval_in_minutes
      }
    })

    const cronRule = new Rule(this, 'CronRule', {
      //schedule: Schedule.expression('cron(0/2 * * * *)')
      schedule: Schedule.cron({
        minute: '02',
        hour: '*',
        day: '*',
        month: '*',
        year: '*',
    }),
    })

    cronRule.addTarget(new LambdaFunction(myFunction));
  }
}
