import {Component, Input} from 'angular2/core';

import {Sheet} from './sheet';
import {Asset} from './asset';
import {AssetGroup} from './assetGroup';
import {AssetAbstract} from './assetAbstract';
import {SheetBackEnd} from './sheetBackEnd.service';

import {Ng2Highcharts} from '../ng2Highcharts/src/directives/ng2-highcharts';

@Component({
    selector: 'sheet-compositionCharts',
	providers: [],
    templateUrl: '../templates/sheetCompositionCharts.html',
    styleUrls: ['../styles/common.css', '../styles/sheetCompositionCharts.css'],
	directives: [Ng2Highcharts],
    inputs: ['sheet'],
})
export class SheetCompositionCharts { 
    public sheet: Sheet;
    public highchartsOptionsForGroups: HighchartsOptions;
    public highchartsOptionsForAssets: HighchartsOptions;
    private _isAssetGroupViewShown = true;
    public highchartsOptionsForValueAtRisk: HighchartsOptions;
    public highchartsOptionsForVolatility: HighchartsOptions;
    private _isValueAtRiskViewShown = true;
    
    private _subscriptionToSheetCompositionChange: any;
    
    constructor(
        private _sheetBackEnd: SheetBackEnd
    ) { }
    
    ngOnInit() {
        this.generateCharts();
        this._subscriptionToSheetCompositionChange = this.sheet.getChangeCompositionEvent().
                                                        subscribe(inSheet => this.generateCharts());
    }
    
    generateCharts() {
        this.highchartsOptionsForGroups = this.createNewHighstocksOptionsForPieChart('Composizione per Gruppi');
        this.highchartsOptionsForGroups.series = this.getSeriesForAssetGroups();
        this.highchartsOptionsForAssets = this.createNewHighstocksOptionsForPieChart('Composizione per Asset');
        this.highchartsOptionsForAssets.series = this.getSeriesForAssets();
        this._sheetBackEnd.updateValueAtRisk(this.sheet);
        this._sheetBackEnd.updateVolatility(this.sheet);
        this.highchartsOptionsForValueAtRisk = this.createNewHighstocksOptionsForGaugeChart
                                                        ('VaR', this.sheet.valueAtRisk, 0, 10, 3, 6);
        this.highchartsOptionsForVolatility = this.createNewHighstocksOptionsForGaugeChart
                                                        ('Volatilità', this.sheet.volatility, 0, 25, 8, 18);
    }
    
    createNewHighstocksOptionsForPieChart(inTitle: string) {
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
                buttonOptions: {enabled: false}
            },
            legend: {maxHeight: 80}
        }
    }
    
    createNewHighstocksOptionsForGaugeChart(inTitle: string, inValue: number,
                                                inMin: number, inMax: number,
                                                inYelloMin: number, inYellowMax: number) {
        return {
            chart: {
                type: 'gauge',
                plotBorderWidth: 1,
                plotBackgroundColor: 'whitesmoke',
                plotBackgroundImage: null,
                height: 135,
                width: 150
            },
            title: {text: null},
            pane: [{
                startAngle: -45,
                endAngle: 45,
                background: null,
                center: ['50%', '75%'],
                size: 100
            }],
            tooltip: {enabled: false},
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
        }
    }
    
    
    getSeriesForAssetGroups() {
        let seriesData = new Array<any>();
        this._primFillSeriesForAssetAbstract(this.sheet.assetGroups, seriesData);
        let ret = new Array<any>();
        let series = {
            name: 'Percentuale',
            data: seriesData
        };
        ret.push(series);
        return ret;
    }
    
    getSeriesForAssets() {
        let seriesData = new Array<any>();
        for (var i = 0; i < this.sheet.assetGroups.length; i++) {
            let assetGroup = this.sheet.assetGroups[i];
            this._primFillSeriesForAssetAbstract(assetGroup.assets, seriesData);
        }
        let ret = new Array<any>();
        let series = {
            name: 'Percentuale',
            data: seriesData
        };
        ret.push(series);
        return ret;     
    }
    
    private _primFillSeriesForAssetAbstract(inAssetAbstract: AssetAbstract[], inSeries: Array<any>) {
        for (var i = 0; i < inAssetAbstract.length; i++) {
            let abstractAsset = inAssetAbstract[i];
            let data = new Array<any>();
            data.push(abstractAsset.name);
            data.push(abstractAsset.weight);
            inSeries.push(data);
        }
    }
    
    togglePieCharView() {
        this._isAssetGroupViewShown = !this._isAssetGroupViewShown;
    }
    
    getTogglePieCharViewText() {
        let ret: string;
        if (this._isAssetGroupViewShown) {
            ret = 'Vista per Assets';
        } else {
            ret = 'Vista per Asset Group';
        };
        return ret;
    }

}