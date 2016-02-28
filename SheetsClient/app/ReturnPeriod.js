System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ReturnPeriod;
    return {
        setters:[],
        execute: function() {
            (function (ReturnPeriod) {
                ReturnPeriod[ReturnPeriod["lastMonth"] = 0] = "lastMonth";
                ReturnPeriod[ReturnPeriod["lastYear"] = 1] = "lastYear";
                ReturnPeriod[ReturnPeriod["all"] = 2] = "all";
            })(ReturnPeriod || (ReturnPeriod = {}));
            exports_1("ReturnPeriod", ReturnPeriod);
            ;
        }
    }
});
//# sourceMappingURL=ReturnPeriod.js.map