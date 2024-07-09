import { Handler } from 'aws-lambda';
// import { CodeDeploy } from 'aws-sdk';

import { ResourceGroupsTaggingAPIClient, TagResourcesCommand } from "@aws-sdk/client-resource-groups-tagging-api"; 

export const handler: Handler = async (event, context): Promise<void> => {

	// console.log(JSON.stringify(event, null, 2));
	// const client3 = new ResourceGroupsTaggingAPIClient({ region: "us-east-1" });
	// const input3 : any = { 
	//     ResourceARNList: event.resources, 
	// 	Tags: 
	// 		{ 
	// 		     ttl: '60000',
	// 		     purge: 'no',
	// 		     productionReady: 'no',
	// 		     owner: 'Config',
	// 			 costCenter: '001',
	// 		}
	// };
	// console.log('LOG:', input3); 
	// const command = new TagResourcesCommand(input3);

	// try {
	// 	const data = await client3.send(command);
	//   } catch (error) {
	// 	console.log('LOG: ERROR', error);
	//   } finally {
	// 	console.log('LOG:SUCCESS');
	//   }
	// await new Promise(resolve => setTimeout(resolve, 1000));
};