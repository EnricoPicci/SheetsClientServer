var express = require('express');
var router = express.Router();
var sheetRestService_1 = require('../sheetRestService/sheetRestService');
/*
 * GET sheet.
 */
router.get('/sheet/:id', function (req, res) {
    var idOfSheetToGet = req.params.id;
    console.log('Id of sheet: --  ' + idOfSheetToGet);
    sheetRestService_1.SheetRestService.getSheetById(idOfSheetToGet, res);
});
/*
 * GET sheetlist.
 */
router.get('/sheets', function (req, res) {
    var idOfSheetToGet = req.params.id;
    console.log('Id of sheet: --  ' + idOfSheetToGet);
    sheetRestService_1.SheetRestService.getSheetById('1', res);
});
/*
 * POST to addsheet.
 */
router.post('/adduser', function (req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    collection.insert(req.body, function (err, result) {
        console.log('error: --  ' + err);
        console.log('result: --  ' + result);
        console.log('req params -- ' + req.params);
        console.log('req body -- ' + req.params);
        res.send((err === null) ? { msg: '' } : { msg: err });
    });
});
/*
 * DELETE to deletesheet.
 */
router.delete('/deleteuser/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    console.log(req.params);
    var userToDelete = req.params.id;
    collection.remove({ '_id': userToDelete }, function (err) {
        res.send((err === null) ? { msg: '' } : { msg: 'error: ' + err });
    });
});
module.exports = router;
//# sourceMappingURL=sheets.js.map