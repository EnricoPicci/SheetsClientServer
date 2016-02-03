///<reference path="../typings/mongodb/mongodb.d.ts" />
///<reference path="../typings/mongoose/mongoose.d.ts" />

import * as mongodb from "mongodb";
import * as mongoose from "mongoose";

export class SheetDBBuilder { 
   
    connectAndOpen() {
        mongoose.connect('mongodb://localhost/NodeServerDB');
        let db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', () => {
            console.log('connected!');
            this.createSchemaAndFill();
        })
    }
    
    createSchemaAndFill() {
        let sheetSchema = new mongoose.Schema(this.getSheetSchema());
        let SheetModel = mongoose.model('SheetModel', sheetSchema);
        let sheetJSONs = this.getSheetJSONs();
        for (var i = 0; i < sheetJSONs.length; i++) {
            // set the type of oneSheetModel to any to avoid compiler error messages when this instance is requested some properties such as its 'title' as it happens below
            let oneSheetModel:any = new SheetModel(sheetJSONs[i]);
            oneSheetModel.save(function (err, oneSheetModel) {
                if (err) {
                    return console.error(err);
                } else {
                    console.log('Sheet saved: ' + oneSheetModel.title);
                }
            });
            console.log('The sheet models now are:');
            SheetModel.find(function (err, sheetModels) {
                if (err) {
                    return console.error(err);
                } else {
                    console.log('Now you have ' + sheetModels.length + ' sheet models on DB');
                    for (var i = 0; i < sheetModels.length; i++) {
                        console.log(i + ') Sheet title: ' + sheetModels[i].title);
                    }
                }
            })
        }
        
        //let oneSheetModel = new SheetModel();
    }
    
    getSheetSchema() {
        let assetSchema = new mongoose.Schema(
            {
                name: String,
                weight: Number,
                oneMonthRet: String,
                oneYearRet: String,
                minWeight: Number,
                maxWeight: Number,
                symbol: String
            }
        );
        let assetGroupSchema = new mongoose.Schema(
            {
                name: String,
                weight: Number,
                oneMonthRet: String,
                oneYearRet: String,
                minWeight: Number,
                maxWeight: Number,
                assetJSONs: [assetSchema] 
            }
        );
        return {
            id: Number,
            title: String,
            longTitle: String,
            imageUrl: String,
            createdBy: String,
            oneMonthReturn: String,
            valueAtRisk: Number,
            volatility: Number,
            general: String,
            valueBased: String,
            sector: String,
            oneYearReturn: String,
            dailyChange: String,
            description: String,
            benchmark: String,
            originalSheetID: String,
            personalizationComment: String,
            assetGroupJSONs: [assetGroupSchema]
        }
    }
    
    getSheetJSONs() {
        return [
                {
                    "assetGroupJSONs": [
                        {
                            "assetJSONs": [
                                {
                                    "name": "Diamond Inc.",
                                    "weight": 10,
                                    "oneMonthRet": "6%",
                                    "oneYearRet": "42%",
                                    "minWeight": 0,
                                    "maxWeight": 10,
                                    "symbol": "SAD"
                                },
                                {
                                    "name": "Indian African Co.",
                                    "weight": 10,
                                    "oneMonthRet": "2%",
                                    "oneYearRet": "12%",
                                    "minWeight": 0,
                                    "maxWeight": 45,
                                    "symbol": "IAC"
                                },
                                {
                                    "name": "Plutonion International",
                                    "weight": 15,
                                    "oneMonthRet": "1%",
                                    "oneYearRet": "15%",
                                    "minWeight": 0,
                                    "maxWeight": 20,
                                    "symbol": "PLI"
                                },
                                {
                                    "name": "Cape Wineries Plc",
                                    "weight": 20,
                                    "oneMonthRet": "1%",
                                    "oneYearRet": "15%",
                                    "minWeight": 0,
                                    "maxWeight": 30,
                                    "symbol": "CWN"
                                }
                            ],
                            "name": "South Africa",
                            "weight": 55,
                            "oneMonthRet": "11%",
                            "oneYearRet": "4%",
                            "minWeight": 0,
                            "maxWeight": 100
                        },
                        {
                            "assetJSONs": [
                                {
                                    "name": "Tea and Coffee Inc.",
                                    "weight": 5,
                                    "oneMonthRet": "12%",
                                    "oneYearRet": "32%",
                                    "minWeight": 0,
                                    "maxWeight": 30,
                                    "symbol": "TCI"
                                },
                                {
                                    "name": "Caribe Banana Co.",
                                    "weight": 15,
                                    "oneMonthRet": "12%",
                                    "oneYearRet": "22%",
                                    "minWeight": 0,
                                    "maxWeight": 25,
                                    "symbol": "CBC"
                                },
                                {
                                    "name": "Rasta Co",
                                    "weight": 5,
                                    "oneMonthRet": "2%",
                                    "oneYearRet": "20%",
                                    "minWeight": 0,
                                    "maxWeight": 45,
                                    "symbol": "RCO"
                                }
                            ],
                            "name": "Jamaica",
                            "weight": 25,
                            "oneMonthRet": "21%",
                            "oneYearRet": "2%",
                            "minWeight": 0,
                            "maxWeight": 100
                        },
                        {
                            "assetJSONs": [
                                {
                                    "name": "Mekong Lmtd",
                                    "weight": 2,
                                    "oneMonthRet": "6%",
                                    "oneYearRet": "2%",
                                    "minWeight": 0,
                                    "maxWeight": 45,
                                    "symbol": "MKL"
                                },
                                {
                                    "name": "Monks",
                                    "weight": 2,
                                    "oneMonthRet": "7%",
                                    "oneYearRet": "17%",
                                    "minWeight": 0,
                                    "maxWeight": 15,
                                    "symbol": "MNK"
                                },
                                {
                                    "name": "Mangoes Del Monte",
                                    "weight": 6,
                                    "oneMonthRet": "7%",
                                    "oneYearRet": "17%",
                                    "minWeight": 0,
                                    "maxWeight": 40,
                                    "symbol": "MDM"
                                }
                            ],
                            "name": "Cambodia",
                            "weight": 10,
                            "oneMonthRet": "14%",
                            "oneYearRet": "3%",
                            "minWeight": 0,
                            "maxWeight": 100
                        },
                        {
                            "assetJSONs": [
                                {
                                    "name": "Kim Lmtd",
                                    "weight": 8,
                                    "oneMonthRet": "6%",
                                    "oneYearRet": "2%",
                                    "minWeight": 0,
                                    "maxWeight": 30,
                                    "symbol": "KLM"
                                },
                                {
                                    "name": "Kim Unlimited",
                                    "weight": 2,
                                    "oneMonthRet": "7%",
                                    "oneYearRet": "17%",
                                    "minWeight": 0,
                                    "maxWeight": 70,
                                    "symbol": "KUL"
                                }
                            ],
                            "name": "North Korea",
                            "weight": 10,
                            "oneMonthRet": "14%",
                            "oneYearRet": "3%",
                            "minWeight": 0,
                            "maxWeight": 100
                        }
                    ],
                    "originalSheetID": null,
                    "personalizationComment": null,
                    "id": 0,
                    "title": "Bear Int Market",
                    "longTitle": "International bears move on",
                    "imageUrl": "../images/bears.jpg",
                    "createdBy": "CocoonTechies",
                    "description": "The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad.",
                    "oneYearReturn": "11%",
                    "oneMonthReturn": "6%",
                    "dailyChange": "2%",
                    "benchmark": "Worst Nitghmare Index",
                    "valueAtRisk": 4,
                    "volatility": 12.2,
                    "general": "Brands u know",
                    "valueBased": "Green",
                    "sector": "Energy"
                },
                {
                    "assetGroupJSONs": [
                        {
                            "assetJSONs": [
                                {
                                    "name": "Diamond Inc.",
                                    "weight": 5,
                                    "oneMonthRet": "6%",
                                    "oneYearRet": "42%",
                                    "minWeight": 0,
                                    "maxWeight": 10,
                                    "symbol": "SAD"
                                },
                                {
                                    "name": "Indian African Co.",
                                    "weight": 8,
                                    "oneMonthRet": "2%",
                                    "oneYearRet": "12%",
                                    "minWeight": 5,
                                    "maxWeight": 15,
                                    "symbol": "IAC"
                                },
                                {
                                    "name": "Plutonion International",
                                    "weight": 12,
                                    "oneMonthRet": "1%",
                                    "oneYearRet": "15%",
                                    "minWeight": 10,
                                    "maxWeight": 20,
                                    "symbol": "PLI"
                                },
                                {
                                    "name": "Cape Wineries Plc",
                                    "weight": 20,
                                    "oneMonthRet": "1%",
                                    "oneYearRet": "15%",
                                    "minWeight": 15,
                                    "maxWeight": 30,
                                    "symbol": "CWN"
                                }
                            ],
                            "name": "South Africa",
                            "weight": 45,
                            "oneMonthRet": "11%",
                            "oneYearRet": "4%",
                            "minWeight": 30,
                            "maxWeight": 75
                        },
                        {
                            "assetJSONs": [
                                {
                                    "name": "Tea and Coffee Inc.",
                                    "weight": 6,
                                    "oneMonthRet": "12%",
                                    "oneYearRet": "32%",
                                    "minWeight": 0,
                                    "maxWeight": 10,
                                    "symbol": "TCI"
                                },
                                {
                                    "name": "Caribe Banana Co.",
                                    "weight": 24,
                                    "oneMonthRet": "12%",
                                    "oneYearRet": "22%",
                                    "minWeight": 10,
                                    "maxWeight": 25,
                                    "symbol": "CBC"
                                },
                                {
                                    "name": "Rasta Co",
                                    "weight": 5,
                                    "oneMonthRet": "2%",
                                    "oneYearRet": "20%",
                                    "minWeight": 5,
                                    "maxWeight": 7,
                                    "symbol": "RCO"
                                }
                            ],
                            "name": "Jamaica",
                            "weight": 35,
                            "oneMonthRet": "21%",
                            "oneYearRet": "2%",
                            "minWeight": 15,
                            "maxWeight": 42
                        },
                        {
                            "assetJSONs": [
                                {
                                    "name": "Mekong Lmtd",
                                    "weight": 6,
                                    "oneMonthRet": "6%",
                                    "oneYearRet": "2%",
                                    "minWeight": 5,
                                    "maxWeight": 25,
                                    "symbol": "MKL"
                                },
                                {
                                    "name": "Monks",
                                    "weight": 0,
                                    "oneMonthRet": "7%",
                                    "oneYearRet": "17%",
                                    "minWeight": 0,
                                    "maxWeight": 15,
                                    "symbol": "MNK"
                                },
                                {
                                    "name": "Mangoes Del Monte",
                                    "weight": 4,
                                    "oneMonthRet": "7%",
                                    "oneYearRet": "17%",
                                    "minWeight": 0,
                                    "maxWeight": 10,
                                    "symbol": "MDM"
                                }
                            ],
                            "name": "Cambodia",
                            "weight": 10,
                            "oneMonthRet": "14%",
                            "oneYearRet": "3%",
                            "minWeight": 5,
                            "maxWeight": 50
                        },
                        {
                            "assetJSONs": [
                                {
                                    "name": "Kim Lmtd",
                                    "weight": 5,
                                    "oneMonthRet": "6%",
                                    "oneYearRet": "2%",
                                    "minWeight": 5,
                                    "maxWeight": 30,
                                    "symbol": "KLM"
                                },
                                {
                                    "name": "Kim Unlimited",
                                    "weight": 5,
                                    "oneMonthRet": "7%",
                                    "oneYearRet": "17%",
                                    "minWeight": 0,
                                    "maxWeight": 20,
                                    "symbol": "KUL"
                                }
                            ],
                            "name": "North Korea",
                            "weight": 10,
                            "oneMonthRet": "14%",
                            "oneYearRet": "3%",
                            "minWeight": 5,
                            "maxWeight": 50
                        }
                    ],
                    "originalSheetID": null,
                    "personalizationComment": null,
                    "id": 1,
                    "title": "Bear US Sectors",
                    "longTitle": "US bears roars in several sectors",
                    "imageUrl": "../images/cyclingBear.jpg",
                    "createdBy": "CocoonTechies",
                    "description": "The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad.",
                    "oneYearReturn": "11%",
                    "oneMonthReturn": "6%",
                    "dailyChange": "2%",
                    "benchmark": "S&P 1312",
                    "valueAtRisk": 5.3,
                    "volatility": 11.3,
                    "general": "Popular",
                    "valueBased": "Current",
                    "sector": "Health"
                },
                {
                    "assetGroupJSONs": [
                        {
                            "assetJSONs": [
                                {
                                    "name": "Diamond Inc.",
                                    "weight": 10,
                                    "oneMonthRet": "6%",
                                    "oneYearRet": "42%",
                                    "minWeight": 0,
                                    "maxWeight": 10,
                                    "symbol": "SAD"
                                },
                                {
                                    "name": "Indian African Co.",
                                    "weight": 10,
                                    "oneMonthRet": "2%",
                                    "oneYearRet": "12%",
                                    "minWeight": 0,
                                    "maxWeight": 45,
                                    "symbol": "IAC"
                                },
                                {
                                    "name": "Plutonion International",
                                    "weight": 15,
                                    "oneMonthRet": "1%",
                                    "oneYearRet": "15%",
                                    "minWeight": 0,
                                    "maxWeight": 20,
                                    "symbol": "PLI"
                                },
                                {
                                    "name": "Cape Wineries Plc",
                                    "weight": 20,
                                    "oneMonthRet": "1%",
                                    "oneYearRet": "15%",
                                    "minWeight": 0,
                                    "maxWeight": 30,
                                    "symbol": "CWN"
                                }
                            ],
                            "name": "South Africa",
                            "weight": 55,
                            "oneMonthRet": "11%",
                            "oneYearRet": "4%",
                            "minWeight": 0,
                            "maxWeight": 100
                        },
                        {
                            "assetJSONs": [
                                {
                                    "name": "Tea and Coffee Inc.",
                                    "weight": 5,
                                    "oneMonthRet": "12%",
                                    "oneYearRet": "32%",
                                    "minWeight": 0,
                                    "maxWeight": 30,
                                    "symbol": "TCI"
                                },
                                {
                                    "name": "Caribe Banana Co.",
                                    "weight": 15,
                                    "oneMonthRet": "12%",
                                    "oneYearRet": "22%",
                                    "minWeight": 0,
                                    "maxWeight": 25,
                                    "symbol": "CBC"
                                },
                                {
                                    "name": "Rasta Co",
                                    "weight": 5,
                                    "oneMonthRet": "2%",
                                    "oneYearRet": "20%",
                                    "minWeight": 0,
                                    "maxWeight": 45,
                                    "symbol": "RCO"
                                }
                            ],
                            "name": "Jamaica",
                            "weight": 25,
                            "oneMonthRet": "21%",
                            "oneYearRet": "2%",
                            "minWeight": 0,
                            "maxWeight": 100
                        },
                        {
                            "assetJSONs": [
                                {
                                    "name": "Mekong Lmtd",
                                    "weight": 2,
                                    "oneMonthRet": "6%",
                                    "oneYearRet": "2%",
                                    "minWeight": 0,
                                    "maxWeight": 45,
                                    "symbol": "MKL"
                                },
                                {
                                    "name": "Monks",
                                    "weight": 2,
                                    "oneMonthRet": "7%",
                                    "oneYearRet": "17%",
                                    "minWeight": 0,
                                    "maxWeight": 15,
                                    "symbol": "MNK"
                                },
                                {
                                    "name": "Mangoes Del Monte",
                                    "weight": 6,
                                    "oneMonthRet": "7%",
                                    "oneYearRet": "17%",
                                    "minWeight": 0,
                                    "maxWeight": 40,
                                    "symbol": "MDM"
                                }
                            ],
                            "name": "Cambodia",
                            "weight": 10,
                            "oneMonthRet": "14%",
                            "oneYearRet": "3%",
                            "minWeight": 0,
                            "maxWeight": 100
                        },
                        {
                            "assetJSONs": [
                                {
                                    "name": "Kim Lmtd",
                                    "weight": 8,
                                    "oneMonthRet": "6%",
                                    "oneYearRet": "2%",
                                    "minWeight": 0,
                                    "maxWeight": 30,
                                    "symbol": "KLM"
                                },
                                {
                                    "name": "Kim Unlimited",
                                    "weight": 2,
                                    "oneMonthRet": "7%",
                                    "oneYearRet": "17%",
                                    "minWeight": 0,
                                    "maxWeight": 70,
                                    "symbol": "KUL"
                                }
                            ],
                            "name": "North Korea",
                            "weight": 10,
                            "oneMonthRet": "14%",
                            "oneYearRet": "3%",
                            "minWeight": 0,
                            "maxWeight": 100
                        }
                    ],
                    "originalSheetID": null,
                    "personalizationComment": null,
                    "id": 2,
                    "title": "Enengia Pulita",
                    "longTitle": "Clean energy from italian gymns",
                    "imageUrl": "../images/windMills.jpg",
                    "createdBy": "CocoonTechies",
                    "description": "The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad.",
                    "oneYearReturn": "11%",
                    "oneMonthReturn": "6%",
                    "dailyChange": "2%",
                    "benchmark": "Best Dream Index",
                    "valueAtRisk": 0.3,
                    "volatility": 8.8,
                    "general": "Popular",
                    "valueBased": "Green",
                    "sector": "FS"
                },
                {
                    "assetGroupJSONs": [
                        {
                            "assetJSONs": [
                                {
                                    "name": "Diamond Inc.",
                                    "weight": 10,
                                    "oneMonthRet": "6%",
                                    "oneYearRet": "42%",
                                    "minWeight": 0,
                                    "maxWeight": 10,
                                    "symbol": "SAD"
                                },
                                {
                                    "name": "Indian African Co.",
                                    "weight": 10,
                                    "oneMonthRet": "2%",
                                    "oneYearRet": "12%",
                                    "minWeight": 0,
                                    "maxWeight": 45,
                                    "symbol": "IAC"
                                },
                                {
                                    "name": "Plutonion International",
                                    "weight": 15,
                                    "oneMonthRet": "1%",
                                    "oneYearRet": "15%",
                                    "minWeight": 0,
                                    "maxWeight": 20,
                                    "symbol": "PLI"
                                },
                                {
                                    "name": "Cape Wineries Plc",
                                    "weight": 20,
                                    "oneMonthRet": "1%",
                                    "oneYearRet": "15%",
                                    "minWeight": 0,
                                    "maxWeight": 30,
                                    "symbol": "CWN"
                                }
                            ],
                            "name": "South Africa",
                            "weight": 55,
                            "oneMonthRet": "11%",
                            "oneYearRet": "4%",
                            "minWeight": 0,
                            "maxWeight": 100
                        },
                        {
                            "assetJSONs": [
                                {
                                    "name": "Tea and Coffee Inc.",
                                    "weight": 5,
                                    "oneMonthRet": "12%",
                                    "oneYearRet": "32%",
                                    "minWeight": 0,
                                    "maxWeight": 30,
                                    "symbol": "TCI"
                                },
                                {
                                    "name": "Caribe Banana Co.",
                                    "weight": 15,
                                    "oneMonthRet": "12%",
                                    "oneYearRet": "22%",
                                    "minWeight": 0,
                                    "maxWeight": 25,
                                    "symbol": "CBC"
                                },
                                {
                                    "name": "Rasta Co",
                                    "weight": 5,
                                    "oneMonthRet": "2%",
                                    "oneYearRet": "20%",
                                    "minWeight": 0,
                                    "maxWeight": 45,
                                    "symbol": "RCO"
                                }
                            ],
                            "name": "Jamaica",
                            "weight": 25,
                            "oneMonthRet": "21%",
                            "oneYearRet": "2%",
                            "minWeight": 0,
                            "maxWeight": 100
                        },
                        {
                            "assetJSONs": [
                                {
                                    "name": "Mekong Lmtd",
                                    "weight": 2,
                                    "oneMonthRet": "6%",
                                    "oneYearRet": "2%",
                                    "minWeight": 0,
                                    "maxWeight": 45,
                                    "symbol": "MKL"
                                },
                                {
                                    "name": "Monks",
                                    "weight": 2,
                                    "oneMonthRet": "7%",
                                    "oneYearRet": "17%",
                                    "minWeight": 0,
                                    "maxWeight": 15,
                                    "symbol": "MNK"
                                },
                                {
                                    "name": "Mangoes Del Monte",
                                    "weight": 6,
                                    "oneMonthRet": "7%",
                                    "oneYearRet": "17%",
                                    "minWeight": 0,
                                    "maxWeight": 40,
                                    "symbol": "MDM"
                                }
                            ],
                            "name": "Cambodia",
                            "weight": 10,
                            "oneMonthRet": "14%",
                            "oneYearRet": "3%",
                            "minWeight": 0,
                            "maxWeight": 100
                        },
                        {
                            "assetJSONs": [
                                {
                                    "name": "Kim Lmtd",
                                    "weight": 8,
                                    "oneMonthRet": "6%",
                                    "oneYearRet": "2%",
                                    "minWeight": 0,
                                    "maxWeight": 30,
                                    "symbol": "KLM"
                                },
                                {
                                    "name": "Kim Unlimited",
                                    "weight": 2,
                                    "oneMonthRet": "7%",
                                    "oneYearRet": "17%",
                                    "minWeight": 0,
                                    "maxWeight": 70,
                                    "symbol": "KUL"
                                }
                            ],
                            "name": "North Korea",
                            "weight": 10,
                            "oneMonthRet": "14%",
                            "oneYearRet": "3%",
                            "minWeight": 0,
                            "maxWeight": 100
                        }
                    ],
                    "originalSheetID": null,
                    "personalizationComment": null,
                    "id": 3,
                    "title": "China internet",
                    "longTitle": "Many chines will shop online soon",
                    "imageUrl": "../images/chinaInternet.jpg",
                    "createdBy": "CocoonTechies",
                    "description": "The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad.",
                    "oneYearReturn": "11%",
                    "oneMonthReturn": "6%",
                    "dailyChange": "2%",
                    "benchmark": "Worst Nitghmare Index",
                    "valueAtRisk": 8.8,
                    "volatility": 25.5,
                    "general": "New",
                    "valueBased": "Political",
                    "sector": "Real Estate"
                },
                {
                    "assetGroupJSONs": [
                        {
                            "assetJSONs": [
                                {
                                    "name": "Diamond Inc.",
                                    "weight": 5,
                                    "oneMonthRet": "6%",
                                    "oneYearRet": "42%",
                                    "minWeight": 0,
                                    "maxWeight": 10,
                                    "symbol": "SAD"
                                },
                                {
                                    "name": "Indian African Co.",
                                    "weight": 8,
                                    "oneMonthRet": "2%",
                                    "oneYearRet": "12%",
                                    "minWeight": 5,
                                    "maxWeight": 15,
                                    "symbol": "IAC"
                                },
                                {
                                    "name": "Plutonion International",
                                    "weight": 12,
                                    "oneMonthRet": "1%",
                                    "oneYearRet": "15%",
                                    "minWeight": 10,
                                    "maxWeight": 20,
                                    "symbol": "PLI"
                                },
                                {
                                    "name": "Cape Wineries Plc",
                                    "weight": 20,
                                    "oneMonthRet": "1%",
                                    "oneYearRet": "15%",
                                    "minWeight": 15,
                                    "maxWeight": 30,
                                    "symbol": "CWN"
                                }
                            ],
                            "name": "South Africa",
                            "weight": 45,
                            "oneMonthRet": "11%",
                            "oneYearRet": "4%",
                            "minWeight": 30,
                            "maxWeight": 75
                        },
                        {
                            "assetJSONs": [
                                {
                                    "name": "Tea and Coffee Inc.",
                                    "weight": 6,
                                    "oneMonthRet": "12%",
                                    "oneYearRet": "32%",
                                    "minWeight": 0,
                                    "maxWeight": 10,
                                    "symbol": "TCI"
                                },
                                {
                                    "name": "Caribe Banana Co.",
                                    "weight": 24,
                                    "oneMonthRet": "12%",
                                    "oneYearRet": "22%",
                                    "minWeight": 10,
                                    "maxWeight": 25,
                                    "symbol": "CBC"
                                },
                                {
                                    "name": "Rasta Co",
                                    "weight": 5,
                                    "oneMonthRet": "2%",
                                    "oneYearRet": "20%",
                                    "minWeight": 5,
                                    "maxWeight": 7,
                                    "symbol": "RCO"
                                }
                            ],
                            "name": "Jamaica",
                            "weight": 35,
                            "oneMonthRet": "21%",
                            "oneYearRet": "2%",
                            "minWeight": 15,
                            "maxWeight": 42
                        },
                        {
                            "assetJSONs": [
                                {
                                    "name": "Mekong Lmtd",
                                    "weight": 6,
                                    "oneMonthRet": "6%",
                                    "oneYearRet": "2%",
                                    "minWeight": 5,
                                    "maxWeight": 25,
                                    "symbol": "MKL"
                                },
                                {
                                    "name": "Monks",
                                    "weight": 0,
                                    "oneMonthRet": "7%",
                                    "oneYearRet": "17%",
                                    "minWeight": 0,
                                    "maxWeight": 15,
                                    "symbol": "MNK"
                                },
                                {
                                    "name": "Mangoes Del Monte",
                                    "weight": 4,
                                    "oneMonthRet": "7%",
                                    "oneYearRet": "17%",
                                    "minWeight": 0,
                                    "maxWeight": 10,
                                    "symbol": "MDM"
                                }
                            ],
                            "name": "Cambodia",
                            "weight": 10,
                            "oneMonthRet": "14%",
                            "oneYearRet": "3%",
                            "minWeight": 5,
                            "maxWeight": 50
                        },
                        {
                            "assetJSONs": [
                                {
                                    "name": "Kim Lmtd",
                                    "weight": 5,
                                    "oneMonthRet": "6%",
                                    "oneYearRet": "2%",
                                    "minWeight": 5,
                                    "maxWeight": 30,
                                    "symbol": "KLM"
                                },
                                {
                                    "name": "Kim Unlimited",
                                    "weight": 5,
                                    "oneMonthRet": "7%",
                                    "oneYearRet": "17%",
                                    "minWeight": 0,
                                    "maxWeight": 20,
                                    "symbol": "KUL"
                                }
                            ],
                            "name": "North Korea",
                            "weight": 10,
                            "oneMonthRet": "14%",
                            "oneYearRet": "3%",
                            "minWeight": 5,
                            "maxWeight": 50
                        }
                    ],
                    "originalSheetID": null,
                    "personalizationComment": null,
                    "id": 4,
                    "title": "Mercati Orso USA",
                    "longTitle": "Orso americano non ruggisce solo a UCLA",
                    "imageUrl": "../images/usBear.jpg",
                    "createdBy": "CocoonTechies",
                    "description": "The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad.",
                    "oneYearReturn": "11%",
                    "oneMonthReturn": "6%",
                    "dailyChange": "2%",
                    "benchmark": "S&P 1312",
                    "valueAtRisk": 4.3,
                    "volatility": 15.5,
                    "general": "New",
                    "valueBased": "Political",
                    "sector": "Retail"
                },
                {
                    "assetGroupJSONs": [
                        {
                            "assetJSONs": [
                                {
                                    "name": "Diamond Inc.",
                                    "weight": 10,
                                    "oneMonthRet": "6%",
                                    "oneYearRet": "42%",
                                    "minWeight": 0,
                                    "maxWeight": 10,
                                    "symbol": "SAD"
                                },
                                {
                                    "name": "Indian African Co.",
                                    "weight": 10,
                                    "oneMonthRet": "2%",
                                    "oneYearRet": "12%",
                                    "minWeight": 0,
                                    "maxWeight": 45,
                                    "symbol": "IAC"
                                },
                                {
                                    "name": "Plutonion International",
                                    "weight": 15,
                                    "oneMonthRet": "1%",
                                    "oneYearRet": "15%",
                                    "minWeight": 0,
                                    "maxWeight": 20,
                                    "symbol": "PLI"
                                },
                                {
                                    "name": "Cape Wineries Plc",
                                    "weight": 20,
                                    "oneMonthRet": "1%",
                                    "oneYearRet": "15%",
                                    "minWeight": 0,
                                    "maxWeight": 30,
                                    "symbol": "CWN"
                                }
                            ],
                            "name": "South Africa",
                            "weight": 55,
                            "oneMonthRet": "11%",
                            "oneYearRet": "4%",
                            "minWeight": 0,
                            "maxWeight": 100
                        },
                        {
                            "assetJSONs": [
                                {
                                    "name": "Tea and Coffee Inc.",
                                    "weight": 5,
                                    "oneMonthRet": "12%",
                                    "oneYearRet": "32%",
                                    "minWeight": 0,
                                    "maxWeight": 30,
                                    "symbol": "TCI"
                                },
                                {
                                    "name": "Caribe Banana Co.",
                                    "weight": 15,
                                    "oneMonthRet": "12%",
                                    "oneYearRet": "22%",
                                    "minWeight": 0,
                                    "maxWeight": 25,
                                    "symbol": "CBC"
                                },
                                {
                                    "name": "Rasta Co",
                                    "weight": 5,
                                    "oneMonthRet": "2%",
                                    "oneYearRet": "20%",
                                    "minWeight": 0,
                                    "maxWeight": 45,
                                    "symbol": "RCO"
                                }
                            ],
                            "name": "Jamaica",
                            "weight": 25,
                            "oneMonthRet": "21%",
                            "oneYearRet": "2%",
                            "minWeight": 0,
                            "maxWeight": 100
                        },
                        {
                            "assetJSONs": [
                                {
                                    "name": "Mekong Lmtd",
                                    "weight": 2,
                                    "oneMonthRet": "6%",
                                    "oneYearRet": "2%",
                                    "minWeight": 0,
                                    "maxWeight": 45,
                                    "symbol": "MKL"
                                },
                                {
                                    "name": "Monks",
                                    "weight": 2,
                                    "oneMonthRet": "7%",
                                    "oneYearRet": "17%",
                                    "minWeight": 0,
                                    "maxWeight": 15,
                                    "symbol": "MNK"
                                },
                                {
                                    "name": "Mangoes Del Monte",
                                    "weight": 6,
                                    "oneMonthRet": "7%",
                                    "oneYearRet": "17%",
                                    "minWeight": 0,
                                    "maxWeight": 40,
                                    "symbol": "MDM"
                                }
                            ],
                            "name": "Cambodia",
                            "weight": 10,
                            "oneMonthRet": "14%",
                            "oneYearRet": "3%",
                            "minWeight": 0,
                            "maxWeight": 100
                        },
                        {
                            "assetJSONs": [
                                {
                                    "name": "Kim Lmtd",
                                    "weight": 8,
                                    "oneMonthRet": "6%",
                                    "oneYearRet": "2%",
                                    "minWeight": 0,
                                    "maxWeight": 30,
                                    "symbol": "KLM"
                                },
                                {
                                    "name": "Kim Unlimited",
                                    "weight": 2,
                                    "oneMonthRet": "7%",
                                    "oneYearRet": "17%",
                                    "minWeight": 0,
                                    "maxWeight": 70,
                                    "symbol": "KUL"
                                }
                            ],
                            "name": "North Korea",
                            "weight": 10,
                            "oneMonthRet": "14%",
                            "oneYearRet": "3%",
                            "minWeight": 0,
                            "maxWeight": 100
                        }
                    ],
                    "originalSheetID": null,
                    "personalizationComment": null,
                    "id": 5,
                    "title": "Slot Machines and Casino",
                    "longTitle": "Everybody hopes tomorrow will be their luck day",
                    "imageUrl": "../images/games.jpg",
                    "createdBy": "CocoonTechies",
                    "description": "The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad.",
                    "oneYearReturn": "11%",
                    "oneMonthReturn": "6%",
                    "dailyChange": "2%",
                    "benchmark": "Best Dream Index",
                    "valueAtRisk": 5,
                    "volatility": 14.3,
                    "general": "Popular",
                    "valueBased": "Green",
                    "sector": "FS"
                },
                {
                    "assetGroupJSONs": [
                        {
                            "assetJSONs": [
                                {
                                    "name": "Diamond Inc.",
                                    "weight": 10,
                                    "oneMonthRet": "6%",
                                    "oneYearRet": "42%",
                                    "minWeight": 0,
                                    "maxWeight": 10,
                                    "symbol": "SAD"
                                },
                                {
                                    "name": "Indian African Co.",
                                    "weight": 10,
                                    "oneMonthRet": "2%",
                                    "oneYearRet": "12%",
                                    "minWeight": 0,
                                    "maxWeight": 45,
                                    "symbol": "IAC"
                                },
                                {
                                    "name": "Plutonion International",
                                    "weight": 15,
                                    "oneMonthRet": "1%",
                                    "oneYearRet": "15%",
                                    "minWeight": 0,
                                    "maxWeight": 20,
                                    "symbol": "PLI"
                                },
                                {
                                    "name": "Cape Wineries Plc",
                                    "weight": 20,
                                    "oneMonthRet": "1%",
                                    "oneYearRet": "15%",
                                    "minWeight": 0,
                                    "maxWeight": 30,
                                    "symbol": "CWN"
                                }
                            ],
                            "name": "South Africa",
                            "weight": 55,
                            "oneMonthRet": "11%",
                            "oneYearRet": "4%",
                            "minWeight": 0,
                            "maxWeight": 100
                        },
                        {
                            "assetJSONs": [
                                {
                                    "name": "Tea and Coffee Inc.",
                                    "weight": 5,
                                    "oneMonthRet": "12%",
                                    "oneYearRet": "32%",
                                    "minWeight": 0,
                                    "maxWeight": 30,
                                    "symbol": "TCI"
                                },
                                {
                                    "name": "Caribe Banana Co.",
                                    "weight": 15,
                                    "oneMonthRet": "12%",
                                    "oneYearRet": "22%",
                                    "minWeight": 0,
                                    "maxWeight": 25,
                                    "symbol": "CBC"
                                },
                                {
                                    "name": "Rasta Co",
                                    "weight": 5,
                                    "oneMonthRet": "2%",
                                    "oneYearRet": "20%",
                                    "minWeight": 0,
                                    "maxWeight": 45,
                                    "symbol": "RCO"
                                }
                            ],
                            "name": "Jamaica",
                            "weight": 25,
                            "oneMonthRet": "21%",
                            "oneYearRet": "2%",
                            "minWeight": 0,
                            "maxWeight": 100
                        },
                        {
                            "assetJSONs": [
                                {
                                    "name": "Mekong Lmtd",
                                    "weight": 2,
                                    "oneMonthRet": "6%",
                                    "oneYearRet": "2%",
                                    "minWeight": 0,
                                    "maxWeight": 45,
                                    "symbol": "MKL"
                                },
                                {
                                    "name": "Monks",
                                    "weight": 2,
                                    "oneMonthRet": "7%",
                                    "oneYearRet": "17%",
                                    "minWeight": 0,
                                    "maxWeight": 15,
                                    "symbol": "MNK"
                                },
                                {
                                    "name": "Mangoes Del Monte",
                                    "weight": 6,
                                    "oneMonthRet": "7%",
                                    "oneYearRet": "17%",
                                    "minWeight": 0,
                                    "maxWeight": 40,
                                    "symbol": "MDM"
                                }
                            ],
                            "name": "Cambodia",
                            "weight": 10,
                            "oneMonthRet": "14%",
                            "oneYearRet": "3%",
                            "minWeight": 0,
                            "maxWeight": 100
                        },
                        {
                            "assetJSONs": [
                                {
                                    "name": "Kim Lmtd",
                                    "weight": 8,
                                    "oneMonthRet": "6%",
                                    "oneYearRet": "2%",
                                    "minWeight": 0,
                                    "maxWeight": 30,
                                    "symbol": "KLM"
                                },
                                {
                                    "name": "Kim Unlimited",
                                    "weight": 2,
                                    "oneMonthRet": "7%",
                                    "oneYearRet": "17%",
                                    "minWeight": 0,
                                    "maxWeight": 70,
                                    "symbol": "KUL"
                                }
                            ],
                            "name": "North Korea",
                            "weight": 10,
                            "oneMonthRet": "14%",
                            "oneYearRet": "3%",
                            "minWeight": 0,
                            "maxWeight": 100
                        }
                    ],
                    "originalSheetID": null,
                    "personalizationComment": null,
                    "id": 6,
                    "title": "IPO recenti",
                    "longTitle": "Molti imprenditori tentano la fortuna",
                    "imageUrl": "../images/ipos.jpg",
                    "createdBy": "CocoonTechies",
                    "description": "The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad.",
                    "oneYearReturn": "11%",
                    "oneMonthReturn": "6%",
                    "dailyChange": "2%",
                    "benchmark": "Worst Nitghmare Index",
                    "valueAtRisk": 2.2,
                    "volatility": 3.4,
                    "general": "Popular",
                    "valueBased": "Social",
                    "sector": "FS"
                },
                {
                    "assetGroupJSONs": [
                        {
                            "assetJSONs": [
                                {
                                    "name": "Diamond Inc.",
                                    "weight": 5,
                                    "oneMonthRet": "6%",
                                    "oneYearRet": "42%",
                                    "minWeight": 0,
                                    "maxWeight": 10,
                                    "symbol": "SAD"
                                },
                                {
                                    "name": "Indian African Co.",
                                    "weight": 8,
                                    "oneMonthRet": "2%",
                                    "oneYearRet": "12%",
                                    "minWeight": 5,
                                    "maxWeight": 15,
                                    "symbol": "IAC"
                                },
                                {
                                    "name": "Plutonion International",
                                    "weight": 12,
                                    "oneMonthRet": "1%",
                                    "oneYearRet": "15%",
                                    "minWeight": 10,
                                    "maxWeight": 20,
                                    "symbol": "PLI"
                                },
                                {
                                    "name": "Cape Wineries Plc",
                                    "weight": 20,
                                    "oneMonthRet": "1%",
                                    "oneYearRet": "15%",
                                    "minWeight": 15,
                                    "maxWeight": 30,
                                    "symbol": "CWN"
                                }
                            ],
                            "name": "South Africa",
                            "weight": 45,
                            "oneMonthRet": "11%",
                            "oneYearRet": "4%",
                            "minWeight": 30,
                            "maxWeight": 75
                        },
                        {
                            "assetJSONs": [
                                {
                                    "name": "Tea and Coffee Inc.",
                                    "weight": 6,
                                    "oneMonthRet": "12%",
                                    "oneYearRet": "32%",
                                    "minWeight": 0,
                                    "maxWeight": 10,
                                    "symbol": "TCI"
                                },
                                {
                                    "name": "Caribe Banana Co.",
                                    "weight": 24,
                                    "oneMonthRet": "12%",
                                    "oneYearRet": "22%",
                                    "minWeight": 10,
                                    "maxWeight": 25,
                                    "symbol": "CBC"
                                },
                                {
                                    "name": "Rasta Co",
                                    "weight": 5,
                                    "oneMonthRet": "2%",
                                    "oneYearRet": "20%",
                                    "minWeight": 5,
                                    "maxWeight": 7,
                                    "symbol": "RCO"
                                }
                            ],
                            "name": "Jamaica",
                            "weight": 35,
                            "oneMonthRet": "21%",
                            "oneYearRet": "2%",
                            "minWeight": 15,
                            "maxWeight": 42
                        },
                        {
                            "assetJSONs": [
                                {
                                    "name": "Mekong Lmtd",
                                    "weight": 6,
                                    "oneMonthRet": "6%",
                                    "oneYearRet": "2%",
                                    "minWeight": 5,
                                    "maxWeight": 25,
                                    "symbol": "MKL"
                                },
                                {
                                    "name": "Monks",
                                    "weight": 0,
                                    "oneMonthRet": "7%",
                                    "oneYearRet": "17%",
                                    "minWeight": 0,
                                    "maxWeight": 15,
                                    "symbol": "MNK"
                                },
                                {
                                    "name": "Mangoes Del Monte",
                                    "weight": 4,
                                    "oneMonthRet": "7%",
                                    "oneYearRet": "17%",
                                    "minWeight": 0,
                                    "maxWeight": 10,
                                    "symbol": "MDM"
                                }
                            ],
                            "name": "Cambodia",
                            "weight": 10,
                            "oneMonthRet": "14%",
                            "oneYearRet": "3%",
                            "minWeight": 5,
                            "maxWeight": 50
                        },
                        {
                            "assetJSONs": [
                                {
                                    "name": "Kim Lmtd",
                                    "weight": 5,
                                    "oneMonthRet": "6%",
                                    "oneYearRet": "2%",
                                    "minWeight": 5,
                                    "maxWeight": 30,
                                    "symbol": "KLM"
                                },
                                {
                                    "name": "Kim Unlimited",
                                    "weight": 5,
                                    "oneMonthRet": "7%",
                                    "oneYearRet": "17%",
                                    "minWeight": 0,
                                    "maxWeight": 20,
                                    "symbol": "KUL"
                                }
                            ],
                            "name": "North Korea",
                            "weight": 10,
                            "oneMonthRet": "14%",
                            "oneYearRet": "3%",
                            "minWeight": 5,
                            "maxWeight": 50
                        }
                    ],
                    "originalSheetID": null,
                    "personalizationComment": null,
                    "id": 7,
                    "title": "Sci su erba",
                    "longTitle": "Fa troppo caldo, non si vede neve, sciamo con in cingoli",
                    "imageUrl": "../images/2Hot.jpg",
                    "createdBy": "CocoonTechies",
                    "description": "The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad.",
                    "oneYearReturn": "11%",
                    "oneMonthReturn": "6%",
                    "dailyChange": "2%",
                    "benchmark": "S&P 1312",
                    "valueAtRisk": 2.1,
                    "volatility": 2.2,
                    "general": "New",
                    "valueBased": "Social",
                    "sector": "Energy"
                },
                {
                    "assetGroupJSONs": [
                        {
                            "assetJSONs": [
                                {
                                    "name": "Diamond Inc.",
                                    "weight": 10,
                                    "oneMonthRet": "6%",
                                    "oneYearRet": "42%",
                                    "minWeight": 0,
                                    "maxWeight": 10,
                                    "symbol": "SAD"
                                },
                                {
                                    "name": "Indian African Co.",
                                    "weight": 10,
                                    "oneMonthRet": "2%",
                                    "oneYearRet": "12%",
                                    "minWeight": 0,
                                    "maxWeight": 45,
                                    "symbol": "IAC"
                                },
                                {
                                    "name": "Plutonion International",
                                    "weight": 15,
                                    "oneMonthRet": "1%",
                                    "oneYearRet": "15%",
                                    "minWeight": 0,
                                    "maxWeight": 20,
                                    "symbol": "PLI"
                                },
                                {
                                    "name": "Cape Wineries Plc",
                                    "weight": 20,
                                    "oneMonthRet": "1%",
                                    "oneYearRet": "15%",
                                    "minWeight": 0,
                                    "maxWeight": 30,
                                    "symbol": "CWN"
                                }
                            ],
                            "name": "South Africa",
                            "weight": 55,
                            "oneMonthRet": "11%",
                            "oneYearRet": "4%",
                            "minWeight": 0,
                            "maxWeight": 100
                        },
                        {
                            "assetJSONs": [
                                {
                                    "name": "Tea and Coffee Inc.",
                                    "weight": 5,
                                    "oneMonthRet": "12%",
                                    "oneYearRet": "32%",
                                    "minWeight": 0,
                                    "maxWeight": 30,
                                    "symbol": "TCI"
                                },
                                {
                                    "name": "Caribe Banana Co.",
                                    "weight": 15,
                                    "oneMonthRet": "12%",
                                    "oneYearRet": "22%",
                                    "minWeight": 0,
                                    "maxWeight": 25,
                                    "symbol": "CBC"
                                },
                                {
                                    "name": "Rasta Co",
                                    "weight": 5,
                                    "oneMonthRet": "2%",
                                    "oneYearRet": "20%",
                                    "minWeight": 0,
                                    "maxWeight": 45,
                                    "symbol": "RCO"
                                }
                            ],
                            "name": "Jamaica",
                            "weight": 25,
                            "oneMonthRet": "21%",
                            "oneYearRet": "2%",
                            "minWeight": 0,
                            "maxWeight": 100
                        },
                        {
                            "assetJSONs": [
                                {
                                    "name": "Mekong Lmtd",
                                    "weight": 2,
                                    "oneMonthRet": "6%",
                                    "oneYearRet": "2%",
                                    "minWeight": 0,
                                    "maxWeight": 45,
                                    "symbol": "MKL"
                                },
                                {
                                    "name": "Monks",
                                    "weight": 2,
                                    "oneMonthRet": "7%",
                                    "oneYearRet": "17%",
                                    "minWeight": 0,
                                    "maxWeight": 15,
                                    "symbol": "MNK"
                                },
                                {
                                    "name": "Mangoes Del Monte",
                                    "weight": 6,
                                    "oneMonthRet": "7%",
                                    "oneYearRet": "17%",
                                    "minWeight": 0,
                                    "maxWeight": 40,
                                    "symbol": "MDM"
                                }
                            ],
                            "name": "Cambodia",
                            "weight": 10,
                            "oneMonthRet": "14%",
                            "oneYearRet": "3%",
                            "minWeight": 0,
                            "maxWeight": 100
                        },
                        {
                            "assetJSONs": [
                                {
                                    "name": "Kim Lmtd",
                                    "weight": 8,
                                    "oneMonthRet": "6%",
                                    "oneYearRet": "2%",
                                    "minWeight": 0,
                                    "maxWeight": 30,
                                    "symbol": "KLM"
                                },
                                {
                                    "name": "Kim Unlimited",
                                    "weight": 2,
                                    "oneMonthRet": "7%",
                                    "oneYearRet": "17%",
                                    "minWeight": 0,
                                    "maxWeight": 70,
                                    "symbol": "KUL"
                                }
                            ],
                            "name": "North Korea",
                            "weight": 10,
                            "oneMonthRet": "14%",
                            "oneYearRet": "3%",
                            "minWeight": 0,
                            "maxWeight": 100
                        }
                    ],
                    "originalSheetID": null,
                    "personalizationComment": null,
                    "id": 8,
                    "title": "Vanity Fair",
                    "longTitle": "Gli uomini sono diventati più vanitosi delle donne",
                    "imageUrl": "../images/vanity.jpg",
                    "createdBy": "CocoonTechies",
                    "description": "The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad.",
                    "oneYearReturn": "11%",
                    "oneMonthReturn": "6%",
                    "dailyChange": "2%",
                    "benchmark": "Best Dream Index",
                    "valueAtRisk": 7.1,
                    "volatility": 23.3,
                    "general": "New",
                    "valueBased": "Current",
                    "sector": "Health"
                },
                {
                    "assetGroupJSONs": [
                        {
                            "assetJSONs": [
                                {
                                    "name": "Diamond Inc.",
                                    "weight": 10,
                                    "oneMonthRet": "6%",
                                    "oneYearRet": "42%",
                                    "minWeight": 0,
                                    "maxWeight": 10,
                                    "symbol": "SAD"
                                },
                                {
                                    "name": "Indian African Co.",
                                    "weight": 10,
                                    "oneMonthRet": "2%",
                                    "oneYearRet": "12%",
                                    "minWeight": 0,
                                    "maxWeight": 45,
                                    "symbol": "IAC"
                                },
                                {
                                    "name": "Plutonion International",
                                    "weight": 15,
                                    "oneMonthRet": "1%",
                                    "oneYearRet": "15%",
                                    "minWeight": 0,
                                    "maxWeight": 20,
                                    "symbol": "PLI"
                                },
                                {
                                    "name": "Cape Wineries Plc",
                                    "weight": 20,
                                    "oneMonthRet": "1%",
                                    "oneYearRet": "15%",
                                    "minWeight": 0,
                                    "maxWeight": 30,
                                    "symbol": "CWN"
                                }
                            ],
                            "name": "South Africa",
                            "weight": 55,
                            "oneMonthRet": "11%",
                            "oneYearRet": "4%",
                            "minWeight": 0,
                            "maxWeight": 100
                        },
                        {
                            "assetJSONs": [
                                {
                                    "name": "Tea and Coffee Inc.",
                                    "weight": 5,
                                    "oneMonthRet": "12%",
                                    "oneYearRet": "32%",
                                    "minWeight": 0,
                                    "maxWeight": 30,
                                    "symbol": "TCI"
                                },
                                {
                                    "name": "Caribe Banana Co.",
                                    "weight": 15,
                                    "oneMonthRet": "12%",
                                    "oneYearRet": "22%",
                                    "minWeight": 0,
                                    "maxWeight": 25,
                                    "symbol": "CBC"
                                },
                                {
                                    "name": "Rasta Co",
                                    "weight": 5,
                                    "oneMonthRet": "2%",
                                    "oneYearRet": "20%",
                                    "minWeight": 0,
                                    "maxWeight": 45,
                                    "symbol": "RCO"
                                }
                            ],
                            "name": "Jamaica",
                            "weight": 25,
                            "oneMonthRet": "21%",
                            "oneYearRet": "2%",
                            "minWeight": 0,
                            "maxWeight": 100
                        },
                        {
                            "assetJSONs": [
                                {
                                    "name": "Mekong Lmtd",
                                    "weight": 2,
                                    "oneMonthRet": "6%",
                                    "oneYearRet": "2%",
                                    "minWeight": 0,
                                    "maxWeight": 45,
                                    "symbol": "MKL"
                                },
                                {
                                    "name": "Monks",
                                    "weight": 2,
                                    "oneMonthRet": "7%",
                                    "oneYearRet": "17%",
                                    "minWeight": 0,
                                    "maxWeight": 15,
                                    "symbol": "MNK"
                                },
                                {
                                    "name": "Mangoes Del Monte",
                                    "weight": 6,
                                    "oneMonthRet": "7%",
                                    "oneYearRet": "17%",
                                    "minWeight": 0,
                                    "maxWeight": 40,
                                    "symbol": "MDM"
                                }
                            ],
                            "name": "Cambodia",
                            "weight": 10,
                            "oneMonthRet": "14%",
                            "oneYearRet": "3%",
                            "minWeight": 0,
                            "maxWeight": 100
                        },
                        {
                            "assetJSONs": [
                                {
                                    "name": "Kim Lmtd",
                                    "weight": 8,
                                    "oneMonthRet": "6%",
                                    "oneYearRet": "2%",
                                    "minWeight": 0,
                                    "maxWeight": 30,
                                    "symbol": "KLM"
                                },
                                {
                                    "name": "Kim Unlimited",
                                    "weight": 2,
                                    "oneMonthRet": "7%",
                                    "oneYearRet": "17%",
                                    "minWeight": 0,
                                    "maxWeight": 70,
                                    "symbol": "KUL"
                                }
                            ],
                            "name": "North Korea",
                            "weight": 10,
                            "oneMonthRet": "14%",
                            "oneYearRet": "3%",
                            "minWeight": 0,
                            "maxWeight": 100
                        }
                    ],
                    "originalSheetID": null,
                    "personalizationComment": null,
                    "id": 9,
                    "title": "Caffe e tea",
                    "longTitle": "Il te verde fa specialmente bene",
                    "imageUrl": "../images/coffe.jpg",
                    "createdBy": "CocoonTechies",
                    "description": "The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad.",
                    "oneYearReturn": "11%",
                    "oneMonthReturn": "6%",
                    "dailyChange": "2%",
                    "benchmark": "Worst Nitghmare Index",
                    "valueAtRisk": 3.2,
                    "volatility": 8.9,
                    "general": "Popular",
                    "valueBased": "Social",
                    "sector": "Health"
                },
                {
                    "assetGroupJSONs": [
                        {
                            "assetJSONs": [
                                {
                                    "name": "Diamond Inc.",
                                    "weight": 5,
                                    "oneMonthRet": "6%",
                                    "oneYearRet": "42%",
                                    "minWeight": 0,
                                    "maxWeight": 10,
                                    "symbol": "SAD"
                                },
                                {
                                    "name": "Indian African Co.",
                                    "weight": 8,
                                    "oneMonthRet": "2%",
                                    "oneYearRet": "12%",
                                    "minWeight": 5,
                                    "maxWeight": 15,
                                    "symbol": "IAC"
                                },
                                {
                                    "name": "Plutonion International",
                                    "weight": 12,
                                    "oneMonthRet": "1%",
                                    "oneYearRet": "15%",
                                    "minWeight": 10,
                                    "maxWeight": 20,
                                    "symbol": "PLI"
                                },
                                {
                                    "name": "Cape Wineries Plc",
                                    "weight": 20,
                                    "oneMonthRet": "1%",
                                    "oneYearRet": "15%",
                                    "minWeight": 15,
                                    "maxWeight": 30,
                                    "symbol": "CWN"
                                }
                            ],
                            "name": "South Africa",
                            "weight": 45,
                            "oneMonthRet": "11%",
                            "oneYearRet": "4%",
                            "minWeight": 30,
                            "maxWeight": 75
                        },
                        {
                            "assetJSONs": [
                                {
                                    "name": "Tea and Coffee Inc.",
                                    "weight": 6,
                                    "oneMonthRet": "12%",
                                    "oneYearRet": "32%",
                                    "minWeight": 0,
                                    "maxWeight": 10,
                                    "symbol": "TCI"
                                },
                                {
                                    "name": "Caribe Banana Co.",
                                    "weight": 24,
                                    "oneMonthRet": "12%",
                                    "oneYearRet": "22%",
                                    "minWeight": 10,
                                    "maxWeight": 25,
                                    "symbol": "CBC"
                                },
                                {
                                    "name": "Rasta Co",
                                    "weight": 5,
                                    "oneMonthRet": "2%",
                                    "oneYearRet": "20%",
                                    "minWeight": 5,
                                    "maxWeight": 7,
                                    "symbol": "RCO"
                                }
                            ],
                            "name": "Jamaica",
                            "weight": 35,
                            "oneMonthRet": "21%",
                            "oneYearRet": "2%",
                            "minWeight": 15,
                            "maxWeight": 42
                        },
                        {
                            "assetJSONs": [
                                {
                                    "name": "Mekong Lmtd",
                                    "weight": 6,
                                    "oneMonthRet": "6%",
                                    "oneYearRet": "2%",
                                    "minWeight": 5,
                                    "maxWeight": 25,
                                    "symbol": "MKL"
                                },
                                {
                                    "name": "Monks",
                                    "weight": 0,
                                    "oneMonthRet": "7%",
                                    "oneYearRet": "17%",
                                    "minWeight": 0,
                                    "maxWeight": 15,
                                    "symbol": "MNK"
                                },
                                {
                                    "name": "Mangoes Del Monte",
                                    "weight": 4,
                                    "oneMonthRet": "7%",
                                    "oneYearRet": "17%",
                                    "minWeight": 0,
                                    "maxWeight": 10,
                                    "symbol": "MDM"
                                }
                            ],
                            "name": "Cambodia",
                            "weight": 10,
                            "oneMonthRet": "14%",
                            "oneYearRet": "3%",
                            "minWeight": 5,
                            "maxWeight": 50
                        },
                        {
                            "assetJSONs": [
                                {
                                    "name": "Kim Lmtd",
                                    "weight": 5,
                                    "oneMonthRet": "6%",
                                    "oneYearRet": "2%",
                                    "minWeight": 5,
                                    "maxWeight": 30,
                                    "symbol": "KLM"
                                },
                                {
                                    "name": "Kim Unlimited",
                                    "weight": 5,
                                    "oneMonthRet": "7%",
                                    "oneYearRet": "17%",
                                    "minWeight": 0,
                                    "maxWeight": 20,
                                    "symbol": "KUL"
                                }
                            ],
                            "name": "North Korea",
                            "weight": 10,
                            "oneMonthRet": "14%",
                            "oneYearRet": "3%",
                            "minWeight": 5,
                            "maxWeight": 50
                        }
                    ],
                    "originalSheetID": null,
                    "personalizationComment": null,
                    "id": 10,
                    "title": "Hot Retail",
                    "longTitle": "Tezinis, Benetton, Autostrade",
                    "imageUrl": "../images/shopping.jpg",
                    "createdBy": "CocoonTechies",
                    "description": "The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad.",
                    "oneYearReturn": "11%",
                    "oneMonthReturn": "6%",
                    "dailyChange": "2%",
                    "benchmark": "S&P 1312",
                    "valueAtRisk": 5.1,
                    "volatility": 12.2,
                    "general": "New",
                    "valueBased": "Current",
                    "sector": "Retail"
                },
                {
                    "assetGroupJSONs": [
                        {
                            "assetJSONs": [
                                {
                                    "name": "Diamond Inc.",
                                    "weight": 10,
                                    "oneMonthRet": "6%",
                                    "oneYearRet": "42%",
                                    "minWeight": 0,
                                    "maxWeight": 10,
                                    "symbol": "SAD"
                                },
                                {
                                    "name": "Indian African Co.",
                                    "weight": 10,
                                    "oneMonthRet": "2%",
                                    "oneYearRet": "12%",
                                    "minWeight": 0,
                                    "maxWeight": 45,
                                    "symbol": "IAC"
                                },
                                {
                                    "name": "Plutonion International",
                                    "weight": 15,
                                    "oneMonthRet": "1%",
                                    "oneYearRet": "15%",
                                    "minWeight": 0,
                                    "maxWeight": 20,
                                    "symbol": "PLI"
                                },
                                {
                                    "name": "Cape Wineries Plc",
                                    "weight": 20,
                                    "oneMonthRet": "1%",
                                    "oneYearRet": "15%",
                                    "minWeight": 0,
                                    "maxWeight": 30,
                                    "symbol": "CWN"
                                }
                            ],
                            "name": "South Africa",
                            "weight": 55,
                            "oneMonthRet": "11%",
                            "oneYearRet": "4%",
                            "minWeight": 0,
                            "maxWeight": 100
                        },
                        {
                            "assetJSONs": [
                                {
                                    "name": "Tea and Coffee Inc.",
                                    "weight": 5,
                                    "oneMonthRet": "12%",
                                    "oneYearRet": "32%",
                                    "minWeight": 0,
                                    "maxWeight": 30,
                                    "symbol": "TCI"
                                },
                                {
                                    "name": "Caribe Banana Co.",
                                    "weight": 15,
                                    "oneMonthRet": "12%",
                                    "oneYearRet": "22%",
                                    "minWeight": 0,
                                    "maxWeight": 25,
                                    "symbol": "CBC"
                                },
                                {
                                    "name": "Rasta Co",
                                    "weight": 5,
                                    "oneMonthRet": "2%",
                                    "oneYearRet": "20%",
                                    "minWeight": 0,
                                    "maxWeight": 45,
                                    "symbol": "RCO"
                                }
                            ],
                            "name": "Jamaica",
                            "weight": 25,
                            "oneMonthRet": "21%",
                            "oneYearRet": "2%",
                            "minWeight": 0,
                            "maxWeight": 100
                        },
                        {
                            "assetJSONs": [
                                {
                                    "name": "Mekong Lmtd",
                                    "weight": 2,
                                    "oneMonthRet": "6%",
                                    "oneYearRet": "2%",
                                    "minWeight": 0,
                                    "maxWeight": 45,
                                    "symbol": "MKL"
                                },
                                {
                                    "name": "Monks",
                                    "weight": 2,
                                    "oneMonthRet": "7%",
                                    "oneYearRet": "17%",
                                    "minWeight": 0,
                                    "maxWeight": 15,
                                    "symbol": "MNK"
                                },
                                {
                                    "name": "Mangoes Del Monte",
                                    "weight": 6,
                                    "oneMonthRet": "7%",
                                    "oneYearRet": "17%",
                                    "minWeight": 0,
                                    "maxWeight": 40,
                                    "symbol": "MDM"
                                }
                            ],
                            "name": "Cambodia",
                            "weight": 10,
                            "oneMonthRet": "14%",
                            "oneYearRet": "3%",
                            "minWeight": 0,
                            "maxWeight": 100
                        },
                        {
                            "assetJSONs": [
                                {
                                    "name": "Kim Lmtd",
                                    "weight": 8,
                                    "oneMonthRet": "6%",
                                    "oneYearRet": "2%",
                                    "minWeight": 0,
                                    "maxWeight": 30,
                                    "symbol": "KLM"
                                },
                                {
                                    "name": "Kim Unlimited",
                                    "weight": 2,
                                    "oneMonthRet": "7%",
                                    "oneYearRet": "17%",
                                    "minWeight": 0,
                                    "maxWeight": 70,
                                    "symbol": "KUL"
                                }
                            ],
                            "name": "North Korea",
                            "weight": 10,
                            "oneMonthRet": "14%",
                            "oneYearRet": "3%",
                            "minWeight": 0,
                            "maxWeight": 100
                        }
                    ],
                    "originalSheetID": null,
                    "personalizationComment": null,
                    "id": 11,
                    "title": "Deflazione",
                    "longTitle": "Domani le tue banconote hanno più valore di oggi",
                    "imageUrl": "../images/deflation.jpg",
                    "createdBy": "CocoonTechies",
                    "description": "The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad.",
                    "oneYearReturn": "11%",
                    "oneMonthReturn": "6%",
                    "dailyChange": "2%",
                    "benchmark": "Best Dream Index",
                    "valueAtRisk": 2.2,
                    "volatility": 4,
                    "general": "Popular",
                    "valueBased": "Social",
                    "sector": "FS"
                },
                {
                    "assetGroupJSONs": [
                        {
                            "assetJSONs": [
                                {
                                    "name": "Diamond Inc.",
                                    "weight": 10,
                                    "oneMonthRet": "6%",
                                    "oneYearRet": "42%",
                                    "minWeight": 0,
                                    "maxWeight": 10,
                                    "symbol": "SAD"
                                },
                                {
                                    "name": "Indian African Co.",
                                    "weight": 10,
                                    "oneMonthRet": "2%",
                                    "oneYearRet": "12%",
                                    "minWeight": 0,
                                    "maxWeight": 45,
                                    "symbol": "IAC"
                                },
                                {
                                    "name": "Plutonion International",
                                    "weight": 15,
                                    "oneMonthRet": "1%",
                                    "oneYearRet": "15%",
                                    "minWeight": 0,
                                    "maxWeight": 20,
                                    "symbol": "PLI"
                                },
                                {
                                    "name": "Cape Wineries Plc",
                                    "weight": 20,
                                    "oneMonthRet": "1%",
                                    "oneYearRet": "15%",
                                    "minWeight": 0,
                                    "maxWeight": 30,
                                    "symbol": "CWN"
                                }
                            ],
                            "name": "South Africa",
                            "weight": 55,
                            "oneMonthRet": "11%",
                            "oneYearRet": "4%",
                            "minWeight": 0,
                            "maxWeight": 100
                        },
                        {
                            "assetJSONs": [
                                {
                                    "name": "Tea and Coffee Inc.",
                                    "weight": 5,
                                    "oneMonthRet": "12%",
                                    "oneYearRet": "32%",
                                    "minWeight": 0,
                                    "maxWeight": 30,
                                    "symbol": "TCI"
                                },
                                {
                                    "name": "Caribe Banana Co.",
                                    "weight": 15,
                                    "oneMonthRet": "12%",
                                    "oneYearRet": "22%",
                                    "minWeight": 0,
                                    "maxWeight": 25,
                                    "symbol": "CBC"
                                },
                                {
                                    "name": "Rasta Co",
                                    "weight": 5,
                                    "oneMonthRet": "2%",
                                    "oneYearRet": "20%",
                                    "minWeight": 0,
                                    "maxWeight": 45,
                                    "symbol": "RCO"
                                }
                            ],
                            "name": "Jamaica",
                            "weight": 25,
                            "oneMonthRet": "21%",
                            "oneYearRet": "2%",
                            "minWeight": 0,
                            "maxWeight": 100
                        },
                        {
                            "assetJSONs": [
                                {
                                    "name": "Mekong Lmtd",
                                    "weight": 2,
                                    "oneMonthRet": "6%",
                                    "oneYearRet": "2%",
                                    "minWeight": 0,
                                    "maxWeight": 45,
                                    "symbol": "MKL"
                                },
                                {
                                    "name": "Monks",
                                    "weight": 2,
                                    "oneMonthRet": "7%",
                                    "oneYearRet": "17%",
                                    "minWeight": 0,
                                    "maxWeight": 15,
                                    "symbol": "MNK"
                                },
                                {
                                    "name": "Mangoes Del Monte",
                                    "weight": 6,
                                    "oneMonthRet": "7%",
                                    "oneYearRet": "17%",
                                    "minWeight": 0,
                                    "maxWeight": 40,
                                    "symbol": "MDM"
                                }
                            ],
                            "name": "Cambodia",
                            "weight": 10,
                            "oneMonthRet": "14%",
                            "oneYearRet": "3%",
                            "minWeight": 0,
                            "maxWeight": 100
                        },
                        {
                            "assetJSONs": [
                                {
                                    "name": "Kim Lmtd",
                                    "weight": 8,
                                    "oneMonthRet": "6%",
                                    "oneYearRet": "2%",
                                    "minWeight": 0,
                                    "maxWeight": 30,
                                    "symbol": "KLM"
                                },
                                {
                                    "name": "Kim Unlimited",
                                    "weight": 2,
                                    "oneMonthRet": "7%",
                                    "oneYearRet": "17%",
                                    "minWeight": 0,
                                    "maxWeight": 70,
                                    "symbol": "KUL"
                                }
                            ],
                            "name": "North Korea",
                            "weight": 10,
                            "oneMonthRet": "14%",
                            "oneYearRet": "3%",
                            "minWeight": 0,
                            "maxWeight": 100
                        }
                    ],
                    "originalSheetID": null,
                    "personalizationComment": null,
                    "id": 12,
                    "title": "Stagflazione",
                    "longTitle": "Non so cosa voglia dire",
                    "imageUrl": "../images/office.jpg",
                    "createdBy": "CocoonTechies",
                    "description": "The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad.",
                    "oneYearReturn": "11%",
                    "oneMonthReturn": "6%",
                    "dailyChange": "2%",
                    "benchmark": "Worst Nitghmare Index",
                    "valueAtRisk": 0.2,
                    "volatility": 1.1,
                    "general": "New",
                    "valueBased": "Green",
                    "sector": "FS"
                },
                {
                    "assetGroupJSONs": [
                        {
                            "assetJSONs": [
                                {
                                    "name": "Diamond Inc.",
                                    "weight": 5,
                                    "oneMonthRet": "6%",
                                    "oneYearRet": "42%",
                                    "minWeight": 0,
                                    "maxWeight": 10,
                                    "symbol": "SAD"
                                },
                                {
                                    "name": "Indian African Co.",
                                    "weight": 8,
                                    "oneMonthRet": "2%",
                                    "oneYearRet": "12%",
                                    "minWeight": 5,
                                    "maxWeight": 15,
                                    "symbol": "IAC"
                                },
                                {
                                    "name": "Plutonion International",
                                    "weight": 12,
                                    "oneMonthRet": "1%",
                                    "oneYearRet": "15%",
                                    "minWeight": 10,
                                    "maxWeight": 20,
                                    "symbol": "PLI"
                                },
                                {
                                    "name": "Cape Wineries Plc",
                                    "weight": 20,
                                    "oneMonthRet": "1%",
                                    "oneYearRet": "15%",
                                    "minWeight": 15,
                                    "maxWeight": 30,
                                    "symbol": "CWN"
                                }
                            ],
                            "name": "South Africa",
                            "weight": 45,
                            "oneMonthRet": "11%",
                            "oneYearRet": "4%",
                            "minWeight": 30,
                            "maxWeight": 75
                        },
                        {
                            "assetJSONs": [
                                {
                                    "name": "Tea and Coffee Inc.",
                                    "weight": 6,
                                    "oneMonthRet": "12%",
                                    "oneYearRet": "32%",
                                    "minWeight": 0,
                                    "maxWeight": 10,
                                    "symbol": "TCI"
                                },
                                {
                                    "name": "Caribe Banana Co.",
                                    "weight": 24,
                                    "oneMonthRet": "12%",
                                    "oneYearRet": "22%",
                                    "minWeight": 10,
                                    "maxWeight": 25,
                                    "symbol": "CBC"
                                },
                                {
                                    "name": "Rasta Co",
                                    "weight": 5,
                                    "oneMonthRet": "2%",
                                    "oneYearRet": "20%",
                                    "minWeight": 5,
                                    "maxWeight": 7,
                                    "symbol": "RCO"
                                }
                            ],
                            "name": "Jamaica",
                            "weight": 35,
                            "oneMonthRet": "21%",
                            "oneYearRet": "2%",
                            "minWeight": 15,
                            "maxWeight": 42
                        },
                        {
                            "assetJSONs": [
                                {
                                    "name": "Mekong Lmtd",
                                    "weight": 6,
                                    "oneMonthRet": "6%",
                                    "oneYearRet": "2%",
                                    "minWeight": 5,
                                    "maxWeight": 25,
                                    "symbol": "MKL"
                                },
                                {
                                    "name": "Monks",
                                    "weight": 0,
                                    "oneMonthRet": "7%",
                                    "oneYearRet": "17%",
                                    "minWeight": 0,
                                    "maxWeight": 15,
                                    "symbol": "MNK"
                                },
                                {
                                    "name": "Mangoes Del Monte",
                                    "weight": 4,
                                    "oneMonthRet": "7%",
                                    "oneYearRet": "17%",
                                    "minWeight": 0,
                                    "maxWeight": 10,
                                    "symbol": "MDM"
                                }
                            ],
                            "name": "Cambodia",
                            "weight": 10,
                            "oneMonthRet": "14%",
                            "oneYearRet": "3%",
                            "minWeight": 5,
                            "maxWeight": 50
                        },
                        {
                            "assetJSONs": [
                                {
                                    "name": "Kim Lmtd",
                                    "weight": 5,
                                    "oneMonthRet": "6%",
                                    "oneYearRet": "2%",
                                    "minWeight": 5,
                                    "maxWeight": 30,
                                    "symbol": "KLM"
                                },
                                {
                                    "name": "Kim Unlimited",
                                    "weight": 5,
                                    "oneMonthRet": "7%",
                                    "oneYearRet": "17%",
                                    "minWeight": 0,
                                    "maxWeight": 20,
                                    "symbol": "KUL"
                                }
                            ],
                            "name": "North Korea",
                            "weight": 10,
                            "oneMonthRet": "14%",
                            "oneYearRet": "3%",
                            "minWeight": 5,
                            "maxWeight": 50
                        }
                    ],
                    "originalSheetID": null,
                    "personalizationComment": null,
                    "id": 13,
                    "title": "Ebola",
                    "longTitle": "Su questo non si scherza",
                    "imageUrl": "../images/ebola.jpg",
                    "createdBy": "CocoonTechies",
                    "description": "The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad.",
                    "oneYearReturn": "11%",
                    "oneMonthReturn": "6%",
                    "dailyChange": "2%",
                    "benchmark": "S&P 1312",
                    "valueAtRisk": 0.3,
                    "volatility": 0.9,
                    "general": "Popular",
                    "valueBased": "Current",
                    "sector": "Retail"
                },
                {
                    "assetGroupJSONs": [
                        {
                            "assetJSONs": [
                                {
                                    "name": "Diamond Inc.",
                                    "weight": 10,
                                    "oneMonthRet": "6%",
                                    "oneYearRet": "42%",
                                    "minWeight": 0,
                                    "maxWeight": 10,
                                    "symbol": "SAD"
                                },
                                {
                                    "name": "Indian African Co.",
                                    "weight": 10,
                                    "oneMonthRet": "2%",
                                    "oneYearRet": "12%",
                                    "minWeight": 0,
                                    "maxWeight": 45,
                                    "symbol": "IAC"
                                },
                                {
                                    "name": "Plutonion International",
                                    "weight": 15,
                                    "oneMonthRet": "1%",
                                    "oneYearRet": "15%",
                                    "minWeight": 0,
                                    "maxWeight": 20,
                                    "symbol": "PLI"
                                },
                                {
                                    "name": "Cape Wineries Plc",
                                    "weight": 20,
                                    "oneMonthRet": "1%",
                                    "oneYearRet": "15%",
                                    "minWeight": 0,
                                    "maxWeight": 30,
                                    "symbol": "CWN"
                                }
                            ],
                            "name": "South Africa",
                            "weight": 55,
                            "oneMonthRet": "11%",
                            "oneYearRet": "4%",
                            "minWeight": 0,
                            "maxWeight": 100
                        },
                        {
                            "assetJSONs": [
                                {
                                    "name": "Tea and Coffee Inc.",
                                    "weight": 5,
                                    "oneMonthRet": "12%",
                                    "oneYearRet": "32%",
                                    "minWeight": 0,
                                    "maxWeight": 30,
                                    "symbol": "TCI"
                                },
                                {
                                    "name": "Caribe Banana Co.",
                                    "weight": 15,
                                    "oneMonthRet": "12%",
                                    "oneYearRet": "22%",
                                    "minWeight": 0,
                                    "maxWeight": 25,
                                    "symbol": "CBC"
                                },
                                {
                                    "name": "Rasta Co",
                                    "weight": 5,
                                    "oneMonthRet": "2%",
                                    "oneYearRet": "20%",
                                    "minWeight": 0,
                                    "maxWeight": 45,
                                    "symbol": "RCO"
                                }
                            ],
                            "name": "Jamaica",
                            "weight": 25,
                            "oneMonthRet": "21%",
                            "oneYearRet": "2%",
                            "minWeight": 0,
                            "maxWeight": 100
                        },
                        {
                            "assetJSONs": [
                                {
                                    "name": "Mekong Lmtd",
                                    "weight": 2,
                                    "oneMonthRet": "6%",
                                    "oneYearRet": "2%",
                                    "minWeight": 0,
                                    "maxWeight": 45,
                                    "symbol": "MKL"
                                },
                                {
                                    "name": "Monks",
                                    "weight": 2,
                                    "oneMonthRet": "7%",
                                    "oneYearRet": "17%",
                                    "minWeight": 0,
                                    "maxWeight": 15,
                                    "symbol": "MNK"
                                },
                                {
                                    "name": "Mangoes Del Monte",
                                    "weight": 6,
                                    "oneMonthRet": "7%",
                                    "oneYearRet": "17%",
                                    "minWeight": 0,
                                    "maxWeight": 40,
                                    "symbol": "MDM"
                                }
                            ],
                            "name": "Cambodia",
                            "weight": 10,
                            "oneMonthRet": "14%",
                            "oneYearRet": "3%",
                            "minWeight": 0,
                            "maxWeight": 100
                        },
                        {
                            "assetJSONs": [
                                {
                                    "name": "Kim Lmtd",
                                    "weight": 8,
                                    "oneMonthRet": "6%",
                                    "oneYearRet": "2%",
                                    "minWeight": 0,
                                    "maxWeight": 30,
                                    "symbol": "KLM"
                                },
                                {
                                    "name": "Kim Unlimited",
                                    "weight": 2,
                                    "oneMonthRet": "7%",
                                    "oneYearRet": "17%",
                                    "minWeight": 0,
                                    "maxWeight": 70,
                                    "symbol": "KUL"
                                }
                            ],
                            "name": "North Korea",
                            "weight": 10,
                            "oneMonthRet": "14%",
                            "oneYearRet": "3%",
                            "minWeight": 0,
                            "maxWeight": 100
                        }
                    ],
                    "originalSheetID": null,
                    "personalizationComment": null,
                    "id": 14,
                    "title": "Foodies",
                    "longTitle": "The last frontier of our beloved western world",
                    "imageUrl": "../images/foodies.jpg",
                    "createdBy": "CocoonTechies",
                    "description": "The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad.",
                    "oneYearReturn": "11%",
                    "oneMonthReturn": "6%",
                    "dailyChange": "2%",
                    "benchmark": "Best Dream Index",
                    "valueAtRisk": 1.1,
                    "volatility": 2.5,
                    "general": "Popular",
                    "valueBased": "Social",
                    "sector": "Retail"
                },
                {
                    "assetGroupJSONs": [
                        {
                            "assetJSONs": [
                                {
                                    "name": "Diamond Inc.",
                                    "weight": 10,
                                    "oneMonthRet": "6%",
                                    "oneYearRet": "42%",
                                    "minWeight": 0,
                                    "maxWeight": 10,
                                    "symbol": "SAD"
                                },
                                {
                                    "name": "Indian African Co.",
                                    "weight": 10,
                                    "oneMonthRet": "2%",
                                    "oneYearRet": "12%",
                                    "minWeight": 0,
                                    "maxWeight": 45,
                                    "symbol": "IAC"
                                },
                                {
                                    "name": "Plutonion International",
                                    "weight": 15,
                                    "oneMonthRet": "1%",
                                    "oneYearRet": "15%",
                                    "minWeight": 0,
                                    "maxWeight": 20,
                                    "symbol": "PLI"
                                },
                                {
                                    "name": "Cape Wineries Plc",
                                    "weight": 20,
                                    "oneMonthRet": "1%",
                                    "oneYearRet": "15%",
                                    "minWeight": 0,
                                    "maxWeight": 30,
                                    "symbol": "CWN"
                                }
                            ],
                            "name": "South Africa",
                            "weight": 55,
                            "oneMonthRet": "11%",
                            "oneYearRet": "4%",
                            "minWeight": 0,
                            "maxWeight": 100
                        },
                        {
                            "assetJSONs": [
                                {
                                    "name": "Tea and Coffee Inc.",
                                    "weight": 5,
                                    "oneMonthRet": "12%",
                                    "oneYearRet": "32%",
                                    "minWeight": 0,
                                    "maxWeight": 30,
                                    "symbol": "TCI"
                                },
                                {
                                    "name": "Caribe Banana Co.",
                                    "weight": 15,
                                    "oneMonthRet": "12%",
                                    "oneYearRet": "22%",
                                    "minWeight": 0,
                                    "maxWeight": 25,
                                    "symbol": "CBC"
                                },
                                {
                                    "name": "Rasta Co",
                                    "weight": 5,
                                    "oneMonthRet": "2%",
                                    "oneYearRet": "20%",
                                    "minWeight": 0,
                                    "maxWeight": 45,
                                    "symbol": "RCO"
                                }
                            ],
                            "name": "Jamaica",
                            "weight": 25,
                            "oneMonthRet": "21%",
                            "oneYearRet": "2%",
                            "minWeight": 0,
                            "maxWeight": 100
                        },
                        {
                            "assetJSONs": [
                                {
                                    "name": "Mekong Lmtd",
                                    "weight": 2,
                                    "oneMonthRet": "6%",
                                    "oneYearRet": "2%",
                                    "minWeight": 0,
                                    "maxWeight": 45,
                                    "symbol": "MKL"
                                },
                                {
                                    "name": "Monks",
                                    "weight": 2,
                                    "oneMonthRet": "7%",
                                    "oneYearRet": "17%",
                                    "minWeight": 0,
                                    "maxWeight": 15,
                                    "symbol": "MNK"
                                },
                                {
                                    "name": "Mangoes Del Monte",
                                    "weight": 6,
                                    "oneMonthRet": "7%",
                                    "oneYearRet": "17%",
                                    "minWeight": 0,
                                    "maxWeight": 40,
                                    "symbol": "MDM"
                                }
                            ],
                            "name": "Cambodia",
                            "weight": 10,
                            "oneMonthRet": "14%",
                            "oneYearRet": "3%",
                            "minWeight": 0,
                            "maxWeight": 100
                        },
                        {
                            "assetJSONs": [
                                {
                                    "name": "Kim Lmtd",
                                    "weight": 8,
                                    "oneMonthRet": "6%",
                                    "oneYearRet": "2%",
                                    "minWeight": 0,
                                    "maxWeight": 30,
                                    "symbol": "KLM"
                                },
                                {
                                    "name": "Kim Unlimited",
                                    "weight": 2,
                                    "oneMonthRet": "7%",
                                    "oneYearRet": "17%",
                                    "minWeight": 0,
                                    "maxWeight": 70,
                                    "symbol": "KUL"
                                }
                            ],
                            "name": "North Korea",
                            "weight": 10,
                            "oneMonthRet": "14%",
                            "oneYearRet": "3%",
                            "minWeight": 0,
                            "maxWeight": 100
                        }
                    ],
                    "originalSheetID": null,
                    "personalizationComment": null,
                    "id": 15,
                    "title": "RIP",
                    "longTitle": "Investire in una cosa sicura",
                    "imageUrl": "../images/forRent.jpg",
                    "createdBy": "CocoonTechies",
                    "description": "The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad.",
                    "oneYearReturn": "11%",
                    "oneMonthReturn": "6%",
                    "dailyChange": "2%",
                    "benchmark": "Worst Nitghmare Index",
                    "valueAtRisk": 6.2,
                    "volatility": 14.4,
                    "general": "Popular",
                    "valueBased": "Political",
                    "sector": "Health"
                },
                {
                    "assetGroupJSONs": [
                        {
                            "assetJSONs": [
                                {
                                    "name": "Diamond Inc.",
                                    "weight": 5,
                                    "oneMonthRet": "6%",
                                    "oneYearRet": "42%",
                                    "minWeight": 0,
                                    "maxWeight": 10,
                                    "symbol": "SAD"
                                },
                                {
                                    "name": "Indian African Co.",
                                    "weight": 8,
                                    "oneMonthRet": "2%",
                                    "oneYearRet": "12%",
                                    "minWeight": 5,
                                    "maxWeight": 15,
                                    "symbol": "IAC"
                                },
                                {
                                    "name": "Plutonion International",
                                    "weight": 12,
                                    "oneMonthRet": "1%",
                                    "oneYearRet": "15%",
                                    "minWeight": 10,
                                    "maxWeight": 20,
                                    "symbol": "PLI"
                                },
                                {
                                    "name": "Cape Wineries Plc",
                                    "weight": 20,
                                    "oneMonthRet": "1%",
                                    "oneYearRet": "15%",
                                    "minWeight": 15,
                                    "maxWeight": 30,
                                    "symbol": "CWN"
                                }
                            ],
                            "name": "South Africa",
                            "weight": 45,
                            "oneMonthRet": "11%",
                            "oneYearRet": "4%",
                            "minWeight": 30,
                            "maxWeight": 75
                        },
                        {
                            "assetJSONs": [
                                {
                                    "name": "Tea and Coffee Inc.",
                                    "weight": 6,
                                    "oneMonthRet": "12%",
                                    "oneYearRet": "32%",
                                    "minWeight": 0,
                                    "maxWeight": 10,
                                    "symbol": "TCI"
                                },
                                {
                                    "name": "Caribe Banana Co.",
                                    "weight": 24,
                                    "oneMonthRet": "12%",
                                    "oneYearRet": "22%",
                                    "minWeight": 10,
                                    "maxWeight": 25,
                                    "symbol": "CBC"
                                },
                                {
                                    "name": "Rasta Co",
                                    "weight": 5,
                                    "oneMonthRet": "2%",
                                    "oneYearRet": "20%",
                                    "minWeight": 5,
                                    "maxWeight": 7,
                                    "symbol": "RCO"
                                }
                            ],
                            "name": "Jamaica",
                            "weight": 35,
                            "oneMonthRet": "21%",
                            "oneYearRet": "2%",
                            "minWeight": 15,
                            "maxWeight": 42
                        },
                        {
                            "assetJSONs": [
                                {
                                    "name": "Mekong Lmtd",
                                    "weight": 6,
                                    "oneMonthRet": "6%",
                                    "oneYearRet": "2%",
                                    "minWeight": 5,
                                    "maxWeight": 25,
                                    "symbol": "MKL"
                                },
                                {
                                    "name": "Monks",
                                    "weight": 0,
                                    "oneMonthRet": "7%",
                                    "oneYearRet": "17%",
                                    "minWeight": 0,
                                    "maxWeight": 15,
                                    "symbol": "MNK"
                                },
                                {
                                    "name": "Mangoes Del Monte",
                                    "weight": 4,
                                    "oneMonthRet": "7%",
                                    "oneYearRet": "17%",
                                    "minWeight": 0,
                                    "maxWeight": 10,
                                    "symbol": "MDM"
                                }
                            ],
                            "name": "Cambodia",
                            "weight": 10,
                            "oneMonthRet": "14%",
                            "oneYearRet": "3%",
                            "minWeight": 5,
                            "maxWeight": 50
                        },
                        {
                            "assetJSONs": [
                                {
                                    "name": "Kim Lmtd",
                                    "weight": 5,
                                    "oneMonthRet": "6%",
                                    "oneYearRet": "2%",
                                    "minWeight": 5,
                                    "maxWeight": 30,
                                    "symbol": "KLM"
                                },
                                {
                                    "name": "Kim Unlimited",
                                    "weight": 5,
                                    "oneMonthRet": "7%",
                                    "oneYearRet": "17%",
                                    "minWeight": 0,
                                    "maxWeight": 20,
                                    "symbol": "KUL"
                                }
                            ],
                            "name": "North Korea",
                            "weight": 10,
                            "oneMonthRet": "14%",
                            "oneYearRet": "3%",
                            "minWeight": 5,
                            "maxWeight": 50
                        }
                    ],
                    "originalSheetID": null,
                    "personalizationComment": null,
                    "id": 16,
                    "title": "Bye Bye Baby",
                    "longTitle": "The last opportunity for us",
                    "imageUrl": "../images/shopFromHome.jpg",
                    "createdBy": "CocoonTechies",
                    "description": "The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad.",
                    "oneYearReturn": "11%",
                    "oneMonthReturn": "6%",
                    "dailyChange": "2%",
                    "benchmark": "S&P 1312",
                    "valueAtRisk": 2.2,
                    "volatility": 4.5,
                    "general": "New",
                    "valueBased": "Current",
                    "sector": "Retail"
                }
            ]
    }
    /*getSheetJSONs() {
        return [
            {
                "id": 0,
                "title": "Bear Int Market",
                "longTitle": "International bears move on",
                "imageUrl": "../images/bears.jpg",
                "description": "The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad.",
                "oneYearReturn": "11%",
                "oneMonthReturn": "6%",
                "dailyChange": "2%",
                "benchmark": "Worst Nitghmare Index",
                "valueAtRisk": 4,
                "volatility": 12.2,
                "general": "Brands u know",
                "valueBased": "Green",
                "sector": "Energy"
            },
            {
                "id": 1,
                "title": "Bear US Sectors",
                "longTitle": "US bears roars in several sectors",
                "imageUrl": "../images/cyclingBear.jpg",
                "description": "The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad.",
                "oneYearReturn": "11%",
                "oneMonthReturn": "6%",
                "dailyChange": "2%",
                "benchmark": "Worst Nitghmare Index",
                "valueAtRisk": 5.3,
                "volatility": 11.3,
                "general": "Popular",
                "valueBased": "Current",
                "sector": "Health"
            },
            {
                "id": 2,
                "title": "Enengia Pulita",
                "longTitle": "Clean energy from italian gymns",
                "imageUrl": "../images/windMills.jpg",
                "description": "The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad.",
                "oneYearReturn": "11%",
                "oneMonthReturn": "6%",
                "dailyChange": "2%",
                "benchmark": "Worst Nitghmare Index",
                "valueAtRisk": 0.3,
                "volatility": 8.8,
                "general": "Popular",
                "valueBased": "Green",
                "sector": "FS"
            },
            {
                "id": 3,
                "title": "China internet",
                "longTitle": "Many chines will shop online soon",
                "imageUrl": "../images/chinaInternet.jpg",
                "description": "The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad.",
                "oneYearReturn": "11%",
                "oneMonthReturn": "6%",
                "dailyChange": "2%",
                "benchmark": "Worst Nitghmare Index",
                "valueAtRisk": 8.8,
                "volatility": 25.5,
                "general": "New",
                "valueBased": "Political",
                "sector": "Real Estate"
            },
            {
                "id": 4,
                "title": "Mercati Orso USA",
                "longTitle": "Orso americano non ruggisce solo a UCLA",
                "imageUrl": "../images/usBear.jpg",
                "description": "The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad.",
                "oneYearReturn": "11%",
                "oneMonthReturn": "6%",
                "dailyChange": "2%",
                "benchmark": "Worst Nitghmare Index",
                "valueAtRisk": 4.3,
                "volatility": 15.5,
                "general": "New",
                "valueBased": "Political",
                "sector": "Retail"
            },
            {
                "id": 5,
                "title": "Slot Machines and Casino",
                "longTitle": "Everybody hopes tomorrow will be their luck day",
                "imageUrl": "../images/games.jpg",
                "description": "The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad.",
                "oneYearReturn": "11%",
                "oneMonthReturn": "6%",
                "dailyChange": "2%",
                "benchmark": "Worst Nitghmare Index",
                "valueAtRisk": 5,
                "volatility": 14.3,
                "general": "Popular",
                "valueBased": "Green",
                "sector": "FS"
            },
            {
                "id": 6,
                "title": "IPO recenti",
                "longTitle": "Molti imprenditori tentano la fortuna",
                "imageUrl": "../images/ipos.jpg",
                "description": "The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad.",
                "oneYearReturn": "11%",
                "oneMonthReturn": "6%",
                "dailyChange": "2%",
                "benchmark": "Worst Nitghmare Index",
                "valueAtRisk": 2.2,
                "volatility": 3.4,
                "general": "Popular",
                "valueBased": "Social",
                "sector": "FS"
            },
            {
                "id": 7,
                "title": "Sci su erba",
                "longTitle": "Fa troppo caldo, non si vede neve, sciamo con in cingoli",
                "imageUrl": "../images/2Hot.jpg",
                "description": "The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad.",
                "oneYearReturn": "11%",
                "oneMonthReturn": "6%",
                "dailyChange": "2%",
                "benchmark": "Worst Nitghmare Index",
                "valueAtRisk": 2.1,
                "volatility": 2.2,
                "general": "New",
                "valueBased": "Social",
                "sector": "Energy"
            },
            {
                "id": 8,
                "title": "Vanity Fair",
                "longTitle": "Gli uomini sono diventati più vanitosi delle donne",
                "imageUrl": "../images/vanity.jpg",
                "description": "The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad.",
                "oneYearReturn": "11%",
                "oneMonthReturn": "6%",
                "dailyChange": "2%",
                "benchmark": "Worst Nitghmare Index",
                "valueAtRisk": 7.1,
                "volatility": 23.3,
                "general": "New",
                "valueBased": "Current",
                "sector": "Health"
            },
            {
                "id": 9,
                "title": "Caffe e tea",
                "longTitle": "Il te verde fa specialmente bene",
                "imageUrl": "../images/coffe.jpg",
                "description": "The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad.",
                "oneYearReturn": "11%",
                "oneMonthReturn": "6%",
                "dailyChange": "2%",
                "benchmark": "Worst Nitghmare Index",
                "valueAtRisk": 3.2,
                "volatility": 8.9,
                "general": "Popular",
                "valueBased": "Social",
                "sector": "Health"
            },
            {
                "id": 10,
                "title": "Hot Retail",
                "longTitle": "Tezinis, Benetton, Autostrade",
                "imageUrl": "../images/shopping.jpg",
                "description": "The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad.",
                "oneYearReturn": "11%",
                "oneMonthReturn": "6%",
                "dailyChange": "2%",
                "benchmark": "Worst Nitghmare Index",
                "valueAtRisk": 5.1,
                "volatility": 12.2,
                "general": "New",
                "valueBased": "Current",
                "sector": "Retail"
            },
            {
                "id": 11,
                "title": "Deflazione",
                "longTitle": "Domani le tue banconote hanno più valore di oggi",
                "imageUrl": "../images/deflation.jpg",
                "description": "The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad.",
                "oneYearReturn": "11%",
                "oneMonthReturn": "6%",
                "dailyChange": "2%",
                "benchmark": "Worst Nitghmare Index",
                "valueAtRisk": 2.2,
                "volatility": 4,
                "general": "Popular",
                "valueBased": "Social",
                "sector": "FS"
            },
            {
                "id": 12,
                "title": "Stagflazione",
                "longTitle": "Non so cosa voglia dire",
                "imageUrl": "../images/office.jpg",
                "description": "The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad.",
                "oneYearReturn": "11%",
                "oneMonthReturn": "6%",
                "dailyChange": "2%",
                "benchmark": "Worst Nitghmare Index",
                "valueAtRisk": 0.2,
                "volatility": 1.1,
                "general": "New",
                "valueBased": "Green",
                "sector": "FS"
            },
            {
                "id": 13,
                "title": "Ebola",
                "longTitle": "Su questo non si scherza",
                "imageUrl": "../images/ebola.jpg",
                "description": "The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad.",
                "oneYearReturn": "11%",
                "oneMonthReturn": "6%",
                "dailyChange": "2%",
                "benchmark": "Worst Nitghmare Index",
                "valueAtRisk": 0.3,
                "volatility": 0.9,
                "general": "Popular",
                "valueBased": "Current",
                "sector": "Retail"
            },
            {
                "id": 14,
                "title": "Foodies",
                "longTitle": "The last frontier of our beloved western world",
                "imageUrl": "../images/foodies.jpg",
                "description": "The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad.",
                "oneYearReturn": "11%",
                "oneMonthReturn": "6%",
                "dailyChange": "2%",
                "benchmark": "Worst Nitghmare Index",
                "valueAtRisk": 1.1,
                "volatility": 2.5,
                "general": "Popular",
                "valueBased": "Social",
                "sector": "Retail"
            },
            {
                "id": 15,
                "title": "RIP",
                "longTitle": "Investire in una cosa sicura",
                "imageUrl": "../images/forRent.jpg",
                "description": "The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad.",
                "oneYearReturn": "11%",
                "oneMonthReturn": "6%",
                "dailyChange": "2%",
                "benchmark": "Worst Nitghmare Index",
                "valueAtRisk": 6.2,
                "volatility": 14.4,
                "general": "Popular",
                "valueBased": "Political",
                "sector": "Health"
            },
            {
                "id": 16,
                "title": "Bye Bye Baby",
                "longTitle": "The last opportunity for us",
                "imageUrl": "../images/shopFromHome.jpg",
                "description": "The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. The morning has the sun in its mouth. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad. So much goes the cat to the lard that she looses the pad.",
                "oneYearReturn": "11%",
                "oneMonthReturn": "6%",
                "dailyChange": "2%",
                "benchmark": "Worst Nitghmare Index",
                "valueAtRisk": 2.2,
                "volatility": 4.5,
                "general": "New",
                "valueBased": "Current",
                "sector": "Retail"
            }
        ]
    }*/
}

module.exports = SheetDBBuilder;