import{AssetAbstractJSON} from './assetAbstractJSON';
import{Asset} from '../app/asset';

export class AssetJSON extends AssetAbstractJSON {
    public symbol: string;
    
    fill(inAsset: Asset) {
        super.fill(inAsset);
        this.symbol = inAsset.symbol;
    }
    
    fillForProposal(inAsset: Asset) {
        super.fillForProposal(inAsset);
        this.symbol = inAsset.symbol;
    }
    
}