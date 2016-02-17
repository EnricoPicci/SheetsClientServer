System.register(['angular2/core', 'angular2/router', './sheetBackEnd.service', './sheetSortCriteria', '../utilities/stringNumericConverter'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, sheetBackEnd_service_1, sheetSortCriteria_1, stringNumericConverter_1;
    var SheetSummaryComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (sheetBackEnd_service_1_1) {
                sheetBackEnd_service_1 = sheetBackEnd_service_1_1;
            },
            function (sheetSortCriteria_1_1) {
                sheetSortCriteria_1 = sheetSortCriteria_1_1;
            },
            function (stringNumericConverter_1_1) {
                stringNumericConverter_1 = stringNumericConverter_1_1;
            }],
        execute: function() {
            SheetSummaryComponent = (function () {
                function SheetSummaryComponent(_router, _routeParams, _sheetBackEnd) {
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this._sheetBackEnd = _sheetBackEnd;
                    this.selectionCriteriaChanged = new core_1.EventEmitter();
                    this.isIconized = false;
                    this.metricToShowInSheetSummary = sheetSortCriteria_1.SheetSortCriteriaEnum.OneMonthReturn;
                }
                SheetSummaryComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var id = +this._routeParams.get('id');
                    // only if the routeParameter is not null we go to the service
                    // this is because if the routeParameter is not null, it means we have been called via routing (or url on the browser)
                    // if id is null it means we have been called within the single-page (and we hope we have been passed the full Sheet instance)
                    if (id) {
                        this._sheetBackEnd.getSomeSheets(id, 1)
                            .subscribe(function (sheets) { return _this.sheet = sheets[0]; }, function (error) { return _this.errorMessage = error; });
                    }
                };
                SheetSummaryComponent.prototype.onChangeSelection = function (inSelected) {
                    console.log('selected? ' + inSelected + '  id: ' + this.sheet.id);
                    this.sheet.isSelectedForComparison = inSelected;
                    this.selectionCriteriaChanged.next(this.sheet);
                };
                /*hasPositiveOneMonthReturn() {
                    return this.hasPositiveReturn(this.sheet.oneMonthReturn);
                }*/
                SheetSummaryComponent.prototype.hasPositiveReturn = function () {
                    var ret = true;
                    if (this.getMetricToShow()) {
                        ret = stringNumericConverter_1.StringNumericConverter.getNumberFromPercentageString(this.getMetricToShow()) >= 0;
                    }
                    return ret;
                };
                SheetSummaryComponent.prototype.getMetricToShow = function () {
                    var metricToShow = this.sheet.oneMonthReturn;
                    if (this.metricToShowInSheetSummary == sheetSortCriteria_1.SheetSortCriteriaEnum.OneYearReturn) {
                        metricToShow = this.sheet.oneYearReturn;
                    }
                    else if (this.metricToShowInSheetSummary == sheetSortCriteria_1.SheetSortCriteriaEnum.DailyChange) {
                        metricToShow = this.sheet.dailyChange;
                    }
                    return metricToShow;
                };
                SheetSummaryComponent.prototype.getMetricNameToShow = function () {
                    var metricNameToShow = sheetSortCriteria_1.SheetSortCriteriaEnum.OneMonthReturn;
                    if (this.metricToShowInSheetSummary == sheetSortCriteria_1.SheetSortCriteriaEnum.OneYearReturn) {
                        metricNameToShow = sheetSortCriteria_1.SheetSortCriteriaEnum.OneYearReturn;
                    }
                    else if (this.metricToShowInSheetSummary == sheetSortCriteria_1.SheetSortCriteriaEnum.DailyChange) {
                        metricNameToShow = sheetSortCriteria_1.SheetSortCriteriaEnum.DailyChange;
                    }
                    return metricNameToShow;
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], SheetSummaryComponent.prototype, "selectionCriteriaChanged", void 0);
                SheetSummaryComponent = __decorate([
                    core_1.Component({
                        selector: 'sheet-summary',
                        providers: [],
                        templateUrl: '../templates/sheetSummary.html',
                        styleUrls: ['../styles/common.css', '../styles/sheetSummary.css'],
                        directives: [router_1.ROUTER_DIRECTIVES],
                        inputs: ['sheet', 'isIconized', 'metricToShowInSheetSummary'],
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.RouteParams, sheetBackEnd_service_1.SheetBackEnd])
                ], SheetSummaryComponent);
                return SheetSummaryComponent;
            })();
            exports_1("SheetSummaryComponent", SheetSummaryComponent);
        }
    }
});
//# sourceMappingURL=sheetSummary.component.js.map