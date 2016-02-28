System.register(['angular2/core', './proposal', './proposalInvestment', './proposalInvestmentSource', './proposalInvestment.component', './sheetAssetComposition.component', './sheetSummary.component', './userLogged', './sheetBackEnd.service', '../utilities/httpErrorManager.component'], function(exports_1, context_1) {
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
    var core_1, proposal_1, proposalInvestment_1, proposalInvestmentSource_1, proposalInvestment_component_1, sheetAssetComposition_component_1, sheetSummary_component_1, userLogged_1, sheetBackEnd_service_1, httpErrorManager_component_1;
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
            },
            function (httpErrorManager_component_1_1) {
                httpErrorManager_component_1 = httpErrorManager_component_1_1;
            }],
        execute: function() {
            ProposalComponent = (function () {
                function ProposalComponent(_userLogged, _backEnd) {
                    this._userLogged = _userLogged;
                    this._backEnd = _backEnd;
                    this.buyOrderSent = false;
                }
                ProposalComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.resetMessages();
                    // if the input passed is sheet, then we need to create a proposal starting from the sheet passed
                    if (this.sheet) {
                        var assets_1 = this.sheet.assetGroups;
                        this._backEnd.getAccountAndPortfolioCapacityForInvestment(this._userLogged.customerId)
                            .subscribe(function (investmentSources) {
                            _this.proposal = new proposal_1.Proposal(assets_1, _this._userLogged.customerId, _this.sheet);
                            for (var i = 0; i < investmentSources.length; i++) {
                                var investmentSourcesFromBackEnd = investmentSources[i];
                                var investmentSource = new proposalInvestmentSource_1.ProposalInvestmentSource(investmentSourcesFromBackEnd.type, investmentSourcesFromBackEnd.id, investmentSourcesFromBackEnd.maxCapacity);
                                var investment = new proposalInvestment_1.ProposalInvestment(investmentSource);
                                _this.proposal.investmentElements.push(investment);
                            }
                        }, function (error) { return _this.httpErrorResponse = error; });
                    }
                    else {
                        if (!this.proposal) {
                            console.error('either sheet or proposal has to be passed as input');
                        }
                        else {
                            this._backEnd.getAccountAndPortfolioCapacityForInvestment(this._userLogged.customerId)
                                .subscribe(function (investmentSources) {
                                for (var i = 0; i < investmentSources.length; i++) {
                                    var investmentSourcesFromBackEnd = investmentSources[i];
                                    _this.proposal.investmentElements[i].source.maxCapacity = investmentSourcesFromBackEnd.maxCapacity;
                                }
                                // the sheet property is set so that we can use components originally designed for sheets also with 
                                // proposals (e.g. SheetAssetCompositionComponent)
                                _this.sheet = _this.proposal.sheet;
                            }, function (error) { return _this.httpErrorResponse = error; });
                        }
                    }
                };
                ProposalComponent.prototype.onSaveProposal = function () {
                    var _this = this;
                    this.resetMessages();
                    // first of all clean the situation for all assets in the proposal
                    this.resetAssetValidation();
                    if (!this.isCommentFilled()) {
                        this.errorMessageComment = 'Add a comment for this proposal';
                        var element = this.commentTextElementRef.nativeElement;
                        setTimeout(function () {
                            element.focus();
                        }, 0);
                    }
                    else {
                        this._backEnd.validateAndSaveProposal(this.proposal)
                            .subscribe(function (backEndResponse) {
                            if (backEndResponse.result == 'OK') {
                                _this.proposalMessage = 'Proposal no: ' + backEndResponse.id + ' saved';
                            }
                            else {
                                /*// first of all clean the situation for all assets in the proposal
                                for (var j = 0; j < this.proposal.assetGroups.length; j++) {
                                    let assetGroup = this.proposal.assetGroups[j];
                                    for (var k = 0; k < assetGroup.assets.length; k++) {
                                        assetGroup.assets[k].isValidated = true;
                                    }
                                }*/
                                // all assets are valid at the beginning of the loop that defines
                                // which ones are not valid
                                for (var i = 0; i < backEndResponse.validationResults.length; i++) {
                                    var invalidAssetSymbol = backEndResponse.validationResults[i].symbol;
                                    for (var j = 0; j < _this.proposal.assetGroups.length; j++) {
                                        var assetGroup = _this.proposal.assetGroups[j];
                                        for (var k = 0; k < assetGroup.assets.length; k++) {
                                            var asset = assetGroup.assets[k];
                                            if (asset.symbol == invalidAssetSymbol) {
                                                asset.isValidated = false;
                                            }
                                        }
                                    }
                                }
                                _this.errorMessage = 'Invalid. Reduce investment indicated below';
                            }
                        }, function (error) { return _this.httpErrorResponse = error; });
                    }
                };
                ProposalComponent.prototype.onSendProposal = function () {
                    var _this = this;
                    this.resetMessages();
                    this._backEnd.sendProposal(this.proposal)
                        .subscribe(function (backEndResponse) { return _this.proposalMessage = 'Proposal no: ' + backEndResponse.id + ' sent'; }, function (error) { return _this.httpErrorResponse = error; });
                };
                ProposalComponent.prototype.onBuyProposal = function () {
                    this.buyMessageForTheBackEnd = this._backEnd.buildBuyMessageForTheBackEnd(this.proposal);
                    this.buyOrderSent = true;
                    var element = this.buyMessageElementRef.nativeElement;
                    setTimeout(function () {
                        element.focus();
                        element.setSelectionRange(0, 0);
                        element.scrollTop = 0;
                        element.disabled = "true";
                    }, 0);
                };
                ProposalComponent.prototype.isCommentFilled = function () {
                    return this.proposal.comment != null && this.proposal.comment.trim().length > 0;
                };
                ProposalComponent.prototype.resetAssetValidation = function () {
                    for (var j = 0; j < this.proposal.assetGroups.length; j++) {
                        var assetGroup = this.proposal.assetGroups[j];
                        for (var k = 0; k < assetGroup.assets.length; k++) {
                            assetGroup.assets[k].isValidated = true;
                        }
                    }
                };
                ProposalComponent.prototype.resetMessages = function () {
                    this.httpErrorResponse = null;
                    this.proposalMessage = null;
                    this.errorMessage = null;
                    this.errorMessageComment = null;
                };
                __decorate([
                    core_1.ViewChild('buyMessage'), 
                    __metadata('design:type', Object)
                ], ProposalComponent.prototype, "buyMessageElementRef", void 0);
                __decorate([
                    core_1.ViewChild('commentTextEl'), 
                    __metadata('design:type', Object)
                ], ProposalComponent.prototype, "commentTextElementRef", void 0);
                ProposalComponent = __decorate([
                    core_1.Component({
                        selector: 'proposalCmp',
                        providers: [],
                        templateUrl: '../templates/proposal.html',
                        styleUrls: ['../styles/common.css', '../styles/proposal.css'],
                        directives: [sheetAssetComposition_component_1.SheetAssetCompositionComponent, proposalInvestment_component_1.ProposalInvestmentComponent, sheetSummary_component_1.SheetSummaryComponent, httpErrorManager_component_1.HttpErrorManagerComponent],
                        inputs: ['sheet', 'proposal'],
                    }), 
                    __metadata('design:paramtypes', [userLogged_1.UserLogged, sheetBackEnd_service_1.SheetBackEnd])
                ], ProposalComponent);
                return ProposalComponent;
            }());
            exports_1("ProposalComponent", ProposalComponent);
        }
    }
});
//# sourceMappingURL=proposal.component.js.map