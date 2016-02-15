import {Observable}     from 'rxjs/Observable';

import {Sheet} from './sheet';
import {ReturnPeriod} from './returnPeriod';
import {Proposal} from './proposal';

export abstract class SheetBackEnd {
	getSheet(inId?: number) : any {return null}
    getSheetWithDetails(inId: number) : Observable<any> {return null}
    
    getAllSheets() : any {return null}
	getSomeSheets(inFromPosition: number, inMaxNumebrOfSheets: number) : any {return null}
	
	getGeneralSearchCriteriaDomain() : any {return null}
	getValueBasedSearchCriteriaDomain() : any {return null}
	getSectorsSearchCriteriaDomain() : any {return null}
	
	selectSheets(publicPersonal: string[], generalTags: string[], valueBasedTags: string[], sectorsTags: string[]) : any {return null}
    searchSheetsByKeyword(inSearchString: string) : any {return null}
    
    fillReturnData(inSheet: Sheet, inPeriod: ReturnPeriod) {}
    updateReturnData(inSheet: Sheet, inPeriod: ReturnPeriod) {}
    
    updateValueAtRisk(inSheet: Sheet) {};
    updateVolatility(inSheet: Sheet) {};
    
    addSheet(inSheet: Sheet) : any {}
    getAccountAndPortfolioCapacityForInvestment(inCustomerId: string) : any {}
    getProposalsForCustomer(inCustomerId: string) : any {}
    validateAndSaveProposal(inProposal: Proposal) : any {}
    sendProposal(inProposal: Proposal) : any {}
    
    // this is a method for demo purposes only
    // it creates a message to show what could be sent to a back end system when
    // an order to buy a sheet is issued from the front end
    buildBuyMessageForTheBackEnd(inProposal: Proposal) : any {}
}