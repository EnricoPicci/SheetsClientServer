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
                SheetBackEnd.prototype.getReturnData = function (inSheet, inPeriod) { return null; };
                //updateReturnData(inSheet: Sheet, inPeriod: ReturnPeriod) {}
                SheetBackEnd.prototype.updateValueAtRisk = function (inSheet) { return null; };
                ;
                SheetBackEnd.prototype.updateVolatility = function (inSheet) { return null; };
                ;
                SheetBackEnd.prototype.addSheet = function (inSheet) { };
                SheetBackEnd.prototype.getAccountAndPortfolioCapacityForInvestment = function (inCustomerId) { };
                SheetBackEnd.prototype.getProposalsForCustomer = function (inCustomerId) { };
                SheetBackEnd.prototype.getProposal = function (inProposalId) { };
                SheetBackEnd.prototype.validateAndSaveProposal = function (inProposal, inUserLogged) { };
                SheetBackEnd.prototype.sendProposal = function (inProposal, inUser) { };
                SheetBackEnd.prototype.getStockPrices = function (inAsset) { };
                ;
                // this is a method for demo purposes only
                // it creates a message to show what could be sent to a back end system when
                // an order to buy a sheet is issued from the front end
                SheetBackEnd.prototype.buildBuyMessageForTheBackEnd = function (inProposal) { };
                return SheetBackEnd;
            })();
            exports_1("SheetBackEnd", SheetBackEnd);
        }
    }
});
//# sourceMappingURL=sheetBackEnd.service.js.map