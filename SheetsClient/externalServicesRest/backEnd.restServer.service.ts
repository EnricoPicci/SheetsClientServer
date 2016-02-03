import {Injectable} from 'angular2/core';
import {Http, HTTP_PROVIDERS, Headers, RequestOptions, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';

import {Sheet} from '../app/sheet';
//import {SheetJSON} from '../app/sheetJSON'
import {AssetGroup} from '../app/assetGroup';
import {Asset} from '../app/asset';
import {ReturnPeriod} from '../app/returnPeriod';
import {SheetBackEnd} from '../app/sheetBackEnd.service';

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
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({headers: headers});
        let jsonString = inSheet.jsonStringForBackEnd();
        let myPost = this._http.post(this._environment.baseServiceUrl + 'addSheet', jsonString, options);
        return myPost;
	}
    
    private handleError (error: Response) {
        // TODO: add service to send error to the server
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}