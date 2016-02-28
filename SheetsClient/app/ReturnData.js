System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ReturnData;
    return {
        setters:[],
        execute: function() {
            ReturnData = (function () {
                function ReturnData() {
                    this.data = new Array();
                }
                ReturnData.prototype.isEmpty = function () {
                    return this.data.length == 0;
                };
                return ReturnData;
            }());
            exports_1("ReturnData", ReturnData);
        }
    }
});
//# sourceMappingURL=ReturnData.js.map