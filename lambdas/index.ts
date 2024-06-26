import { Handler } from 'aws-lambda';
import { CodeDeploy } from 'aws-sdk';


export const handler: Handler = async (event, context): Promise<void> => {

	console.log('Hello2....................event json ......................B0', event);
	const codedeploy = new CodeDeploy({apiVersion: '2014-10-06'});
	console.log('codedeploy: ', codedeploy);

	console.log('Hello2....................event json ......................B1', event);
	console.log(JSON.stringify(event, null, 2));
	console.log('Hello2....................event json ......................E1', event);
	console.log(event.resources[0]);
	console.log('Hello2....................event json ......................E2', event);
	await new Promise(resolve => setTimeout(resolve, 1000));
	console.log('Goodbye2!');
};