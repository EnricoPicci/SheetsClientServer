System.register(['angular2/core', './sheetBackEnd.service', './returnPeriod', '../ng2Highcharts/src/directives/ng2-highcharts', '../ng2Highcharts/src/directives/ng2-highstocks'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, sheetBackEnd_service_1, returnPeriod_1, ng2_highcharts_1, ng2_highstocks_1;
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
                SheetReturnData.prototype.setLastMonthSeries = function () {
                    var series = new Array();
                    for (var i = 0; i < this.sheets.length; i++) {
                        var oneSheet = this.sheets[i];
                        if (oneSheet.returnDataLastMonth.isEmpty()) {
                            this._sheetBackEnd.fillReturnData(oneSheet, returnPeriod_1.ReturnPeriod.lastMonth);
                        }
                        series.push({
                            name: oneSheet.title,
                            data: oneSheet.returnDataLastMonth.data
                        });
                        series.push({
                            name: oneSheet.benchmark,
                            data: oneSheet.returnDataBenchmarkLastMonth.data
                        });
                    }
                    this.currentPeriod = returnPeriod_1.ReturnPeriod.lastMonth;
                    this.periodText = 'Ultimo mese';
                    this.setSeriesInChartOptions(series);
                };
                SheetReturnData.prototype.setLastYearSeries = function () {
                    var series = new Array();
                    for (var i = 0; i < this.sheets.length; i++) {
                        var oneSheet = this.sheets[i];
                        if (oneSheet.returnDataLastYear.isEmpty()) {
                            this._sheetBackEnd.fillReturnData(oneSheet, returnPeriod_1.ReturnPeriod.lastYear);
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
                    this.currentPeriod = returnPeriod_1.ReturnPeriod.lastYear;
                    this.periodText = 'Ultimo anno';
                    this.setSeriesInChartOptions(series);
                };
                SheetReturnData.prototype.setAllSeries = function () {
                    var series = new Array();
                    for (var i = 0; i < this.sheets.length; i++) {
                        var oneSheet = this.sheets[i];
                        if (oneSheet.returnDataAll.isEmpty()) {
                            this._sheetBackEnd.fillReturnData(oneSheet, returnPeriod_1.ReturnPeriod.all);
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
                    this.currentPeriod = returnPeriod_1.ReturnPeriod.all;
                    this.periodText = 'Da inizio';
                    this.setSeriesInChartOptions(series);
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
                        text = 'Grafico semplice';
                    }
                    else {
                        text = 'Grafico sofisticato';
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
                        directives: [ng2_highstocks_1.Ng2Highstocks, ng2_highcharts_1.Ng2Highcharts],
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