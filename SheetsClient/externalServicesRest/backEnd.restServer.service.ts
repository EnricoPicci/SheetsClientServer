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
    
    /*getSheet(inId: number) {
        return this._http.get(this._environment + 'sheets/?id=' + inId)
            .map(res => res.json());
	}*/
    
    /*getSheetWithDetails(inId: number, inSheetArray: Sheet[], inIndex: number) {
        let myUrl = this._environment.baseServiceUrl + 'sheets/?id=' + inId;
        let myReq = this._http.get(this._environment.baseServiceUrl + 'sheets/?id=' + inId);
            myReq.map(res => res.json())
            .subscribe(
                data => {
                    let sheetJSON = data[0];
                    let sheetFromBackEnd = new Sheet(sheetJSON.id, sheetJSON.title, sheetJSON.longTitle, sheetJSON.imageUrl,
                    sheetJSON.oneMonthReturn, sheetJSON.valueAtRisk, sheetJSON.volatility, sheetJSON.general,
                    sheetJSON.valueBased, sheetJSON.sector);
                    sheetFromBackEnd.originalSheetID = sheetJSON.originalSheetID;
                    sheetFromBackEnd.personalizationComment = sheetJSON.personalizationComment;
                    sheetFromBackEnd.createdBy = sheetJSON.createdBy;
                    sheetFromBackEnd.description = sheetJSON.description;
                    sheetFromBackEnd.oneYearReturn = sheetJSON.oneYearReturn;
                    sheetFromBackEnd.dailyChange = sheetJSON.dailyChange;
                    sheetFromBackEnd.benchmark = sheetJSON.benchmark;
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
                    inSheetArray[inIndex] = sheetFromBackEnd;
                },
                err => console.error(err),
                () => console.log('getSheetWithDetails completed')
            )
    }*/
    
    getSheetWithDetails(inId: number) {
        let myUrl = this._environment.baseServiceUrl + 'sheets/?id=' + inId;
        return this._http.get(this._environment.baseServiceUrl + 'sheets/?id=' + inId)
            .map(res => res.json())
            .map(
                data => {
                    let sheetJSON = data[0];
                    let sheetFromBackEnd = new Sheet(sheetJSON.id, sheetJSON.title, sheetJSON.longTitle, sheetJSON.imageUrl,
                    sheetJSON.oneMonthReturn, sheetJSON.valueAtRisk, sheetJSON.volatility, sheetJSON.general,
                    sheetJSON.valueBased, sheetJSON.sector);
                    sheetFromBackEnd.originalSheetID = sheetJSON.originalSheetID;
                    sheetFromBackEnd.personalizationComment = sheetJSON.personalizationComment;
                    sheetFromBackEnd.createdBy = sheetJSON.createdBy;
                    sheetFromBackEnd.description = sheetJSON.description;
                    sheetFromBackEnd.oneYearReturn = sheetJSON.oneYearReturn;
                    sheetFromBackEnd.dailyChange = sheetJSON.dailyChange;
                    sheetFromBackEnd.benchmark = sheetJSON.benchmark;
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
    
    addSheet(inSheet: Sheet) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({headers: headers});
        let jsonString = inSheet.jsonStringForBackEnd();
        let myPost = this._http.post(this._environment + 'addSheet', jsonString, options);
        return myPost;
	}
    
    private handleError (error: Response) {
        // TODO: add service to send error to the server
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}