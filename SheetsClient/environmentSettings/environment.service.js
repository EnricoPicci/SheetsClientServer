System.register([], function(exports_1) {
    var Environment;
    return {
        setters:[],
        execute: function() {
            Environment = (function () {
                function Environment() {
                    this.baseServiceUrl = 'http://localhost:3005/sheets/';
                    //public baseServiceUrl = 'http://ec2-54-213-172-98.us-west-2.compute.amazonaws.com:3005/sheets/';
                    this.stockPricesServiceUrlStart = "https://www.quandl.com/api/v3/datasets/WIKI/";
                    this.stockPricesServiceUrlEnd = ".csv?api_key=oVMreULVs1AP7stTsyA4&limit=1";
                }
                return Environment;
            })();
            exports_1("Environment", Environment);
        }
    }
});
//# sourceMappingURL=environment.service.js.map