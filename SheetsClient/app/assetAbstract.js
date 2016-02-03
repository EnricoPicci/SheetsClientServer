System.register([], function(exports_1) {
    var AssetAbstract;
    return {
        setters:[],
        execute: function() {
            AssetAbstract = (function () {
                function AssetAbstract(inName, inWeight, inOneMonthRet, inOneYearRet, inMinWeight, inMaxWeight) {
                    this.show = true;
                    this.locked = false;
                    this.relativeStartOfScale = 0;
                    this.name = inName;
                    this.weight = inWeight;
                    this.oneMonthRet = inOneMonthRet;
                    this.oneYearRet = inOneYearRet;
                    this.minWeight = inMinWeight;
                    this.maxWeight = inMaxWeight;
                    this.range = { 'min': this.minWeight, 'max': this.maxWeight };
                    this.pips = { mode: 'values',
                        values: [inMinWeight, inMaxWeight],
                        density: 10 };
                }
                AssetAbstract.prototype.setWeight = function (inWeight) {
                    this.newWeight = { newWeight: inWeight };
                    this.weight = inWeight;
                };
                AssetAbstract.prototype.setLocked = function (inLocked) {
                    this.locked = inLocked;
                };
                AssetAbstract.prototype.checkConsistency = function () {
                    if (this.weight < this.minWeight) {
                        console.error(this.name + ': Weight less than allowed min');
                    }
                    if (this.weight > this.maxWeight) {
                        console.error(this.name + ': Weight more than allowed max');
                    }
                };
                AssetAbstract.prototype.getRangeLength = function () {
                    var ret = this.range.max - this.range.min;
                    return ret;
                };
                return AssetAbstract;
            })();
            exports_1("AssetAbstract", AssetAbstract);
        }
    }
});
//# sourceMappingURL=assetAbstract.js.map