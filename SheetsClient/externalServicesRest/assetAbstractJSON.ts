import{AssetAbstract} from '../app/assetAbstract';

export abstract class AssetAbstractJSON {
    public name: string;
    public weight: number;
    public oneMonthRet: string;
    public oneYearRet: string;
    public minWeight: number;
    public maxWeight: number;
    
    public investmentAmount: number;
        
    fill (inAssetAbstract: AssetAbstract) {
        this.name = inAssetAbstract.name;
        this.weight = inAssetAbstract.weight;
        this.oneMonthRet = inAssetAbstract.oneMonthRet;
        this.oneYearRet = inAssetAbstract.oneYearRet;
        this.minWeight = inAssetAbstract.minWeight;
        this.maxWeight = inAssetAbstract.maxWeight;
    }
    
    fillForProposal(inAssetAbstract: AssetAbstract) {
        this.name = inAssetAbstract.name;
        this.weight = inAssetAbstract.weight;
        this.investmentAmount = inAssetAbstract.investmentAmount;
    }
    
}