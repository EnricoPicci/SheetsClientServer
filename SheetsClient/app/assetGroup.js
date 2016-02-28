System.register(['./assetAbstract'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var assetAbstract_1;
    var AssetGroup;
    return {
        setters:[
            function (assetAbstract_1_1) {
                assetAbstract_1 = assetAbstract_1_1;
            }],
        execute: function() {
            //import{Sheet} from './sheet';
            AssetGroup = (function (_super) {
                __extends(AssetGroup, _super);
                //public sheet: Sheet;
                function AssetGroup(inName, inWeight, inOneMonthRet, inOneYearRet, inAssets, inMinWeigth, inMaxWeigth) {
                    _super.call(this, inName, inWeight, inOneMonthRet, inOneYearRet, inMinWeigth, inMaxWeigth);
                    this.assets = inAssets;
                }
                AssetGroup.prototype.setLocked = function (inLocked) {
                    _super.prototype.setLocked.call(this, inLocked);
                    for (var i = 0; i < this.assets.length; i++) {
                        this.assets[i].setLocked(inLocked);
                    }
                };
                AssetGroup.prototype.checkConsistency = function () {
                    _super.prototype.checkConsistency.call(this);
                    var sumOfRelativeStartOfScale = 0;
                    for (var i = 0; i < this.assets.length; i++) {
                        var asset = this.assets[i];
                        asset.checkConsistency();
                        sumOfRelativeStartOfScale = sumOfRelativeStartOfScale + asset.relativeStartOfScale;
                    }
                    /* if (this.assets.length > 0) {
                         sumOfRelativeStartOfScale = sumOfRelativeStartOfScale + this.assets[this.assets.length - 1].weight;
                         if (sumOfRelativeStartOfScale != this.weight) {
                             console.error('Range of Asset Group ' + this.name + 'not equal to the sum of relative lenghts of its assets');
                         }
                     }*/
                };
                return AssetGroup;
            }(assetAbstract_1.AssetAbstract));
            exports_1("AssetGroup", AssetGroup);
        }
    }
});
//# sourceMappingURL=assetGroup.js.map