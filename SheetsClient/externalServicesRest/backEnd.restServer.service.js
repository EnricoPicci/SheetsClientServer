System.register(['angular2/core', 'angular2/http', 'rxjs/Observable', '../app/sheet', '../app/assetGroup', '../app/asset', '../app/returnPeriod', '../externalServicesClientMock/backEnd.clientMock.service', '../environmentSettings/environment.service'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, Observable_1, sheet_1, assetGroup_1, asset_1, returnPeriod_1, backEnd_clientMock_service_1, environment_service_1;
    var BackEndRest;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (sheet_1_1) {
                sheet_1 = sheet_1_1;
            },
            function (assetGroup_1_1) {
                assetGroup_1 = assetGroup_1_1;
            },
            function (asset_1_1) {
                asset_1 = asset_1_1;
            },
            function (returnPeriod_1_1) {
                returnPeriod_1 = returnPeriod_1_1;
            },
            function (backEnd_clientMock_service_1_1) {
                backEnd_clientMock_service_1 = backEnd_clientMock_service_1_1;
            },
            function (environment_service_1_1) {
                environment_service_1 = environment_service_1_1;
            }],
        execute: function() {
            BackEndRest = (function (_super) {
                __extends(BackEndRest, _super);
                function BackEndRest(_http, _environment) {
                    _super.call(this);
                    this._http = _http;
                    this._environment = _environment;
                }
                BackEndRest.prototype.getAllSheets = function () {
                    var _this = this;
                    var myUrl = this._environment.baseServiceUrl + 'sheets';
                    return this._http.get(myUrl)
                        .map(function (res) { return res.json(); })
                        .map(function (data) {
                        var sheetsRetrieved = new Array();
                        for (var i = 0; i < data.length; i++) {
                            var sheetJSON = data[i];
                            sheetsRetrieved.push(_this.createSheet(sheetJSON));
                        }
                        return sheetsRetrieved;
                    })
                        .catch(this.handleError);
                };
                BackEndRest.prototype.getSheetWithDetails = function (inId) {
                    var _this = this;
                    var myUrl = this._environment.baseServiceUrl + 'sheet/?id=' + inId;
                    return this._http.get(myUrl)
                        .map(function (res) { return res.json(); })
                        .map(function (data) {
                        var sheetJSON = data[0];
                        var sheetFromBackEnd = _this.createSheet(sheetJSON);
                        var thisArrayOfAssetGroups = new Array();
                        sheetFromBackEnd.assetGroups = thisArrayOfAssetGroups;
                        for (var i = 0; i < sheetJSON.assetGroupJSONs.length; i++) {
                            var thisAssetGroupJSON = sheetJSON.assetGroupJSONs[i];
                            var thisArrayOfAssets = new Array();
                            for (var j = 0; j < thisAssetGroupJSON.assetJSONs.length; j++) {
                                var thisAssetJSON = thisAssetGroupJSON.assetJSONs[j];
                                var thisAsset = new asset_1.Asset(thisAssetJSON.name, thisAssetJSON.symbol, thisAssetJSON.weight, thisAssetJSON.oneMonthRet, thisAssetJSON.oneYearRet, thisAssetJSON.minWeight, thisAssetJSON.maxWeight);
                                thisArrayOfAssets.push(thisAsset);
                            }
                            var thisAssetGroup = new assetGroup_1.AssetGroup(thisAssetGroupJSON.name, thisAssetGroupJSON.weight, thisAssetGroupJSON.oneMonthRet, thisAssetGroupJSON.oneYearRet, thisArrayOfAssets, thisAssetGroupJSON.minWeight, thisAssetGroupJSON.maxWeight);
                            sheetFromBackEnd.assetGroups.push(thisAssetGroup);
                        }
                        _this.fillReturnData(sheetFromBackEnd, returnPeriod_1.ReturnPeriod.lastMonth);
                        return sheetFromBackEnd;
                    })
                        .catch(this.handleError);
                };
                BackEndRest.prototype.getSomeSheets = function (inFromPosition, inMaxNumberOfSheets) {
                    var _this = this;
                    var myUrl = this._environment.baseServiceUrl + 'someSheets/?fromId=' + inFromPosition + '&maxNoOfItems=' + inMaxNumberOfSheets;
                    return this._http.get(myUrl)
                        .map(function (res) { return res.json(); })
                        .map(function (data) {
                        var sheetsRetrieved = new Array();
                        for (var i = 0; i < data.length; i++) {
                            var sheetJSON = data[i];
                            sheetsRetrieved.push(_this.createSheet(sheetJSON));
                        }
                        return sheetsRetrieved;
                    })
                        .catch(this.handleError);
                };
                BackEndRest.prototype.createSheet = function (inSheetJson) {
                    var sheetFromBackEnd = new sheet_1.Sheet(inSheetJson.id, inSheetJson.title, inSheetJson.longTitle, inSheetJson.imageUrl, inSheetJson.oneMonthReturn, inSheetJson.valueAtRisk, inSheetJson.volatility, inSheetJson.general, inSheetJson.valueBased, inSheetJson.sector);
                    sheetFromBackEnd.originalSheetID = inSheetJson.originalSheetID;
                    sheetFromBackEnd.personalizationComment = inSheetJson.personalizationComment;
                    sheetFromBackEnd.createdBy = inSheetJson.createdBy;
                    sheetFromBackEnd.description = inSheetJson.description;
                    sheetFromBackEnd.oneYearReturn = inSheetJson.oneYearReturn;
                    sheetFromBackEnd.dailyChange = inSheetJson.dailyChange;
                    sheetFromBackEnd.benchmark = inSheetJson.benchmark;
                    return sheetFromBackEnd;
                };
                BackEndRest.prototype.addSheet = function (inSheet) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    var options = new http_1.RequestOptions({ headers: headers });
                    var jsonString = inSheet.jsonStringForBackEnd();
                    var myPost = this._http.post(this._environment.baseServiceUrl + 'addSheet', jsonString, options);
                    return myPost;
                };
                BackEndRest.prototype.getGeneralSearchCriteriaDomain = function () { return this.getSearchCriteriaDomain('generalTags'); };
                BackEndRest.prototype.getValueBasedSearchCriteriaDomain = function () { return this.getSearchCriteriaDomain('valueBasedTags'); };
                BackEndRest.prototype.getSectorsSearchCriteriaDomain = function () { return this.getSearchCriteriaDomain('sectorTags'); };
                BackEndRest.prototype.getSearchCriteriaDomain = function (inDomainName) {
                    var myUrl = this._environment.baseServiceUrl + inDomainName;
                    return this._http.get(myUrl)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                BackEndRest.prototype.selectSheets = function (inSearchString, inPublicPersonal, inGeneralTags, inValueBasedTags, inSectorsTags) {
                    var _this = this;
                    var myUrl = this._environment.baseServiceUrl + 'selectSheets/?searchString=' + inSearchString +
                        '&publicPersonal=' + JSON.stringify(inPublicPersonal) +
                        '&generalTags=' + JSON.stringify(inGeneralTags) +
                        '&valueBasedTags=' + JSON.stringify(inValueBasedTags) +
                        '&sectorsTags=' + JSON.stringify(inSectorsTags);
                    return this._http.get(myUrl)
                        .map(function (res) { return res.json(); })
                        .map(function (data) {
                        var sheetsRetrieved = new Array();
                        for (var i = 0; i < data.length; i++) {
                            var sheetJSON = data[i];
                            sheetsRetrieved.push(_this.createSheet(sheetJSON));
                        }
                        return sheetsRetrieved;
                    })
                        .catch(this.handleError);
                };
                BackEndRest.prototype.handleError = function (error) {
                    // TODO: add service to send error to the server
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                BackEndRest = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, environment_service_1.Environment])
                ], BackEndRest);
                return BackEndRest;
            })(backEnd_clientMock_service_1.BackEndClientMock);
            exports_1("BackEndRest", BackEndRest);
        }
    }
});
//# sourceMappingURL=backEnd.restServer.service.js.map