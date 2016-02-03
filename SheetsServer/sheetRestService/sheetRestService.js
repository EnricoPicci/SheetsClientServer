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
    SheetRestService.getSheets = function (inHttpRes) {
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
    SheetRestService.addSheet = function (inSheetToAdd, inHttpRes) {
        sheetConnectionManager_1.SheetConnectionManager.connectAndOpen();
        var SheetModel = sheetConnectionManager_1.SheetConnectionManager.getSheetModel();
        var sheetToAdd = new SheetModel(inSheetToAdd);
        /*if (sheetToAdd.id == null) {
            let newId = this.getNextSheetID(SheetModel);
            sheetToAdd.id = newId;
        }*/
        SheetModel.where('id').ne(null).count(function (err, count) {
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
                        inHttpRes.json({ result: "OK", inserted: sheetToAdd.title });
                    }
                });
            }
        });
        /*sheetToAdd.save(function (err) {
                if (err) {
                    return console.error(err);
                } else {
                    inHttpRes.json({result: "OK", inserted: sheetToAdd.title});
                }
            }
        )*/
    };
    SheetRestService.getNextSheetID = function (inModel) {
        return inModel.where('id').ne(null).count();
    };
    return SheetRestService;
})();
exports.SheetRestService = SheetRestService;
//# sourceMappingURL=sheetRestService.js.map