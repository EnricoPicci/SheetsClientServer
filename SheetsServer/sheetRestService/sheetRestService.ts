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
                // if there is no "id" in the sheet to be added, it means that it is a new personalization and 
                // need to be saved with a new ID (which, in our case hopefully, is the next ID available in the list)
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
    
    public static getProposals(inCustomerId: string, inHttpRes: any) {
        SheetConnectionManager.connectAndOpen();
        SheetConnectionManager.getProposalModel().find({customerId: inCustomerId}, function (err, proposalModels) {
                if (err) {
                    return console.error(err);
                } else {
                    inHttpRes.json(proposalModels);
                }
            }
        )
    }
    
    public static saveProposal(inProposalToSave: any, inHttpRes: any) {
        SheetConnectionManager.connectAndOpen();
        let ProposalModel = SheetConnectionManager.getProposalModel();
        let proposalToSave = new ProposalModel(inProposalToSave);
        ProposalModel.count({}, function (err, count) {
            if (err) {
                return console.error(err);
            }
            else {
                if (proposalToSave.id == null) { 
                    proposalToSave.id = count;
                };
                proposalToSave.save(function (err) { 
                    if (err) {
                        return console.error(err);
                    } else {
                        inHttpRes.json({result: "OK", id: proposalToSave.id});
                    }
                })
            }
        })
    }
    
    public static sendProposal(inProposalToSend, res) {
        SheetConnectionManager.connectAndOpen();
        let ProposalModel = SheetConnectionManager.getProposalModel();
        let proposalToAdd = new ProposalModel(inProposalToSend);
        /*ProposalModel.count({}, function (err, count) {
            if (err) {
                return console.error(err);
            }
            else {
                if (ProposalModel.id == null) { 
                    ProposalModel.id = count;
                };
                ProposalModel.save(function (err) { 
                    if (err) {
                        return console.error(err);
                    } else {
                        inHttpRes.json({result: "OK", inserted: sheetToAdd.title, 
                            id: sheetToAdd.id, createdBy: sheetToAdd.createdBy});
                    }
                })
            }
        })*/
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
    
    public static selectSheets(inPublicPersonal: string, inGeneralTags: string, inValueBasedTags: string, 
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
    
    public static selectSheetsByKeyword(inKeyword: string, inHttpRes: any) {
        SheetConnectionManager.getSheetModel().find({})
         .exec(function (err, sheets) {
                if (err) {
                    return console.error(err);
                } else {
                    let result: Array<any> = new Array<any>();
                    for (var i = 0; i < sheets.length; i++) {
                        let title:string = sheets[i].title;
                        let longTitle = sheets[i].longTitle;
                        let indexInTitle = title.indexOf(inKeyword);
                        let indexInLongTitle = longTitle.indexOf(inKeyword);
                        // search if the keyword in contained in esithe title or longTitle
                        if (title.indexOf(inKeyword) > -1 || longTitle.indexOf(inKeyword) > -1) {
                            result.push(sheets[i]);
                        } 
                    }
                    inHttpRes.json(result);
                }
            }
        )
    }
    
    public static getAccountAndPortfolioCapacityForInvestment(inCustomerId: string, inHttpRes: any) {
        // simulate statically; no point going to a DB since we do not update this info ever from the Front End
        let info = new Array<any>();
        if (inCustomerId == 'ugo') {
            info.push({type: "account", id: "1234-56", maxCapacity: 10000});
            info.push({type: "account", id: "9876-54-56", maxCapacity: 20000});
            info.push({type: "portfolio", id: "abcd-56", maxCapacity: 100000});
        } else {
            info.push({type: "account", id: "112233-56", maxCapacity: 30000});
            info.push({type: "account", id: "445566-56", maxCapacity: 40000});
            info.push({type: "account", id: "7788-99", maxCapacity: 70000});
            info.push({type: "portfolio", id: "xyz-12", maxCapacity: 200000});
        }
        inHttpRes.json(info);;
    }
}