import {Observable}     from 'rxjs/Observable';

import {Sheet} from './sheet';
import {ReturnPeriod} from './returnPeriod';

export abstract class SheetBackEnd {
	getSheet(inId: number) : Sheet {return null}
    //getSheet(inId: number, inComponent: any) {}
    //getSheet(inId: number) {}
    getSheetWithDetails(inId: number) : Observable<any> {return null}
    
	getSomeSheets(inFromPosition: number, inMaxNumebrOfSheets: number) : Sheet[] {return null}
	
	getGeneralSearchCriteriaDomain() : string[] {return null}
	getValueBasedSearchCriteriaDomain() : string[] {return null}
	getSectorsSearchCriteriaDomain() : string[] {return null}
	
	fetchSheets(searchString: string, generalTags: string[], valueBasedTags: string[], sectorsTags: string[]) : Array<Sheet> {return null}
	fillDetails(inSheet: Sheet) : Sheet {return null}
    
    fillReturnData(inSheet: Sheet, inPeriod: ReturnPeriod) {}
    updateReturnData(inSheet: Sheet, inPeriod: ReturnPeriod) {}
    
    updateValueAtRisk(inSheet: Sheet) {};
    updateVolatility(inSheet: Sheet) {};
    
    addSheet(inSheet: Sheet) : any {}
}