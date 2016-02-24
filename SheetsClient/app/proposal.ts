import {Sheet} from './sheet';
import {AssetGroup} from './assetGroup';
import {ProposalInvestment} from './proposalInvestment';

export class Proposal { 
    public id: number;
    //public sheetId: number;
    public sheet: Sheet;
    public assetGroups: Array<AssetGroup>;
    public customerId: string;
    public investmentElements = new Array<ProposalInvestment>();
    public comment: string;
    public isValid = false;
    
    constructor(inAssets: Array<AssetGroup>, inCustomerId: string, inSheet: Sheet
    ) { 
        this.assetGroups = inAssets;
        this.customerId = inCustomerId;
        this.sheet = inSheet;
    }
    
    getTotalInvestment() {
        let ret = 0;
        for (var i = 0; i < this.investmentElements.length; i++) {
            ret = ret + this.investmentElements[i].amount;
        }
        return ret;
    }
    
    getTotalInvestmentFormatted() {
        //return this.getTotalInvestment().toLocaleString('it-IT') + ' €';
        return (Math.round(this.getTotalInvestment()*100)/100).toLocaleString('it-IT');
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
        
    getCommentShortText() {
        let commentShortText = this.comment;
        let commentTextLength = this.comment.length;
        if (commentTextLength > 100) {
            commentShortText = this.comment.substring(0, 100) + '...';
        }
        return commentShortText;
    }
    
}