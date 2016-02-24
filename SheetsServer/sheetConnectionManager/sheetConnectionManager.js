///<reference path="../typings/mongodb/mongodb.d.ts" />
///<reference path="../typings/mongoose/mongoose.d.ts" />
var mongoose = require("mongoose");
//import {SheetDBBuilder} from '../sheetDBBuilder/sheetDBBuilder';
var SheetDBBuilder = require('../sheetDBBuilder/sheetDBBuilder');
var SheetConnectionManager = (function () {
    function SheetConnectionManager() {
    }
    SheetConnectionManager.connectAndOpen = function () {
        if (!this.db) {
            mongoose.connect('mongodb://localhost/NodeServerDB');
            //mongoose.connect('mongodb://ec2-54-213-172-98.us-west-2.compute.amazonaws.com/NodeServerDB');
            ////////mongoose.connect('mongodb://Enrico:immiammi@ec2-54-213-172-98.us-west-2.compute.amazonaws.com:27017/NodeServerDB');
            this.db = mongoose.connection;
            this.db.on('error', console.error.bind(console, 'connection error:'));
            this.db.once('open', function () {
                console.log('connected!');
                //this.createSchemaAndFill();
            });
        }
        return this.db;
    };
    SheetConnectionManager.getSheetModel = function () {
        if (!this.sheetModel) {
            var dbBuilder = new SheetDBBuilder();
            var sheetSchema = new mongoose.Schema(dbBuilder.getSheetSchema());
            this.sheetModel = mongoose.model('SheetModel', sheetSchema);
        }
        return this.sheetModel;
    };
    SheetConnectionManager.getProposalModel = function () {
        if (!this.proposalModel) {
            var dbBuilder = new SheetDBBuilder();
            var proposalSchema = new mongoose.Schema(dbBuilder.getProposalSchema());
            this.proposalModel = mongoose.model('ProposalModel', proposalSchema);
        }
        return this.proposalModel;
    };
    return SheetConnectionManager;
})();
exports.SheetConnectionManager = SheetConnectionManager;
//# sourceMappingURL=sheetConnectionManager.js.map