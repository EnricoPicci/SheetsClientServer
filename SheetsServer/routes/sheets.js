var express = require('express');
var router = express.Router();
var sheetRestService_1 = require('../sheetRestService/sheetRestService');
// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening 2.');
    next(); // make sure we go to the next routes and don't stop here
});
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    next();
});
/*
 * GET one sheet or the entire list of sheets
 */
router.get('/sheets', function (req, res) {
    var idOfSheetToGet = req.query.id;
    if (idOfSheetToGet) {
        sheetRestService_1.SheetRestService.getSheetById(idOfSheetToGet, res);
    }
    else {
        sheetRestService_1.SheetRestService.getSheets(res);
    }
});
/*
 * POST to add one sheet.
 */
router.post('/addsheet', function (req, res) {
    var sheetToAdd = req.body;
    sheetRestService_1.SheetRestService.addSheet(sheetToAdd, res);
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