import {Component, ViewChild} from 'angular2/core';
//import {Router, RouteParams} from 'angular2/router';

import {Sheet} from './sheet';
import {Proposal} from './proposal';
import {ProposalInvestment} from './proposalInvestment';
import {ProposalInvestmentSource} from './proposalInvestmentSource';
import {ProposalInvestmentComponent} from './proposalInvestment.component';
import {SheetAssetCompositionComponent} from './sheetAssetComposition.component';
import {SheetSummaryComponent} from './sheetSummary.component';
import {UserLogged} from './userLogged';
import {SheetBackEnd} from './sheetBackEnd.service';

@Component({
    selector: 'proposalCmp',
	providers: [],
    templateUrl: '../templates/proposal.html',
	styleUrls: ['../styles/common.css', '../styles/proposal.css'],
    directives: [SheetAssetCompositionComponent, ProposalInvestmentComponent, SheetSummaryComponent],
	inputs: ['sheet', 'proposal'],
})
export class ProposalComponent { 
    @ViewChild('buyMessage') buyMessageElementRef;
    
    public proposal: Proposal;
    public sheet: Sheet;
    
    public errorMessage: string;
    public proposalMessage: string;
    
    public buyOrderSent = false;
    public buyMessageForTheBackEnd: string;
    
    constructor(
        private _userLogged: UserLogged,
        private _backEnd: SheetBackEnd
    ) { }
    
    ngOnInit() {
        // if the input passed is sheet, then we need to create a proposal starting from the sheet passed
        if (this.sheet) {
            let assets = this.sheet.assetGroups;
            this._backEnd.getAccountAndPortfolioCapacityForInvestment(this._userLogged.customerId)
                .subscribe(
                    investmentSources => {
                        this.proposal = new Proposal(assets, this._userLogged.customerId, this.sheet);
                        for (var i = 0; i < investmentSources.length; i++) {
                            let investmentSourcesFromBackEnd = investmentSources[i];
                            let investmentSource = new ProposalInvestmentSource(
                                                            investmentSourcesFromBackEnd.type,
                                                            investmentSourcesFromBackEnd.id,
                                                            investmentSourcesFromBackEnd.maxCapacity);
                            let investment = new ProposalInvestment(investmentSource);
                            this.proposal.investmentElements.push(investment);
                        }
                    },
                    error => this.errorMessage = <any>error
                );
        } 
        // if we enter the else, it means that sheet has not been passed as input and therefore we
        // expect to have a proposal as input; in this case we do not need to create the proposal
        // but only to feed the maxCapacity information to each investmentSource (we assume the maxCapacity
        // info has to be collected fresh any time the component is created since it can vary over time)
        else {
            if (!this.proposal) {
                console.error('either sheet or proposal has to be passed as input');
            } else {
                this._backEnd.getAccountAndPortfolioCapacityForInvestment(this._userLogged.customerId)
                    .subscribe(
                        investmentSources => {
                            for (var i = 0; i < investmentSources.length; i++) {
                                let investmentSourcesFromBackEnd = investmentSources[i];
                                this.proposal.investmentElements[i].source.maxCapacity = investmentSourcesFromBackEnd.maxCapacity;
                            }
                            // the sheet property is set so that we can use components originally designed for sheets also with 
                            // proposals (e.g. SheetAssetCompositionComponent)
                            this.sheet = this.proposal.sheet;
                        },
                        error => this.errorMessage = <any>error
                    );
            }
        }
    }
    
    onSaveProposal() {
        this.resetMessages();
        this._backEnd.validateAndSaveProposal(this.proposal)
            .subscribe(
                backEndResponse => {
                    if (backEndResponse.result == 'OK') {
                        this.proposalMessage = 'Proposal no: ' + backEndResponse.id + ' saved';
                    } else {
                        // first of all clean the situation for all assets in the proposal
                        for (var j = 0; j < this.proposal.assetGroups.length; j++) {
                            let assetGroup = this.proposal.assetGroups[j];
                            for (var k = 0; k < assetGroup.assets.length; k++) {
                                assetGroup.assets[k].isValidated = true;
                            }
                        }
                        // all assets are valid at the beginning of the loop that defines
                        // which ones are not valid
                        for (var i = 0; i < backEndResponse.validationResults.length; i++) {
                            let invalidAssetSymbol = backEndResponse.validationResults[i].symbol;
                            for (var j = 0; j < this.proposal.assetGroups.length; j++) {
                                let assetGroup = this.proposal.assetGroups[j];
                                for (var k = 0; k < assetGroup.assets.length; k++) {
                                    let asset = assetGroup.assets[k];
                                    if (asset.symbol == invalidAssetSymbol) {
                                        asset.isValidated = false;
                                    }
                                }
                            }
                        }
                        this.errorMessage = 'Proposta non valida. Ridurre gli investimenti segnalati sotto';
                    }
                },
                error => this.errorMessage = <any>error
            );
    }
    
        
    onSendProposal() {
        this.resetMessages();
        this._backEnd.sendProposal(this.proposal)
            .subscribe(
                backEndResponse => this.proposalMessage = 'Proposal no: ' + backEndResponse.id + ' sent',
                error => this.errorMessage = <any>error
            );
    }
    
    onBuyProposal() {
        this.buyMessageForTheBackEnd = this._backEnd.buildBuyMessageForTheBackEnd(this.proposal);
        this.buyOrderSent = true;
        var element = this.buyMessageElementRef.nativeElement;
        setTimeout(function() {
             element.focus();
             element.setSelectionRange(0,0);
             element.scrollTop = 0;
             element.disabled = "true";
            }, 0);
    }
    
    private resetMessages() {
        this.proposalMessage = null;
        this.errorMessage = null;
    }
    
}