import {Component} from 'angular2/core';
//import {Router, RouteParams} from 'angular2/router';

import {ProposalInvestment} from './proposalInvestment';
import {Proposal} from './proposal';

@Component({
    selector: 'proposalInvestmentCmp',
	providers: [],
    templateUrl: '../templates/proposalInvestment.html',
	styleUrls: ['../styles/common.css', '../styles/proposal.css'],
    directives: [],
	inputs: ['proposal'],
})
export class ProposalInvestmentComponent { 
    //public investmentElements: Array<ProposalInvestment>;
    public proposal: Proposal;
    
    onInvestmentChange(inInvestmentElement: ProposalInvestment, inInvestmentInput: any) {
        if (isNaN(inInvestmentInput.value)) {
            inInvestmentElement.isValid = false;
        } else {
            inInvestmentElement.isValid = true;
            inInvestmentElement.amount = parseFloat(inInvestmentInput.value);
            this.proposal.updateInvestment();            
        }
    }
}