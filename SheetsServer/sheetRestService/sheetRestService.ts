///<reference path="../typings/mongodb/mongodb.d.ts" />
///<reference path="../typings/mongoose/mongoose.d.ts" />

import * as mongodb from "mongodb";
import * as mongoose from "mongoose";

import {SheetConnectionManager} from '../sheetConnectionManager/sheetConnectionManager';

export class SheetRestService { 
    
    public static getSheetById(inId: string, inHttpRes: any) {
        SheetConnectionManager.connectAndOpen();
        SheetConnectionManager.getSheetModel().find({ 'id': +inId }, function (err, sheetModel) {
                if (err) {
                    return console.error(err);
                } else {
                    inHttpRes.json(sheetModel);
                }
            }
        )
    }
    
    public static getSheets(inHttpRes: any) {
        SheetConnectionManager.connectAndOpen();
        SheetConnectionManager.getSheetModel().find(function (err, sheetModels) {
                if (err) {
                    return console.error(err);
                } else {
                    inHttpRes.json(sheetModels);
                }
            }
        )
    }
    
    public static getSomeSheets(inFromId: string, inMaxNoOfItems: string,inHttpRes: any) {
        let endId = (parseInt(inFromId) + parseInt(inMaxNoOfItems));
        console.log(endId);
        SheetConnectionManager.connectAndOpen();
        SheetConnectionManager.getSheetModel().find({id: { $gte: inFromId, $lt: endId}}, function (err, sheetModels) {
                if (err) {
                    return console.error(err);
                } else {
                    inHttpRes.json(sheetModels);
                }
            }
        )
    }
    
    public static addSheet(inSheetToAdd: any, inHttpRes: any) {
        SheetConnectionManager.connectAndOpen();
        let SheetModel = SheetConnectionManager.getSheetModel();
        let sheetToAdd = new SheetModel(inSheetToAdd);
        /*if (sheetToAdd.id == null) {
            let newId = this.getNextSheetID(SheetModel);
            sheetToAdd.id = newId;
        }*/
        //SheetModel.where('id').ne(null).count(function (err, count) {
        SheetModel.count({}, function (err, count) {
            if (err) {
                return console.error(err);
            }
            else {
                if (sheetToAdd.id == null) { 
                    sheetToAdd.id = count;
                };
                sheetToAdd.save(function (err) { 
                    if (err) {
                        return console.error(err);
                    } else {
                        inHttpRes.json({result: "OK", inserted: sheetToAdd.title, 
                            id: sheetToAdd.id, createdBy: sheetToAdd.createdBy});
                    }
                })
            }
        })
        /*sheetToAdd.save(function (err) {
                if (err) {
                    return console.error(err);
                } else {
                    inHttpRes.json({result: "OK", inserted: sheetToAdd.title});
                }
            }
        )*/
    }
    
    public static getNextSheetID(inModel: mongoose.Model<any>) {
        return inModel.where('id').ne(null).count();
    }
}