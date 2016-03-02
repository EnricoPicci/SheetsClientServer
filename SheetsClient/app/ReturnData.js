System.register([], function(exports_1) {
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
                ReturnData.prototype.clearData = function () {
                    this.data = new Array();
                };
                return ReturnData;
            })();
            exports_1("ReturnData", ReturnData);
        }
    }
});
//# sourceMappingURL=ReturnData.js.map