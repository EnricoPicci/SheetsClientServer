System.register(['angular2/core', 'angular2/router', './sheetBackEnd.service', './sheetInfo.component', './sheetReturnData.component', './sheetCompositionCharts.component', './sheetAssetComposition.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, sheetBackEnd_service_1, sheetInfo_component_1, sheetReturnData_component_1, sheetCompositionCharts_component_1, sheetAssetComposition_component_1;
    var ReturnData, SheetComparatorComponent;
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
            function (sheetInfo_component_1_1) {
                sheetInfo_component_1 = sheetInfo_component_1_1;
            },
            function (sheetReturnData_component_1_1) {
                sheetReturnData_component_1 = sheetReturnData_component_1_1;
            },
            function (sheetCompositionCharts_component_1_1) {
                sheetCompositionCharts_component_1 = sheetCompositionCharts_component_1_1;
            },
            function (sheetAssetComposition_component_1_1) {
                sheetAssetComposition_component_1 = sheetAssetComposition_component_1_1;
            }],
        execute: function() {
            ReturnData = (function () {
                function ReturnData() {
                    this.data = new Array();
                }
                ReturnData.prototype.isEmpty = function () {
                    return this.data.length == 0;
                };
                return ReturnData;
            })();
            exports_1("ReturnData", ReturnData);
            SheetComparatorComponent = (function () {
                function SheetComparatorComponent(_routeParams, _sheetBackEnd) {
                    this._routeParams = _routeParams;
                    this._sheetBackEnd = _sheetBackEnd;
                    //public sheet1: Sheet;
                    //public sheet2: Sheet;
                    this.sheets = new Array();
                }
                SheetComparatorComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var id1 = +this._routeParams.get('idSheetToCompare1');
                    var id2 = +this._routeParams.get('idSheetToCompare2');
                    this._sheetBackEnd.getSheetWithDetails(id1)
                        .subscribe(function (sheet) { return _this.sheets[0] = sheet; }, function (error) { return _this.errorMessage = error; });
                    this._sheetBackEnd.getSheetWithDetails(id2)
                        .subscribe(function (sheet) { return _this.sheets[1] = sheet; }, function (error) { return _this.errorMessage = error; });
                    //this._sheetBackEnd.fillDetails(this.sheets[0]);
                    //this._sheetBackEnd.fillDetails(this.sheets[1]);
                    //this.sheets.push(this.sheet1);
                    //this.sheets.push(this.sheet2);
                };
                SheetComparatorComponent = __decorate([
                    core_1.Component({
                        selector: 'sheet-comparator',
                        providers: [],
                        templateUrl: '../templates/sheetComparator.html',
                        styleUrls: ['../styles/common.css', '../styles/sheetDetail.css'],
                        directives: [sheetAssetComposition_component_1.SheetAssetCompositionComponent, sheetReturnData_component_1.SheetReturnData, sheetCompositionCharts_component_1.SheetCompositionCharts, sheetInfo_component_1.SheetInfoComponent],
                        inputs: ['sheet1', 'sheet2'],
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, sheetBackEnd_service_1.SheetBackEnd])
                ], SheetComparatorComponent);
                return SheetComparatorComponent;
            })();
            exports_1("SheetComparatorComponent", SheetComparatorComponent);
        }
    }
});
//# sourceMappingURL=sheetComparator.component.js.map