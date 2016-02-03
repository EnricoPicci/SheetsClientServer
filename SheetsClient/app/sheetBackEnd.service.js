System.register([], function(exports_1) {
    var SheetBackEnd;
    return {
        setters:[],
        execute: function() {
            SheetBackEnd = (function () {
                function SheetBackEnd() {
                }
                SheetBackEnd.prototype.getSheet = function (inId) { return null; };
                //getSheet(inId: number, inComponent: any) {}
                //getSheet(inId: number) {}
                SheetBackEnd.prototype.getSheetWithDetails = function (inId) { return null; };
                SheetBackEnd.prototype.getSomeSheets = function (inFromPosition, inMaxNumebrOfSheets) { return null; };
                SheetBackEnd.prototype.getGeneralSearchCriteriaDomain = function () { return null; };
                SheetBackEnd.prototype.getValueBasedSearchCriteriaDomain = function () { return null; };
                SheetBackEnd.prototype.getSectorsSearchCriteriaDomain = function () { return null; };
                SheetBackEnd.prototype.fetchSheets = function (searchString, generalTags, valueBasedTags, sectorsTags) { return null; };
                SheetBackEnd.prototype.fillDetails = function (inSheet) { return null; };
                SheetBackEnd.prototype.fillReturnData = function (inSheet, inPeriod) { };
                SheetBackEnd.prototype.updateReturnData = function (inSheet, inPeriod) { };
                SheetBackEnd.prototype.updateValueAtRisk = function (inSheet) { };
                ;
                SheetBackEnd.prototype.updateVolatility = function (inSheet) { };
                ;
                SheetBackEnd.prototype.addSheet = function (inSheet) { };
                return SheetBackEnd;
            })();
            exports_1("SheetBackEnd", SheetBackEnd);
        }
    }
});
//# sourceMappingURL=sheetBackEnd.service.js.map