import {Component, OnInit, Output, EventEmitter} from 'angular2/core';

//import {SheetSearchCriteria} from './sheetSearchCriteria';
import {SearchCriteriaComponent} from '../utilities/searchCriteria.component';
import {SearchCriteria} from '../utilities/searchCriteria';
import {SearchSelection} from '../utilities/searchSelection';
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
	public freeSearchText: string;
    public searchCriteria: SearchCriteria[] = new Array<SearchCriteria>();    
	public searchResult: Sheet[];
	@Output() sheetsRetrieved: EventEmitter<any> = new EventEmitter();
    
    public errorMessage: string;

	constructor(private _backEnd: SheetBackEnd) {
	}
    
    ngOnInit() {
        this.initializeSearchCriteria();
    }
    
    public initializeSearchCriteria() {
        if (this.searchCriteria.length == 0) {
            // initialize at start the selection criteria 
            // and then build the arrays of SearchSelection instance to be passed
            // to each SearchCriteria component contained in this component
            let publicPersonalizedDomain = new Array<string>();
            publicPersonalizedDomain.push('Pubblici');
            publicPersonalizedDomain.push('Personalizzati');
            let publicPersonalized = new Array<SearchSelection>();
            publicPersonalized[0] = new SearchSelection(publicPersonalizedDomain[0]);
            publicPersonalized[1] = new SearchSelection(publicPersonalizedDomain[1]);
            this.searchCriteria[0] = new SearchCriteria('Publici o Personalizzati', publicPersonalized);
            
            this._backEnd.getGeneralSearchCriteriaDomain()
                .subscribe(
                    tags => {
                        let general = new Array<SearchSelection>();
                        for (var i = 0; i < tags.length; i++) {
                            general[i] = new SearchSelection(tags[i]);
                        }
                        this.searchCriteria[1] = new SearchCriteria('General', general);
                    },
                error => this.errorMessage = <any>error
            );
            this._backEnd.getValueBasedSearchCriteriaDomain()
                .subscribe(
                    tags => {
                        let valueBased = new Array<SearchSelection>();
                        for (var i = 0; i < tags.length; i++) {
                            valueBased[i] = new SearchSelection(tags[i]);
                        }
                        this.searchCriteria[2] = new SearchCriteria('Value Based', valueBased);
                    },
                error => this.errorMessage = <any>error
            );
            this._backEnd.getSectorsSearchCriteriaDomain()
                .subscribe(
                    tags => {
                        let sectors = new Array<SearchSelection>();
                        for (var i = 0; i < tags.length; i++) {
                            sectors[i] = new SearchSelection(tags[i]);
                        }
                        this.searchCriteria[3] = new SearchCriteria('Sectors', sectors);
                },
                error => this.errorMessage = <any>error
            );
        }

		return this.searchCriteria;
	}

	onChange(inSearchCriteria: SearchCriteria) {
		let criteria: SearchCriteria;
        
        criteria = this.searchCriteria[0];
		var publicPersonal: string[] = new Array<string>();
		this.retrieveSelectedCriteria(criteria, publicPersonal);
		console.log('publicPersonal');
		console.log(publicPersonal);
		
		criteria = this.searchCriteria[1];
		var generalTags: string[] = new Array<string>();
		this.retrieveSelectedCriteria(criteria, generalTags);
		console.log('generalTags');
		console.log(generalTags);

		criteria = this.searchCriteria[2];
		var valueBasedTags: string[] = new Array<string>();
		this.retrieveSelectedCriteria(criteria, valueBasedTags);
		console.log('valueBasedTags');
		console.log(valueBasedTags);
		
		criteria = this.searchCriteria[3];;
		var sectorsTags: string[] = new Array<string>();
		this.retrieveSelectedCriteria(criteria, sectorsTags);
		console.log('sectorsTags');
		console.log(sectorsTags);
		
		this.searchResult = this._backEnd.selectSheets(publicPersonal, generalTags, valueBasedTags, sectorsTags)
            .subscribe(
                sheets => {
                    this.searchResult = sheets;
                    this.sheetsRetrieved.next(this.searchResult);
                },
                error => this.errorMessage = <any>error
            );
	}
	
	retrieveSelectedCriteria(inCriteria: SearchCriteria, inTags: string[]) {
		for (var i = 0; i < inCriteria.selections.length; i++) {
			if (inCriteria.selections[i].selected) {
				inTags[i] = inCriteria.selections[i].name;
			}
		}
	}
    
    onQuerySubmitClick(inKeyword: string) {
        this.searchResult = this._backEnd.searchSheetsByKeyword(inKeyword)
            .subscribe(
                sheets => {
                    this.searchResult = sheets;
                    this.sheetsRetrieved.next(this.searchResult);
                },
                error => this.errorMessage = <any>error
            );
    }
	
}

