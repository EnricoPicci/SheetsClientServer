System.register(['angular2/core', 'angular2/router', './sheetBackEnd.service', './sheetSummary.component', './proposal.component', '../utilities/httpErrorManager.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, sheetBackEnd_service_1, sheetSummary_component_1, proposal_component_1, httpErrorManager_component_1;
    var ProposalCollectionComponent;
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
            function (sheetSummary_component_1_1) {
                sheetSummary_component_1 = sheetSummary_component_1_1;
            },
            function (proposal_component_1_1) {
                proposal_component_1 = proposal_component_1_1;
            },
            function (httpErrorManager_component_1_1) {
                httpErrorManager_component_1 = httpErrorManager_component_1_1;
            }],
        execute: function() {
            ProposalCollectionComponent = (function () {
                //public errorMessage: string;
                function ProposalCollectionComponent(_router, _routeParams, _backEnd) {
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this._backEnd = _backEnd;
                }
                ProposalCollectionComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var customerId = this._routeParams.get('customerId');
                    this._backEnd.getProposalsForCustomer(customerId)
                        .subscribe(function (proposals) { return _this.proposals = proposals; }, function (error) { return _this.httpErrorResponse = error; });
                };
                ProposalCollectionComponent.prototype.onProposalSelected = function (inProposal) {
                    this.currentProposal = inProposal;
                };
                ProposalCollectionComponent = __decorate([
                    core_1.Component({
                        selector: 'proposalCollectionCmp',
                        providers: [],
                        templateUrl: '../templates/proposalCollection.html',
                        styleUrls: ['../styles/common.css', '../styles/proposalCollection.css'],
                        directives: [sheetSummary_component_1.SheetSummaryComponent, proposal_component_1.ProposalComponent, httpErrorManager_component_1.HttpErrorManagerComponent],
                        inputs: ['sheet'],
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.RouteParams, sheetBackEnd_service_1.SheetBackEnd])
                ], ProposalCollectionComponent);
                return ProposalCollectionComponent;
            })();
            exports_1("ProposalCollectionComponent", ProposalCollectionComponent);
        }
    }
});
//# sourceMappingURL=proposalCollection.component.js.map