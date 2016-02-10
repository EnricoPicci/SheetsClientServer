import {ProposalInvestmentSource} from './proposalInvestmentSource';

export class ProposalInvestment { 
    public source: ProposalInvestmentSource;
    public amount = 0;
    
    constructor(inSource: ProposalInvestmentSource) {
        this.source = inSource;
    }
}