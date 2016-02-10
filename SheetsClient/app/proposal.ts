import {AssetGroup} from './assetGroup';
import {ProposalInvestment} from './proposalInvestment';

export class Proposal { 
    public id: number;
    public sheetId: number;
    public assetGroups: Array<AssetGroup>;
    public customerId: string;
    public investmentElements = new Array<ProposalInvestment>();
    
    constructor(inAssets: Array<AssetGroup>, inCustomerId: string, inSheetId: number
    ) { 
        this.assetGroups = inAssets;
        this.customerId = inCustomerId;
        this.sheetId = inSheetId;
    }
    
    getTotalInvestment() {
        let ret = 0;
        for (var i = 0; i < this.investmentElements.length; i++) {
            ret = ret + this.investmentElements[i].amount;
        }
        return ret;
    }
    
    updateInvestment() {
        let totalInvestment = this.getTotalInvestment();
        this.splitInvestmentOnAssets(totalInvestment);
    }
    
    splitInvestmentOnAssets(inInvestment: number) {
        for (var i = 0; i < this.assetGroups.length; i++) {
            let assetGroup = this.assetGroups[i];
            let assetGroupWeight = assetGroup.weight/100;
            assetGroup.investmentAmount = inInvestment*assetGroupWeight;
            for (var j = 0; j < assetGroup.assets.length; j++) {
                let asset = assetGroup.assets[j];
                let assetWeight = asset.weight/100;
                asset.investmentAmount = inInvestment*assetWeight;
            }
        }
    }
    
}