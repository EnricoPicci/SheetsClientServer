import {SearchSelection} from './searchSelection';

export class SearchCriteria { 
	public name: string;
	public selections: SearchSelection[];
	
	constructor (inName: string, inSelections: SearchSelection[]) {
		this.name = inName;
        this.selections = inSelections;
	}
}