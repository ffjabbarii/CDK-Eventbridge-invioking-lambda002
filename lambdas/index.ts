import { Handler } from 'aws-lambda';
import { CodeDeploy } from 'aws-sdk';
//import { LambdaClient, TagResourceCommand, TagResourceCommandInput, TagResourceRequest} from "@aws-sdk/client-lambda";
//import { LambdaClient, TagResourceCommand, ListLayersCommand } from "@aws-sdk/client-lambda";
import { ResourceGroupsTaggingAPIClient, TagResourcesCommand } from "@aws-sdk/client-resource-groups-tagging-api"; 

export const handler: Handler = async (event, context): Promise<void> => {

	console.log('Hello2....................event json ......................B0f', event);
	const codedeploy = new CodeDeploy({apiVersion: '2014-10-06'});
	console.log('codedeploy: ', codedeploy);

	console.log('Hello2a....................event json ......................B1f', event);
	console.log(JSON.stringify(event, null, 2));
	console.log('Hello2b....................event json ......................E2f', event);
	console.log(event.resources[0]);
	console.log('Hello2c....................event json ......................E3f', event);

	const client3 = new ResourceGroupsTaggingAPIClient({ region: "us-east-1" });
	

	//const client = new LambdaClient({ region: "us-east-1" });

	const params : any = {
		Resource: event.resources[0],
		Tags: [{ key: 'NAMEE', value: 'DERF-IRABBAAJ'}],
	};
	
	const input1 : any = { 
	    Resource: event.detail['instance-id'], 
		Tags: 
		  { 
			Key: 'key001',
			Value: 'FredJabbari001',
		  },
	  };

	const input2 :any = { 
	ResourceArn: event.resources[0], 
	Tags: [
		{ 
		Key: 'FredJabbari001',
		Value: 'DERF-IRABBAAJ',
		},
	],
	};

	const input3 : any = { 
	    ResourceARNList: event.resources, 
		Tags: 
		  { 
			Key: 'key003',
			Value: 'FredJabbari003',
		  },
	};

	console.log('Hello2c....................event json ......................E4f', input3); 

	//const command = new ListLayersCommand(input2);

	//const command = new TagResourceCommand(input1);

	const command = new TagResourcesCommand(input3);

	try {
		const data = await client3.send(command);
		// process data.
	  } catch (error) {
		// error handling.
		console.log('Hello2c....................TRY ERROR4f************************', error);
	  } finally {
		// finally.
		console.log('Hello2c....................TRY FINALLY3f**********************');
	  }
	console.log(event.resources[0]);
	console.log('Hello2d....................event json ......................E4f', event);
	await new Promise(resolve => setTimeout(resolve, 1000));
	console.log('Goodbye2!');
};