///<reference path="../typings/mongodb/mongodb.d.ts" />
///<reference path="../typings/mongoose/mongoose.d.ts" />
var sheetConnectionManager_1 = require('../sheetConnectionManager/sheetConnectionManager');
var SheetRestService = (function () {
    function SheetRestService() {
    }
    SheetRestService.getSheetById = function (inId, inHttpRes) {
        sheetConnectionManager_1.SheetConnectionManager.connectAndOpen();
        sheetConnectionManager_1.SheetConnectionManager.getSheetModel().find({ 'id': +inId }, function (err, sheetModel) {
            if (err) {
                return console.error(err);
            }
            else {
                inHttpRes.json(sheetModel);
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
    SheetRestService.saveProposal = function (inProposalToSave, inHttpRes) {
        sheetConnectionManager_1.SheetConnectionManager.connectAndOpen();
        var ProposalModel = sheetConnectionManager_1.SheetConnectionManager.getProposalModel();
        var proposalToSave = new ProposalModel(inProposalToSave);
        ProposalModel.count({}, function (err, count) {
            if (err) {
                return console.error(err);
            }
            else {
                if (proposalToSave.id == null) {
                    proposalToSave.id = count;
                }
                ;
                proposalToSave.save(function (err) {
                    if (err) {
                        return console.error(err);
                    }
                    else {
                        inHttpRes.json({ result: "OK", id: proposalToSave.id });
                    }
                });
            }
        });
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
        ;
    };
    return SheetRestService;
})();
exports.SheetRestService = SheetRestService;
//# sourceMappingURL=sheetRestService.js.map