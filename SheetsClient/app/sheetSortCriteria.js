System.register([], function(exports_1) {
    var SheetSortCriteriaEnum, SheetSortCriteria;
    return {
        setters:[],
        execute: function() {
            (function (SheetSortCriteriaEnum) {
                SheetSortCriteriaEnum[SheetSortCriteriaEnum["OneMonthReturn"] = "Ritorno Ultimo Mese"] = "OneMonthReturn";
                SheetSortCriteriaEnum[SheetSortCriteriaEnum["OneYearReturn"] = "Ritorno Ultimo Anno"] = "OneYearReturn";
                SheetSortCriteriaEnum[SheetSortCriteriaEnum["DailyChange"] = "Variazione giornaliera"] = "DailyChange";
                SheetSortCriteriaEnum[SheetSortCriteriaEnum["Name"] = "Nome"] = "Name";
            })(SheetSortCriteriaEnum || (SheetSortCriteriaEnum = {}));
            exports_1("SheetSortCriteriaEnum", SheetSortCriteriaEnum);
            SheetSortCriteria = (function () {
                function SheetSortCriteria() {
                }
                SheetSortCriteria.criteria = [
                    { id: SheetSortCriteriaEnum.OneMonthReturn, value: 'Ritorno Ultimo Mese' },
                    { id: SheetSortCriteriaEnum.OneYearReturn, value: 'Ritorno Ultimo Anno' },
                    { id: SheetSortCriteriaEnum.DailyChange, value: 'Variazione giornaliera' },
                    { id: SheetSortCriteriaEnum.Name, value: 'Nome' }
                ];
                return SheetSortCriteria;
            })();
            exports_1("SheetSortCriteria", SheetSortCriteria);
        }
    }
});
//# sourceMappingURL=sheetSortCriteria.js.map