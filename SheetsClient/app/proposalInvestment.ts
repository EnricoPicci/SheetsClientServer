import {ProposalInvestmentSource} from './proposalInvestmentSource';

export class ProposalInvestment { 
    public source: ProposalInvestmentSource;
    public amount = 0;
    
    public isAmountNumberValid = true;
    
    constructor(inSource: ProposalInvestmentSource) {
        this.source = inSource;
    }
    
    getAmountFormatted() {
        let formattedString = '';
        if (this.amount != 0) {
            formattedString = this.amount.toLocaleString('it-IT');
        }
        return formattedString;
    }
    
    getErrorMessage() {
        let message = 'Error. Amount not valid.';
        if (!this.isAmountNumberValid) {
            message = 'Amount not valid';
        } else if (this.isHigherThanCapacity()) {
            message = 'Amount higher than capacity';
        }
        return message;
    }
    
    isHigherThanCapacity() {
        return this.amount > this.source.maxCapacity;
    }
    
    isValid() {
        return this.isAmountNumberValid && !this.isHigherThanCapacity();
    }
    
}