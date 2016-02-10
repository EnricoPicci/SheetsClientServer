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

import {BackEndClientMock} from '../externalServicesClientMock/backEnd.clientMock.service';
import {Environment} from '../environmentSettings/environment.service';

@Injectable()
export class BackEndRest extends BackEndClientMock {
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
                    this.fillReturnData(sheetFromBackEnd, ReturnPeriod.lastMonth);
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
    
    private createSheet(inSheetJson: any) {
        let sheetFromBackEnd = new Sheet(inSheetJson.id, inSheetJson.title, inSheetJson.longTitle, inSheetJson.imageUrl,
        inSheetJson.oneMonthReturn, inSheetJson.valueAtRisk, inSheetJson.volatility, inSheetJson.general,
        inSheetJson.valueBased, inSheetJson.sector);
        sheetFromBackEnd.originalSheetID = inSheetJson.originalSheetID;
        sheetFromBackEnd.personalizationComment = inSheetJson.personalizationComment;
        sheetFromBackEnd.createdBy = inSheetJson.createdBy;
        sheetFromBackEnd.description = inSheetJson.description;
        sheetFromBackEnd.oneYearReturn = inSheetJson.oneYearReturn;
        sheetFromBackEnd.dailyChange = inSheetJson.dailyChange;
        sheetFromBackEnd.benchmark = inSheetJson.benchmark;
        return sheetFromBackEnd;
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
    
    saveProposal(inProposal: Proposal) {
        let options = this.getOpionsForPost();
        let jsonString = this.getJsonProposalStringForBackEnd(inProposal);
        console.log('save proposal -- json --  ');
        console.log(jsonString);
        let myPost = this._http.post(this._environment.baseServiceUrl + 'saveProposal', jsonString, options)
            .map(res => res.json());
        return myPost;
    }
    
    sendProposal(inProposal: Proposal) {
        let options = this.getOpionsForPost();
        let jsonString = this.getJsonProposalStringForBackEnd(inProposal);
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
    
    private handleError (error: Response) {
        // TODO: add service to send error to the server
        console.error('the error');
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
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
    
    private getJsonProposalStringForBackEnd(inProposal: Proposal) {
        let proposalJSON = new ProposalJSON();
        proposalJSON.fill(inProposal);
        return JSON.stringify(proposalJSON);
    }
}