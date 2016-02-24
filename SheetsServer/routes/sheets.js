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
 * GET one sheet
 */
router.get('/sheet', function (req, res) {
    var idOfSheetToGet = req.query.id;
    sheetRestService_1.SheetRestService.getSheetById(idOfSheetToGet, res);
});
/*
 * GET the entire list of sheets
 */
router.get('/sheets', function (req, res) {
    sheetRestService_1.SheetRestService.getAllSheets(res);
});
/*
 * GET SOME SHEETS get a list of sheets
 */
router.get('/someSheets', function (req, res) {
    var fromId = req.query.fromId;
    var maxNoOfItems = req.query.maxNoOfItems;
    sheetRestService_1.SheetRestService.getSomeSheets(fromId, maxNoOfItems, res);
    //SheetRestService.getSheets(res);
});
/*
 * GET tags
 */
router.get('/generalTags', function (req, res) {
    sheetRestService_1.SheetRestService.getTags('general', res);
});
router.get('/valueBasedTags', function (req, res) {
    sheetRestService_1.SheetRestService.getTags('valueBased', res);
});
router.get('/sectorTags', function (req, res) {
    sheetRestService_1.SheetRestService.getTags('sector', res);
});
/*
 * GET to SELECT SHEETS based on different criteria
 */
router.get('/selectSheets', function (req, res) {
    var publicPersonal = req.query.publicPersonal;
    var generalTags = req.query.generalTags;
    var valueBasedTags = req.query.valueBasedTags;
    var sectorsTags = req.query.sectorsTags;
    sheetRestService_1.SheetRestService.selectSheets(publicPersonal, generalTags, valueBasedTags, sectorsTags, res);
});
/*
 * GET to SELECT SHEETS based on a keyword
 */
router.get('/searchSheetsByKeyword', function (req, res) {
    var searchString = req.query.keyword;
    sheetRestService_1.SheetRestService.selectSheetsByKeyword(searchString, res);
});
/*
 * GET return data for one sheet for a certain period
 */
router.get('/getReturnData', function (req, res) {
    var sheetId = req.query.sheetId;
    var returnPeriod = req.query.returnPeriod;
    sheetRestService_1.SheetRestService.getReturnData(sheetId, returnPeriod, res);
});
/*
 * GET information about the capacity of accounts and portfolio of a customer
 */
router.get('/getAccountAndPortfolioCapacityForInvestment', function (req, res) {
    var customerId = req.query.customerId;
    sheetRestService_1.SheetRestService.getAccountAndPortfolioCapacityForInvestment(customerId, res);
});
/*
 * GET proposals of a customer
 */
router.get('/getProposals', function (req, res) {
    var customerId = req.query.customerId;
    sheetRestService_1.SheetRestService.getProposals(customerId, res);
});
/*
 * POST to add one sheet.
 */
router.post('/addsheet', function (req, res) {
    var sheetToAdd = req.body;
    sheetRestService_1.SheetRestService.addSheet(sheetToAdd, res);
});
/*
 * POST to save one proposal.
 */
router.post('/validateAndSaveProposal', function (req, res) {
    var proposalToSave = req.body;
    sheetRestService_1.SheetRestService.validateAndSaveProposal(proposalToSave, res);
});
/*
 * POST to send one proposal to a customer
 */
router.post('/sendProposal', function (req, res) {
    var proposalToSend = req.body;
    sheetRestService_1.SheetRestService.sendProposal(proposalToSend, res);
});
module.exports = router;
//# sourceMappingURL=sheets.js.map