System.register(['angular2/core', './sheetBackEnd.service', './returnPeriod', '../ng2Highcharts/src/directives/ng2-highcharts', '../ng2Highcharts/src/directives/ng2-highstocks', '../utilities/httpErrorManager.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, sheetBackEnd_service_1, returnPeriod_1, ng2_highcharts_1, ng2_highstocks_1, httpErrorManager_component_1;
    var SheetReturnData;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (sheetBackEnd_service_1_1) {
                sheetBackEnd_service_1 = sheetBackEnd_service_1_1;
            },
            function (returnPeriod_1_1) {
                returnPeriod_1 = returnPeriod_1_1;
            },
            function (ng2_highcharts_1_1) {
                ng2_highcharts_1 = ng2_highcharts_1_1;
            },
            function (ng2_highstocks_1_1) {
                ng2_highstocks_1 = ng2_highstocks_1_1;
            },
            function (httpErrorManager_component_1_1) {
                httpErrorManager_component_1 = httpErrorManager_component_1_1;
            }],
        execute: function() {
            SheetReturnData = (function () {
                function SheetReturnData(_sheetBackEnd) {
                    this._sheetBackEnd = _sheetBackEnd;
                    this.currentPeriod = returnPeriod_1.ReturnPeriod.lastMonth;
                    this.complexView = false;
                }
                Object.defineProperty(SheetReturnData.prototype, "setSheets", {
                    set: function (inSheets) {
                        var _this = this;
                        this.sheets = inSheets;
                        this.setLastMonthSeries();
                        for (var i = 0; i < this.sheets.length; i++) {
                            this._subscriptionToSheetCompositionChange = this.sheets[i].getChangeCompositionEvent().
                                subscribe(function (inSheet) { return _this.updateReturnData(inSheet); });
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                SheetReturnData.prototype.ngOnDestroy = function () {
                    for (var i = 0; i < this.sheets.length; i++) {
                        this._subscriptionToSheetCompositionChange = this.sheets[i].getChangeCompositionEvent().unsubscribe();
                    }
                };
                SheetReturnData.prototype.setLastMonthSeries = function () {
                    var _this = this;
                    var series = new Array();
                    var counter = 0;
                    for (var i = 0; i < this.sheets.length; i++) {
                        var oneSheet = this.sheets[i];
                        if (oneSheet.returnDataLastMonth.isEmpty()) {
                            this._sheetBackEnd.getReturnData(oneSheet, returnPeriod_1.ReturnPeriod.lastMonth)
                                .subscribe(function (returnData) {
                                oneSheet.returnDataLastMonth.data = returnData[0];
                                oneSheet.returnDataBenchmarkLastMonth.data = returnData[1];
                                counter = counter + 1;
                                _this.pushChartDataLastMonth(series, oneSheet, counter);
                                /*series.push({
                                    name: oneSheet.title,
                                    data: oneSheet.returnDataLastMonth.data
                                });
                                series.push({
                                    name: oneSheet.benchmark,
                                    data: oneSheet.returnDataBenchmarkLastMonth.data
                                });
                                counter = counter + 1;
                                // the last thread to be executed sets the series for the chart
                                if (counter == this.sheets.length) {
                                    this.currentPeriod = ReturnPeriod.lastMonth;
                                    this.periodText = 'Last month';
                                    this.setSeriesInChartOptions(series);
                                }*/
                            }, function (error) { return _this.httpErrorResponse = error; });
                        }
                        else {
                            counter = counter + 1;
                            this.pushChartDataLastMonth(series, oneSheet, counter);
                        }
                    }
                };
                SheetReturnData.prototype.pushChartDataLastMonth = function (inSeries, inSheet, inCounter) {
                    inSeries.push({
                        name: inSheet.title,
                        data: inSheet.returnDataLastMonth.data
                    });
                    inSeries.push({
                        name: inSheet.benchmark,
                        data: inSheet.returnDataBenchmarkLastMonth.data
                    });
                    // the last thread to be executed sets the series for the chart
                    if (inCounter == this.sheets.length) {
                        this.currentPeriod = returnPeriod_1.ReturnPeriod.lastMonth;
                        this.periodText = 'Last month';
                        this.setSeriesInChartOptions(inSeries);
                    }
                };
                SheetReturnData.prototype.setLastYearSeries = function () {
                    var _this = this;
                    /*let series = new Array<any>();
                    for (var i = 0; i < this.sheets.length; i++) {
                        let oneSheet = this.sheets[i];
                        if (oneSheet.returnDataLastYear.isEmpty()) {
                            this._sheetBackEnd.getReturnData(oneSheet, ReturnPeriod.lastYear);
                        }
                        series.push({
                            name: oneSheet.title,
                            data: oneSheet.returnDataLastYear.data
                        });
                        series.push({
                            name: oneSheet.benchmark,
                            data: oneSheet.returnDataBenchmarkLastYear.data
                        });
                    }
                    this.currentPeriod = ReturnPeriod.lastYear;
                    this.periodText = 'Last year';
                    this.setSeriesInChartOptions(series);*/
                    var series = new Array();
                    var counter = 0;
                    for (var i = 0; i < this.sheets.length; i++) {
                        var oneSheet = this.sheets[i];
                        if (oneSheet.returnDataLastYear.isEmpty()) {
                            this._sheetBackEnd.getReturnData(oneSheet, returnPeriod_1.ReturnPeriod.lastYear)
                                .subscribe(function (returnData) {
                                oneSheet.returnDataLastYear.data = returnData[0];
                                oneSheet.returnDataBenchmarkLastYear.data = returnData[1];
                                counter = counter + 1;
                                _this.pushChartDataLastYear(series, oneSheet, counter);
                                /*series.push({
                                    name: oneSheet.title,
                                    data: oneSheet.returnDataLastYear.data
                                });
                                series.push({
                                    name: oneSheet.benchmark,
                                    data: oneSheet.returnDataBenchmarkLastYear.data
                                });
                                counter = counter + 1;
                                // the last thread to be executed sets the series for the chart
                                if (counter == this.sheets.length) {
                                    this.currentPeriod = ReturnPeriod.lastYear;
                                    this.periodText = 'Last year';
                                    this.setSeriesInChartOptions(series);
                                }*/
                            }, function (error) { return _this.httpErrorResponse = error; });
                        }
                        else {
                            counter = counter + 1;
                            this.pushChartDataLastYear(series, oneSheet, counter);
                        }
                    }
                };
                SheetReturnData.prototype.pushChartDataLastYear = function (inSeries, inSheet, inCounter) {
                    inSeries.push({
                        name: inSheet.title,
                        data: inSheet.returnDataLastYear.data
                    });
                    inSeries.push({
                        name: inSheet.benchmark,
                        data: inSheet.returnDataBenchmarkLastYear.data
                    });
                    // the last thread to be executed sets the series for the chart
                    if (inCounter == this.sheets.length) {
                        this.currentPeriod = returnPeriod_1.ReturnPeriod.lastYear;
                        this.periodText = 'Last year';
                        this.setSeriesInChartOptions(inSeries);
                    }
                };
                SheetReturnData.prototype.setAllSeries = function () {
                    var _this = this;
                    /*let series = new Array<any>();
                    for (var i = 0; i < this.sheets.length; i++) {
                        let oneSheet = this.sheets[i];
                        if (oneSheet.returnDataAll.isEmpty()) {
                            this._sheetBackEnd.getReturnData(oneSheet, ReturnPeriod.all);
                        }
                        series.push({
                            name: oneSheet.title,
                            data: oneSheet.returnDataAll.data
                        });
                        series.push({
                            name: oneSheet.benchmark,
                            data: oneSheet.returnDataBenchmarkAll.data
                        });
                    }
                    this.currentPeriod = ReturnPeriod.all;
                    this.periodText = 'Da inizio';
                    this.setSeriesInChartOptions(series);*/
                    var series = new Array();
                    var counter = 0;
                    for (var i = 0; i < this.sheets.length; i++) {
                        var oneSheet = this.sheets[i];
                        if (oneSheet.returnDataAll.isEmpty()) {
                            this._sheetBackEnd.getReturnData(oneSheet, returnPeriod_1.ReturnPeriod.all)
                                .subscribe(function (returnData) {
                                oneSheet.returnDataAll.data = returnData[0];
                                oneSheet.returnDataBenchmarkAll.data = returnData[1];
                                counter = counter + 1;
                                _this.pushChartDataAll(series, oneSheet, counter);
                                /*series.push({
                                    name: oneSheet.title,
                                    data: oneSheet.returnDataAll.data
                                });
                                series.push({
                                    name: oneSheet.benchmark,
                                    data: oneSheet.returnDataBenchmarkAll.data
                                });
                                counter = counter + 1;
                                // the last thread to be executed sets the series for the chart
                                if (counter == this.sheets.length) {
                                    this.currentPeriod = ReturnPeriod.all;
                                    this.periodText = 'Ab origine';
                                    this.setSeriesInChartOptions(series);
                                }*/
                            }, function (error) { return _this.httpErrorResponse = error; });
                        }
                        else {
                            counter = counter + 1;
                            this.pushChartDataAll(series, oneSheet, counter);
                        }
                    }
                };
                SheetReturnData.prototype.pushChartDataAll = function (inSeries, inSheet, inCounter) {
                    inSeries.push({
                        name: inSheet.title,
                        data: inSheet.returnDataAll.data
                    });
                    inSeries.push({
                        name: inSheet.benchmark,
                        data: inSheet.returnDataBenchmarkAll.data
                    });
                    // the last thread to be executed sets the series for the chart
                    if (inCounter == this.sheets.length) {
                        this.currentPeriod = returnPeriod_1.ReturnPeriod.all;
                        this.periodText = 'Ab origine';
                        this.setSeriesInChartOptions(inSeries);
                    }
                };
                SheetReturnData.prototype.createNewchartOptions = function () {
                    return {
                        title: { text: "Performance vs Benchmark (" + this.periodText + ")" },
                        rangeSelector: {
                            selected: 4 },
                        xAxis: {
                            type: 'datetime'
                        },
                        yAxis: {
                            labels: {
                                formatter: function () {
                                    return (this.value > 0 ? ' + ' : '') + this.value + '%';
                                }
                            },
                            plotLines: [{
                                    value: 0,
                                    width: 2,
                                    color: 'silver' }]
                        },
                        plotOptions: {
                            series: {
                                compare: 'percent' }
                        },
                        tooltip: {
                            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
                            valueDecimals: 2 }
                    };
                };
                SheetReturnData.prototype.setSeriesInChartOptions = function (inSeries) {
                    this.chartOptions = this.createNewchartOptions();
                    this.chartOptions.series = inSeries;
                };
                SheetReturnData.prototype.updateReturnData = function (inSheet) {
                    this._sheetBackEnd.updateReturnData(inSheet, this.currentPeriod);
                    switch (this.currentPeriod) {
                        case returnPeriod_1.ReturnPeriod.lastMonth:
                            this.setLastMonthSeries();
                            break;
                        case returnPeriod_1.ReturnPeriod.lastYear:
                            this.setLastYearSeries();
                            break;
                        case returnPeriod_1.ReturnPeriod.all:
                            this.setAllSeries();
                            break;
                    }
                };
                SheetReturnData.prototype.simpleComplexViewToggle = function () {
                    this.complexView = !this.complexView;
                    if (this.complexView) {
                        var currentPeriodUsedBySimpleChart = this.currentPeriod; // the following method prepares the data for the 'complex view' (all data) and changes the 'currentPeriod'; 
                        // I want to keep the old current period since it is used only by the 'simple view' 
                        // and I want to have the state unchanged when I switch back to the 'simple view'
                        this.setAllSeries(); // with the complex view it makes sense to have the entire set of data
                        this.currentPeriod = currentPeriodUsedBySimpleChart;
                    }
                };
                SheetReturnData.prototype.getSimpleComplexViewText = function () {
                    var text;
                    if (this.complexView) {
                        text = 'Simple chart';
                    }
                    else {
                        text = 'Sophisticated chart';
                    }
                    return text;
                };
                SheetReturnData.prototype.isLastMonthPeriod = function () { return this.currentPeriod == returnPeriod_1.ReturnPeriod.lastMonth; };
                SheetReturnData.prototype.isLastYearPeriod = function () { return this.currentPeriod == returnPeriod_1.ReturnPeriod.lastYear; };
                SheetReturnData.prototype.isAllPeriod = function () { return this.currentPeriod == returnPeriod_1.ReturnPeriod.all; };
                __decorate([
                    core_1.Input('sheets'), 
                    __metadata('design:type', Array), 
                    __metadata('design:paramtypes', [Array])
                ], SheetReturnData.prototype, "setSheets", null);
                SheetReturnData = __decorate([
                    core_1.Component({
                        selector: 'sheet-returnData',
                        providers: [],
                        templateUrl: '../templates/sheetReturnData.html',
                        styleUrls: ['../styles/common.css', '../styles/sheetReturnData.css'],
                        directives: [ng2_highstocks_1.Ng2Highstocks, ng2_highcharts_1.Ng2Highcharts, httpErrorManager_component_1.HttpErrorManagerComponent],
                    }), 
                    __metadata('design:paramtypes', [sheetBackEnd_service_1.SheetBackEnd])
                ], SheetReturnData);
                return SheetReturnData;
            })();
            exports_1("SheetReturnData", SheetReturnData);
        }
    }
});
//# sourceMappingURL=sheetReturnData.component.js.map