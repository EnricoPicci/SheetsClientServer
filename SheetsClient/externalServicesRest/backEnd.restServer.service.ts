import {Injectable} from 'angular2/core';
import {Http, HTTP_PROVIDERS, Headers, RequestOptions, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';

import {Sheet} from '../app/sheet';
import {SheetJSON} from './sheetJSON'
import {AssetGroup} from '../app/assetGroup';
import {Asset} from '../app/asset';
import {ReturnPeriod} from '../app/returnPeriod';
import {SheetBackEnd} from '../app/sheetBackEnd.service';
import {Proposal} from '../app/proposal';
import {ProposalJSON} from './proposalJSON';
import {ProposalInvestment} from '../app/proposalInvestment';
import {ProposalInvestmentSource} from '../app/proposalInvestmentSource';
import {UserLogged} from '../app/userlogged';

import {Environment} from '../environmentSettings/environment.service';

@Injectable()
export class BackEndRest extends SheetBackEnd {
    constructor(private _http: Http, private _environment: Environment) {
        super();
    }
    
    getAllSheets() {
        let myUrl = this._environment.baseServiceUrl + 'sheets';
        return this._http.get(myUrl)
            .map(res => res.json())
            .map(
                data => {
                    let sheetsRetrieved = new Array<Sheet>();
                    for (var i = 0; i < data.length; i++) {
                        let sheetJSON = data[i];
                        sheetsRetrieved.push(this.createSheet(sheetJSON));
                    }
                    return sheetsRetrieved;
                }
            )
            .catch(this.handleError)
	}
    
    getSheetWithDetails(inId: number) {
        let myUrl = this._environment.baseServiceUrl + 'sheet/?id=' + inId;
        return this._http.get(myUrl)
            .map(res => res.json())
            .map(
                data => {
                    let sheetJSON = data[0];
                    let sheetFromBackEnd = this.createSheet(sheetJSON);
                    let thisArrayOfAssetGroups = new Array<AssetGroup>();
                    sheetFromBackEnd.assetGroups = thisArrayOfAssetGroups;
                    for (var i = 0; i < sheetJSON.assetGroupJSONs.length; i++) {
                        let thisAssetGroupJSON = sheetJSON.assetGroupJSONs[i];
                        let thisArrayOfAssets = new Array<Asset>();
                        for (var j = 0; j < thisAssetGroupJSON.assetJSONs.length; j++) {
                            let thisAssetJSON = thisAssetGroupJSON.assetJSONs[j];
                            let thisAsset = new Asset(thisAssetJSON.name, thisAssetJSON.symbol, thisAssetJSON.weight,
                            thisAssetJSON.oneMonthRet, thisAssetJSON.oneYearRet, 
                            thisAssetJSON.minWeight, thisAssetJSON.maxWeight);
                            thisArrayOfAssets.push(thisAsset);
                        }
                        let thisAssetGroup = new AssetGroup(thisAssetGroupJSON.name, thisAssetGroupJSON.weight,
                        thisAssetGroupJSON.oneMonthRet, thisAssetGroupJSON.oneYearRet, thisArrayOfAssets, 
                        thisAssetGroupJSON.minWeight, thisAssetGroupJSON.maxWeight);
                        sheetFromBackEnd.assetGroups.push(thisAssetGroup);
                    }
                    sheetFromBackEnd.returnDataLastMonth.data = sheetJSON.returnDataLastMonth;
                    sheetFromBackEnd.returnDataBenchmarkLastMonth.data = sheetJSON.returnDataBenchmarkLastMonth;
                    //this.fillReturnData(sheetFromBackEnd, ReturnPeriod.lastMonth);
                    return sheetFromBackEnd;
                }
            )
            .catch(this.handleError)
    }
    
    getSomeSheets(inFromPosition: number, inMaxNumberOfSheets: number) {
        let myUrl = this._environment.baseServiceUrl + 'someSheets/?fromId=' + inFromPosition + '&maxNoOfItems=' + inMaxNumberOfSheets;
        return this._http.get(myUrl)
            .map(res => res.json())
            .map(
                data => {
                    let sheetsRetrieved = new Array<Sheet>();
                    for (var i = 0; i < data.length; i++) {
                        let sheetJSON = data[i];
                        sheetsRetrieved.push(this.createSheet(sheetJSON));
                    }
                    return sheetsRetrieved;
                }
            )
            .catch(this.handleError)
	}
    
    addSheet(inSheet: Sheet) {
        let options = this.getOpionsForPost();
        let jsonString = this.getJsonSheetStringForBackEnd(inSheet);
        let myPost = this._http.post(this._environment.baseServiceUrl + 'addSheet', jsonString, options);
        return myPost;
	}
    
    getGeneralSearchCriteriaDomain() {return this.getSearchCriteriaDomain('generalTags')}
	getValueBasedSearchCriteriaDomain() {return this.getSearchCriteriaDomain('valueBasedTags')}
	getSectorsSearchCriteriaDomain() {return this.getSearchCriteriaDomain('sectorTags')}
    getSearchCriteriaDomain(inDomainName: string) {
        let myUrl = this._environment.baseServiceUrl + inDomainName;
        return this._http.get(myUrl)
            .map(res => res.json())
            .catch(this.handleError)
    }
    
    selectSheets(inPublicPersonal: string[], inGeneralTags: string[], inValueBasedTags: string[], inSectorsTags: string[]) {
        let myUrl = this._environment.baseServiceUrl + 'selectSheets/' +
            '?publicPersonal=' + JSON.stringify(inPublicPersonal) +
            '&generalTags=' + JSON.stringify(inGeneralTags) +
            '&valueBasedTags=' + JSON.stringify(inValueBasedTags) +
            '&sectorsTags=' + JSON.stringify(inSectorsTags);
        return this._http.get(myUrl)
            .map(res => res.json())
            .map(
                data => {
                    let sheetsRetrieved = new Array<Sheet>();
                    for (var i = 0; i < data.length; i++) {
                        let sheetJSON = data[i];
                        sheetsRetrieved.push(this.createSheet(sheetJSON));
                    }
                    return sheetsRetrieved;
                }
            )
            .catch(this.handleError)
    }
    
    searchSheetsByKeyword(inSearchInput: any) {
        let myUrl = this._environment.baseServiceUrl + 'searchSheetsByKeyword/?keyword=' + inSearchInput.value;
        return this._http.get(myUrl)
            .map(res => res.json())
            .map(
                data => {
                    let sheetsRetrieved = new Array<Sheet>();
                    for (var i = 0; i < data.length; i++) {
                        let sheetJSON = data[i];
                        sheetsRetrieved.push(this.createSheet(sheetJSON));
                    }
                    return sheetsRetrieved;
                }
            )
            .catch(this.handleError)
    }
    
    validateAndSaveProposal(inProposal: Proposal, inUserLogged: UserLogged) {
        let options = this.getOpionsForPost();
        let jsonProposalString = this.getJsonProposalStringForBackEnd(inProposal, inUserLogged);
        let myPost = this._http.post(this._environment.baseServiceUrl + 'validateAndSaveProposal', jsonProposalString, options)
            .map(res => {
                    let resJson = res.json();
                    return resJson;
                }
            )
            .catch(this.handleError);
        return myPost;
    }
    
    sendProposal(inProposal: Proposal, inUserLogged: UserLogged) {
        let options = this.getOpionsForPost();
        let jsonString = this.getJsonProposalStringForBackEnd(inProposal, inUserLogged);
        let myPost = this._http.post(this._environment.baseServiceUrl + 'sendProposal', jsonString, options)
            .map(res => res.json());
        return myPost;
    }
    
    getAccountAndPortfolioCapacityForInvestment(inCustomerId: string) {
        let myUrl = this._environment.baseServiceUrl + 'getAccountAndPortfolioCapacityForInvestment/?customerId=' + inCustomerId;
        return this._http.get(myUrl)
            .map(res => res.json())
            .catch(this.handleError)
    }
    
    getProposalsForCustomer(inCustomerId: string) {
        let myUrl = this._environment.baseServiceUrl + 'getProposals/?customerId=' + inCustomerId;
        return this._http.get(myUrl)
            .map(res => res.json())
            .map(
                data => {
                    let proposalsRetrieved = new Array<Proposal>();
                    for (var i = 0; i < data.length; i++) {
                        let proposalJSON = data[i];
                        let proposalFromBackEnd = this.createProposal(proposalJSON);
                        proposalsRetrieved.push(proposalFromBackEnd);
                    }
                    return proposalsRetrieved;
                }
            )
            .catch(this.handleError)
    }
    
    getProposal(inProposalId: number) {
        let myUrl = this._environment.baseServiceUrl + 'getProposal/?proposalId=' + inProposalId;
        return this._http.get(myUrl)
            .map(res => res.json())
            .map(
                data => {
                    let proposalFromBackEnd = this.createProposal(data);
                    return proposalFromBackEnd;
                }
            )
    }
    
    getReturnData(inSheet: Sheet, inPeriod: ReturnPeriod) {
        let myUrl = this._environment.baseServiceUrl + 'getReturnData/?sheetId=' + inSheet.id +
                                    '&returnPeriod=' + inPeriod;
        return this._http.get(myUrl)
            .map(res => res.json())
            .catch(this.handleError)
    }
    
    updateValueAtRisk(inSheet: Sheet) {
        let myUrl = this._environment.baseServiceUrl + 'getValueAtRisk/?sheetId=' + inSheet.id;
        return this._http.get(myUrl)
            .map(res => {
                    let newVaR = res.json().VaR;
                    inSheet.valueAtRisk = newVaR;
                }
            )
            .catch(this.handleError)
    };
    
    updateVolatility(inSheet: Sheet) {
        let myUrl = this._environment.baseServiceUrl + 'getVolatility/?sheetId=' + inSheet.id;
        return this._http.get(myUrl)
            .map(res => {
                    let newVolatility = res.json().volatility;
                    inSheet.volatility = newVolatility;
                }
            )
            .catch(this.handleError)     
    };
    
    private handleError (error: Response) {
        console.error('http error');
        console.error(error);
        let errorText = error.text();
        if (error.status == 200) {
            errorText = 'The whole server is down. The connection has been refused.';
        }
        return Observable.throw(errorText || 'Server error');
    }
    
    private getOpionsForPost() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return new RequestOptions({headers: headers});
	}
    
        
    private getJsonSheetStringForBackEnd(inSheet: Sheet) {
        let sheetJSON = new SheetJSON();
        sheetJSON.fill(inSheet);
        return JSON.stringify(sheetJSON);
    }
    
    private getJsonProposalStringForBackEnd(inProposal: Proposal, inUserLogged: UserLogged) {
        let proposalJSON = new ProposalJSON();
        proposalJSON.fill(inProposal);
        let jsonObject = {
            proposal: proposalJSON,
            userLogged: inUserLogged
        }
        return JSON.stringify(jsonObject);
    }
     
    private createSheet(inSheetJson: any) {
        let sheetFromBackEnd = new Sheet(inSheetJson.id, inSheetJson.title, inSheetJson.longTitle, inSheetJson.imageUrl,
        inSheetJson.oneMonthReturn, inSheetJson.valueAtRisk, inSheetJson.volatility, inSheetJson.general,
        inSheetJson.valueBased, inSheetJson.sector);
        sheetFromBackEnd.originalSheetID = inSheetJson.originalSheetID;
        sheetFromBackEnd.shortNote = inSheetJson.shortNote;
        sheetFromBackEnd.personalizationComment = inSheetJson.personalizationComment;
        sheetFromBackEnd.createdBy = inSheetJson.createdBy;
        sheetFromBackEnd.description = inSheetJson.description;
        sheetFromBackEnd.oneYearReturn = inSheetJson.oneYearReturn;
        sheetFromBackEnd.dailyChange = inSheetJson.dailyChange;
        sheetFromBackEnd.benchmark = inSheetJson.benchmark;
        return sheetFromBackEnd;
    }
    
    private createProposal(inProposalJSON: any) {
        let skinnySheetFromBackEnd = new Sheet(inProposalJSON.sheetId, inProposalJSON.title, null, inProposalJSON.imageUrl,
        null, null, null, null, null, null);
        //skinnySheetFromBackEnd.originalSheetID = inProposalJSON.originalSheetID;
        let proposalFromBackEnd = new Proposal(null, inProposalJSON.customerId, skinnySheetFromBackEnd);
        //proposalFromBackEnd.isValid = inProposalJSON.isValid;
        proposalFromBackEnd.id = inProposalJSON.id;
        proposalFromBackEnd.comment = inProposalJSON.comment;
        
        let thisArrayOfAssetGroups = new Array<AssetGroup>();
        proposalFromBackEnd.assetGroups = thisArrayOfAssetGroups;
        // the assetGroups of the sheet referenced by the newly created proposal are 
        // set so that we can use components originally designed for sheets also with 
        // proposals (e.g. SheetAssetCompositionComponent
        proposalFromBackEnd.sheet.assetGroups = thisArrayOfAssetGroups;
        for (var j = 0; j < inProposalJSON.assetGroupJSONs.length; j++) {
            let thisAssetGroupJSON = inProposalJSON.assetGroupJSONs[j];
            let thisArrayOfAssets = new Array<Asset>();
            for (var k = 0; k < thisAssetGroupJSON.assetJSONs.length; k++) {
                let thisAssetJSON = thisAssetGroupJSON.assetJSONs[k];
                // the min and max values of the asset are set because they are required by SheetAssetCompositionComponent
                let thisAsset = new Asset(thisAssetJSON.name, thisAssetJSON.symbol, thisAssetJSON.weight,
                null, null, 0, 1);
                thisAsset.investmentAmount = thisAssetJSON.investmentAmount;
                thisArrayOfAssets.push(thisAsset);
            }
            // the min and max values of the asset are set because they are required by SheetAssetCompositionComponent
            let thisAssetGroup = new AssetGroup(thisAssetGroupJSON.name, thisAssetGroupJSON.weight,
                                                    null, null, thisArrayOfAssets, 0, 1);
            thisAssetGroup.investmentAmount = thisAssetGroupJSON.investmentAmount;
            proposalFromBackEnd.assetGroups.push(thisAssetGroup);
        }
        let thisArrayOfProposalInvestments = new Array<ProposalInvestment>();
        proposalFromBackEnd.investmentElements = thisArrayOfProposalInvestments;
        for (var j = 0; j < inProposalJSON.proposalInvestmentJSONs.length; j++) { 
            let thisProposalInvestmentJSON = inProposalJSON.proposalInvestmentJSONs[j];
            let thisProposalInvestmentSource = new ProposalInvestmentSource(thisProposalInvestmentJSON.source.type,
                                                        thisProposalInvestmentJSON.source.id, null)
            let thisProposalInvestment = new ProposalInvestment(thisProposalInvestmentSource);
            thisProposalInvestment.amount = thisProposalInvestmentJSON.amount;
            proposalFromBackEnd.investmentElements.push(thisProposalInvestment);
        }
        return proposalFromBackEnd;
    }
    
    buildBuyMessageForTheBackEnd(inProposal: Proposal) {
        let proposalJSON = new ProposalJSON();
        proposalJSON.fillForBuyOrder(inProposal);
        return JSON.stringify(proposalJSON, null, 4);
    }
    
    getStockPrices(inAsset: Asset) {
        let myUrl = this._environment.stockPricesServiceUrlStart + inAsset.symbol + 
                    this._environment.stockPricesServiceUrlEnd;
        return this._http.get(myUrl)
            .subscribe(
                data => {
                    let textInLines = data.text().split("\n");
                    let textDataLine = textInLines[1];
                    let texDataElements = textDataLine.split(",");
                    inAsset.dateOfPrices = texDataElements[0];
                    inAsset.openPrice = parseFloat(texDataElements[1]);
                    inAsset.highPrice = parseFloat(texDataElements[2]);
                    inAsset.lowPrice = parseFloat(texDataElements[3]);
                    inAsset.closePrice = parseFloat(texDataElements[4]);
                    inAsset.volume = parseFloat(texDataElements[5]);
                    //console.log(data.text());
                },
                err => console.error('Error --- ' + err)//,
                //() => console.log('Save Complete')
            );
    }
}