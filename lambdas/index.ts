import { Handler } from 'aws-lambda';
import { plainToClass } from "class-transformer";
// import { CodeDeploy } from 'aws-sdk';

import { ResourceGroupsTaggingAPIClient, TagResourcesCommand, GetResourcesCommand } from "@aws-sdk/client-resource-groups-tagging-api"; 
import { ResourceGroupsClient, GetGroupCommand, GetTagsCommand } from "@aws-sdk/client-resource-groups"; 
import { OrganizationsClient, ListTagsForResourceCommand  } from "@aws-sdk/client-organizations"; 
import { LambdaClient, ListTagsCommand } from "@aws-sdk/client-lambda";
import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";

const jsonData: any = 
{"tagNames": "v1.1", "owner": "fjabbari@emoneyadvisor.com",  "costCenter": "cost001", 
"creationDate": 2024100, "businessUnit":  "unit001", "timeToReport": "weekly", 
"environment": "nonprod", "team": "factsDev", "appName": "factsCreation", "productionReady": "no"};


class Tags {
    tagNames: string | undefined;
    owner: string | undefined;
    costCenter: string | undefined;
    creationDate: number |undefined;
    businessUnit: string | undefined;
    timeToReport: string | undefined;
    environment: string | undefined;
    team: string | undefined;
    appName: string | undefined;
    productionReady: string | undefined;

    getTagNames() {
        return this.tagNames;
    }
    getOwner() {
        return this.owner;
    }
    getCreationDate() {
        return this.creationDate;
    }
    getBusinessUnit() {
        return this.businessUnit;
    }
    getTimeToReport() {
        return this.timeToReport;
    }
    getEnvironment() {
        return this.environment;
    }
    getTeam() {
        return this.team;
    }
    getAppName() {
        try {
             return this.appName;
        }catch{
            console.log("...");
        }
    }
    getProductionReady() {
        return this.productionReady;
    }
}


export const handler: Handler = async (event, context): Promise<void> => {

	let data1 : any = null;
	let data4 : any = null;
    let data5 : any = null;
	let data6 : any = null;
	let data7 : any = null;
	let data8 : any = null;
	console.log(JSON.stringify(event, null, 2));
	const client7 = new SSMClient({ region: "us-east-1" });
	const client1 = new ResourceGroupsTaggingAPIClient({ region: "us-east-1" });
	const client6 = new ResourceGroupsTaggingAPIClient({ region: "us-east-1" });
	const client4 = new ResourceGroupsClient({ region: "us-east-1" });

	console.log('LOG:SUCCESSInput0FinallyB');
	console.log(JSON.stringify(event, null, 2));
	console.log('LOG:SUCCESSInput0FinallyE');

	//********************************************************************************* */
	let newTags = plainToClass(Tags, jsonData);
	console.log("1111111111111");
	console.log(newTags);
	console.log("2222222222222");
	console.log(newTags.getAppName());
	console.log("3333333333333");
	let jsonStringified = JSON.stringify(newTags);
	console.log(jsonStringified);
	console.log("4444444444444");
	let jsonEscaped = JSON.stringify(jsonStringified);
	console.log(jsonEscaped);
	console.log("5555555555555");
	let jsonObj = JSON.parse(jsonEscaped);
	let jsonObjj = JSON.parse(jsonObj);
	console.log(jsonObj);
	console.log("6666666666666");
	console.log(newTags.appName);
	console.log(newTags.getAppName());
	console.log("7777777777777");
	console.log(jsonObjj.appName); //Good Fred, always double parse an escape json... and even then do not use the getter for it...
	//console.log(jsonObjj.getAppName()); //when you convert a Eacape json to JsonObj, it loses its getters.... Just use it without getter...
	console.log("8888888888888");
	//console.log(jsonObj.appName); //you have to double jsonParse an escape json string to get it to work right...
	//console.log(jsonObj.getAppName()); //when you convert a Eacape json to JsonObj, it loses its getters.... Just use it without getter...
	console.log("9999999999999");
	//********************************************************************************* */
	try {
		const input8 : any = { 
			Name: '/Facts/Facts001' 
		};
		const command8 = new GetParameterCommand(input8);
		data8 = await client7.send(command8);
		console.log('LOG:SUCCESSInput8B');
		console.log(JSON.stringify(data8, null, 2));
		console.log('LOG:SUCCESSInput8E');

	} catch (error) {
		console.log('LOG: ERRORInput8', error);
	} finally {

		console.log('LOG:SUCCESSInput8FinallyB');
		console.log(JSON.stringify(data8, null, 2));
		console.log('LOG:SUCCESSInput8FinallyE');

	}
	//********************************************************************************* */
	const input1 : any = {
		ResourceARNList: event.resources
	}
	console.log('LOG:Input0B');
	console.log(JSON.stringify(input1, null, 2));
	console.log('LOG:Input0E');
	const command1 = new GetResourcesCommand(input1);
	let groupName = 'group999';
	let subGroupName = 'subgroup999';
	let envName = 'env999';
	let aryGroupInput = null;
	try {
		data1 = await client1.send(command1);
	    console.log('LOG:Input00B');
	    console.log(JSON.stringify(data1, null, 2));
	    console.log('LOG:Input00E');
		let tags = findKeyDeep(data1, 'Tags');
		let keyx = null;
		let valuex: any = null;
		groupName = "group999";
		subGroupName = "subgroup999";
		envName = "env999";
		for (let prop in tags){
			keyx = prop;
			valuex = tags[keyx]; 
			console.log('------------------------------------');
			console.log('=K>', Object.values(valuex)[0], ' =V>', Object.values(valuex)[1]);
			keyx = Object.values(valuex)[0];
			valuex = Object.values(valuex)[1];

			if (keyx === 'GroupName'){
				aryGroupInput = valuex.split('.');
				groupName = aryGroupInput[0];
				subGroupName = aryGroupInput[1];
				envName = aryGroupInput[2];
				console.log('------------------------------------1.1>', groupName);
				console.log('------------------------------------1.2>', subGroupName);
				console.log('------------------------------------1.3>', envName);
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
			//********************************************************************************* */
			try {
				const input7 : any = { 
					Name: '/Facts/Facts001' 
				};
				const command7 = new GetParameterCommand(input7);
				data7 = await client7.send(command7);
				console.log('LOG:SUCCESSInput7B');
				console.log(JSON.stringify(data7, null, 2));
				console.log('LOG:SUCCESSInput7E');

			} catch (error) {
				console.log('LOG: ERRORInput7', error);
			} finally {
		
				console.log('LOG:SUCCESSInput7FinallyB');
				console.log(JSON.stringify(data7, null, 2));
				console.log('LOG:SUCCESSInput7FinallyE');
		
			}
			//********************************************************************************* */
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