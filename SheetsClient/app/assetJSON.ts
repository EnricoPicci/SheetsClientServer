import{AssetAbstractJSON} from './assetAbstractJSON';
import{Asset} from './asset';

export class AssetJSON extends AssetAbstractJSON {
    public symbol: string;
    
    fill (inAsset: Asset) {
        super.fill(inAsset);
        this.symbol = inAsset.symbol;
    }
}