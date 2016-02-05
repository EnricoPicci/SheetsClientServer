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
    SheetRestService.selectSheets = function (inSearchString, inPublicPersonal, inGeneralTags, inValueBasedTags, inSectorsTags, inHttpRes) {
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
        /*conditionTags = {$or:
            [{general: { $in: generalTags }},
            {valueBased: { $in: valueBasedTags }},
            {sector: { $in: sectorsTags }}]
        };*/
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
        /*let condition = {$or:
            [{general: { $in: generalTags }},
            {valueBased: { $in: valueBasedTags }},
            {sector: { $in: sectorsTags }}]
        };*/
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
    return SheetRestService;
})();
exports.SheetRestService = SheetRestService;
//# sourceMappingURL=sheetRestService.js.map