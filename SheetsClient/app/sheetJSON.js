System.register(['./assetGroupJSON'], function(exports_1) {
    var assetGroupJSON_1;
    var SheetJSON;
    return {
        setters:[
            function (assetGroupJSON_1_1) {
                assetGroupJSON_1 = assetGroupJSON_1_1;
            }],
        execute: function() {
            SheetJSON = (function () {
                function SheetJSON() {
                    this.assetGroupJSONs = new Array();
                    // attributes that are filled if the Sheet represents a personalization of an original sheet
                    this.originalSheetID = null;
                    this.personalizationComment = null;
                }
                SheetJSON.prototype.fill = function (inSheet) {
                    this.id = inSheet.id;
                    this.title = inSheet.title;
                    this.longTitle = inSheet.longTitle;
                    this.imageUrl = inSheet.imageUrl;
                    this.createdBy = inSheet.createdBy;
                    this.description = inSheet.description;
                    this.oneYearReturn = inSheet.oneYearReturn;
                    this.oneMonthReturn = inSheet.oneMonthReturn;
                    this.dailyChange = inSheet.dailyChange;
                    this.benchmark = inSheet.benchmark;
                    this.valueAtRisk = inSheet.valueAtRisk;
                    this.volatility = inSheet.volatility;
                    // tags used as filter in search
                    this.general = inSheet.general;
                    this.valueBased = inSheet.valueBased;
                    this.sector = inSheet.sector;
                    // attributes that are filled if the Sheet represents a personalization of an original sheet
                    this.originalSheetID = inSheet.originalSheetID;
                    this.personalizationComment = inSheet.personalizationComment;
                    for (var i = 0; i < inSheet.assetGroups.length; i++) {
                        var assetGroupJSON = new assetGroupJSON_1.AssetGroupJSON();
                        assetGroupJSON.fill(inSheet.assetGroups[i]);
                        this.assetGroupJSONs.push(assetGroupJSON);
                    }
                };
                return SheetJSON;
            })();
            exports_1("SheetJSON", SheetJSON);
        }
    }
});
//# sourceMappingURL=sheetJSON.js.map