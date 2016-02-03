export class SearchSelection { 
	public name: string;
	public selected: boolean = false;
	
	constructor (inName: string) {
		this.name = inName;
	}
}