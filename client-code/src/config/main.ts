export class Config {

	apiEndpoint: any;

	constructor(){
		this.apiEndpoint = "https://voice-grasp.herokuapp.com/api/v1";
	}

	getApiEndpoint(){
		return this.apiEndpoint;
	}
}