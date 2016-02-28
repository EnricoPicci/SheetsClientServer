System.register(['./assetAbstractJSON', './assetJSON'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var assetAbstractJSON_1, assetJSON_1;
    var AssetGroupJSON;
    return {
        setters:[
            function (assetAbstractJSON_1_1) {
                assetAbstractJSON_1 = assetAbstractJSON_1_1;
            },
            function (assetJSON_1_1) {
                assetJSON_1 = assetJSON_1_1;
            }],
        execute: function() {
            AssetGroupJSON = (function (_super) {
                __extends(AssetGroupJSON, _super);
                function AssetGroupJSON() {
                    _super.apply(this, arguments);
                    this.assetJSONs = new Array();
                }
                AssetGroupJSON.prototype.fill = function (inAssetGroup) {
                    _super.prototype.fill.call(this, inAssetGroup);
                    for (var i = 0; i < inAssetGroup.assets.length; i++) {
                        var assetJSON = new assetJSON_1.AssetJSON();
                        assetJSON.fill(inAssetGroup.assets[i]);
                        this.assetJSONs.push(assetJSON);
                    }
                };
                AssetGroupJSON.prototype.fillForProposal = function (inAssetGroup) {
                    _super.prototype.fillForProposal.call(this, inAssetGroup);
                    for (var i = 0; i < inAssetGroup.assets.length; i++) {
                        var assetJSON = new assetJSON_1.AssetJSON();
                        assetJSON.fillForProposal(inAssetGroup.assets[i]);
                        this.assetJSONs.push(assetJSON);
                    }
                };
                AssetGroupJSON.prototype.fillForBuyOrder = function (inAssetGroup) {
                    for (var i = 0; i < inAssetGroup.assets.length; i++) {
                        var assetJSON = new assetJSON_1.AssetJSON();
                        assetJSON.fillForBuyOrder(inAssetGroup.assets[i]);
                        this.assetJSONs.push(assetJSON);
                    }
                };
                return AssetGroupJSON;
            }(assetAbstractJSON_1.AssetAbstractJSON));
            exports_1("AssetGroupJSON", AssetGroupJSON);
        }
    }
});
//# sourceMappingURL=assetGroupJSON.js.map