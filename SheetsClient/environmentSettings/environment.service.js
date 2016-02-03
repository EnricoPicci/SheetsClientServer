System.register([], function(exports_1) {
    var Environment;
    return {
        setters:[],
        execute: function() {
            Environment = (function () {
                function Environment() {
                    this.baseServiceUrl = 'http://localhost:3005/sheets/';
                }
                return Environment;
            })();
            exports_1("Environment", Environment);
        }
    }
});
//# sourceMappingURL=environment.service.js.map