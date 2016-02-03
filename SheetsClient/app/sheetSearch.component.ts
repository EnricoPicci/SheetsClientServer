import {Component, OnInit, Output, EventEmitter} from 'angular2/core';

import {SheetSearchCriteria} from './sheetSearchCriteria';
import {SearchCriteriaComponent} from './searchCriteria.component';
import {SearchCriteria} from './searchCriteria';
import {SearchSelection} from './searchSelection';
import {SheetBackEnd} from './sheetBackEnd.service';
import {Sheet} from './sheet';

@Component({
    selector: 'sheetSearchCmp',
	providers: [],
    templateUrl: '../templates/sheetSearch.html', 
	styleUrls: ['../styles/sheetSearch.css'],
    directives: [SearchCriteriaComponent],
})
export class SheetSearchCmp implements OnInit { 
	sheetSearchCriteria: SheetSearchCriteria;
	public searchResult: Sheet[];
	@Output() sheetsRetrieved: EventEmitter<any> = new EventEmitter();

	constructor(private _backEnd: SheetBackEnd) {
        this.sheetSearchCriteria = new SheetSearchCriteria(_backEnd);
	}
    
    ngOnInit() {
        this.sheetSearchCriteria.initializeSearchCriteria();
        console.log(this.sheetSearchCriteria);
    }

	onChange(inSearchCriteria: SearchCriteria) {
		let criteria: SearchCriteria;
		
		criteria = this.sheetSearchCriteria.searchCriteria[0];
		var generalTags: string[] = new Array<string>();
		this.retrieveSelectedCriteria(criteria, generalTags);
		console.log('generalTags');
		console.log(generalTags);

		criteria = this.sheetSearchCriteria.searchCriteria[1];
		var valueBasedTags: string[] = new Array<string>();
		this.retrieveSelectedCriteria(criteria, valueBasedTags);
		console.log('valueBasedTags');
		console.log(valueBasedTags);
		
		criteria = this.sheetSearchCriteria.searchCriteria[2];;
		var sectorsTags: string[] = new Array<string>();
		this.retrieveSelectedCriteria(criteria, sectorsTags);
		console.log('sectorsTags');
		console.log(sectorsTags);
		
		this.searchResult = this._backEnd.fetchSheets(null, generalTags, valueBasedTags, sectorsTags);
		this.sheetsRetrieved.next(this.searchResult);
	}
	
	retrieveSelectedCriteria(inCriteria: SearchCriteria, inTags: string[]) {
		for (var i = 0; i < inCriteria.selections.length; i++) {
			if (inCriteria.selections[i].selected) {
				inTags[i] = inCriteria.selections[i].name;
				//console.log(inCriteria[i].name + ' ' + inCriteria[i].selected);
			}
		}
	}
	
}

