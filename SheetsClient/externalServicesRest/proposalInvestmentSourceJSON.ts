import{ProposalInvestmentSource} from '../app/proposalInvestmentSource';

export class ProposalInvestmentSourceJSON { 
    public type: string;
    public id: string;
    
    fill(inProposalInvestmentSource: ProposalInvestmentSource) {
        this.type = inProposalInvestmentSource.type;
        this.id = inProposalInvestmentSource.id;
    }
  
}