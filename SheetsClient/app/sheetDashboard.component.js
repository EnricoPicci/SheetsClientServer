System.register(['angular2/core', 'angular2/router', './sheetBackEnd.service', './sheetCollection.component', './sheetSearch.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, sheetBackEnd_service_1, sheetCollection_component_1, sheetSearch_component_1;
    var SheetDashboardComponent;
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
            function (sheetCollection_component_1_1) {
                sheetCollection_component_1 = sheetCollection_component_1_1;
            },
            function (sheetSearch_component_1_1) {
                sheetSearch_component_1 = sheetSearch_component_1_1;
            }],
        execute: function() {
            SheetDashboardComponent = (function () {
                function SheetDashboardComponent(_router, _routeParams, _sheetBackEnd) {
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this._sheetBackEnd = _sheetBackEnd;
                    this.title = 'Sheets';
                }
                SheetDashboardComponent.prototype.ngOnInit = function () {
                    this.sheets = this._sheetBackEnd.getSomeSheets(0, 17);
                    this.idOfFirstSheetToCompare = this._routeParams.get('idOfFirstSheetToCompare');
                    if (this.idOfFirstSheetToCompare != null) {
                        for (var i = 0; i < this.sheets.length; i++) {
                            var oneSheet = this.sheets[i];
                            if (oneSheet.id.toString() != this.idOfFirstSheetToCompare) {
                                this.sheets[i].isComparisonCheckboxToBeDisplayed = true;
                            }
                        }
                    }
                };
                SheetDashboardComponent.prototype.getSheets = function () {
                    return this.sheets;
                };
                SheetDashboardComponent.prototype.updateSheets = function (searchResult) {
                    this.sheets = searchResult;
                };
                SheetDashboardComponent.prototype.selectionCriteriaChanged = function (inSheet) {
                    if (inSheet.isSelectedForComparison) {
                        // if the secondSheetToCompare is not null, then I reset it so that it is unchecked for comparison
                        // if there is a secondSheetToCompare not null, then it means that a previous selection was made and this 
                        // selection has to be reset
                        if (this.secondSheetToCompare) {
                            this.secondSheetToCompare.isSelectedForComparison = false;
                        }
                        this.secondSheetToCompare = inSheet;
                    }
                    else {
                        this.secondSheetToCompare = null;
                    }
                };
                SheetDashboardComponent.prototype.isReadyToLaunchCompare = function () {
                    // only if there are 2 sheets to compare we can launch compare
                    var ret = false;
                    if ((this.idOfFirstSheetToCompare !== null) &&
                        (this.secondSheetToCompare != null) &&
                        (this.secondSheetToCompare.isSelectedForComparison)) {
                        ret = true;
                    }
                    return ret;
                };
                SheetDashboardComponent.prototype.onCompareClick = function () {
                    var firstSheetId = this.idOfFirstSheetToCompare;
                    // clean the ids so that when we return to the dashboard it is not set for comparison (unless we want so)
                    this.idOfFirstSheetToCompare = null;
                    this.secondSheetToCompare.isSelectedForComparison = false;
                    this._router.navigate(['SheetComparator', { idSheetToCompare1: firstSheetId, idSheetToCompare2: this.secondSheetToCompare.id }]);
                };
                SheetDashboardComponent = __decorate([
                    core_1.Component({
                        selector: 'sheet-dashboard',
                        providers: [],
                        templateUrl: '../templates/sheetDashboard.html',
                        styleUrls: ['../styles/common.css', '../styles/app.css'],
                        directives: [sheetCollection_component_1.SheetCollection, sheetSearch_component_1.SheetSearchCmp],
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.RouteParams, sheetBackEnd_service_1.SheetBackEnd])
                ], SheetDashboardComponent);
                return SheetDashboardComponent;
            })();
            exports_1("SheetDashboardComponent", SheetDashboardComponent);
        }
    }
});
//# sourceMappingURL=sheetDashboard.component.js.map