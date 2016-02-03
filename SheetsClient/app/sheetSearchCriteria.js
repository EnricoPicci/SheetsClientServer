System.register(['./searchCriteria', './searchSelection'], function(exports_1) {
    var searchCriteria_1, searchSelection_1;
    var SheetSearchCriteria;
    return {
        setters:[
            function (searchCriteria_1_1) {
                searchCriteria_1 = searchCriteria_1_1;
            },
            function (searchSelection_1_1) {
                searchSelection_1 = searchSelection_1_1;
            }],
        execute: function() {
            SheetSearchCriteria = (function () {
                function SheetSearchCriteria(inSheetBackEnd) {
                    this.searchCriteria = new Array();
                    this.open = false;
                    this._sheetBackEnd = inSheetBackEnd;
                }
                SheetSearchCriteria.prototype.initializeSearchCriteria = function () {
                    if (SheetSearchCriteria.generalDomain == null) {
                        SheetSearchCriteria.generalDomain = this._sheetBackEnd.getGeneralSearchCriteriaDomain();
                    }
                    var general = new Array();
                    for (var i = 0; i < SheetSearchCriteria.generalDomain.length; i++) {
                        general[i] = new searchSelection_1.SearchSelection(SheetSearchCriteria.generalDomain[i]);
                    }
                    this.searchCriteria[0] = new searchCriteria_1.SearchCriteria('General', general);
                    if (SheetSearchCriteria.valueBasedDomain == null) {
                        SheetSearchCriteria.valueBasedDomain = this._sheetBackEnd.getValueBasedSearchCriteriaDomain();
                    }
                    var valueBased = new Array();
                    for (var i = 0; i < SheetSearchCriteria.valueBasedDomain.length; i++) {
                        valueBased[i] = new searchSelection_1.SearchSelection(SheetSearchCriteria.valueBasedDomain[i]);
                    }
                    this.searchCriteria[1] = new searchCriteria_1.SearchCriteria('Value Based', valueBased);
                    if (SheetSearchCriteria.sectorsDomain == null) {
                        SheetSearchCriteria.sectorsDomain = this._sheetBackEnd.getSectorsSearchCriteriaDomain();
                    }
                    var sectors = new Array();
                    for (var i = 0; i < SheetSearchCriteria.sectorsDomain.length; i++) {
                        sectors[i] = new searchSelection_1.SearchSelection(SheetSearchCriteria.sectorsDomain[i]);
                    }
                    this.searchCriteria[2] = new searchCriteria_1.SearchCriteria('Sectors', sectors);
                    return this.searchCriteria;
                };
                return SheetSearchCriteria;
            })();
            exports_1("SheetSearchCriteria", SheetSearchCriteria);
        }
    }
});
//# sourceMappingURL=sheetSearchCriteria.js.map