import {SheetBackEnd} from './sheetBackEnd.service';
import {SearchCriteria} from './searchCriteria';
import {SearchSelection} from './searchSelection';


export class SheetSearchCriteria { 
	public freeSearchText: string;
    public searchCriteria: SearchCriteria[] = new Array<SearchCriteria>();
    
    public open: boolean = false;
	
	static generalDomain: string[];
	static valueBasedDomain: string[];
	static sectorsDomain: string[];
    
    private _sheetBackEnd: SheetBackEnd;

	constructor(inSheetBackEnd: SheetBackEnd) {
        this._sheetBackEnd = inSheetBackEnd;
	}
    
	public initializeSearchCriteria() {
		if (SheetSearchCriteria.generalDomain == null) {
			SheetSearchCriteria.generalDomain = this._sheetBackEnd.getGeneralSearchCriteriaDomain();
		}
        let general = new Array<SearchSelection>();
        for (var i = 0; i < SheetSearchCriteria.generalDomain.length; i++) {
            general[i] = new SearchSelection(SheetSearchCriteria.generalDomain[i]);
        }
        this.searchCriteria[0] = new SearchCriteria('General', general);
        
		if (SheetSearchCriteria.valueBasedDomain == null) {
			SheetSearchCriteria.valueBasedDomain = this._sheetBackEnd.getValueBasedSearchCriteriaDomain();
		}
        let valueBased = new Array<SearchSelection>();
        for (var i = 0; i < SheetSearchCriteria.valueBasedDomain.length; i++) {
            valueBased[i] = new SearchSelection(SheetSearchCriteria.valueBasedDomain[i]);
        }
        this.searchCriteria[1] = new SearchCriteria('Value Based', valueBased);
        
        if (SheetSearchCriteria.sectorsDomain == null) {
			SheetSearchCriteria.sectorsDomain = this._sheetBackEnd.getSectorsSearchCriteriaDomain();
		}
        let sectors = new Array<SearchSelection>();
        for (var i = 0; i < SheetSearchCriteria.sectorsDomain.length; i++) {
            sectors[i] = new SearchSelection(SheetSearchCriteria.sectorsDomain[i]);
        }
        this.searchCriteria[2] = new SearchCriteria('Sectors', sectors);
        
		return this.searchCriteria;
	}

}