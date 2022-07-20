# AWS EventBridge With Lambda
An EventBridge with a schudled rule that triggers a Lambda function. An environment variable contains the vaule assigned to the interval (in minutes) that the lambda function will run. 
![Alt Image](./images//Screenshot%202022-07-20%20052025.png)


The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
