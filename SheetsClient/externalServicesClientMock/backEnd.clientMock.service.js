System.register(['../app/sheet', '../app/sheetBackEnd.service', '../app/asset', '../app/assetGroup', '../app/returnPeriod', './mockData'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var sheet_1, sheetBackEnd_service_1, asset_1, assetGroup_1, returnPeriod_1, mockData_1;
    var BackEndClientMock;
    return {
        setters:[
            function (sheet_1_1) {
                sheet_1 = sheet_1_1;
            },
            function (sheetBackEnd_service_1_1) {
                sheetBackEnd_service_1 = sheetBackEnd_service_1_1;
            },
            function (asset_1_1) {
                asset_1 = asset_1_1;
            },
            function (assetGroup_1_1) {
                assetGroup_1 = assetGroup_1_1;
            },
            function (returnPeriod_1_1) {
                returnPeriod_1 = returnPeriod_1_1;
            },
            function (mockData_1_1) {
                mockData_1 = mockData_1_1;
            }],
        execute: function() {
            BackEndClientMock = (function (_super) {
                __extends(BackEndClientMock, _super);
                function BackEndClientMock() {
                    _super.apply(this, arguments);
                    this.mockData = new mockData_1.MockData();
                    this.description = 'The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad.';
                }
                BackEndClientMock.prototype.getSheet = function (inId) {
                    return this.getSomeSheets(inId, 1)[0];
                };
                BackEndClientMock.prototype.getSheetWithDetails = function (inId) {
                    this.getSheet(inId);
                    this.fillDetails(this.getSheet(inId));
                    return null;
                };
                BackEndClientMock.prototype.getSomeSheets = function (inFromPosition, inMaxNumberOfSheets) {
                    var sheets = new Array();
                    var sheetsCreated = this.createSheets();
                    var createdBY = 'CocoonTechies';
                    if (inMaxNumberOfSheets >= sheetsCreated.length) {
                        inMaxNumberOfSheets = sheetsCreated.length;
                    }
                    for (var i = 0; i < inMaxNumberOfSheets; i++) {
                        sheets[i] = sheetsCreated[i + inFromPosition];
                        // for the moment fills the Sheet with fixed data regardless the Sheet received as input
                        sheets[i].oneYearReturn = '11%';
                        sheets[i].oneMonthReturn = '6%';
                        sheets[i].dailyChange = '2%';
                        sheets[i].description = this.description;
                        sheets[i].createdBy = createdBY;
                        this.fillDetails(sheets[i]);
                    }
                    // call the stringify() method if you want to print on the console the list of Sheets as JSON strings
                    //this.stringifyToJSON(sheets);
                    return sheets;
                };
                BackEndClientMock.prototype.fillDetails = function (inSheet) {
                    inSheet.assetGroups = this.getAssetGroups(inSheet);
                    this.fillReturnData(inSheet, returnPeriod_1.ReturnPeriod.lastMonth);
                    return inSheet;
                };
                BackEndClientMock.prototype.selectSheets = function (searchString, publicPersonal, generalTags, valueBasedTags, sectorsTags) {
                    var ret = new Array();
                    var sheets = this.createSheets();
                    var tempArr = {};
                    for (var i = 0; i < sheets.length; i++) {
                        for (var j = 0; j < generalTags.length; j++) {
                            if (sheets[i].general === generalTags[j]) {
                                tempArr[sheets[i].title] = sheets[i];
                            }
                        }
                    }
                    for (var i = 0; i < sheets.length; i++) {
                        for (var j = 0; j < valueBasedTags.length; j++) {
                            if (sheets[i].valueBased === valueBasedTags[j]) {
                                tempArr[sheets[i].title] = sheets[i];
                            }
                        }
                    }
                    for (var i = 0; i < sheets.length; i++) {
                        for (var j = 0; j < sectorsTags.length; j++) {
                            if (sheets[i].sector === sectorsTags[j]) {
                                tempArr[sheets[i].title] = sheets[i];
                            }
                        }
                    }
                    var i = 0;
                    for (var key in tempArr) {
                        ret[i] = tempArr[key];
                        i++;
                    }
                    // if there are no selections, then we return the entire list
                    if (ret.length == 0) {
                        ret = sheets;
                    }
                    return ret;
                };
                BackEndClientMock.prototype.addSheet = function (inSheet) {
                    console.log('Add Sheet function not available in clientMock');
                    console.log('JSON sent to back end:');
                    console.log(inSheet.jsonStringForBackEnd());
                };
                BackEndClientMock.prototype.getGeneralSearchCriteriaDomain = function () {
                    var ret = new Array();
                    ret[0] = 'New';
                    ret[1] = 'Popular';
                    ret[2] = 'Brands u know';
                    return ret;
                };
                ;
                BackEndClientMock.prototype.getValueBasedSearchCriteriaDomain = function () {
                    var ret = new Array();
                    ret[0] = 'Green';
                    ret[1] = 'Social';
                    ret[2] = 'Political';
                    ret[3] = 'Current';
                    return ret;
                };
                ;
                BackEndClientMock.prototype.getSectorsSearchCriteriaDomain = function () {
                    var ret = new Array();
                    ret[0] = 'Energy';
                    ret[1] = 'Health';
                    ret[2] = 'FS';
                    ret[3] = 'Real  Estate';
                    ret[4] = 'Retail';
                    return ret;
                };
                ;
                BackEndClientMock.prototype.createSheets = function () {
                    var sheets = new Array();
                    sheets[0] = new sheet_1.Sheet(0, 'Bear Int Market', 'International bears move on', '../images/bears.jpg', '26.1', 4.0, 12.2, 'Brands u know', 'Green', 'Energy');
                    sheets[1] = new sheet_1.Sheet(1, 'Bear US Sectors', 'US bears roars in several sectors', '../images/cyclingBear.jpg', '14.0', 5.3, 11.3, 'Popular', 'Current', 'Health');
                    sheets[2] = new sheet_1.Sheet(2, 'Enengia Pulita', 'Clean energy from italian gymns', '../images/windMills.jpg', '12.4', 0.3, 8.8, 'Popular', 'Green', 'FS');
                    sheets[3] = new sheet_1.Sheet(3, 'China internet', 'Many chines will shop online soon', '../images/chinaInternet.jpg', '11.2', 8.8, 25.5, 'New', 'Political', 'Real Estate');
                    sheets[4] = new sheet_1.Sheet(4, 'Mercati Orso USA', 'Orso americano non ruggisce solo a UCLA', '../images/usBear.jpg', '10.7', 4.3, 15.5, 'New', 'Political', 'Retail');
                    sheets[5] = new sheet_1.Sheet(5, 'Slot Machines and Casino', 'Everybody hopes tomorrow will be their luck day', '../images/games.jpg', '8.6', 5.0, 14.3, 'Popular', 'Green', 'FS');
                    sheets[6] = new sheet_1.Sheet(6, 'IPO recenti', 'Molti imprenditori tentano la fortuna', '../images/ipos.jpg', '7.5', 2.2, 3.4, 'Popular', 'Social', 'FS');
                    sheets[7] = new sheet_1.Sheet(7, 'Sci su erba', 'Fa troppo caldo, non si vede neve, sciamo con in cingoli', '../images/2Hot.jpg', '5.5', 2.1, 2.2, 'New', 'Social', 'Energy');
                    sheets[8] = new sheet_1.Sheet(8, 'Vanity Fair', 'Gli uomini sono diventati più vanitosi delle donne', '../images/vanity.jpg', '5.3', 7.1, 23.3, 'New', 'Current', 'Health');
                    sheets[9] = new sheet_1.Sheet(9, 'Caffe e tea', 'Il te verde fa specialmente bene', '../images/coffe.jpg', '4.9', 3.2, 8.9, 'Popular', 'Social', 'Health');
                    sheets[10] = new sheet_1.Sheet(10, 'Hot Retail', 'Tezinis, Benetton, Autostrade', '../images/shopping.jpg', '2.0', 5.1, 12.2, 'New', 'Current', 'Retail');
                    sheets[11] = new sheet_1.Sheet(11, 'Deflazione', 'Domani le tue banconote hanno più valore di oggi', '../images/deflation.jpg', '1.1', 2.2, 4.0, 'Popular', 'Social', 'FS');
                    sheets[12] = new sheet_1.Sheet(12, 'Stagflazione', 'Non so cosa voglia dire', '../images/office.jpg', '1.0', 0.2, 1.1, 'New', 'Green', 'FS');
                    sheets[13] = new sheet_1.Sheet(13, 'Ebola', 'Su questo non si scherza', '../images/ebola.jpg', '0.9', 0.3, 0.9, 'Popular', 'Current', 'Retail');
                    sheets[14] = new sheet_1.Sheet(14, 'Foodies', 'The last frontier of our beloved western world', '../images/foodies.jpg', '0.8', 1.1, 2.5, 'Popular', 'Social', 'Retail');
                    sheets[15] = new sheet_1.Sheet(15, 'RIP', 'Investire in una cosa sicura', '../images/forRent.jpg', '0.7', 6.2, 14.4, 'Popular', 'Political', 'Health');
                    sheets[16] = new sheet_1.Sheet(16, 'Bye Bye Baby', 'The last opportunity for us', '../images/shopFromHome.jpg', '0.6', 2.2, 4.5, 'New', 'Current', 'Retail');
                    return sheets;
                };
                BackEndClientMock.prototype.getAssetGroups = function (inSheet) {
                    var id = inSheet.id;
                    var ret = new Array();
                    var assetGroup;
                    var assets1 = new Array();
                    var assets2 = new Array();
                    var assets3 = new Array();
                    var assets4 = new Array();
                    if (id == 1 || id == 4 || id == 7 || id == 10 || id == 13 || id == 16) {
                        assets1[0] = new asset_1.Asset('Diamond Inc.', 'SAD', 5, '6%', '42%', 0, 10);
                        assets1[1] = new asset_1.Asset('Indian African Co.', 'IAC', 8, '2%', '12%', 5, 15);
                        assets1[2] = new asset_1.Asset('Plutonion International', 'PLI', 12, '1%', '15%', 10, 20);
                        assets1[3] = new asset_1.Asset('Cape Wineries Plc', 'CWN', 20, '1%', '15%', 15, 30);
                        assetGroup = new assetGroup_1.AssetGroup('South Africa', 45, '11%', '4%', assets1, 30, 75);
                        //assetGroup.sheet = inSheet;
                        /*assets1[0].assetGroup = assetGroup;
                        assets1[1].assetGroup = assetGroup;
                        assets1[2].assetGroup = assetGroup;
                        assets1[3].assetGroup = assetGroup;*/
                        ret[0] = assetGroup;
                        assets2[0] = new asset_1.Asset('Tea and Coffee Inc.', 'TCI', 6, '12%', '32%', 0, 10);
                        assets2[1] = new asset_1.Asset('Caribe Banana Co.', 'CBC', 24, '12%', '22%', 10, 25);
                        assets2[2] = new asset_1.Asset('Rasta Co', 'RCO', 5, '2%', '20%', 5, 7);
                        assetGroup = new assetGroup_1.AssetGroup('Jamaica', 35, '21%', '2%', assets2, 15, 42);
                        //assetGroup.sheet = inSheet;
                        /*assets2[0].assetGroup = assetGroup;
                        assets2[1].assetGroup = assetGroup;
                        assets2[2].assetGroup = assetGroup;*/
                        ret[1] = assetGroup;
                        assets3[0] = new asset_1.Asset('Mekong Lmtd', 'MKL', 6, '6%', '2%', 5, 25);
                        assets3[1] = new asset_1.Asset('Monks', 'MNK', 0, '7%', '17%', 0, 15);
                        assets3[2] = new asset_1.Asset('Mangoes Del Monte', 'MDM', 4, '7%', '17%', 0, 10);
                        assetGroup = new assetGroup_1.AssetGroup('Cambodia', 10, '14%', '3%', assets3, 5, 50);
                        //assetGroup.sheet = inSheet;
                        /*assets3[0].assetGroup = assetGroup;
                        assets3[1].assetGroup = assetGroup;
                        assets3[2].assetGroup = assetGroup;*/
                        ret[2] = assetGroup;
                        assets4[0] = new asset_1.Asset('Kim Lmtd', 'KLM', 5, '6%', '2%', 5, 30);
                        assets4[1] = new asset_1.Asset('Kim Unlimited', 'KUL', 5, '7%', '17%', 0, 20);
                        assetGroup = new assetGroup_1.AssetGroup('North Korea', 10, '14%', '3%', assets4, 5, 50);
                        //assetGroup.sheet = inSheet;
                        /*assets4[0].assetGroup = assetGroup;
                        assets4[1].assetGroup = assetGroup;*/
                        ret[3] = assetGroup;
                    }
                    else {
                        assets1[0] = new asset_1.Asset('Diamond Inc.', 'SAD', 10, '6%', '42%', 0, 10);
                        assets1[1] = new asset_1.Asset('Indian African Co.', 'IAC', 10, '2%', '12%', 0, 45);
                        assets1[2] = new asset_1.Asset('Plutonion International', 'PLI', 15, '1%', '15%', 0, 20);
                        assets1[3] = new asset_1.Asset('Cape Wineries Plc', 'CWN', 20, '1%', '15%', 0, 30);
                        assetGroup = new assetGroup_1.AssetGroup('South Africa', 55, '11%', '4%', assets1, 0, 100);
                        //assetGroup.sheet = inSheet;
                        /* assets1[0].assetGroup = assetGroup;
                         assets1[1].assetGroup = assetGroup;
                         assets1[2].assetGroup = assetGroup;
                         assets1[3].assetGroup = assetGroup;*/
                        ret[0] = assetGroup;
                        assets2[0] = new asset_1.Asset('Tea and Coffee Inc.', 'TCI', 5, '12%', '32%', 0, 30);
                        assets2[1] = new asset_1.Asset('Caribe Banana Co.', 'CBC', 15, '12%', '22%', 0, 25);
                        assets2[2] = new asset_1.Asset('Rasta Co', 'RCO', 5, '2%', '20%', 0, 45);
                        assetGroup = new assetGroup_1.AssetGroup('Jamaica', 25, '21%', '2%', assets2, 0, 100);
                        //assetGroup.sheet = inSheet;
                        /*assets2[0].assetGroup = assetGroup;
                        assets2[1].assetGroup = assetGroup;
                        assets2[2].assetGroup = assetGroup;*/
                        ret[1] = assetGroup;
                        assets3[0] = new asset_1.Asset('Mekong Lmtd', 'MKL', 2, '6%', '2%', 0, 45);
                        assets3[1] = new asset_1.Asset('Monks', 'MNK', 2, '7%', '17%', 0, 15);
                        assets3[2] = new asset_1.Asset('Mangoes Del Monte', 'MDM', 6, '7%', '17%', 0, 40);
                        assetGroup = new assetGroup_1.AssetGroup('Cambodia', 10, '14%', '3%', assets3, 0, 100);
                        //assetGroup.sheet = inSheet;
                        /*assets3[0].assetGroup = assetGroup;
                        assets3[1].assetGroup = assetGroup;
                        assets3[2].assetGroup = assetGroup;*/
                        ret[2] = assetGroup;
                        assets4[0] = new asset_1.Asset('Kim Lmtd', 'KLM', 8, '6%', '2%', 0, 30);
                        assets4[1] = new asset_1.Asset('Kim Unlimited', 'KUL', 2, '7%', '17%', 0, 70);
                        assetGroup = new assetGroup_1.AssetGroup('North Korea', 10, '14%', '3%', assets4, 0, 100);
                        //assetGroup.sheet = inSheet;
                        /*assets4[0].assetGroup = assetGroup;
                        assets4[1].assetGroup = assetGroup;*/
                        ret[3] = assetGroup;
                    }
                    return ret;
                };
                BackEndClientMock.prototype.fillReturnData = function (inSheet, inPeriod) {
                    switch (inPeriod) {
                        case returnPeriod_1.ReturnPeriod.lastMonth:
                            this.fillReturnDataLastMonth(inSheet);
                            break;
                        case returnPeriod_1.ReturnPeriod.lastYear:
                            this.fillReturnDataLastYear(inSheet);
                            break;
                        case returnPeriod_1.ReturnPeriod.all:
                            this.fillReturnDataLastAll(inSheet);
                            break;
                        default:
                            console.error('Return period for Sheets not supported -- Return period input: ' + inPeriod);
                    }
                };
                BackEndClientMock.prototype.fillReturnDataLastMonth = function (inSheet) {
                    var id = inSheet.id;
                    if (id == 1 || id == 4 || id == 7 || id == 10 || id == 13 || id == 16) {
                        inSheet.benchmark = 'S&P 1312';
                        inSheet.returnDataLastMonth.data = this.mockData.getReturnDataLastMonth1();
                        inSheet.returnDataBenchmarkLastMonth.data = this.mockData.getReturnDataLastMonth2(); // take the second series as benchmark
                    }
                    else if (id == 2 || id == 5 || id == 8 || id == 11 || id == 14) {
                        inSheet.benchmark = 'Best Dream Index';
                        inSheet.returnDataLastMonth.data = this.mockData.getReturnDataLastMonth2();
                        inSheet.returnDataBenchmarkLastMonth.data = this.mockData.getReturnDataLastMonth3(); // take the third series as benchmark
                    }
                    else {
                        inSheet.benchmark = 'Worst Nitghmare Index';
                        inSheet.returnDataLastMonth.data = this.mockData.getReturnDataLastMonth3();
                        inSheet.returnDataBenchmarkLastMonth.data = this.mockData.getReturnDataLastMonth1(); // take the first series as benchmark            
                    }
                };
                BackEndClientMock.prototype.fillReturnDataLastYear = function (inSheet) {
                    var id = inSheet.id;
                    if (id == 1 || id == 4 || id == 7 || id == 10 || id == 13 || id == 16) {
                        inSheet.benchmark = 'S&P 1312';
                        inSheet.returnDataLastYear.data = this.mockData.getReturnDataLastYear1();
                        inSheet.returnDataBenchmarkLastYear.data = this.mockData.getReturnDataLastYear2(); // take the second series as benchmark
                    }
                    else if (id == 2 || id == 5 || id == 8 || id == 11 || id == 14) {
                        inSheet.benchmark = 'Best Dream Index';
                        inSheet.returnDataLastYear.data = this.mockData.getReturnDataLastYear2();
                        inSheet.returnDataBenchmarkLastYear.data = this.mockData.getReturnDataLastYear3(); // take the third series as benchmark
                    }
                    else {
                        inSheet.benchmark = 'Worst Nitghmare Index';
                        inSheet.returnDataLastYear.data = this.mockData.getReturnDataLastYear3();
                        inSheet.returnDataBenchmarkLastYear.data = this.mockData.getReturnDataLastYear1(); // take the first series as benchmark      
                    }
                };
                BackEndClientMock.prototype.fillReturnDataLastAll = function (inSheet) {
                    var id = inSheet.id;
                    if (id == 1 || id == 4 || id == 7 || id == 10 || id == 13 || id == 16) {
                        inSheet.benchmark = 'S&P 1312';
                        inSheet.returnDataAll.data = this.mockData.getReturnDataAll1();
                        inSheet.returnDataBenchmarkAll.data = this.mockData.getReturnDataAll2(); // take the second series as benchmark
                    }
                    else if (id == 2 || id == 5 || id == 8 || id == 11 || id == 14) {
                        inSheet.benchmark = 'Best Dream Index';
                        inSheet.returnDataAll.data = this.mockData.getReturnDataAll2();
                        inSheet.returnDataBenchmarkAll.data = this.mockData.getReturnDataAll3(); // take the third series as benchmark
                    }
                    else {
                        inSheet.benchmark = 'Worst Nitghmare Index';
                        inSheet.returnDataAll.data = this.mockData.getReturnDataAll3();
                        inSheet.returnDataBenchmarkAll.data = this.mockData.getReturnDataAll1(); // take the first series as benchmark
                    }
                };
                BackEndClientMock.prototype.updateValueAtRisk = function (inSheet) {
                    var max = 10;
                    var min = 0;
                    var newVaR = Math.random() * (max - min) + min;
                    inSheet.valueAtRisk = newVaR;
                };
                ;
                BackEndClientMock.prototype.updateVolatility = function (inSheet) {
                    var max = 25;
                    var min = 0;
                    var newVaR = Math.random() * (max - min) + min;
                    inSheet.volatility = newVaR;
                };
                ;
                BackEndClientMock.prototype.updateReturnData = function (inSheet, inPeriod) {
                    // return data are updated randomly using one of the series available
                    var max = 3;
                    var min = 1;
                    var randomIdForReturnDataSeries = Math.floor(Math.random() * (max - min + 1)) + min;
                    switch (randomIdForReturnDataSeries) {
                        case 1:
                            inSheet.returnDataLastMonth.data = this.mockData.getReturnDataLastMonth1();
                            inSheet.returnDataLastYear.data = this.mockData.getReturnDataLastYear1();
                            inSheet.returnDataAll.data = this.mockData.getReturnDataAll1();
                            break;
                        case 2:
                            inSheet.returnDataLastMonth.data = this.mockData.getReturnDataLastMonth2();
                            inSheet.returnDataLastYear.data = this.mockData.getReturnDataLastYear2();
                            inSheet.returnDataAll.data = this.mockData.getReturnDataAll2();
                            break;
                        case 3:
                            inSheet.returnDataLastMonth.data = this.mockData.getReturnDataLastMonth3();
                            inSheet.returnDataLastYear.data = this.mockData.getReturnDataLastYear3();
                            inSheet.returnDataAll.data = this.mockData.getReturnDataAll3();
                            break;
                        default:
                            console.error('Series of return data not present in local mock -- Series Id requested: ' + randomIdForReturnDataSeries);
                    }
                };
                BackEndClientMock.prototype.stringifyToJSON = function (inSheets) {
                    /*let sheetJSONs: Array<SheetJSON> = new Array<SheetJSON>();
                    for (var i = 0; i < inSheets.length; i++) {
                        let sheetJSON = new SheetJSON();
                        sheetJSON.fill(inSheets[i]);
                        sheetJSONs.push(sheetJSON);
                    }
                    console.log( JSON.stringify(sheetJSONs, null, "    ") );*/
                    for (var i = 0; i < inSheets.length; i++) {
                        console.log(inSheets[i].jsonStringForBackEnd());
                    }
                };
                return BackEndClientMock;
            })(sheetBackEnd_service_1.SheetBackEnd);
            exports_1("BackEndClientMock", BackEndClientMock);
        }
    }
});
//# sourceMappingURL=backEnd.clientMock.service.js.map