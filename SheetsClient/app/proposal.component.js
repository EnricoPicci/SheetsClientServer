System.register(['angular2/core', './proposal', './proposalInvestment', './proposalInvestmentSource', './proposalInvestment.component', './sheetAssetComposition.component', './sheetSummary.component', './userLogged', './sheetBackEnd.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, proposal_1, proposalInvestment_1, proposalInvestmentSource_1, proposalInvestment_component_1, sheetAssetComposition_component_1, sheetSummary_component_1, userLogged_1, sheetBackEnd_service_1;
    var ProposalComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (proposal_1_1) {
                proposal_1 = proposal_1_1;
            },
            function (proposalInvestment_1_1) {
                proposalInvestment_1 = proposalInvestment_1_1;
            },
            function (proposalInvestmentSource_1_1) {
                proposalInvestmentSource_1 = proposalInvestmentSource_1_1;
            },
            function (proposalInvestment_component_1_1) {
                proposalInvestment_component_1 = proposalInvestment_component_1_1;
            },
            function (sheetAssetComposition_component_1_1) {
                sheetAssetComposition_component_1 = sheetAssetComposition_component_1_1;
            },
            function (sheetSummary_component_1_1) {
                sheetSummary_component_1 = sheetSummary_component_1_1;
            },
            function (userLogged_1_1) {
                userLogged_1 = userLogged_1_1;
            },
            function (sheetBackEnd_service_1_1) {
                sheetBackEnd_service_1 = sheetBackEnd_service_1_1;
            }],
        execute: function() {
            ProposalComponent = (function () {
                function ProposalComponent(_userLogged, _backEnd) {
                    this._userLogged = _userLogged;
                    this._backEnd = _backEnd;
                }
                ProposalComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var assets = this.sheet.assetGroups;
                    if (assets.length < 1) {
                        console.error('No assets passed to build the proposal');
                    }
                    else {
                        this._backEnd.getAccountAndPortfolioCapacityForInvestment(this._userLogged.customerId)
                            .subscribe(function (investmentSources) {
                            _this.proposal = new proposal_1.Proposal(assets, _this._userLogged.customerId, _this.sheet.id);
                            for (var i = 0; i < investmentSources.length; i++) {
                                var investmentSourcesFromBackEnd = investmentSources[i];
                                var investmentSource = new proposalInvestmentSource_1.ProposalInvestmentSource(investmentSourcesFromBackEnd.type, investmentSourcesFromBackEnd.id, investmentSourcesFromBackEnd.maxCapacity);
                                var investment = new proposalInvestment_1.ProposalInvestment(investmentSource);
                                _this.proposal.investmentElements.push(investment);
                            }
                        }, function (error) { return _this.errorMessage = error; });
                    }
                };
                ProposalComponent.prototype.onSaveProposal = function () {
                    var _this = this;
                    this.resetMessages();
                    this._backEnd.saveProposal(this.proposal)
                        .subscribe(function (backEndResponse) { return _this.proposalMessage = 'Proposal no: ' + backEndResponse.id + ' saved'; }, function (error) { return _this.errorMessage = error; });
                };
                ProposalComponent.prototype.onSendProposal = function () {
                    var _this = this;
                    this.resetMessages();
                    this._backEnd.sendProposal(this.proposal)
                        .subscribe(function (backEndResponse) { return _this.proposalMessage = 'Proposal no: ' + backEndResponse.id + ' sent'; }, function (error) { return _this.errorMessage = error; });
                };
                ProposalComponent.prototype.resetMessages = function () {
                    this.proposalMessage = null;
                    this.errorMessage = null;
                };
                ProposalComponent = __decorate([
                    core_1.Component({
                        selector: 'proposalCmp',
                        providers: [],
                        templateUrl: '../templates/proposal.html',
                        styleUrls: ['../styles/common.css', '../styles/proposal.css'],
                        directives: [sheetAssetComposition_component_1.SheetAssetCompositionComponent, proposalInvestment_component_1.ProposalInvestmentComponent, sheetSummary_component_1.SheetSummaryComponent],
                        inputs: ['sheet'],
                    }), 
                    __metadata('design:paramtypes', [userLogged_1.UserLogged, sheetBackEnd_service_1.SheetBackEnd])
                ], ProposalComponent);
                return ProposalComponent;
            })();
            exports_1("ProposalComponent", ProposalComponent);
        }
    }
});
//# sourceMappingURL=proposal.component.js.map