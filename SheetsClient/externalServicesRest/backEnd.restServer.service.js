System.register(['angular2/core', 'angular2/http', 'rxjs/Observable', '../app/sheet', './sheetJSON', '../app/assetGroup', '../app/asset', '../app/proposal', './proposalJSON', '../app/proposalInvestment', '../app/proposalInvestmentSource', '../externalServicesClientMock/backEnd.clientMock.service', '../environmentSettings/environment.service'], function(exports_1) {
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
    var core_1, http_1, Observable_1, sheet_1, sheetJSON_1, assetGroup_1, asset_1, proposal_1, proposalJSON_1, proposalInvestment_1, proposalInvestmentSource_1, backEnd_clientMock_service_1, environment_service_1;
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
            function (sheetJSON_1_1) {
                sheetJSON_1 = sheetJSON_1_1;
            },
            function (assetGroup_1_1) {
                assetGroup_1 = assetGroup_1_1;
            },
            function (asset_1_1) {
                asset_1 = asset_1_1;
            },
            function (proposal_1_1) {
                proposal_1 = proposal_1_1;
            },
            function (proposalJSON_1_1) {
                proposalJSON_1 = proposalJSON_1_1;
            },
            function (proposalInvestment_1_1) {
                proposalInvestment_1 = proposalInvestment_1_1;
            },
            function (proposalInvestmentSource_1_1) {
                proposalInvestmentSource_1 = proposalInvestmentSource_1_1;
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
                        sheetFromBackEnd.returnDataLastMonth.data = sheetJSON.returnDataLastMonth;
                        sheetFromBackEnd.returnDataBenchmarkLastMonth.data = sheetJSON.returnDataBenchmarkLastMonth;
                        //this.fillReturnData(sheetFromBackEnd, ReturnPeriod.lastMonth);
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
                BackEndRest.prototype.addSheet = function (inSheet) {
                    var options = this.getOpionsForPost();
                    var jsonString = this.getJsonSheetStringForBackEnd(inSheet);
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
                BackEndRest.prototype.selectSheets = function (inPublicPersonal, inGeneralTags, inValueBasedTags, inSectorsTags) {
                    var _this = this;
                    var myUrl = this._environment.baseServiceUrl + 'selectSheets/' +
                        '?publicPersonal=' + JSON.stringify(inPublicPersonal) +
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
                BackEndRest.prototype.searchSheetsByKeyword = function (inSearchInput) {
                    var _this = this;
                    var myUrl = this._environment.baseServiceUrl + 'searchSheetsByKeyword/?keyword=' + inSearchInput.value;
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
                BackEndRest.prototype.validateAndSaveProposal = function (inProposal) {
                    var options = this.getOpionsForPost();
                    var jsonString = this.getJsonProposalStringForBackEnd(inProposal);
                    console.log('save proposal -- json --  ');
                    console.log(jsonString);
                    var myPost = this._http.post(this._environment.baseServiceUrl + 'validateAndSaveProposal', jsonString, options)
                        .map(function (res) {
                        var resJson = res.json();
                        return resJson;
                    })
                        .catch(this.handleError);
                    return myPost;
                };
                BackEndRest.prototype.sendProposal = function (inProposal) {
                    var options = this.getOpionsForPost();
                    var jsonString = this.getJsonProposalStringForBackEnd(inProposal);
                    var myPost = this._http.post(this._environment.baseServiceUrl + 'sendProposal', jsonString, options)
                        .map(function (res) { return res.json(); });
                    return myPost;
                };
                BackEndRest.prototype.getAccountAndPortfolioCapacityForInvestment = function (inCustomerId) {
                    var myUrl = this._environment.baseServiceUrl + 'getAccountAndPortfolioCapacityForInvestment/?customerId=' + inCustomerId;
                    return this._http.get(myUrl)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                BackEndRest.prototype.getProposalsForCustomer = function (inCustomerId) {
                    var _this = this;
                    var myUrl = this._environment.baseServiceUrl + 'getProposals/?customerId=' + inCustomerId;
                    return this._http.get(myUrl)
                        .map(function (res) { return res.json(); })
                        .map(function (data) {
                        var proposalsRetrieved = new Array();
                        for (var i = 0; i < data.length; i++) {
                            var proposalJSON = data[i];
                            var proposalFromBackEnd = _this.createProposal(proposalJSON);
                            proposalFromBackEnd.id = proposalJSON.id;
                            proposalFromBackEnd.comment = proposalJSON.comment;
                            var thisArrayOfAssetGroups = new Array();
                            proposalFromBackEnd.assetGroups = thisArrayOfAssetGroups;
                            // the assetGroups of the sheet referenced by the newly created proposal are 
                            // set so that we can use components originally designed for sheets also with 
                            // proposals (e.g. SheetAssetCompositionComponent
                            proposalFromBackEnd.sheet.assetGroups = thisArrayOfAssetGroups;
                            for (var j = 0; j < proposalJSON.assetGroupJSONs.length; j++) {
                                var thisAssetGroupJSON = proposalJSON.assetGroupJSONs[j];
                                var thisArrayOfAssets = new Array();
                                for (var k = 0; k < thisAssetGroupJSON.assetJSONs.length; k++) {
                                    var thisAssetJSON = thisAssetGroupJSON.assetJSONs[k];
                                    // the min and max values of the asset are set because they are required by SheetAssetCompositionComponent
                                    var thisAsset = new asset_1.Asset(thisAssetJSON.name, thisAssetJSON.symbol, thisAssetJSON.weight, null, null, 0, 1);
                                    thisAsset.investmentAmount = thisAssetJSON.investmentAmount;
                                    thisArrayOfAssets.push(thisAsset);
                                }
                                // the min and max values of the asset are set because they are required by SheetAssetCompositionComponent
                                var thisAssetGroup = new assetGroup_1.AssetGroup(thisAssetGroupJSON.name, thisAssetGroupJSON.weight, null, null, thisArrayOfAssets, 0, 1);
                                thisAssetGroup.investmentAmount = thisAssetGroupJSON.investmentAmount;
                                proposalFromBackEnd.assetGroups.push(thisAssetGroup);
                            }
                            var thisArrayOfProposalInvestments = new Array();
                            proposalFromBackEnd.investmentElements = thisArrayOfProposalInvestments;
                            for (var j = 0; j < proposalJSON.proposalInvestmentJSONs.length; j++) {
                                var thisProposalInvestmentJSON = proposalJSON.proposalInvestmentJSONs[j];
                                var thisProposalInvestmentSource = new proposalInvestmentSource_1.ProposalInvestmentSource(thisProposalInvestmentJSON.source.type, thisProposalInvestmentJSON.source.id, null);
                                var thisProposalInvestment = new proposalInvestment_1.ProposalInvestment(thisProposalInvestmentSource);
                                thisProposalInvestment.amount = thisProposalInvestmentJSON.amount;
                                proposalFromBackEnd.investmentElements.push(thisProposalInvestment);
                            }
                            proposalsRetrieved.push(proposalFromBackEnd);
                        }
                        return proposalsRetrieved;
                    })
                        .catch(this.handleError);
                };
                BackEndRest.prototype.getReturnData = function (inSheet, inPeriod) {
                    var myUrl = this._environment.baseServiceUrl + 'getReturnData/?sheetId=' + inSheet.id +
                        '&returnPeriod=' + inPeriod;
                    return this._http.get(myUrl)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                BackEndRest.prototype.handleError = function (error) {
                    console.error('http error');
                    console.error(error);
                    var errorText = error.text();
                    if (error.status == 200) {
                        errorText = 'The whole server is down. The connection has been refused.';
                    }
                    return Observable_1.Observable.throw(errorText || 'Server error');
                };
                BackEndRest.prototype.getOpionsForPost = function () {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return new http_1.RequestOptions({ headers: headers });
                };
                BackEndRest.prototype.getJsonSheetStringForBackEnd = function (inSheet) {
                    var sheetJSON = new sheetJSON_1.SheetJSON();
                    sheetJSON.fill(inSheet);
                    return JSON.stringify(sheetJSON);
                };
                BackEndRest.prototype.getJsonProposalStringForBackEnd = function (inProposal) {
                    var proposalJSON = new proposalJSON_1.ProposalJSON();
                    proposalJSON.fill(inProposal);
                    return JSON.stringify(proposalJSON);
                };
                BackEndRest.prototype.createSheet = function (inSheetJson) {
                    var sheetFromBackEnd = new sheet_1.Sheet(inSheetJson.id, inSheetJson.title, inSheetJson.longTitle, inSheetJson.imageUrl, inSheetJson.oneMonthReturn, inSheetJson.valueAtRisk, inSheetJson.volatility, inSheetJson.general, inSheetJson.valueBased, inSheetJson.sector);
                    sheetFromBackEnd.originalSheetID = inSheetJson.originalSheetID;
                    sheetFromBackEnd.shortNote = inSheetJson.shortNote;
                    sheetFromBackEnd.personalizationComment = inSheetJson.personalizationComment;
                    sheetFromBackEnd.createdBy = inSheetJson.createdBy;
                    sheetFromBackEnd.description = inSheetJson.description;
                    sheetFromBackEnd.oneYearReturn = inSheetJson.oneYearReturn;
                    sheetFromBackEnd.dailyChange = inSheetJson.dailyChange;
                    sheetFromBackEnd.benchmark = inSheetJson.benchmark;
                    return sheetFromBackEnd;
                };
                BackEndRest.prototype.createProposal = function (inProposalJSON) {
                    var skinnySheetFromBackEnd = new sheet_1.Sheet(inProposalJSON.sheetId, inProposalJSON.title, null, inProposalJSON.imageUrl, null, null, null, null, null, null);
                    //skinnySheetFromBackEnd.originalSheetID = inProposalJSON.originalSheetID;
                    var proposal = new proposal_1.Proposal(null, inProposalJSON.customerId, skinnySheetFromBackEnd);
                    proposal.isValid = inProposalJSON.isValid;
                    return proposal;
                };
                BackEndRest.prototype.buildBuyMessageForTheBackEnd = function (inProposal) {
                    var proposalJSON = new proposalJSON_1.ProposalJSON();
                    proposalJSON.fillForBuyOrder(inProposal);
                    return JSON.stringify(proposalJSON, null, 4);
                };
                BackEndRest.prototype.getStockPrices = function (inAsset) {
                    var myUrl = this._environment.stockPricesServiceUrlStart + inAsset.symbol +
                        this._environment.stockPricesServiceUrlEnd;
                    return this._http.get(myUrl)
                        .subscribe(function (data) {
                        var textInLines = data.text().split("\n");
                        var textDataLine = textInLines[1];
                        var texDataElements = textDataLine.split(",");
                        inAsset.dateOfPrices = texDataElements[0];
                        inAsset.openPrice = parseFloat(texDataElements[1]);
                        inAsset.highPrice = parseFloat(texDataElements[2]);
                        inAsset.lowPrice = parseFloat(texDataElements[3]);
                        inAsset.closePrice = parseFloat(texDataElements[4]);
                        inAsset.volume = parseFloat(texDataElements[5]);
                        //console.log(data.text());
                    }, function (err) { return console.error('Error --- ' + err); } //,
                     //,
                    );
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