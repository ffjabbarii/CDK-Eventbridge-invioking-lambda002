import { Stack, StackProps, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_lambda as lambda } from 'aws-cdk-lib';
import { Rule, Schedule } from 'aws-cdk-lib/aws-events';
import { LambdaFunction } from 'aws-cdk-lib/aws-events-targets';
import * as path from 'path';

export class AwsCdkEventbridgeWithLambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const interval_in_minutes = this.node.tryGetContext('interval_in_minutes');

    if(typeof interval_in_minutes === 'undefined'){
      console.log('example: cdk deploy --context interval_in_minutes=5');
      process.exit(1);
    }

    console.log("interval_in_minutes");
    console.log(interval_in_minutes);

    const myFunction = new lambda.Function(this, 'function-name', {
      runtime: lambda.Runtime.NODEJS_16_X,
      memorySize: 128,
      timeout: Duration.seconds(30),
      handler: 'index.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '/../src')),
      environment: {
        interval_in_minutes: interval_in_minutes
      }
    })

    const cronRule = new Rule(this, 'CronRule', {
      schedule: Schedule.expression('cron(0/'+ interval_in_minutes +' * * * ? *)')
    })

    cronRule.addTarget(new LambdaFunction(myFunction));
  }
}
