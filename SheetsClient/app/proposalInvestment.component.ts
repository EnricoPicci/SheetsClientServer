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
    public proposal: Proposal;
    
    onInvestmentChange(inInvestmentElement: ProposalInvestment, inInvestmentInput: any) {
        //inInvestmentElement.isHigherThanCapacity = false;
        let newAmount;
        if (inInvestmentInput.value == null || inInvestmentInput.value.trim().length == 0) {
            newAmount = 0;
        } else {
            newAmount = parseFloat(inInvestmentInput.value);
        }
        if (isNaN(newAmount)) {
            inInvestmentElement.isAmountNumberValid = false;
            //inInvestmentElement.amount = 0;
        } else {
            //inInvestmentElement.isHigherThanCapacity = true;
            inInvestmentElement.isAmountNumberValid = true;
            inInvestmentElement.amount = newAmount;
            this.proposal.updateInvestment();
            /*if (newAmount > inInvestmentElement.source.maxCapacity) {
                inInvestmentElement.isHigherThanCapacity = true;
                inInvestmentElement.isValid = false;
                inInvestmentElement.amount = newAmount;
            } else {
                inInvestmentElement.isValid = true;
                inInvestmentElement.amount = newAmount;
                this.proposal.updateInvestment();
            }*/
        }
    }
    
}