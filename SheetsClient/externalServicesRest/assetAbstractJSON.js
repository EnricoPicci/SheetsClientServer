System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var AssetAbstractJSON;
    return {
        setters:[],
        execute: function() {
            AssetAbstractJSON = (function () {
                function AssetAbstractJSON() {
                }
                AssetAbstractJSON.prototype.fill = function (inAssetAbstract) {
                    this.name = inAssetAbstract.name;
                    this.weight = inAssetAbstract.weight;
                    this.oneMonthRet = inAssetAbstract.oneMonthRet;
                    this.oneYearRet = inAssetAbstract.oneYearRet;
                    this.minWeight = inAssetAbstract.minWeight;
                    this.maxWeight = inAssetAbstract.maxWeight;
                };
                AssetAbstractJSON.prototype.fillForProposal = function (inAssetAbstract) {
                    this.name = inAssetAbstract.name;
                    this.weight = inAssetAbstract.weight;
                    this.investmentAmount = inAssetAbstract.investmentAmount;
                };
                return AssetAbstractJSON;
            }());
            exports_1("AssetAbstractJSON", AssetAbstractJSON);
        }
    }
});
//# sourceMappingURL=assetAbstractJSON.js.map