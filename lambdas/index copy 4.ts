import { Handler } from 'aws-lambda';
// import { CodeDeploy } from 'aws-sdk';

import { ResourceGroupsTaggingAPIClient, TagResourcesCommand, GetResourcesCommand } from "@aws-sdk/client-resource-groups-tagging-api"; 
import { ResourceGroupsClient, GetGroupCommand, GetTagsCommand } from "@aws-sdk/client-resource-groups"; 
import { OrganizationsClient, ListTagsForResourceCommand  } from "@aws-sdk/client-organizations"; 
import { LambdaClient, ListTagsCommand } from "@aws-sdk/client-lambda";



export const handler: Handler = async (event, context): Promise<void> => {

	let data1 : any = null;
	let data4 : any = null;
    let data5 : any = null;
	let data6 : any = null;
	console.log(JSON.stringify(event, null, 2));
	const client1 = new ResourceGroupsTaggingAPIClient({ region: "us-east-1" });
	const client6 = new ResourceGroupsTaggingAPIClient({ region: "us-east-1" });
	const client4 = new ResourceGroupsClient({ region: "us-east-1" });

	console.log('LOG:SUCCESSInput0FinallyB');
	console.log(JSON.stringify(event, null, 2));
	console.log('LOG:SUCCESSInput0FinallyE');

	const input1 : any = {
		ResourceARNList: event.resources
	}
	console.log('LOG:Input0B');
	console.log(JSON.stringify(input1, null, 2));
	console.log('LOG:Input0E');
	const command1 = new GetResourcesCommand(input1);
	let groupName = null;
	try {
		data1 = await client1.send(command1);
		let tags = findKeyDeep(data1, 'Tags');
		let keyx = null;
		let valuex = null;
		groupName = "default001";
		for (let prop in tags){
			keyx = prop;
			valuex = tags[keyx]; 
			console.log('------------------------------------');
			console.log('=K>', Object.values(valuex)[0], ' =V>', Object.values(valuex)[1]);
			keyx = Object.values(valuex)[0];
			valuex = Object.values(valuex)[1];

			if (keyx === 'GroupName'){
				groupName = valuex;
				console.log('------------------------------------1>', groupName);
			}
			console.log('------------------------------------3>', groupName);
		}
	} catch (error) {
		console.log('LOG: ERRORInput1', error);
	} finally {

		console.log('LOG:SUCCESSInput1FinallyB');
		console.log(JSON.stringify(data1, null, 2));
		console.log('LOG:SUCCESSInput1FinallyE');

	} 
	const input4 : any = { 
	    GroupName: groupName
	};
	console.log('LOG:', input4); 

	
	const command4 = new GetGroupCommand(input4);

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

function findKeyDeep(obj: any, key: any){
	for (let prop in obj){
	  if (prop === key ) return obj[prop];
	  if (typeof obj[prop] === 'object'){
		const result: any = findKeyDeep(obj[prop], key);
		if (result !== undefined) return result;
	  }
	}
	return undefined;
}