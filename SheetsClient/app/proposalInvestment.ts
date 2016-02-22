import {ProposalInvestmentSource} from './proposalInvestmentSource';

export class ProposalInvestment { 
    public source: ProposalInvestmentSource;
    public amount = 0;
    
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
}