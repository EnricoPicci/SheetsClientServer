//import SheetDBBuilder = require('./sheetDBBuilder');
var sheetDBBuilder_1 = require('./sheetDBBuilder');
var Main = (function () {
    function Main() {
        var builder = new sheetDBBuilder_1.SheetDBBuilder();
        builder.connectAndOpen();
    }
    return Main;
})();
var main = new Main();
module.exports = main;
//# sourceMappingURL=createSheetDB.js.map