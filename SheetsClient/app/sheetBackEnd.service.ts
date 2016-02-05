import {Observable}     from 'rxjs/Observable';

import {Sheet} from './sheet';
import {ReturnPeriod} from './returnPeriod';

export abstract class SheetBackEnd {
	getSheet(inId?: number) : any {return null}
    getSheetWithDetails(inId: number) : Observable<any> {return null}
    
    getAllSheets() : any {return null}
	getSomeSheets(inFromPosition: number, inMaxNumebrOfSheets: number) : any {return null}
	
	getGeneralSearchCriteriaDomain() : any {return null}
	getValueBasedSearchCriteriaDomain() : any {return null}
	getSectorsSearchCriteriaDomain() : any {return null}
	
	selectSheets(searchString: string, publicPersonal: string[], generalTags: string[], valueBasedTags: string[], sectorsTags: string[]) : any {return null}
    
    fillReturnData(inSheet: Sheet, inPeriod: ReturnPeriod) {}
    updateReturnData(inSheet: Sheet, inPeriod: ReturnPeriod) {}
    
    updateValueAtRisk(inSheet: Sheet) {};
    updateVolatility(inSheet: Sheet) {};
    
    addSheet(inSheet: Sheet) : any {}
}