System.register([], function(exports_1) {
    var SheetBackEnd;
    return {
        setters:[],
        execute: function() {
            SheetBackEnd = (function () {
                function SheetBackEnd() {
                }
                SheetBackEnd.prototype.getSheet = function (inId) { return null; };
                SheetBackEnd.prototype.getSheetWithDetails = function (inId) { return null; };
                SheetBackEnd.prototype.getAllSheets = function () { return null; };
                SheetBackEnd.prototype.getSomeSheets = function (inFromPosition, inMaxNumebrOfSheets) { return null; };
                SheetBackEnd.prototype.getGeneralSearchCriteriaDomain = function () { return null; };
                SheetBackEnd.prototype.getValueBasedSearchCriteriaDomain = function () { return null; };
                SheetBackEnd.prototype.getSectorsSearchCriteriaDomain = function () { return null; };
                SheetBackEnd.prototype.selectSheets = function (publicPersonal, generalTags, valueBasedTags, sectorsTags) { return null; };
                SheetBackEnd.prototype.searchSheetsByKeyword = function (inSearchString) { return null; };
                SheetBackEnd.prototype.fillReturnData = function (inSheet, inPeriod) { };
                SheetBackEnd.prototype.updateReturnData = function (inSheet, inPeriod) { };
                SheetBackEnd.prototype.updateValueAtRisk = function (inSheet) { };
                ;
                SheetBackEnd.prototype.updateVolatility = function (inSheet) { };
                ;
                SheetBackEnd.prototype.addSheet = function (inSheet) { };
                SheetBackEnd.prototype.getAccountAndPortfolioCapacityForInvestment = function (inCustomerId) { };
                SheetBackEnd.prototype.saveProposal = function (inProposal) { };
                SheetBackEnd.prototype.sendProposal = function (inProposal) { };
                return SheetBackEnd;
            })();
            exports_1("SheetBackEnd", SheetBackEnd);
        }
    }
});
//# sourceMappingURL=sheetBackEnd.service.js.map