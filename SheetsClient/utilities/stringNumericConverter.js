System.register([], function(exports_1) {
    var StringNumericConverter;
    return {
        setters:[],
        execute: function() {
            StringNumericConverter = (function () {
                function StringNumericConverter() {
                }
                StringNumericConverter.getNumberFromPercentageString = function (inPercentageString) {
                    var indexOfPercentageSymbol = inPercentageString.indexOf('%');
                    var retAsString = inPercentageString.substring(0, indexOfPercentageSymbol);
                    var ret = parseFloat(retAsString);
                    return ret;
                };
                return StringNumericConverter;
            })();
            exports_1("StringNumericConverter", StringNumericConverter);
        }
    }
});
//# sourceMappingURL=stringNumericConverter.js.map