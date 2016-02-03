System.register(['angular2/core', './sheetBackEnd.service', '../ng2Highcharts/src/directives/ng2-highcharts'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, sheetBackEnd_service_1, ng2_highcharts_1;
    var SheetCompositionCharts;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (sheetBackEnd_service_1_1) {
                sheetBackEnd_service_1 = sheetBackEnd_service_1_1;
            },
            function (ng2_highcharts_1_1) {
                ng2_highcharts_1 = ng2_highcharts_1_1;
            }],
        execute: function() {
            SheetCompositionCharts = (function () {
                function SheetCompositionCharts(_sheetBackEnd) {
                    this._sheetBackEnd = _sheetBackEnd;
                    this._isAssetGroupViewShown = true;
                    this._isValueAtRiskViewShown = true;
                }
                SheetCompositionCharts.prototype.ngOnInit = function () {
                    var _this = this;
                    this.generateCharts();
                    this._subscriptionToSheetCompositionChange = this.sheet.getChangeCompositionEvent().
                        subscribe(function (inSheet) { return _this.generateCharts(); });
                };
                SheetCompositionCharts.prototype.generateCharts = function () {
                    this.highchartsOptionsForGroups = this.createNewHighstocksOptionsForPieChart('Composizione per Gruppi');
                    this.highchartsOptionsForGroups.series = this.getSeriesForAssetGroups();
                    this.highchartsOptionsForAssets = this.createNewHighstocksOptionsForPieChart('Composizione per Asset');
                    this.highchartsOptionsForAssets.series = this.getSeriesForAssets();
                    this._sheetBackEnd.updateValueAtRisk(this.sheet);
                    this._sheetBackEnd.updateVolatility(this.sheet);
                    this.highchartsOptionsForValueAtRisk = this.createNewHighstocksOptionsForGaugeChart('VaR', this.sheet.valueAtRisk, 0, 10, 3, 6);
                    this.highchartsOptionsForVolatility = this.createNewHighstocksOptionsForGaugeChart('Volatilità', this.sheet.volatility, 0, 25, 8, 18);
                };
                SheetCompositionCharts.prototype.createNewHighstocksOptionsForPieChart = function (inTitle) {
                    return {
                        chart: {
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false,
                            type: 'pie',
                            height: 300
                        },
                        title: {
                            text: inTitle,
                            style: { "fontSize": "12px" },
                            margin: 5
                        },
                        tooltip: {
                            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                        },
                        plotOptions: {
                            pie: {
                                allowPointSelect: true,
                                cursor: 'pointer',
                                dataLabels: {
                                    enabled: false
                                },
                                showInLegend: true
                            }
                        },
                        navigation: {
                            buttonOptions: { enabled: false }
                        },
                        legend: { maxHeight: 80 }
                    };
                };
                SheetCompositionCharts.prototype.createNewHighstocksOptionsForGaugeChart = function (inTitle, inValue, inMin, inMax, inYelloMin, inYellowMax) {
                    return {
                        chart: {
                            type: 'gauge',
                            plotBorderWidth: 1,
                            plotBackgroundColor: 'whitesmoke',
                            plotBackgroundImage: null,
                            height: 135,
                            width: 150
                        },
                        title: { text: null },
                        pane: [{
                                startAngle: -45,
                                endAngle: 45,
                                background: null,
                                center: ['50%', '75%'],
                                size: 100
                            }],
                        tooltip: { enabled: false },
                        yAxis: [{
                                min: inMin,
                                max: inMax,
                                minorTickPosition: 'outside',
                                tickPosition: 'outside',
                                labels: {
                                    rotation: 'auto',
                                    distance: 20
                                },
                                plotBands: [{
                                        from: inYellowMax,
                                        to: inMax,
                                        color: 'red',
                                        innerRadius: '100%',
                                        outerRadius: '115%'
                                    }, {
                                        from: inYelloMin,
                                        to: inYellowMax,
                                        color: 'yellow',
                                        innerRadius: '100%',
                                        outerRadius: '115%'
                                    }],
                                pane: 0,
                                title: {
                                    text: inTitle + ' ' + inValue.toFixed(2) + '%',
                                    y: 40
                                }
                            }],
                        plotOptions: {
                            gauge: {
                                dataLabels: {
                                    enabled: false
                                },
                                dial: {
                                    radius: '100%'
                                }
                            }
                        },
                        series: [{
                                name: 'data',
                                data: [inValue],
                                yAxis: 0
                            }],
                        navigation: {
                            buttonOptions: {
                                enabled: false
                            }
                        }
                    };
                };
                SheetCompositionCharts.prototype.getSeriesForAssetGroups = function () {
                    var seriesData = new Array();
                    this._primFillSeriesForAssetAbstract(this.sheet.assetGroups, seriesData);
                    var ret = new Array();
                    var series = {
                        name: 'Percentuale',
                        data: seriesData
                    };
                    ret.push(series);
                    return ret;
                };
                SheetCompositionCharts.prototype.getSeriesForAssets = function () {
                    var seriesData = new Array();
                    for (var i = 0; i < this.sheet.assetGroups.length; i++) {
                        var assetGroup = this.sheet.assetGroups[i];
                        this._primFillSeriesForAssetAbstract(assetGroup.assets, seriesData);
                    }
                    var ret = new Array();
                    var series = {
                        name: 'Percentuale',
                        data: seriesData
                    };
                    ret.push(series);
                    return ret;
                };
                SheetCompositionCharts.prototype._primFillSeriesForAssetAbstract = function (inAssetAbstract, inSeries) {
                    for (var i = 0; i < inAssetAbstract.length; i++) {
                        var abstractAsset = inAssetAbstract[i];
                        var data = new Array();
                        data.push(abstractAsset.name);
                        data.push(abstractAsset.weight);
                        inSeries.push(data);
                    }
                };
                SheetCompositionCharts.prototype.togglePieCharView = function () {
                    this._isAssetGroupViewShown = !this._isAssetGroupViewShown;
                };
                SheetCompositionCharts.prototype.getTogglePieCharViewText = function () {
                    var ret;
                    if (this._isAssetGroupViewShown) {
                        ret = 'Vista per Assets';
                    }
                    else {
                        ret = 'Vista per Asset Group';
                    }
                    ;
                    return ret;
                };
                SheetCompositionCharts = __decorate([
                    core_1.Component({
                        selector: 'sheet-compositionCharts',
                        providers: [],
                        templateUrl: '../templates/sheetCompositionCharts.html',
                        styleUrls: ['../styles/common.css', '../styles/sheetCompositionCharts.css'],
                        directives: [ng2_highcharts_1.Ng2Highcharts],
                        inputs: ['sheet'],
                    }), 
                    __metadata('design:paramtypes', [sheetBackEnd_service_1.SheetBackEnd])
                ], SheetCompositionCharts);
                return SheetCompositionCharts;
            })();
            exports_1("SheetCompositionCharts", SheetCompositionCharts);
        }
    }
});
//# sourceMappingURL=sheetCompositionCharts.component.js.map