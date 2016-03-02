import {Observable}     from 'rxjs/Observable';

import {Sheet} from './sheet';
import {ReturnPeriod} from './returnPeriod';
import {Asset} from './asset';
import {Proposal} from './proposal';
import {UserLogged} from './userLogged';

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
    
    getReturnData(inSheet: Sheet, inPeriod: ReturnPeriod) : any {return null}
    //updateReturnData(inSheet: Sheet, inPeriod: ReturnPeriod) {}
    
    updateValueAtRisk(inSheet: Sheet) : any {return null};
    updateVolatility(inSheet: Sheet) : any {return null};
    
    addSheet(inSheet: Sheet) : any {}
    getAccountAndPortfolioCapacityForInvestment(inCustomerId: string) : any {}
    getProposalsForCustomer(inCustomerId: string) : any {}
    getProposal(inProposalId: number) : any {}
    validateAndSaveProposal(inProposal: Proposal, inUserLogged: UserLogged) : any {}
    sendProposal(inProposal: Proposal, inUser: UserLogged) : any {}
    
    getStockPrices(inAsset: Asset) {};
    
    // this is a method for demo purposes only
    // it creates a message to show what could be sent to a back end system when
    // an order to buy a sheet is issued from the front end
    buildBuyMessageForTheBackEnd(inProposal: Proposal) : any {}
}