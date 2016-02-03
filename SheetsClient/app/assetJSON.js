System.register(['./assetAbstractJSON'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var assetAbstractJSON_1;
    var AssetJSON;
    return {
        setters:[
            function (assetAbstractJSON_1_1) {
                assetAbstractJSON_1 = assetAbstractJSON_1_1;
            }],
        execute: function() {
            AssetJSON = (function (_super) {
                __extends(AssetJSON, _super);
                function AssetJSON() {
                    _super.apply(this, arguments);
                }
                AssetJSON.prototype.fill = function (inAsset) {
                    _super.prototype.fill.call(this, inAsset);
                    this.symbol = inAsset.symbol;
                };
                return AssetJSON;
            })(assetAbstractJSON_1.AssetAbstractJSON);
            exports_1("AssetJSON", AssetJSON);
        }
    }
});
//# sourceMappingURL=assetJSON.js.map