"use strict";
//import {SheetDBBuilder} from './sheetDBBuilder';
var SheetDBBuilder = require('./sheetDBBuilder');
var Main = (function () {
    function Main() {
        var builder = new SheetDBBuilder();
        builder.connectAndOpen();
    }
    return Main;
}());
var main = new Main();
module.exports = main;
//# sourceMappingURL=createSheetDB.js.map