import {AssetGroup} from './assetGroup';
import {Asset} from './asset';
import {Sheet} from './sheet';

export class SheetWeightAdjuster {
    
    public adjustAfterChangeInAssetGroupWeight(inNewWeightValue: number, inAssetGroup: AssetGroup, inSheet: Sheet) {
        let change = 0;
        let requestedChange = inNewWeightValue - inAssetGroup.weight;
        let availableSpaceForChange = 0;
        let assets = inAssetGroup.assets;
        if (requestedChange > 0) {// the difference is positive; we are increasing an Asset Group
            availableSpaceForChange = this.calculateSpaceBelowMaxAvailabelForIncrease(inAssetGroup);
            if (requestedChange < availableSpaceForChange) {
                change = requestedChange;
            } else {
                change = availableSpaceForChange;
            }
        } else {// the difference is negative; we are decreasing an Asset Group
            availableSpaceForChange = - this.calculateSpaceAboveMinAvailabelForDecrease(inAssetGroup);
            if (requestedChange > availableSpaceForChange) {  // in this case requestedChange and availableSpaceForChange are negative numbers
                change = requestedChange;
            } else {
                change = availableSpaceForChange;
            }
        }
        let assetGroups = inSheet.assetGroups;        
        if (change == 0) { // there is no space available for change and therefore change is zero
            inAssetGroup.setWeight(this.calculateWeight(inAssetGroup)); // we recalculate the weight to override what has been set by the change input by the user
        }
        else if (change > 0) {  // the difference is positive; we are increasing an Asset Group and therefore we need to decrease the others
            let totalSpaceAvailableForDecrease = 0;
            // calculate how much the AssetGroup can increase based on how much the other AssetGroups can decrease;if the other AssetGroups can decrease less than requested, we have to limit the request input by the user
            for (var i = 0; i < assetGroups.length; i++) {
                if (!assetGroups[i].locked && !(assetGroups[i] == inAssetGroup)) {  // asset groupss locked are not considered as well as the asset group whose weight has been changed
                    let spaceAboveMinAvailabelForDecrease = this.calculateSpaceAboveMinAvailabelForDecrease(assetGroups[i]);
                    totalSpaceAvailableForDecrease = totalSpaceAvailableForDecrease + spaceAboveMinAvailabelForDecrease;
                }
            }  
            // the correction factor limits the request of increase (if there is no enough space to decrease in the other AssetGroups)
            let decreaseCorrectionFactor = 0;
            if (totalSpaceAvailableForDecrease < change) {
                decreaseCorrectionFactor = change - totalSpaceAvailableForDecrease;
            }            
            let decreaseOveraAvailableSpaceRatio = (change - decreaseCorrectionFactor) / totalSpaceAvailableForDecrease;
            for (var i = 0; i < assetGroups.length; i++) {
                if (!assetGroups[i].locked && !(assetGroups[i] == inAssetGroup)) {  // asset groups locked are not considered as well as the asset group whose weight has been changed
                    let assetGroupWeight = 0;
                    for (var j = 0; j < assetGroups[i].assets.length; j++) {
                        let asset = assetGroups[i].assets[j];
                        if (!asset.locked) {
                            let variation = (asset.weight - asset.minWeight)*decreaseOveraAvailableSpaceRatio;
                            asset.setWeight(asset.weight - variation);
                        }
                        assetGroupWeight = assetGroupWeight + asset.weight;
                    }
                    assetGroups[i].setWeight(assetGroupWeight);
                }
            }
            let spaceToIncreaseForAssetGroup = this.calculateSpaceBelowMaxAvailabelForIncrease(inAssetGroup);
            for (var j = 0; j < inAssetGroup.assets.length; j++) {
                let asset = inAssetGroup.assets[j];
                if (!asset.locked) {
                    let spaceToIncreaseForAsset = asset.maxWeight - asset.weight;
                    let variation = spaceToIncreaseForAsset/spaceToIncreaseForAssetGroup*(change - decreaseCorrectionFactor);
                    asset.setWeight(asset.weight + variation);
                }
            } 
            inAssetGroup.setWeight(inAssetGroup.weight + change - decreaseCorrectionFactor);           
        } else {  // the difference is negative; we are decreasing an Asset Group and therefore we need to increase the others
            let totalSpaceAvailabelForIncrease = 0;
            for (var i = 0; i < assetGroups.length; i++) {
                if (!assetGroups[i].locked && !(assetGroups[i] == inAssetGroup)) {  // asset groups locked are not considered as well as the asset group whose weight has been changed
                    let spaceBelowMaxAvailabelForIncrease = this.calculateSpaceBelowMaxAvailabelForIncrease(assetGroups[i]);
                    totalSpaceAvailabelForIncrease = totalSpaceAvailabelForIncrease + spaceBelowMaxAvailabelForIncrease;
                }
            }  
            let increaseCorrectionFactor = 0;
            if (totalSpaceAvailabelForIncrease < -change) {
                increaseCorrectionFactor = -change - totalSpaceAvailabelForIncrease;
            }
            let increaseOveraAvailableSpaceRatio = (change + increaseCorrectionFactor) / totalSpaceAvailabelForIncrease;       
            for (var i = 0; i < assetGroups.length; i++) {
                if (!assetGroups[i].locked && !(assetGroups[i] == inAssetGroup)) {  // asset groups locked are not considered as well as the asset group whose weight has been changed
                    let assetGroupWeight = 0;
                    for (var j = 0; j < assetGroups[i].assets.length; j++) {
                        let asset = assetGroups[i].assets[j];
                        if(!asset.locked) {
                            let variation = (asset.maxWeight - asset.weight)*increaseOveraAvailableSpaceRatio;
                            asset.setWeight(asset.weight - variation);
                        }
                        assetGroupWeight = assetGroupWeight + asset.weight;
                    }
                    assetGroups[i].setWeight(assetGroupWeight);                    
                }
            }
            let spaceToDecreaseForAssetGroup = this.calculateSpaceAboveMinAvailabelForDecrease(inAssetGroup);
            for (var j = 0; j < inAssetGroup.assets.length; j++) {
                let asset = inAssetGroup.assets[j];
                if(!asset.locked) {
                    let spaceToDecreaseForAsset = asset.weight - asset.minWeight;
                    let variation = spaceToDecreaseForAsset/spaceToDecreaseForAssetGroup*(change - increaseCorrectionFactor);
                    asset.setWeight(asset.weight + variation);
                }
            }            
            inAssetGroup.setWeight(inAssetGroup.weight + change - increaseCorrectionFactor);            
        }
        for (var i = 0; i < assetGroups.length; i++) {
            assetGroups[i].checkConsistency();
        }        
    }
    
    public adjustAfterChangeInAssetWeight(inNewWeightValue: number, inAsset: Asset, inAssetGroup: AssetGroup) {
        let change = inNewWeightValue - inAsset.weight;
        if (change > 0) {  // the difference is positive; we are increasing the weight of one asset change and need to decrease the weight of the others to maintain Asset Group total weight unchanged
            let totalSpaceAvailableForDecrease = 0;
            let assetsOfGroup = inAssetGroup.assets;
            for (var i = 0; i < assetsOfGroup.length; i++) {
                if (!assetsOfGroup[i].locked && !(assetsOfGroup[i] == inAsset)) {  // assets locked are not considered as well as the asset whose weight has been changed
                    let spaceAboveMinAvailabelForDecrease = assetsOfGroup[i].weight - assetsOfGroup[i].minWeight;
                    totalSpaceAvailableForDecrease = totalSpaceAvailableForDecrease + spaceAboveMinAvailabelForDecrease;
                }
            }  
            if (totalSpaceAvailableForDecrease == 0) {
                inAsset.setWeight(inAsset.weight);
            } else {
                let decreaseCorrectionFactor = 0;
                if (totalSpaceAvailableForDecrease < change) {
                    decreaseCorrectionFactor = change - totalSpaceAvailableForDecrease;
                }
                let decreaseOveraAvailableSpaceRatio = (change - decreaseCorrectionFactor) / totalSpaceAvailableForDecrease;
                for (var i = 0; i < assetsOfGroup.length; i++) {
                    if (!assetsOfGroup[i].locked && !(assetsOfGroup[i] == inAsset)) {  // assets locked are not considered as well as the asset whose weight has been changed
                        let spaceAboveMinAvailabelForDecrease = assetsOfGroup[i].weight - assetsOfGroup[i].minWeight;
                        let variation = spaceAboveMinAvailabelForDecrease*decreaseOveraAvailableSpaceRatio;
                        assetsOfGroup[i].setWeight(assetsOfGroup[i].weight - variation);
                    }
                }
                inAsset.setWeight(inAsset.weight + change - decreaseCorrectionFactor);                
            }
        } else {  // the difference is negative; we are decreasing the weight of one asset change and need to increase the weight of the others to maintain Asset Group total weight unchanged
            let totalSpaceAvailabelForIncrease = 0;
            let assetsOfGroup = inAssetGroup.assets;
            for (var i = 0; i < assetsOfGroup.length; i++) {
                if (!assetsOfGroup[i].locked && !(assetsOfGroup[i] == inAsset)) {  // assets locked are not considered as well as the asset whose weight has been changed
                    let spaceBelowMaxAvailabelForIncrease = assetsOfGroup[i].maxWeight - assetsOfGroup[i].weight;
                    totalSpaceAvailabelForIncrease = totalSpaceAvailabelForIncrease + spaceBelowMaxAvailabelForIncrease;
                }
            }  
            if (totalSpaceAvailabelForIncrease == 0) {
                inAsset.setWeight(inAsset.weight);
            } else {
                let increaseCorrectionFactor = 0;
                if (totalSpaceAvailabelForIncrease < -change) {
                    increaseCorrectionFactor = -change - totalSpaceAvailabelForIncrease;
                }
                let increaseOveraAvailableSpaceRatio = (change + increaseCorrectionFactor) / totalSpaceAvailabelForIncrease;       
                for (var i = 0; i < assetsOfGroup.length; i++) {
                    if (!assetsOfGroup[i].locked && !(assetsOfGroup[i] == inAsset)) {  // assets locked are not considered as well as the asset whose weight has been changed
                        let spaceBelowMaxAvailabelForIncrease = assetsOfGroup[i].maxWeight - assetsOfGroup[i].weight;
                        let variation = spaceBelowMaxAvailabelForIncrease*increaseOveraAvailableSpaceRatio;
                        assetsOfGroup[i].setWeight(assetsOfGroup[i].weight - variation);
                    }
                }
                inAsset.setWeight(inAsset.weight + change + increaseCorrectionFactor);                
            }
        }
        inAssetGroup.checkConsistency();        
    }
    
    private calculateSpaceBelowMaxAvailabelForIncrease(inAssetGroup: AssetGroup) {
         let availableSpaceForChange = 0;
         let assets = inAssetGroup.assets;
         for (var i = 0; i < assets.length; i++) {
            if (!assets[i].locked) {
                availableSpaceForChange = availableSpaceForChange + (assets[i].maxWeight - assets[i].weight);
            }
         }
         return availableSpaceForChange;
     }
     
     private calculateSpaceAboveMinAvailabelForDecrease(inAssetGroup: AssetGroup) {
         let availableSpaceForChange = 0;
         let assets = inAssetGroup.assets;
         for (var i = 0; i < assets.length; i++) {
            if (!assets[i].locked) {
                availableSpaceForChange = availableSpaceForChange + (assets[i].weight - assets[i].minWeight);
            }
         }
         return availableSpaceForChange;
     }
     
     private calculateWeight(inAssetGroup: AssetGroup) {
         let realWeight = 0;
         let assets = inAssetGroup.assets;
         for (var i = 0; i < assets.length; i++) {
            realWeight = realWeight + assets[i].weight;
         }
         return realWeight;
     }
     
     setRelativeStartOfScale(inAssetGroups: AssetGroup[]) {
        let relativeStartOfScaleForAssetGroup = 0;
        let relativeStartOfScaleForAsset = 0;
        for (var i = 0; i < inAssetGroups.length; i++) {
            inAssetGroups[i].relativeStartOfScale = relativeStartOfScaleForAssetGroup;
            relativeStartOfScaleForAssetGroup = relativeStartOfScaleForAssetGroup + inAssetGroups[i].weight;
            let assets = inAssetGroups[i].assets;
            for (var j = 0; j < assets.length; j++) {
                let asset = assets[j];
                asset.relativeStartOfScale = relativeStartOfScaleForAsset;
                relativeStartOfScaleForAsset = relativeStartOfScaleForAsset + asset.weight;
            }
        }
     }
}