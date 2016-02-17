///<reference path="../typings/mongodb/mongodb.d.ts" />
///<reference path="../typings/mongoose/mongoose.d.ts" />

import * as mongodb from "mongodb";
import * as mongoose from "mongoose";

//import {SheetDBBuilder} from '../sheetDBBuilder/sheetDBBuilder';
import SheetDBBuilder = require('../sheetDBBuilder/sheetDBBuilder');

export class SheetConnectionManager { 
    public static db: mongoose.Connection;
    public static sheetModel: mongoose.Model<any>;
    public static proposalModel: mongoose.Model<any>;
   
    static connectAndOpen() {
        if (!this.db) {
        //mongoose.connect('mongodb://localhost/NodeServerDB');
        mongoose.connect('mongodb://ec2-54-213-172-98.us-west-2.compute.amazonaws.com/NodeServerDB');
        ////////mongoose.connect('mongodb://Enrico:immiammi@ec2-54-213-172-98.us-west-2.compute.amazonaws.com:27017/NodeServerDB');
            this.db = mongoose.connection;
            this.db.on('error', console.error.bind(console, 'connection error:'));
            this.db.once('open', () => {
                console.log('connected!');
                //this.createSchemaAndFill();
            })
        }
        return this.db;
    }
    
    static getSheetModel() {
        if (!this.sheetModel) {
            let dbBuilder = new SheetDBBuilder();
            let sheetSchema = new mongoose.Schema(dbBuilder.getSheetSchema());
            this.sheetModel = mongoose.model('SheetModel', sheetSchema);
        }
        return this.sheetModel;
    }
    
    static getProposalModel() {
        if (!this.proposalModel) {
            let dbBuilder = new SheetDBBuilder();
            let proposalSchema = new mongoose.Schema(dbBuilder.getProposalSchema());
            this.proposalModel = mongoose.model('ProposalModel', proposalSchema);
        }
        return this.proposalModel;
    }
}