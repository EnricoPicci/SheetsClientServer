System.register(['angular2/core', 'angular2/router', './sheetBackEnd.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, sheetBackEnd_service_1;
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
            }],
        execute: function() {
            SheetSummaryComponent = (function () {
                function SheetSummaryComponent(_router, _routeParams, _sheetBackEnd) {
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this._sheetBackEnd = _sheetBackEnd;
                    this.selectionCriteriaChanged = new core_1.EventEmitter();
                }
                SheetSummaryComponent.prototype.ngOnInit = function () {
                    var id = +this._routeParams.get('id');
                    console.log(id);
                    // only if the routeParameter is not null we go to the service
                    // this is because if the routeParameter is not null, it means we have been called via routing (or url on the browser)
                    // if id is null it means we have been called within the single-page (and we hope we have been passed the full Sheet instance)
                    if (id) {
                        this.sheet = this._sheetBackEnd.getSomeSheets(id, 1)[0];
                        console.log(this.sheet);
                    }
                };
                /*onMouseDown() {
                    console.log(this.sheet);
                    this._router.navigate( ['SheetDetail', { id: this.sheet.id }]  );
                }*/
                SheetSummaryComponent.prototype.onChangeSelection = function (inSelected) {
                    console.log('selected? ' + inSelected + '  id: ' + this.sheet.id);
                    this.sheet.isSelectedForComparison = inSelected;
                    this.selectionCriteriaChanged.next(this.sheet);
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
                        inputs: ['sheet', 'sheetId'],
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