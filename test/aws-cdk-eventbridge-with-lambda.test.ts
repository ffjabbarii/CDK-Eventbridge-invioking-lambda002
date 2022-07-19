import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as AwsCdkEventbridgeWithLambdaStack from '../lib/aws-cdk-eventbridge-with-lambda-stack';

test('Stack has a lambda function', () => {
    const app = new cdk.App;

    const stack = new AwsCdkEventbridgeWithLambdaStack.AwsCdkEventbridgeWithLambdaStack(app, 'MyTestStack')

    Template.fromStack(stack).hasResource("AWS::Lambda::Function", {});
});
