///<reference path="../typings/mongodb/mongodb.d.ts" />
///<reference path="../typings/mongoose/mongoose.d.ts" />

import * as mongodb from "mongodb";
import * as mongoose from "mongoose";

import {SheetConnectionManager} from '../sheetConnectionManager/sheetConnectionManager';
import {MockData} from './mockData';
import {ReturnPeriod} from './returnPeriod';

export class SheetRestService { 
    static mockData = new MockData();
    
    public static getSheetById(inId: string, inHttpRes: any) {
        SheetConnectionManager.connectAndOpen();
        SheetConnectionManager.getSheetModel().find({ 'id': +inId }, function (err, sheetModels) {
                if (err) {
                    return console.error(err);
                } else {
                    for (var i = 0; i < sheetModels.length; i++) {
                        SheetRestService.fillReturnDataLastMonth(sheetModels[i]);
                    }
                    inHttpRes.json(sheetModels);
                    let hhh = inHttpRes;
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
    
    public static validateAndSaveProposal(inProposal: any, inHttpRes: any) {
        let validationResults = this.validateProposal(inProposal);
        if (inProposal.isValid) {
            SheetConnectionManager.connectAndOpen();
            let ProposalModel = SheetConnectionManager.getProposalModel();
            let proposalToSave = new ProposalModel(inProposal);
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
        } else{
            inHttpRes.json({result: "KO", validationResults: validationResults});
        }
    }
    
    private static validateProposal(inProposal: any) {
        // mock logic for simulation purposes
        // if any investment in any asset is greater than a certain threshold, then the proposal is not valid 
        // One error message per investment over the threshold is sent back to the client
        let investmentThreshold = 10000;
        let isProposalValid = true;
        let validationResults = new Array<any>();
        for (var i = 0; i < inProposal.assetGroupJSONs.length; i++) {
            let assetGroupJSON = inProposal.assetGroupJSONs[i];
            for (var j = 0; j < assetGroupJSON.assetJSONs.length; j++) {
                let assetJSON = assetGroupJSON.assetJSONs[j];
                if (assetJSON.investmentAmount > investmentThreshold) {
                    isProposalValid = false; 
                    let validationResult = {
                        symbol: assetJSON.symbol,
                        validationCode: '001',
                        message: 'Investment ' + assetJSON.investmentAmount.toLocaleString('it') + ' higher than acceptable'
                    }
                    validationResults.push(validationResult);
                }
            }
        }
        inProposal.isValid = isProposalValid;
        return validationResults;
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
        inHttpRes.json(info);
    }
    
    public static getReturnData(inSheetId: string, inReturnPeriod: string, inHttpRes: any) {
        let returnData = new Array<any>();
        let sheetId = +inSheetId;
        let period = +inReturnPeriod;
        switch(period) {
            case ReturnPeriod.lastMonth:
                this.fillReturnDataArrayLastMonth(sheetId, returnData);
                break;
            case ReturnPeriod.lastYear:
                this.fillReturnDataArrayLastYear(sheetId, returnData);
                break;
            case ReturnPeriod.all:
                this.fillReturnDataArrayLastAll(sheetId, returnData);
                break;                
            default:
                console.error('Return period for Sheets not supported -- Return period input: ' + period);
        }
        inHttpRes.json(returnData);
    }
    
    private static fillReturnDataArrayLastMonth(id: number, inRetunrData: Array<any>) {
        if (id == 1 || id == 4 || id == 7 || id == 10 || id == 13 || id == 16) {
            inRetunrData[0] = this.mockData.getReturnDataLastMonth1();
            inRetunrData[1] = this.mockData.getReturnDataLastMonth2(); // take the second series as benchmark
        } else if (id == 2 || id == 5 || id == 8 || id == 11 || id == 14) {
            inRetunrData[0] = this.mockData.getReturnDataLastMonth2(); 
            inRetunrData[1] = this.mockData.getReturnDataLastMonth3(); // take the third series as benchmark
        } else {
            inRetunrData[0] = this.mockData.getReturnDataLastMonth3();
            inRetunrData[1] = this.mockData.getReturnDataLastMonth1(); // take the first series as benchmark            
        }
    }
    
    private static fillReturnDataArrayLastYear(id: number, inRetunrData: Array<any>) {
        if (id == 1 || id == 4 || id == 7 || id == 10 || id == 13 || id == 16) {
            inRetunrData[0] = this.mockData.getReturnDataLastYear1();
            inRetunrData[1] = this.mockData.getReturnDataLastYear2(); // take the second series as benchmark
        } else if (id == 2 || id == 5 || id == 8 || id == 11 || id == 14) {
            inRetunrData[0] = this.mockData.getReturnDataLastYear2();
            inRetunrData[1] = this.mockData.getReturnDataLastYear3(); // take the third series as benchmark
        } else {
            inRetunrData[0] = this.mockData.getReturnDataLastYear3();
            inRetunrData[1] = this.mockData.getReturnDataLastYear1(); // take the first series as benchmark      
        }
    }
    
    private static fillReturnDataArrayLastAll(id: number, inRetunrData: Array<any>) {
        if (id == 1 || id == 4 || id == 7 || id == 10 || id == 13 || id == 16) {
            inRetunrData[0] = this.mockData.getReturnDataAll1();
            inRetunrData[1] = this.mockData.getReturnDataAll2(); // take the second series as benchmark
        } else if (id == 2 || id == 5 || id == 8 || id == 11 || id == 14) {
            inRetunrData[0] = this.mockData.getReturnDataAll2();
            inRetunrData[1] = this.mockData.getReturnDataAll3(); // take the third series as benchmark
        } else {
            inRetunrData[0] = this.mockData.getReturnDataAll3();
            inRetunrData[1] = this.mockData.getReturnDataAll1(); // take the first series as benchmark
        }
    }
    
    private static fillReturnData(inSheetModel, inPeriod: ReturnPeriod) {
        switch(inPeriod) {
            case ReturnPeriod.lastMonth:
                this.fillReturnDataLastMonth(inSheetModel);
                break;
            case ReturnPeriod.lastYear:
                this.fillReturnDataLastYear(inSheetModel);
                break;
            case ReturnPeriod.all:
                this.fillReturnDataLastAll(inSheetModel);
                break;                
            default:
                console.error('Return period for Sheets not supported -- Return period input: ' + inPeriod);
        }
    }
    
    private static fillReturnDataLastMonth(inSheetModel) {
        let id = inSheetModel.id;
        if (id == 1 || id == 4 || id == 7 || id == 10 || id == 13 || id == 16) {
            //inSheetModel.benchmark = 'S&P 1312';
            inSheetModel.returnDataLastMonth = this.mockData.getReturnDataLastMonth1();
            inSheetModel.returnDataBenchmarkLastMonth = this.mockData.getReturnDataLastMonth2(); // take the second series as benchmark
        } else if (id == 2 || id == 5 || id == 8 || id == 11 || id == 14) {
            //inSheetModel.benchmark = 'Best Dream Index';
            inSheetModel.returnDataLastMonth = this.mockData.getReturnDataLastMonth2(); 
            inSheetModel.returnDataBenchmarkLastMonth = this.mockData.getReturnDataLastMonth3(); // take the third series as benchmark
        } else {
            //inSheetModel.benchmark = 'Worst Nitghmare Index';
            inSheetModel.returnDataLastMonth = this.mockData.getReturnDataLastMonth3();
            inSheetModel.returnDataBenchmarkLastMonth = this.mockData.getReturnDataLastMonth1(); // take the first series as benchmark            
        }
    }
    
    private static fillReturnDataLastYear(inSheetModel) {
        let id = inSheetModel.id;
        if (id == 1 || id == 4 || id == 7 || id == 10 || id == 13 || id == 16) {
            inSheetModel.benchmark = 'S&P 1312';
            inSheetModel.returnDataLastYear = this.mockData.getReturnDataLastYear1();
            inSheetModel.returnDataBenchmarkLastYear = this.mockData.getReturnDataLastYear2(); // take the second series as benchmark
        } else if (id == 2 || id == 5 || id == 8 || id == 11 || id == 14) {
            inSheetModel.benchmark = 'Best Dream Index';
            inSheetModel.returnDataLastYear = this.mockData.getReturnDataLastYear2();
            inSheetModel.returnDataBenchmarkLastYear = this.mockData.getReturnDataLastYear3(); // take the third series as benchmark
        } else {
            inSheetModel.benchmark = 'Worst Nitghmare Index';
            inSheetModel.returnDataLastYear = this.mockData.getReturnDataLastYear3();
            inSheetModel.returnDataBenchmarkLastYear = this.mockData.getReturnDataLastYear1(); // take the first series as benchmark      
        }
    }
    
    private static fillReturnDataLastAll(inSheetModel) {
        let id = inSheetModel.id;
        if (id == 1 || id == 4 || id == 7 || id == 10 || id == 13 || id == 16) {
            inSheetModel.benchmark = 'S&P 1312';
            inSheetModel.returnDataAll = this.mockData.getReturnDataAll1();
            inSheetModel.returnDataBenchmarkAll = this.mockData.getReturnDataAll2(); // take the second series as benchmark
        } else if (id == 2 || id == 5 || id == 8 || id == 11 || id == 14) {
            inSheetModel.benchmark = 'Best Dream Index';
            inSheetModel.returnDataAll = this.mockData.getReturnDataAll2();
            inSheetModel.returnDataBenchmarkAll = this.mockData.getReturnDataAll3(); // take the third series as benchmark
        } else {
            inSheetModel.benchmark = 'Worst Nitghmare Index';
            inSheetModel.returnDataAll = this.mockData.getReturnDataAll3();
            inSheetModel.returnDataBenchmarkAll = this.mockData.getReturnDataAll1(); // take the first series as benchmark
        }
    }
    
}