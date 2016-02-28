System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var SheetSortCriteriaEnum, SheetSortCriteria;
    return {
        setters:[],
        execute: function() {
            (function (SheetSortCriteriaEnum) {
                SheetSortCriteriaEnum[SheetSortCriteriaEnum["OneMonthReturn"] = "Last Month Return"] = "OneMonthReturn";
                SheetSortCriteriaEnum[SheetSortCriteriaEnum["OneYearReturn"] = "Last Year Return"] = "OneYearReturn";
                SheetSortCriteriaEnum[SheetSortCriteriaEnum["DailyChange"] = "Daily Change"] = "DailyChange";
                SheetSortCriteriaEnum[SheetSortCriteriaEnum["Name"] = "Name"] = "Name";
            })(SheetSortCriteriaEnum || (SheetSortCriteriaEnum = {}));
            exports_1("SheetSortCriteriaEnum", SheetSortCriteriaEnum);
            SheetSortCriteria = (function () {
                function SheetSortCriteria() {
                }
                SheetSortCriteria.criteria = [
                    { id: SheetSortCriteriaEnum.OneMonthReturn, value: 'Last Month Return' },
                    { id: SheetSortCriteriaEnum.OneYearReturn, value: 'Last Year Return' },
                    { id: SheetSortCriteriaEnum.DailyChange, value: 'Daily Change' },
                    { id: SheetSortCriteriaEnum.Name, value: 'Name' }
                ];
                return SheetSortCriteria;
            }());
            exports_1("SheetSortCriteria", SheetSortCriteria);
        }
    }
});
//# sourceMappingURL=sheetSortCriteria.js.map