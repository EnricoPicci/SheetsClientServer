import{Proposal} from '../app/proposal';
import {ProposalInvestmentJSON} from './proposalInvestmentJSON';
import{AssetGroupJSON} from './assetGroupJSON';

export class ProposalJSON { 
    public id: number;
    public sheetId: number;
    public customerId: string;
    public title: string;
    public personalized: boolean;
    public originalSheetID: string;
    public imageUrl: string;
    public totalInvestmentAmount: number;
    public assetGroupJSONs: AssetGroupJSON[] = new Array<AssetGroupJSON>();
    public proposalInvestmentJSONs: ProposalInvestmentJSON[] = new Array<ProposalInvestmentJSON>();
    public comment: string;
    
    fill(inProposal: Proposal) {
        this.id = +inProposal.id;
        this.sheetId = inProposal.sheet.id;
        this.customerId = inProposal.customerId;
        this.title = inProposal.sheet.title;
        this.personalized = inProposal.sheet.isPersonalized();
        this.imageUrl = inProposal.sheet.imageUrl;
        this.originalSheetID = inProposal.sheet.originalSheetID;
        this.totalInvestmentAmount = inProposal.getTotalInvestment();
        this.comment = inProposal.comment;
        
        for (var i = 0; i < inProposal.assetGroups.length; i++) {
            let assetGroupJSON = new AssetGroupJSON();
            assetGroupJSON.fillForProposal(inProposal.assetGroups[i]);
            this.assetGroupJSONs.push(assetGroupJSON);
        }
        
        for (var i = 0; i < inProposal.investmentElements.length; i++) {
            let proposalInvestmentJSON = new ProposalInvestmentJSON();
            proposalInvestmentJSON.fill(inProposal.investmentElements[i]);
            this.proposalInvestmentJSONs.push(proposalInvestmentJSON);
        }
    }
    
    fillForBuyOrder(inProposal: Proposal) {
        this.id = +inProposal.id;
        this.sheetId = inProposal.sheet.id;
        this.customerId = inProposal.customerId;
        this.totalInvestmentAmount = inProposal.getTotalInvestment();
        
        for (var i = 0; i < inProposal.assetGroups.length; i++) {
            let assetGroupJSON = new AssetGroupJSON();
            assetGroupJSON.fillForBuyOrder(inProposal.assetGroups[i]);
            this.assetGroupJSONs.push(assetGroupJSON);
        }
        
        for (var i = 0; i < inProposal.investmentElements.length; i++) {
            let proposalInvestmentJSON = new ProposalInvestmentJSON();
            proposalInvestmentJSON.fill(inProposal.investmentElements[i]);
            this.proposalInvestmentJSONs.push(proposalInvestmentJSON);
        }
    }
    
}