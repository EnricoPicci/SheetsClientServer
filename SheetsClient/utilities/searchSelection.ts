export class SearchSelection { 
	public name: string;
	public selected: boolean = false;
	
	constructor (inName: string, inSelected?: boolean) {
		this.name = inName;
        if (inSelected) {
            this.selected = inSelected;
        }
	}
}