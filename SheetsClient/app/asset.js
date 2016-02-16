System.register(['./assetAbstract'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var assetAbstract_1;
    var Asset;
    return {
        setters:[
            function (assetAbstract_1_1) {
                assetAbstract_1 = assetAbstract_1_1;
            }],
        execute: function() {
            //import{AssetGroup} from './assetGroup';
            Asset = (function (_super) {
                __extends(Asset, _super);
                function Asset(inName, inSymbol, inWeight, inOneMonthRet, inOneYearRet, inMinWeigth, inMaxWeigth) {
                    _super.call(this, inName, inWeight, inOneMonthRet, inOneYearRet, inMinWeigth, inMaxWeigth);
                    this.isValidated = true;
                    this.showTooltip = false;
                    this.symbol = inSymbol;
                }
                Asset.prototype.hasPriceData = function () {
                    return this.openPrice != null;
                };
                Asset.prototype.getVolumeFormatted = function () {
                    var formattedString;
                    if (this.volume) {
                        formattedString = this.volume.toLocaleString('it-IT');
                    }
                    return formattedString;
                };
                return Asset;
            })(assetAbstract_1.AssetAbstract);
            exports_1("Asset", Asset);
        }
    }
});
//# sourceMappingURL=asset.js.map