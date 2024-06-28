import { Handler } from 'aws-lambda';
import { CodeDeploy } from 'aws-sdk';
//import { LambdaClient, TagResourceCommand, TagResourceCommandInput, TagResourceRequest} from "@aws-sdk/client-lambda";
import { LambdaClient, TagResourceCommand, ListLayersCommand } from "@aws-sdk/client-lambda";


export const handler: Handler = async (event, context): Promise<void> => {

	console.log('Hello2....................event json ......................B0', event);
	const codedeploy = new CodeDeploy({apiVersion: '2014-10-06'});
	console.log('codedeploy: ', codedeploy);

	console.log('Hello2a....................event json ......................B1', event);
	console.log(JSON.stringify(event, null, 2));
	console.log('Hello2b....................event json ......................E2', event);
	console.log(event.resources[0]);
	console.log('Hello2c....................event json ......................E3', event);

	const client = new LambdaClient({ region: "us-east-1" });

	const params : any = {
		Resource: event.resources[0],
		Tags: [{ key: 'NAMEE', value: 'DERF-IRABBAAJ'}],
	};

	const input1 : any = { 
	    Resource: event.resources[0], 
		Tags: 
		  { 
			Key: 'key001',
			Value: 'FredJabbari001',
		  },
	  };
	//console.log('Hello2c....................event json ......................E4', input1); 
	const command = new TagResourceCommand(input1); //This takes Resource ID like AMI id type of stuff....  It is not what I have

	try {
		const data = await client.send(command);
		// process data.
	  } catch (error) {
		// error handling.
		console.log('Hello2c....................TRY ERROR3************************', error);
	  } finally {
		// finally.
		console.log('Hello2c....................TRY FINALLY3**********************');
	  }
	console.log(event.resources[0]);
	console.log('Hello2d....................event json ......................E4', event);
	await new Promise(resolve => setTimeout(resolve, 1000));
	console.log('Goodbye2!');
};