System.register(['angular2/core', './returnData', './sheetJSON'], function(exports_1) {
    var core_1, returnData_1, sheetJSON_1;
    var Sheet;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (returnData_1_1) {
                returnData_1 = returnData_1_1;
            },
            function (sheetJSON_1_1) {
                sheetJSON_1 = sheetJSON_1_1;
            }],
        execute: function() {
            Sheet = (function () {
                function Sheet(inId, inTitle, inLongTitle, inImageUrl, inOneMonthReturn, inValueAtRisk, inVolatility, inGeneral, inValueBased, inSector) {
                    this.returnDataLastMonth = new returnData_1.ReturnData();
                    this.returnDataLastYear = new returnData_1.ReturnData();
                    this.returnDataAll = new returnData_1.ReturnData();
                    this.returnDataBenchmarkLastMonth = new returnData_1.ReturnData();
                    this.returnDataBenchmarkLastYear = new returnData_1.ReturnData();
                    this.returnDataBenchmarkAll = new returnData_1.ReturnData();
                    // attributes that are filled if the Sheet represents a personalization of an original sheet
                    this.originalSheetID = null;
                    this.personalizationComment = null;
                    // add en EventEmmiter to communicate when sheet composition changes to all components that may be interested
                    this._changeCompositionEventEmitter = new core_1.EventEmitter();
                    // variable to store states that I use to drive the view as far as comparison functionalities are required
                    this.isSelectedForComparison = false;
                    this.isComparisonCheckboxToBeDisplayed = false;
                    this.id = inId;
                    this.title = inTitle;
                    this.longTitle = inLongTitle;
                    this.imageUrl = inImageUrl;
                    this.oneMonthReturn = inOneMonthReturn;
                    this.valueAtRisk = inValueAtRisk;
                    this.volatility = inVolatility;
                    this.general = inGeneral;
                    this.valueBased = inValueBased;
                    this.sector = inSector;
                }
                Sheet.prototype.emitChangeCompositionEvent = function () {
                    this._changeCompositionEventEmitter.emit(this);
                };
                Sheet.prototype.getChangeCompositionEvent = function () {
                    return this._changeCompositionEventEmitter;
                };
                Sheet.prototype.personalized = function (inUser) {
                    this.createdBy = inUser.name;
                    if (!this.originalSheetID) {
                        this.originalSheetID = this.id.toString();
                        // the new id for the new personalized Sheet is going to be provided when the personalized Sheet is saved
                        this.id = null;
                    }
                };
                Sheet.prototype.jsonStringForBackEnd = function () {
                    var sheetJSON = new sheetJSON_1.SheetJSON();
                    sheetJSON.fill(this);
                    return JSON.stringify(sheetJSON);
                };
                return Sheet;
            })();
            exports_1("Sheet", Sheet);
        }
    }
});
//# sourceMappingURL=sheet.js.map