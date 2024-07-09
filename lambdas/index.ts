import { Handler } from 'aws-lambda';
// import { CodeDeploy } from 'aws-sdk';

import { ResourceGroupsTaggingAPIClient, TagResourcesCommand } from "@aws-sdk/client-resource-groups-tagging-api"; 
import { ResourceGroupsClient, GetGroupCommand, GetTagsCommand } from "@aws-sdk/client-resource-groups"; 

export const handler: Handler = async (event, context): Promise<void> => {

	console.log(JSON.stringify(event, null, 2));
	const client6 = new ResourceGroupsTaggingAPIClient({ region: "us-east-1" });
	const client4 = new ResourceGroupsClient({ region: "us-east-1" });
	
	const input4 : any = { 
	    GroupName: 'config001'
	};
	console.log('LOG:', input4); 

	
	const command4 = new GetGroupCommand(input4);

	let data4 : any = null;
    let data5 : any = null;
	let data6 : any = null;
	try {
		data4 = await client4.send(command4);
		console.log('LOG:SUCCESSInput4B');
		console.log(JSON.stringify(data4, null, 2));
		console.log('LOG:SUCCESSInput4E', data4.Group.GroupArn);
		try {
			const input5 : any = {
				Arn: data4.Group.GroupArn
			}
			const command5 = new GetTagsCommand(input5);
			data5 = await client4.send(command5);
			console.log('LOG:SUCCESSInput5B');
			console.log(JSON.stringify(data5, null, 2));
			console.log('LOG:SUCCESSInput5E');
			try {
				const input6 : any = { 
					ResourceARNList: event.resources, 
					Tags: data5.Tags
				};
				const command6 = new TagResourcesCommand(input6);
				data6 = await client6.send(command6);
				console.log('LOG:SUCCESSInput6B');
				console.log(JSON.stringify(data6, null, 2));
				console.log('LOG:SUCCESSInput6E');

			} catch (error) {
				console.log('LOG: ERRORInput6', error);
			} finally {
		
				console.log('LOG:SUCCESSInput6FinallyB');
				console.log(JSON.stringify(data6, null, 2));
				console.log('LOG:SUCCESSInput6FinallyE');
		
			}
		} catch (error) {
			console.log('LOG: ERRORInput5', error);
		} finally {

			console.log('LOG:SUCCESSInput5FinallyB');
			console.log(JSON.stringify(data5, null, 2));
			console.log('LOG:SUCCESSInput5FinallyE');

		}
	} catch (error) {
		console.log('LOG: ERROR', error);
	} finally {
		console.log('LOG:SUCCESSInput4FinallyB');
		console.log(JSON.stringify(data4, null, 2));
		console.log('LOG:SUCCESSInput4FinallyE');
	}
	await new Promise(resolve => setTimeout(resolve, 1000));
};