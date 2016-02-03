//import {SheetDBBuilder} from './sheetDBBuilder';
import SheetDBBuilder = require('./sheetDBBuilder');

class Main {
    constructor() {
        var builder = new SheetDBBuilder();
        builder.connectAndOpen();
    }
}

var main = new Main();

module.exports = main;