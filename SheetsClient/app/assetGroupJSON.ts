import{AssetAbstractJSON} from './assetAbstractJSON';
import{AssetJSON} from './assetJSON';
import{AssetGroup} from './assetGroup';

export class AssetGroupJSON extends AssetAbstractJSON {
    public assetJSONs: AssetJSON[] = new Array<AssetJSON>();
    
    fill (inAssetGroup: AssetGroup) {
        super.fill(inAssetGroup);
        for (var i = 0; i < inAssetGroup.assets.length; i++) {
            let assetJSON = new AssetJSON();
            assetJSON.fill(inAssetGroup.assets[i]);
            this.assetJSONs.push(assetJSON);
        }
    }
}