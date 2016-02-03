System.register([], function(exports_1) {
    var SheetWeightAdjuster;
    return {
        setters:[],
        execute: function() {
            SheetWeightAdjuster = (function () {
                function SheetWeightAdjuster() {
                }
                SheetWeightAdjuster.prototype.adjustAfterChangeInAssetGroupWeight = function (inNewWeightValue, inAssetGroup, inSheet) {
                    var change = 0;
                    var requestedChange = inNewWeightValue - inAssetGroup.weight;
                    var availableSpaceForChange = 0;
                    var assets = inAssetGroup.assets;
                    if (requestedChange > 0) {
                        availableSpaceForChange = this.calculateSpaceBelowMaxAvailabelForIncrease(inAssetGroup);
                        if (requestedChange < availableSpaceForChange) {
                            change = requestedChange;
                        }
                        else {
                            change = availableSpaceForChange;
                        }
                    }
                    else {
                        availableSpaceForChange = -this.calculateSpaceAboveMinAvailabelForDecrease(inAssetGroup);
                        if (requestedChange > availableSpaceForChange) {
                            change = requestedChange;
                        }
                        else {
                            change = availableSpaceForChange;
                        }
                    }
                    var assetGroups = inSheet.assetGroups;
                    if (change == 0) {
                        inAssetGroup.setWeight(this.calculateWeight(inAssetGroup)); // we recalculate the weight to override what has been set by the change input by the user
                    }
                    else if (change > 0) {
                        var totalSpaceAvailableForDecrease = 0;
                        // calculate how much the AssetGroup can increase based on how much the other AssetGroups can decrease;if the other AssetGroups can decrease less than requested, we have to limit the request input by the user
                        for (var i = 0; i < assetGroups.length; i++) {
                            if (!assetGroups[i].locked && !(assetGroups[i] == inAssetGroup)) {
                                var spaceAboveMinAvailabelForDecrease = this.calculateSpaceAboveMinAvailabelForDecrease(assetGroups[i]);
                                totalSpaceAvailableForDecrease = totalSpaceAvailableForDecrease + spaceAboveMinAvailabelForDecrease;
                            }
                        }
                        // the correction factor limits the request of increase (if there is no enough space to decrease in the other AssetGroups)
                        var decreaseCorrectionFactor = 0;
                        if (totalSpaceAvailableForDecrease < change) {
                            decreaseCorrectionFactor = change - totalSpaceAvailableForDecrease;
                        }
                        var decreaseOveraAvailableSpaceRatio = (change - decreaseCorrectionFactor) / totalSpaceAvailableForDecrease;
                        for (var i = 0; i < assetGroups.length; i++) {
                            if (!assetGroups[i].locked && !(assetGroups[i] == inAssetGroup)) {
                                var assetGroupWeight = 0;
                                for (var j = 0; j < assetGroups[i].assets.length; j++) {
                                    var asset = assetGroups[i].assets[j];
                                    if (!asset.locked) {
                                        var variation = (asset.weight - asset.minWeight) * decreaseOveraAvailableSpaceRatio;
                                        asset.setWeight(asset.weight - variation);
                                    }
                                    assetGroupWeight = assetGroupWeight + asset.weight;
                                }
                                assetGroups[i].setWeight(assetGroupWeight);
                            }
                        }
                        var spaceToIncreaseForAssetGroup = this.calculateSpaceBelowMaxAvailabelForIncrease(inAssetGroup);
                        for (var j = 0; j < inAssetGroup.assets.length; j++) {
                            var asset = inAssetGroup.assets[j];
                            if (!asset.locked) {
                                var spaceToIncreaseForAsset = asset.maxWeight - asset.weight;
                                var variation = spaceToIncreaseForAsset / spaceToIncreaseForAssetGroup * (change - decreaseCorrectionFactor);
                                asset.setWeight(asset.weight + variation);
                            }
                        }
                        inAssetGroup.setWeight(inAssetGroup.weight + change - decreaseCorrectionFactor);
                    }
                    else {
                        var totalSpaceAvailabelForIncrease = 0;
                        for (var i = 0; i < assetGroups.length; i++) {
                            if (!assetGroups[i].locked && !(assetGroups[i] == inAssetGroup)) {
                                var spaceBelowMaxAvailabelForIncrease = this.calculateSpaceBelowMaxAvailabelForIncrease(assetGroups[i]);
                                totalSpaceAvailabelForIncrease = totalSpaceAvailabelForIncrease + spaceBelowMaxAvailabelForIncrease;
                            }
                        }
                        var increaseCorrectionFactor = 0;
                        if (totalSpaceAvailabelForIncrease < -change) {
                            increaseCorrectionFactor = -change - totalSpaceAvailabelForIncrease;
                        }
                        var increaseOveraAvailableSpaceRatio = (change + increaseCorrectionFactor) / totalSpaceAvailabelForIncrease;
                        for (var i = 0; i < assetGroups.length; i++) {
                            if (!assetGroups[i].locked && !(assetGroups[i] == inAssetGroup)) {
                                var assetGroupWeight = 0;
                                for (var j = 0; j < assetGroups[i].assets.length; j++) {
                                    var asset = assetGroups[i].assets[j];
                                    if (!asset.locked) {
                                        var variation = (asset.maxWeight - asset.weight) * increaseOveraAvailableSpaceRatio;
                                        asset.setWeight(asset.weight - variation);
                                    }
                                    assetGroupWeight = assetGroupWeight + asset.weight;
                                }
                                assetGroups[i].setWeight(assetGroupWeight);
                            }
                        }
                        var spaceToDecreaseForAssetGroup = this.calculateSpaceAboveMinAvailabelForDecrease(inAssetGroup);
                        for (var j = 0; j < inAssetGroup.assets.length; j++) {
                            var asset = inAssetGroup.assets[j];
                            if (!asset.locked) {
                                var spaceToDecreaseForAsset = asset.weight - asset.minWeight;
                                var variation = spaceToDecreaseForAsset / spaceToDecreaseForAssetGroup * (change - increaseCorrectionFactor);
                                asset.setWeight(asset.weight + variation);
                            }
                        }
                        inAssetGroup.setWeight(inAssetGroup.weight + change - increaseCorrectionFactor);
                    }
                    for (var i = 0; i < assetGroups.length; i++) {
                        assetGroups[i].checkConsistency();
                    }
                };
                SheetWeightAdjuster.prototype.adjustAfterChangeInAssetWeight = function (inNewWeightValue, inAsset, inAssetGroup) {
                    var change = inNewWeightValue - inAsset.weight;
                    if (change > 0) {
                        var totalSpaceAvailableForDecrease = 0;
                        var assetsOfGroup = inAssetGroup.assets;
                        for (var i = 0; i < assetsOfGroup.length; i++) {
                            if (!assetsOfGroup[i].locked && !(assetsOfGroup[i] == inAsset)) {
                                var spaceAboveMinAvailabelForDecrease = assetsOfGroup[i].weight - assetsOfGroup[i].minWeight;
                                totalSpaceAvailableForDecrease = totalSpaceAvailableForDecrease + spaceAboveMinAvailabelForDecrease;
                            }
                        }
                        if (totalSpaceAvailableForDecrease == 0) {
                            inAsset.setWeight(inAsset.weight);
                        }
                        else {
                            var decreaseCorrectionFactor = 0;
                            if (totalSpaceAvailableForDecrease < change) {
                                decreaseCorrectionFactor = change - totalSpaceAvailableForDecrease;
                            }
                            var decreaseOveraAvailableSpaceRatio = (change - decreaseCorrectionFactor) / totalSpaceAvailableForDecrease;
                            for (var i = 0; i < assetsOfGroup.length; i++) {
                                if (!assetsOfGroup[i].locked && !(assetsOfGroup[i] == inAsset)) {
                                    var spaceAboveMinAvailabelForDecrease = assetsOfGroup[i].weight - assetsOfGroup[i].minWeight;
                                    var variation = spaceAboveMinAvailabelForDecrease * decreaseOveraAvailableSpaceRatio;
                                    assetsOfGroup[i].setWeight(assetsOfGroup[i].weight - variation);
                                }
                            }
                            inAsset.setWeight(inAsset.weight + change - decreaseCorrectionFactor);
                        }
                    }
                    else {
                        var totalSpaceAvailabelForIncrease = 0;
                        var assetsOfGroup = inAssetGroup.assets;
                        for (var i = 0; i < assetsOfGroup.length; i++) {
                            if (!assetsOfGroup[i].locked && !(assetsOfGroup[i] == inAsset)) {
                                var spaceBelowMaxAvailabelForIncrease = assetsOfGroup[i].maxWeight - assetsOfGroup[i].weight;
                                totalSpaceAvailabelForIncrease = totalSpaceAvailabelForIncrease + spaceBelowMaxAvailabelForIncrease;
                            }
                        }
                        if (totalSpaceAvailabelForIncrease == 0) {
                            inAsset.setWeight(inAsset.weight);
                        }
                        else {
                            var increaseCorrectionFactor = 0;
                            if (totalSpaceAvailabelForIncrease < -change) {
                                increaseCorrectionFactor = -change - totalSpaceAvailabelForIncrease;
                            }
                            var increaseOveraAvailableSpaceRatio = (change + increaseCorrectionFactor) / totalSpaceAvailabelForIncrease;
                            for (var i = 0; i < assetsOfGroup.length; i++) {
                                if (!assetsOfGroup[i].locked && !(assetsOfGroup[i] == inAsset)) {
                                    var spaceBelowMaxAvailabelForIncrease = assetsOfGroup[i].maxWeight - assetsOfGroup[i].weight;
                                    var variation = spaceBelowMaxAvailabelForIncrease * increaseOveraAvailableSpaceRatio;
                                    assetsOfGroup[i].setWeight(assetsOfGroup[i].weight - variation);
                                }
                            }
                            inAsset.setWeight(inAsset.weight + change + increaseCorrectionFactor);
                        }
                    }
                    inAssetGroup.checkConsistency();
                };
                SheetWeightAdjuster.prototype.calculateSpaceBelowMaxAvailabelForIncrease = function (inAssetGroup) {
                    var availableSpaceForChange = 0;
                    var assets = inAssetGroup.assets;
                    for (var i = 0; i < assets.length; i++) {
                        if (!assets[i].locked) {
                            availableSpaceForChange = availableSpaceForChange + (assets[i].maxWeight - assets[i].weight);
                        }
                    }
                    return availableSpaceForChange;
                };
                SheetWeightAdjuster.prototype.calculateSpaceAboveMinAvailabelForDecrease = function (inAssetGroup) {
                    var availableSpaceForChange = 0;
                    var assets = inAssetGroup.assets;
                    for (var i = 0; i < assets.length; i++) {
                        if (!assets[i].locked) {
                            availableSpaceForChange = availableSpaceForChange + (assets[i].weight - assets[i].minWeight);
                        }
                    }
                    return availableSpaceForChange;
                };
                SheetWeightAdjuster.prototype.calculateWeight = function (inAssetGroup) {
                    var realWeight = 0;
                    var assets = inAssetGroup.assets;
                    for (var i = 0; i < assets.length; i++) {
                        realWeight = realWeight + assets[i].weight;
                    }
                    return realWeight;
                };
                SheetWeightAdjuster.prototype.setRelativeStartOfScale = function (inAssetGroups) {
                    var relativeStartOfScaleForAssetGroup = 0;
                    var relativeStartOfScaleForAsset = 0;
                    for (var i = 0; i < inAssetGroups.length; i++) {
                        inAssetGroups[i].relativeStartOfScale = relativeStartOfScaleForAssetGroup;
                        relativeStartOfScaleForAssetGroup = relativeStartOfScaleForAssetGroup + inAssetGroups[i].weight;
                        var assets = inAssetGroups[i].assets;
                        for (var j = 0; j < assets.length; j++) {
                            var asset = assets[j];
                            asset.relativeStartOfScale = relativeStartOfScaleForAsset;
                            relativeStartOfScaleForAsset = relativeStartOfScaleForAsset + asset.weight;
                        }
                    }
                };
                return SheetWeightAdjuster;
            })();
            exports_1("SheetWeightAdjuster", SheetWeightAdjuster);
        }
    }
});
//# sourceMappingURL=sheetWeightAdjuster.service.js.map