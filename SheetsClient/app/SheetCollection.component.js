System.register(['angular2/core', 'angular2/router', './sheetSummary.component', './sheetBackEnd.service', './sheetSortCriteria', '../utilities/stringNumericConverter', '../utilities/httpErrorManager.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, sheetSummary_component_1, sheetBackEnd_service_1, sheetSortCriteria_1, sheetSortCriteria_2, stringNumericConverter_1, httpErrorManager_component_1;
    var SheetCollection;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (sheetSummary_component_1_1) {
                sheetSummary_component_1 = sheetSummary_component_1_1;
            },
            function (sheetBackEnd_service_1_1) {
                sheetBackEnd_service_1 = sheetBackEnd_service_1_1;
            },
            function (sheetSortCriteria_1_1) {
                sheetSortCriteria_1 = sheetSortCriteria_1_1;
                sheetSortCriteria_2 = sheetSortCriteria_1_1;
            },
            function (stringNumericConverter_1_1) {
                stringNumericConverter_1 = stringNumericConverter_1_1;
            },
            function (httpErrorManager_component_1_1) {
                httpErrorManager_component_1 = httpErrorManager_component_1_1;
            }],
        execute: function() {
            SheetCollection = (function () {
                //public errorMessage: string;
                function SheetCollection(_router, _routeParams, _sheetBackEnd) {
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this._sheetBackEnd = _sheetBackEnd;
                    this.sheetSelectedChanged = new core_1.EventEmitter();
                    this.sortCriteria = sheetSortCriteria_1.SheetSortCriteria.criteria;
                    this.selectedSortCriterium = sheetSortCriteria_2.SheetSortCriteriaEnum.OneMonthReturn;
                    this.sortAscending = false;
                    this.showGrid = true;
                }
                Object.defineProperty(SheetCollection.prototype, "setSheets", {
                    set: function (inSheets) {
                        this.sheets = inSheets;
                        if (this.sheets) {
                            this.sortSheets(this.selectedSortCriterium);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                SheetCollection.prototype.ngOnInit = function () {
                    var _this = this;
                    var startId = +this._routeParams.get('startId');
                    var maxNumOfSheets = +this._routeParams.get('maxNumOfSheets');
                    console.log(startId);
                    console.log(maxNumOfSheets);
                    // only if the routeParameter maxNumOfSheets is not null (i.e. is greater than 0) we go to the service
                    // this is because if the routeParameter is not null, it means we have been called via routing (or url on the browser)
                    // if it is null it means we have been called within the single-page (and we hope we have been passed the full Sheet instance)
                    if (maxNumOfSheets) {
                        this._sheetBackEnd.getSomeSheets(startId, maxNumOfSheets)
                            .subscribe(function (sheets) {
                            _this.sheets = sheets;
                            _this.sortSheets(_this.selectedSortCriterium);
                        }, function (error) { return _this.httpErrorResponse = error; });
                    }
                };
                SheetCollection.prototype.selectionCriteriaChanged = function (inSheet) {
                    console.log(inSheet);
                    this.sheetSelectedChanged.next(inSheet);
                };
                SheetCollection.prototype.sortSheets = function (inSortCriterium) {
                    this.selectedSortCriterium = inSortCriterium;
                    if (this.sortAscending) {
                        if (inSortCriterium == sheetSortCriteria_2.SheetSortCriteriaEnum.OneMonthReturn) {
                            this.metricToShowInSheetSummary = sheetSortCriteria_2.SheetSortCriteriaEnum.OneMonthReturn;
                            this.sheets = this.sheets.sort(function (a, b) {
                                return stringNumericConverter_1.StringNumericConverter.getNumberFromPercentageString(a.oneMonthReturn) - stringNumericConverter_1.StringNumericConverter.getNumberFromPercentageString(b.oneMonthReturn);
                            });
                        }
                        else if (inSortCriterium == sheetSortCriteria_2.SheetSortCriteriaEnum.OneYearReturn) {
                            this.metricToShowInSheetSummary = sheetSortCriteria_2.SheetSortCriteriaEnum.OneYearReturn;
                            this.sheets = this.sheets.sort(function (a, b) {
                                return stringNumericConverter_1.StringNumericConverter.getNumberFromPercentageString(a.oneYearReturn) - stringNumericConverter_1.StringNumericConverter.getNumberFromPercentageString(b.oneYearReturn);
                            });
                        }
                        else if (inSortCriterium == sheetSortCriteria_2.SheetSortCriteriaEnum.DailyChange) {
                            this.metricToShowInSheetSummary = sheetSortCriteria_2.SheetSortCriteriaEnum.DailyChange;
                            this.sheets = this.sheets.sort(function (a, b) {
                                return stringNumericConverter_1.StringNumericConverter.getNumberFromPercentageString(a.dailyChange) - stringNumericConverter_1.StringNumericConverter.getNumberFromPercentageString(b.dailyChange);
                            });
                        }
                        else if (inSortCriterium == sheetSortCriteria_2.SheetSortCriteriaEnum.Name) {
                            this.sheets = this.sheets.sort(function (a, b) {
                                var titleA = a.title.toUpperCase();
                                var titleB = b.title.toUpperCase();
                                return (titleA < titleB) ? -1 : (titleA > titleB) ? 1 : 0;
                            });
                        }
                    }
                    else {
                        if (inSortCriterium == sheetSortCriteria_2.SheetSortCriteriaEnum.OneMonthReturn) {
                            this.metricToShowInSheetSummary = sheetSortCriteria_2.SheetSortCriteriaEnum.OneMonthReturn;
                            this.sheets = this.sheets.sort(function (b, a) {
                                return stringNumericConverter_1.StringNumericConverter.getNumberFromPercentageString(a.oneMonthReturn) - stringNumericConverter_1.StringNumericConverter.getNumberFromPercentageString(b.oneMonthReturn);
                            });
                        }
                        else if (inSortCriterium == sheetSortCriteria_2.SheetSortCriteriaEnum.OneYearReturn) {
                            this.metricToShowInSheetSummary = sheetSortCriteria_2.SheetSortCriteriaEnum.OneYearReturn;
                            this.sheets = this.sheets.sort(function (b, a) {
                                return stringNumericConverter_1.StringNumericConverter.getNumberFromPercentageString(a.oneYearReturn) - stringNumericConverter_1.StringNumericConverter.getNumberFromPercentageString(b.oneYearReturn);
                            });
                        }
                        else if (inSortCriterium == sheetSortCriteria_2.SheetSortCriteriaEnum.DailyChange) {
                            this.metricToShowInSheetSummary = sheetSortCriteria_2.SheetSortCriteriaEnum.DailyChange;
                            this.sheets = this.sheets.sort(function (b, a) {
                                return stringNumericConverter_1.StringNumericConverter.getNumberFromPercentageString(a.dailyChange) - stringNumericConverter_1.StringNumericConverter.getNumberFromPercentageString(b.dailyChange);
                            });
                        }
                        else if (inSortCriterium == sheetSortCriteria_2.SheetSortCriteriaEnum.Name) {
                            this.sheets = this.sheets.sort(function (b, a) {
                                var titleA = a.title.toUpperCase();
                                var titleB = b.title.toUpperCase();
                                return (titleA < titleB) ? -1 : (titleA > titleB) ? 1 : 0;
                            });
                        }
                    }
                    if (this.sheets.length > 1) {
                        for (var i = 1; i < this.sheets.length; i = i + 2) {
                            this.sheets[i].isEven = true;
                        }
                    }
                };
                SheetCollection.prototype.toggleSortDirection = function () {
                    this.sortAscending = !this.sortAscending;
                    this.sortSheets(this.selectedSortCriterium);
                };
                __decorate([
                    core_1.Input('sheets'), 
                    __metadata('design:type', Array), 
                    __metadata('design:paramtypes', [Array])
                ], SheetCollection.prototype, "setSheets", null);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], SheetCollection.prototype, "sheetSelectedChanged", void 0);
                SheetCollection = __decorate([
                    core_1.Component({
                        selector: 'sheetCollectionCmp',
                        providers: [],
                        templateUrl: '../templates/sheetCollection.html',
                        styleUrls: ['../styles/sheetCollection.css'],
                        directives: [sheetSummary_component_1.SheetSummaryComponent, httpErrorManager_component_1.HttpErrorManagerComponent],
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.RouteParams, sheetBackEnd_service_1.SheetBackEnd])
                ], SheetCollection);
                return SheetCollection;
            })();
            exports_1("SheetCollection", SheetCollection);
        }
    }
});
//# sourceMappingURL=sheetCollection.component.js.map