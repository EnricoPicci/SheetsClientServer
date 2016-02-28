System.register(['angular2/core', 'angular2/router', './sheetBackEnd.service', './sheetDetail.component', './proposal.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, sheetBackEnd_service_1, sheetDetail_component_1, proposal_component_1;
    var SheetOrProposalDetailComponent;
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
            function (sheetDetail_component_1_1) {
                sheetDetail_component_1 = sheetDetail_component_1_1;
            },
            function (proposal_component_1_1) {
                proposal_component_1 = proposal_component_1_1;
            }],
        execute: function() {
            SheetOrProposalDetailComponent = (function () {
                function SheetOrProposalDetailComponent(_router, _routeParams, _backEnd) {
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this._backEnd = _backEnd;
                    this.showProposal = false;
                }
                /*ngOnInit() {
                    let id = +this._routeParams.get('id');
                    this._backEnd.getSheetWithDetails(id)
                        .subscribe(
                            sheet => this.sheet = sheet,
                            error => this.errorMessage = <any>error
                        );
                }*/
                SheetOrProposalDetailComponent.prototype.sheetRetrieved = function (inSheet) {
                    this.sheet = inSheet;
                };
                SheetOrProposalDetailComponent.prototype.switchToProposal = function () {
                    this.showProposal = true;
                };
                SheetOrProposalDetailComponent = __decorate([
                    core_1.Component({
                        selector: 'sheet-detail',
                        providers: [],
                        templateUrl: '../templates/sheetOrProposalDetail.html',
                        styleUrls: [],
                        directives: [sheetDetail_component_1.SheetDetailComponent, proposal_component_1.ProposalComponent],
                        inputs: [],
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.RouteParams, sheetBackEnd_service_1.SheetBackEnd])
                ], SheetOrProposalDetailComponent);
                return SheetOrProposalDetailComponent;
            }());
            exports_1("SheetOrProposalDetailComponent", SheetOrProposalDetailComponent);
        }
    }
});
//# sourceMappingURL=sheetOrProposalDetail.component.js.map