import{Proposal} from '../app/proposal';
import{AssetGroupJSON} from './assetGroupJSON';

export class ProposalJSON { 
    public id: number;
    public sheetId: number;
    public customerId: string;
    public assetGroupJSONs: AssetGroupJSON[] = new Array<AssetGroupJSON>();
    
    fill(inProposal: Proposal) {
        this.id = +inProposal.id;
        this.sheetId = inProposal.sheetId;
        this.customerId = inProposal.customerId;
        
        for (var i = 0; i < inProposal.assetGroups.length; i++) {
            let assetGroupJSON = new AssetGroupJSON();
            assetGroupJSON.fillForProposal(inProposal.assetGroups[i]);
            this.assetGroupJSONs.push(assetGroupJSON);
        }
    }
}