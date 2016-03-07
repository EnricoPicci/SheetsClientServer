import {Component, ViewChild, Input} from 'angular2/core';
import {RouteParams} from 'angular2/router';

import {Sheet} from './sheet';
import {Proposal} from './proposal';
import {ProposalInvestment} from './proposalInvestment';
import {ProposalInvestmentSource} from './proposalInvestmentSource';
import {ProposalInvestmentComponent} from './proposalInvestment.component';
import {SheetAssetCompositionComponent} from './sheetAssetComposition.component';
import {SheetSummaryComponent} from './sheetSummary.component';
import {UserLogged} from './userLogged';
import {SheetBackEnd} from './sheetBackEnd.service';

import {HttpErrorManagerComponent} from '../utilities/httpErrorManager.component';

@Component({
    selector: 'proposalCmp',
	providers: [],
    templateUrl: '../templates/proposal.html',
	styleUrls: ['../styles/common.css', '../styles/proposal.css'],
    directives: [SheetAssetCompositionComponent, ProposalInvestmentComponent, SheetSummaryComponent, HttpErrorManagerComponent],
	//inputs: ['sheet', 'proposal'],
})
export class ProposalComponent { 
    @ViewChild('buyMessage') buyMessageElementRef;
    @ViewChild('commentTextEl') commentTextElementRef;
    @ViewChild('title') titleElementRef;
    
    @Input('proposal') set setProposal(inProposal: Proposal) {
        //this.proposal = inProposal;
        this.getProposalFromId(inProposal.id);
    }
    
    @Input('sheet') set setSheet(inSheet: Sheet) {
        this.sheet = inSheet;
        this.createProposalFromSheet(inSheet);
    }
    
    public proposal: Proposal;
    public sheet: Sheet;
    
    public httpErrorResponse: string;
    public errorMessage: string;
    public proposalMessage: string;
    public errorMessageComment: string;
    
    public buyOrderSent = false;
    public buyMessageForTheBackEnd: string;
    
    public showSaveButton = true;
    
    constructor(
        private _userLogged: UserLogged,
        private _backEnd: SheetBackEnd,
        private _routeParams: RouteParams
    ) { }
    
    ngOnInit() {
        this.resetMessages();
        let proposalId = +this._routeParams.get('proposalId');
        // only if the routeParameter is not null we go to the service
        // this is because if the routeParameter is not null, it means we have been called via routing (or url on the browser)
        // if id is null it means we have been called within the single-page (and we hope we have been passed a full Sheet or Proposal 
        // instance)
        if (proposalId) {
            // the page is entered directly from the mail sent to the customer; since I set the pbId as default,
            // I need to clear it here in order to enable the BUY button
            this._userLogged.pbId = null;
            this.getProposalFromId(proposalId);
        } 
        // if the input passed is a proposal, then we need to create a FULL proposal starting from its Id
        /*else if (this.proposal) {
            this.getProposalFromId(this.proposal.id);
        }
        // if the input passed is sheet, then we need to create an empty proposal starting from the sheet passed
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
                    error => this.httpErrorResponse = <any>error
                );
        } */
    }
    
    private getProposalFromId(inProposalId) {
        this._backEnd.getProposal(inProposalId)
            .subscribe(
                proposal => {
                    this.proposal = proposal;
                    this.sheet = proposal.sheet;
                    this._backEnd.getAccountAndPortfolioCapacityForInvestment(this._userLogged.customerId)
                        .subscribe(
                            investmentSources => {
                                for (var i = 0; i < investmentSources.length; i++) {
                                    let investmentSourcesFromBackEnd = investmentSources[i];
                                    let investmentSource = new ProposalInvestmentSource(
                                                                    investmentSourcesFromBackEnd.type,
                                                                    investmentSourcesFromBackEnd.id,
                                                                    investmentSourcesFromBackEnd.maxCapacity);
                                    let investment = this.proposal.investmentElements[i];
                                    investment.source = investmentSource;
                                }
                                this.titleElementRef.nativeElement.scrollIntoView();
                            },
                            error => this.httpErrorResponse = <any>error
                        );
                },
                error => this.httpErrorResponse = <any>error
            );
    }
    
    private createProposalFromSheet(inSheet: Sheet) {
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
                error => this.httpErrorResponse = <any>error
            );
    }
    
    onSaveProposal() {
        this.resetMessages();
        // first of all clean the situation for all assets in the proposal
        this.resetAssetValidation();
        if (!this.isCommentFilled()) {
            this.errorMessageComment = 'Add a comment for this proposal';
            var element = this.commentTextElementRef.nativeElement;
            setTimeout(function() {
             element.focus();
            }, 0);
        } else {
            this.showSaveButton = false;
            this._backEnd.validateAndSaveProposal(this.proposal, this._userLogged)
                .subscribe(
                    backEndResponse => {
                        //this.showSaveButton = false;
                        if (backEndResponse.result == 'OK') {
                            this.proposalMessage = 'Proposal no: ' + backEndResponse.id + ' saved';
                            if (this._userLogged.mail != null && this._userLogged.mail.trim().length > 0) {
                                this.proposalMessage = this.proposalMessage + '. An email has been sent to ' + this._userLogged.mail + '.';
                            }
                        } else {
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
                            this.showSaveButton = true;
                            this.errorMessage = 'Invalid. Reduce investment indicated below';
                        }
                    },
                    error => {
                        this.showSaveButton = true;
                        this.httpErrorResponse = <any>error
                    }
                );
        }
    }
        
    onSendProposal() {
        this.resetMessages();
        this._backEnd.sendProposal(this.proposal, this._userLogged)
            .subscribe(
                backEndResponse => this.proposalMessage = 'Proposal no: ' + backEndResponse.id + ' sent',
                error => this.httpErrorResponse = <any>error
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
    
    isCommentFilled() {
        return this.proposal.comment != null && this.proposal.comment.trim().length > 0;
    }
    
    resetAssetValidation() {
        for (var j = 0; j < this.proposal.assetGroups.length; j++) {
            let assetGroup = this.proposal.assetGroups[j];
            for (var k = 0; k < assetGroup.assets.length; k++) {
                assetGroup.assets[k].isValidated = true;
            }
        }        
    }
    
    private resetMessages() {
        this.httpErrorResponse = null;
        this.proposalMessage = null;
        this.errorMessage = null;
        this.errorMessageComment = null;
    }
    
}