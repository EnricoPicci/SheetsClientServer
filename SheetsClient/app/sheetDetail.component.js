System.register(['angular2/core', 'angular2/router', './sheetBackEnd.service', '../utilities/shortLongText.component', './sheetReturnData.component', './sheetCompositionCharts.component', './sheetAssetComposition.component', './sheetInfo.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, sheetBackEnd_service_1, shortLongText_component_1, sheetReturnData_component_1, sheetCompositionCharts_component_1, sheetAssetComposition_component_1, sheetInfo_component_1;
    var SheetDetailComponent;
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
            function (shortLongText_component_1_1) {
                shortLongText_component_1 = shortLongText_component_1_1;
            },
            function (sheetReturnData_component_1_1) {
                sheetReturnData_component_1 = sheetReturnData_component_1_1;
            },
            function (sheetCompositionCharts_component_1_1) {
                sheetCompositionCharts_component_1 = sheetCompositionCharts_component_1_1;
            },
            function (sheetAssetComposition_component_1_1) {
                sheetAssetComposition_component_1 = sheetAssetComposition_component_1_1;
            },
            function (sheetInfo_component_1_1) {
                sheetInfo_component_1 = sheetInfo_component_1_1;
            }],
        execute: function() {
            SheetDetailComponent = (function () {
                function SheetDetailComponent(_router, _routeParams, _backEnd) {
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this._backEnd = _backEnd;
                    // the array is needed to feed the sheetReturnData component
                    this.sheets = new Array();
                    //public sheets: Sheet[];
                    this.shortDescriptionTextLength = 250;
                    //public sendProposalMessage: string;
                    this.sheetRetrieved = new core_1.EventEmitter();
                    this.prepareProposal = new core_1.EventEmitter();
                    this.editMode = true;
                }
                SheetDetailComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var id = +this._routeParams.get('id');
                    this._backEnd.getSheetWithDetails(id)
                        .subscribe(function (sheet) {
                        _this.sheet = sheet;
                        _this.sheets[0] = _this.sheet;
                        _this.sheetRetrieved.next(_this.sheet);
                    }, function (error) { return _this.errorMessage = error; });
                };
                SheetDetailComponent.prototype.setSheet = function (inSheet) {
                    this.sheet = inSheet;
                    this.sheets = new Array();
                    this.sheets[0] = this.sheet;
                    console.log('inSheet --- ');
                    console.log(inSheet);
                    console.log('this.sheet --- ');
                    console.log(this.sheet);
                };
                SheetDetailComponent.prototype.getSheetDescription = function () {
                    var ret = '';
                    if (this.sheet) {
                        ret = this.sheet.description;
                    }
                    return ret;
                };
                SheetDetailComponent.prototype.onClickOverCompareButton = function () {
                    this._router.navigate(['SheetDashboard', { idOfFirstSheetToCompare: this.sheet.id }]);
                };
                SheetDetailComponent.prototype.onPrepareProposal = function () {
                    this.prepareProposal.next(this.sheet);
                };
                SheetDetailComponent.prototype.hasId = function () {
                    return this.sheet.id != null;
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], SheetDetailComponent.prototype, "sheetRetrieved", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], SheetDetailComponent.prototype, "prepareProposal", void 0);
                SheetDetailComponent = __decorate([
                    core_1.Component({
                        selector: 'sheet-detail',
                        providers: [],
                        templateUrl: '../templates/sheetDetail.html',
                        styleUrls: ['../styles/common.css', '../styles/sheetDetail.css'],
                        directives: [shortLongText_component_1.ShortLongTextComponent, sheetAssetComposition_component_1.SheetAssetCompositionComponent, sheetReturnData_component_1.SheetReturnData, sheetCompositionCharts_component_1.SheetCompositionCharts, sheetInfo_component_1.SheetInfoComponent],
                        inputs: ['sheet', 'editMode'],
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.RouteParams, sheetBackEnd_service_1.SheetBackEnd])
                ], SheetDetailComponent);
                return SheetDetailComponent;
            })();
            exports_1("SheetDetailComponent", SheetDetailComponent);
        }
    }
});
//# sourceMappingURL=sheetDetail.component.js.map