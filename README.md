FRED, this works perfectly:
1. npm i

2. inpm install -g typescript

3. Make sure you are pointing to Local NOT GLOBAL version of cdk ( v2....)

4. npm i

5. npm run build

6. cdk synth

7. cdk bootstrap like this:

cdk bootstrap aws://636090713215/us-east-1

8. cdk deploy

9. cdk destroy.

After deploay to go Eventbridge find your rule, find its target. click on it, 

and go to browse cloudeeatach log and do LIVE TAILING.

10.  You will then see your lambda getting executed...


END...

















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
