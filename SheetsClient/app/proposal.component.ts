import {Component} from 'angular2/core';
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
	inputs: ['sheet'],
})
export class ProposalComponent { 
    public proposal: Proposal;
    public sheet: Sheet;
    
    public errorMessage: string;
    public proposalMessage: string;
    
    constructor(
        private _userLogged: UserLogged,
        private _backEnd: SheetBackEnd
    ) { }
    
    ngOnInit() {
        let assets = this.sheet.assetGroups;
        if (assets.length < 1) {
            console.error('No assets passed to build the proposal');
        } else {
            this._backEnd.getAccountAndPortfolioCapacityForInvestment(this._userLogged.customerId)
                .subscribe(
                    investmentSources => {
                        this.proposal = new Proposal(assets, this._userLogged.customerId, this.sheet.id);
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
    }
    
    onSaveProposal() {
        this.resetMessages();
        this._backEnd.saveProposal(this.proposal)
            .subscribe(
                backEndResponse => this.proposalMessage = 'Proposal no: ' + backEndResponse.id + ' saved',
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
    
    private resetMessages() {
        this.proposalMessage = null;
        this.errorMessage = null;
    }
    
}