///<reference path="../typings/mongodb/mongodb.d.ts" />
///<reference path="../typings/mongoose/mongoose.d.ts" />
"use strict";
var sheetConnectionManager_1 = require('../sheetConnectionManager/sheetConnectionManager');
var mockData_1 = require('./mockData');
var returnPeriod_1 = require('./returnPeriod');
var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');
var SheetRestService = (function () {
    function SheetRestService() {
    }
    SheetRestService.getSheetById = function (inId, inHttpRes) {
        sheetConnectionManager_1.SheetConnectionManager.connectAndOpen();
        sheetConnectionManager_1.SheetConnectionManager.getSheetModel().find({ 'id': +inId }, function (err, sheetModels) {
            if (err) {
                return console.error(err);
            }
            else {
                for (var i = 0; i < sheetModels.length; i++) {
                    SheetRestService.fillReturnDataLastMonth(sheetModels[i]);
                }
                inHttpRes.json(sheetModels);
                var hhh = inHttpRes;
            }
        });
    };
    SheetRestService.getAllSheets = function (inHttpRes) {
        sheetConnectionManager_1.SheetConnectionManager.connectAndOpen();
        sheetConnectionManager_1.SheetConnectionManager.getSheetModel().find(function (err, sheetModels) {
            if (err) {
                return console.error(err);
            }
            else {
                inHttpRes.json(sheetModels);
            }
        });
    };
    SheetRestService.getSomeSheets = function (inFromId, inMaxNoOfItems, inHttpRes) {
        var endId = (parseInt(inFromId) + parseInt(inMaxNoOfItems));
        console.log(endId);
        sheetConnectionManager_1.SheetConnectionManager.connectAndOpen();
        sheetConnectionManager_1.SheetConnectionManager.getSheetModel().find({ id: { $gte: inFromId, $lt: endId } }, function (err, sheetModels) {
            if (err) {
                return console.error(err);
            }
            else {
                inHttpRes.json(sheetModels);
            }
        });
    };
    SheetRestService.addSheet = function (inSheetToAdd, inHttpRes) {
        sheetConnectionManager_1.SheetConnectionManager.connectAndOpen();
        var SheetModel = sheetConnectionManager_1.SheetConnectionManager.getSheetModel();
        var sheetToAdd = new SheetModel(inSheetToAdd);
        SheetModel.count({}, function (err, count) {
            if (err) {
                return console.error(err);
            }
            else {
                // if there is no "id" in the sheet to be added, it means that it is a new personalization and 
                // need to be saved with a new ID (which, in our case hopefully, is the next ID available in the list)
                if (sheetToAdd.id == null) {
                    sheetToAdd.id = count;
                }
                ;
                sheetToAdd.save(function (err) {
                    if (err) {
                        return console.error(err);
                    }
                    else {
                        inHttpRes.json({ result: "OK", inserted: sheetToAdd.title,
                            id: sheetToAdd.id, createdBy: sheetToAdd.createdBy });
                    }
                });
            }
        });
    };
    SheetRestService.getProposals = function (inCustomerId, inHttpRes) {
        sheetConnectionManager_1.SheetConnectionManager.connectAndOpen();
        sheetConnectionManager_1.SheetConnectionManager.getProposalModel().find({ customerId: inCustomerId }, function (err, proposalModels) {
            if (err) {
                return console.error(err);
            }
            else {
                inHttpRes.json(proposalModels);
            }
        });
    };
    SheetRestService.getProposal = function (inProposalId, inHttpRes) {
        sheetConnectionManager_1.SheetConnectionManager.connectAndOpen();
        sheetConnectionManager_1.SheetConnectionManager.getProposalModel().findOne({ id: inProposalId }, function (err, proposalModel) {
            if (err) {
                return console.error(err);
            }
            else {
                inHttpRes.json(proposalModel);
            }
        });
    };
    SheetRestService.validateAndSaveProposal = function (inProposalAndUserLogged, inHttpRes) {
        var proposal = inProposalAndUserLogged.proposal;
        var userLogged = inProposalAndUserLogged.userLogged;
        var validationResults = this.validateProposal(proposal);
        if (proposal.isValid) {
            sheetConnectionManager_1.SheetConnectionManager.connectAndOpen();
            var ProposalModel = sheetConnectionManager_1.SheetConnectionManager.getProposalModel();
            var proposalToSave_1 = new ProposalModel(proposal);
            ProposalModel.count({}, function (err, count) {
                if (err) {
                    return console.error(err);
                }
                else {
                    if (proposalToSave_1.id == null) {
                        proposalToSave_1.id = count;
                    }
                    ;
                    proposalToSave_1.save(function (err) {
                        if (err) {
                            return console.error(err);
                        }
                        else {
                            inHttpRes.json({ result: "OK", id: proposalToSave_1.id });
                            sendMailForNewProposal(proposalToSave_1, userLogged);
                        }
                    });
                }
            });
        }
        else {
            inHttpRes.json({ result: "KO", validationResults: validationResults });
        }
    };
    SheetRestService.validateProposal = function (inProposal) {
        // mock logic for simulation purposes
        // if any investment in any asset is greater than a certain threshold, then the proposal is not valid 
        // One error message per investment over the threshold is sent back to the client
        var investmentThreshold = 10000;
        var isProposalValid = true;
        var validationResults = new Array();
        for (var i = 0; i < inProposal.assetGroupJSONs.length; i++) {
            var assetGroupJSON = inProposal.assetGroupJSONs[i];
            for (var j = 0; j < assetGroupJSON.assetJSONs.length; j++) {
                var assetJSON = assetGroupJSON.assetJSONs[j];
                if (assetJSON.investmentAmount > investmentThreshold) {
                    isProposalValid = false;
                    var validationResult = {
                        symbol: assetJSON.symbol,
                        validationCode: '001',
                        message: 'Investment ' + assetJSON.investmentAmount.toLocaleString('it') + ' higher than acceptable'
                    };
                    validationResults.push(validationResult);
                }
            }
        }
        inProposal.isValid = isProposalValid;
        return validationResults;
    };
    SheetRestService.sendProposal = function (inProposalToSend, res) {
        sheetConnectionManager_1.SheetConnectionManager.connectAndOpen();
        var ProposalModel = sheetConnectionManager_1.SheetConnectionManager.getProposalModel();
        var proposalToAdd = new ProposalModel(inProposalToSend);
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
    };
    SheetRestService.getTags = function (inTagName, inHttpRes) {
        sheetConnectionManager_1.SheetConnectionManager.connectAndOpen();
        sheetConnectionManager_1.SheetConnectionManager.getSheetModel().find({}).distinct(inTagName).exec(function (err, generalTags) {
            if (err) {
                return console.error(err);
            }
            else {
                inHttpRes.json(generalTags);
            }
        });
    };
    SheetRestService.getGeneralTags = function (inHttpRes) {
        sheetConnectionManager_1.SheetConnectionManager.connectAndOpen();
        sheetConnectionManager_1.SheetConnectionManager.getSheetModel().find({}).distinct('general').exec(function (err, generalTags) {
            if (err) {
                return console.error(err);
            }
            else {
                inHttpRes.json(generalTags);
            }
        });
    };
    SheetRestService.selectSheets = function (inPublicPersonal, inGeneralTags, inValueBasedTags, inSectorsTags, inHttpRes) {
        var publicPersonal = JSON.parse(inPublicPersonal);
        var generalTags = JSON.parse(inGeneralTags);
        var valueBasedTags = JSON.parse(inValueBasedTags);
        var sectorsTags = JSON.parse(inSectorsTags);
        sheetConnectionManager_1.SheetConnectionManager.connectAndOpen();
        var condition = {};
        var tagConditions = new Array();
        if (generalTags.length > 0) {
            tagConditions.push({ general: { $in: generalTags } });
        }
        if (valueBasedTags.length > 0) {
            tagConditions.push({ valueBased: { $in: valueBasedTags } });
        }
        if (sectorsTags.length > 0) {
            tagConditions.push({ sector: { $in: sectorsTags } });
        }
        var compositeTagCondition;
        if (tagConditions.length > 0) {
            compositeTagCondition = { $or: tagConditions };
        }
        else {
            compositeTagCondition = {};
        }
        var publicPersonalCondition;
        // if the array 'publicPersonal' contains 1 element it means that 'Pubblici' option has been selected
        // else if it contains 2 elements and the first one is null it means that 'Personalizzati' has been selected
        if (publicPersonal.length == 1) {
            publicPersonalCondition = { originalSheetID: null };
            condition = { $and: [publicPersonalCondition, compositeTagCondition] };
        }
        else if (publicPersonal.length == 2 && publicPersonal[0] == null && publicPersonal[1] != null) {
            publicPersonalCondition = { originalSheetID: { $ne: null } };
            condition = { $and: [publicPersonalCondition, compositeTagCondition] };
        }
        else {
            condition = compositeTagCondition;
        }
        sheetConnectionManager_1.SheetConnectionManager.getSheetModel().find(condition)
            .exec(function (err, sheets) {
            if (err) {
                return console.error(err);
            }
            else {
                inHttpRes.json(sheets);
            }
        });
    };
    SheetRestService.selectSheetsByKeyword = function (inKeyword, inHttpRes) {
        sheetConnectionManager_1.SheetConnectionManager.getSheetModel().find({})
            .exec(function (err, sheets) {
            if (err) {
                return console.error(err);
            }
            else {
                var result = new Array();
                for (var i = 0; i < sheets.length; i++) {
                    var title = sheets[i].title;
                    var longTitle = sheets[i].longTitle;
                    var indexInTitle = title.indexOf(inKeyword);
                    var indexInLongTitle = longTitle.indexOf(inKeyword);
                    // search if the keyword in contained in esithe title or longTitle
                    if (title.indexOf(inKeyword) > -1 || longTitle.indexOf(inKeyword) > -1) {
                        result.push(sheets[i]);
                    }
                }
                inHttpRes.json(result);
            }
        });
    };
    SheetRestService.getAccountAndPortfolioCapacityForInvestment = function (inCustomerId, inHttpRes) {
        // simulate statically; no point going to a DB since we do not update this info ever from the Front End
        var info = new Array();
        if (inCustomerId == 'ugo') {
            info.push({ type: "account", id: "1234-56", maxCapacity: 10000 });
            info.push({ type: "account", id: "9876-54-56", maxCapacity: 20000 });
            info.push({ type: "portfolio", id: "abcd-56", maxCapacity: 100000 });
        }
        else {
            info.push({ type: "account", id: "112233-56", maxCapacity: 30000 });
            info.push({ type: "account", id: "445566-56", maxCapacity: 40000 });
            info.push({ type: "account", id: "7788-99", maxCapacity: 70000 });
            info.push({ type: "portfolio", id: "xyz-12", maxCapacity: 200000 });
        }
        inHttpRes.json(info);
    };
    SheetRestService.getReturnData = function (inSheetId, inReturnPeriod, inHttpRes) {
        var returnData = new Array();
        var sheetId = +inSheetId;
        var period = +inReturnPeriod;
        switch (period) {
            case returnPeriod_1.ReturnPeriod.lastMonth:
                this.fillReturnDataArrayLastMonth(sheetId, returnData);
                break;
            case returnPeriod_1.ReturnPeriod.lastYear:
                this.fillReturnDataArrayLastYear(sheetId, returnData);
                break;
            case returnPeriod_1.ReturnPeriod.all:
                this.fillReturnDataArrayLastAll(sheetId, returnData);
                break;
            default:
                console.error('Return period for Sheets not supported -- Return period input: ' + period);
        }
        inHttpRes.json(returnData);
    };
    SheetRestService.getValueAtRisk = function (inSheetId, inHttpRes) {
        var max = 10;
        var min = 0;
        var newVaR = Math.random() * (max - min) + min;
        inHttpRes.json({ VaR: newVaR });
    };
    SheetRestService.getVolatility = function (inSheetId, inHttpRes) {
        var max = 25;
        var min = 0;
        var newVolatility = Math.random() * (max - min) + min;
        inHttpRes.json({ volatility: newVolatility });
    };
    SheetRestService.fillReturnDataArrayLastMonth = function (id, inRetunrData) {
        if (id == 1 || id == 4 || id == 7 || id == 10 || id == 13 || id == 16) {
            inRetunrData[0] = this.mockData.getReturnDataLastMonth1();
            inRetunrData[1] = this.mockData.getReturnDataLastMonth2(); // take the second series as benchmark
        }
        else if (id == 2 || id == 5 || id == 8 || id == 11 || id == 14) {
            inRetunrData[0] = this.mockData.getReturnDataLastMonth2();
            inRetunrData[1] = this.mockData.getReturnDataLastMonth3(); // take the third series as benchmark
        }
        else {
            inRetunrData[0] = this.mockData.getReturnDataLastMonth3();
            inRetunrData[1] = this.mockData.getReturnDataLastMonth1(); // take the first series as benchmark            
        }
    };
    SheetRestService.fillReturnDataArrayLastYear = function (id, inRetunrData) {
        if (id == 1 || id == 4 || id == 7 || id == 10 || id == 13 || id == 16) {
            inRetunrData[0] = this.mockData.getReturnDataLastYear1();
            inRetunrData[1] = this.mockData.getReturnDataLastYear2(); // take the second series as benchmark
        }
        else if (id == 2 || id == 5 || id == 8 || id == 11 || id == 14) {
            inRetunrData[0] = this.mockData.getReturnDataLastYear2();
            inRetunrData[1] = this.mockData.getReturnDataLastYear3(); // take the third series as benchmark
        }
        else {
            inRetunrData[0] = this.mockData.getReturnDataLastYear3();
            inRetunrData[1] = this.mockData.getReturnDataLastYear1(); // take the first series as benchmark      
        }
    };
    SheetRestService.fillReturnDataArrayLastAll = function (id, inRetunrData) {
        if (id == 1 || id == 4 || id == 7 || id == 10 || id == 13 || id == 16) {
            inRetunrData[0] = this.mockData.getReturnDataAll1();
            inRetunrData[1] = this.mockData.getReturnDataAll2(); // take the second series as benchmark
        }
        else if (id == 2 || id == 5 || id == 8 || id == 11 || id == 14) {
            inRetunrData[0] = this.mockData.getReturnDataAll2();
            inRetunrData[1] = this.mockData.getReturnDataAll3(); // take the third series as benchmark
        }
        else {
            inRetunrData[0] = this.mockData.getReturnDataAll3();
            inRetunrData[1] = this.mockData.getReturnDataAll1(); // take the first series as benchmark
        }
    };
    SheetRestService.fillReturnData = function (inSheetModel, inPeriod) {
        switch (inPeriod) {
            case returnPeriod_1.ReturnPeriod.lastMonth:
                this.fillReturnDataLastMonth(inSheetModel);
                break;
            case returnPeriod_1.ReturnPeriod.lastYear:
                this.fillReturnDataLastYear(inSheetModel);
                break;
            case returnPeriod_1.ReturnPeriod.all:
                this.fillReturnDataLastAll(inSheetModel);
                break;
            default:
                console.error('Return period for Sheets not supported -- Return period input: ' + inPeriod);
        }
    };
    SheetRestService.fillReturnDataLastMonth = function (inSheetModel) {
        var id = inSheetModel.id;
        if (id == 1 || id == 4 || id == 7 || id == 10 || id == 13 || id == 16) {
            //inSheetModel.benchmark = 'S&P 1312';
            inSheetModel.returnDataLastMonth = this.mockData.getReturnDataLastMonth1();
            inSheetModel.returnDataBenchmarkLastMonth = this.mockData.getReturnDataLastMonth2(); // take the second series as benchmark
        }
        else if (id == 2 || id == 5 || id == 8 || id == 11 || id == 14) {
            //inSheetModel.benchmark = 'Best Dream Index';
            inSheetModel.returnDataLastMonth = this.mockData.getReturnDataLastMonth2();
            inSheetModel.returnDataBenchmarkLastMonth = this.mockData.getReturnDataLastMonth3(); // take the third series as benchmark
        }
        else {
            //inSheetModel.benchmark = 'Worst Nitghmare Index';
            inSheetModel.returnDataLastMonth = this.mockData.getReturnDataLastMonth3();
            inSheetModel.returnDataBenchmarkLastMonth = this.mockData.getReturnDataLastMonth1(); // take the first series as benchmark            
        }
    };
    SheetRestService.fillReturnDataLastYear = function (inSheetModel) {
        var id = inSheetModel.id;
        if (id == 1 || id == 4 || id == 7 || id == 10 || id == 13 || id == 16) {
            inSheetModel.benchmark = 'S&P 1312';
            inSheetModel.returnDataLastYear = this.mockData.getReturnDataLastYear1();
            inSheetModel.returnDataBenchmarkLastYear = this.mockData.getReturnDataLastYear2(); // take the second series as benchmark
        }
        else if (id == 2 || id == 5 || id == 8 || id == 11 || id == 14) {
            inSheetModel.benchmark = 'Best Dream Index';
            inSheetModel.returnDataLastYear = this.mockData.getReturnDataLastYear2();
            inSheetModel.returnDataBenchmarkLastYear = this.mockData.getReturnDataLastYear3(); // take the third series as benchmark
        }
        else {
            inSheetModel.benchmark = 'Worst Nitghmare Index';
            inSheetModel.returnDataLastYear = this.mockData.getReturnDataLastYear3();
            inSheetModel.returnDataBenchmarkLastYear = this.mockData.getReturnDataLastYear1(); // take the first series as benchmark      
        }
    };
    SheetRestService.fillReturnDataLastAll = function (inSheetModel) {
        var id = inSheetModel.id;
        if (id == 1 || id == 4 || id == 7 || id == 10 || id == 13 || id == 16) {
            inSheetModel.benchmark = 'S&P 1312';
            inSheetModel.returnDataAll = this.mockData.getReturnDataAll1();
            inSheetModel.returnDataBenchmarkAll = this.mockData.getReturnDataAll2(); // take the second series as benchmark
        }
        else if (id == 2 || id == 5 || id == 8 || id == 11 || id == 14) {
            inSheetModel.benchmark = 'Best Dream Index';
            inSheetModel.returnDataAll = this.mockData.getReturnDataAll2();
            inSheetModel.returnDataBenchmarkAll = this.mockData.getReturnDataAll3(); // take the third series as benchmark
        }
        else {
            inSheetModel.benchmark = 'Worst Nitghmare Index';
            inSheetModel.returnDataAll = this.mockData.getReturnDataAll3();
            inSheetModel.returnDataBenchmarkAll = this.mockData.getReturnDataAll1(); // take the first series as benchmark
        }
    };
    SheetRestService.mockData = new mockData_1.MockData();
    return SheetRestService;
}());
exports.SheetRestService = SheetRestService;
var sendMailForNewProposal = function (inProposal, inUserLogged) {
    var auth = {
        auth: {
            api_key: 'key-5258e19c6ca5564c06ce5552f181d067',
            domain: 'sandbox2bae1d8b19864001920f8b327494ce41.mailgun.org'
        }
    };
    var transporter = nodemailer.createTransport(mg(auth));
    //var url = 'http://localhost:3000/Proposal/?proposalId=';
    var url = 'http://ec2-54-213-172-98.us-west-2.compute.amazonaws.com:8080/Proposal/?proposalId=';
    var mailOpts = {
        from: 'sheetsCustomerCare@sheetsCorporation.com',
        //to: 'enrico.piccinin@gmail.com',
        to: inUserLogged.mail,
        //subject: 'test subject',
        subject: inUserLogged.customerId + ', you have a new proposal',
        //text : 'test message form mailgun',
        text: 'Dear ' + inUserLogged.customerId,
        html: '<br><p>' + inUserLogged.pbId + ' has prepared for you a new <a href="' + url + inProposal.id + '">proposal</a></p>'
    };
    transporter.sendMail(mailOpts, function (err, response) {
        if (err) {
            console.log('error sending mail --- ' + err);
            return "Mail error.";
        }
        else {
            console.log('mail actually sent');
            return "Mail sent.";
        }
    });
};
//# sourceMappingURL=sheetRestService.js.map