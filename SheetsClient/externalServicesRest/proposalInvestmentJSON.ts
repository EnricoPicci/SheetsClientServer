import{ProposalInvestment} from '../app/proposalInvestment';
import {ProposalInvestmentSourceJSON} from './proposalInvestmentSourceJSON';
//import{AssetGroupJSON} from './assetGroupJSON';

export class ProposalInvestmentJSON {
    public source: ProposalInvestmentSourceJSON;
    public amount: number;
    
    fill(inProposalInvestment: ProposalInvestment) {
        this.amount = inProposalInvestment.amount;
        let proposalInvestmentSourceJSON = new ProposalInvestmentSourceJSON();
        this.source = proposalInvestmentSourceJSON;
        proposalInvestmentSourceJSON.fill(inProposalInvestment.source);
    }
}