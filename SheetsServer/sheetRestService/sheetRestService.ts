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
    
    public static getAllSheets(inHttpRes: any) {
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
    
    public static getSomeSheets(inFromId: string, inMaxNoOfItems: string, inHttpRes: any) {
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
    }
    
    public static getTags(inTagName: string, inHttpRes: any) {
        SheetConnectionManager.connectAndOpen();
        SheetConnectionManager.getSheetModel().find({}).distinct(inTagName) .exec(function (err, generalTags) {
                if (err) {
                    return console.error(err);
                } else {
                    inHttpRes.json(generalTags);
                }
            }
        )
    }
    public static getGeneralTags(inHttpRes: any) {
        SheetConnectionManager.connectAndOpen();
        SheetConnectionManager.getSheetModel().find({}).distinct('general') .exec(function (err, generalTags) {
                if (err) {
                    return console.error(err);
                } else {
                    inHttpRes.json(generalTags);
                }
            }
        )
    }
    
    public static selectSheets(inSearchString: string, inPublicPersonal: string, inGeneralTags: string, inValueBasedTags: string, 
                                inSectorsTags: string, inHttpRes: any) {
        let publicPersonal = JSON.parse(inPublicPersonal);
        let generalTags = JSON.parse(inGeneralTags);
        let valueBasedTags = JSON.parse(inValueBasedTags);
        let sectorsTags = JSON.parse(inSectorsTags);
        SheetConnectionManager.connectAndOpen();
        let condition = {};
        let tagConditions = new Array<any>();
        if (generalTags.length > 0) {
            tagConditions.push({general: { $in: generalTags }});
        }
        if (valueBasedTags.length > 0) {
            tagConditions.push({valueBased: { $in: valueBasedTags }});
        }
        if (sectorsTags.length > 0) {
            tagConditions.push({sector: { $in: sectorsTags }});
        }
        let compositeTagCondition;
        if (tagConditions.length > 0) {
             compositeTagCondition = {$or: tagConditions};
        } else {
            compositeTagCondition = {};
        }
        /*conditionTags = {$or: 
            [{general: { $in: generalTags }},
            {valueBased: { $in: valueBasedTags }},
            {sector: { $in: sectorsTags }}]
        };*/
        let publicPersonalCondition;
        // if the array 'publicPersonal' contains 1 element it means that 'Pubblici' option has been selected
        // else if it contains 2 elements and the first one is null it means that 'Personalizzati' has been selected
        if (publicPersonal.length == 1) {
            publicPersonalCondition = {originalSheetID: null};
            condition = {$and: [publicPersonalCondition, compositeTagCondition]};
        } else if (publicPersonal.length == 2 && publicPersonal[0] == null && publicPersonal[1] != null) {
            publicPersonalCondition = {originalSheetID: { $ne: null }};
            condition = {$and: [publicPersonalCondition, compositeTagCondition]};
        } else {
            condition = compositeTagCondition;
        }
        /*let condition = {$or: 
            [{general: { $in: generalTags }},
            {valueBased: { $in: valueBasedTags }},
            {sector: { $in: sectorsTags }}]
        };*/
        SheetConnectionManager.getSheetModel().find(condition)
         .exec(function (err, sheets) {
                if (err) {
                    return console.error(err);
                } else {
                    inHttpRes.json(sheets);
                }
            }
        )
    }
}