import {Component, Input} from 'angular2/core';

import {Sheet} from './sheet';
import {SheetBackEnd} from './sheetBackEnd.service';
import {ReturnPeriod} from './returnPeriod';

import {Ng2Highcharts} from '../ng2Highcharts/src/directives/ng2-highcharts';
import {Ng2Highstocks} from '../ng2Highcharts/src/directives/ng2-highstocks';

@Component({
    selector: 'sheet-returnData',
	providers: [],
    templateUrl: '../templates/sheetReturnData.html',
    styleUrls: ['../styles/common.css', '../styles/sheetReturnData.css'],
	directives: [Ng2Highstocks, Ng2Highcharts],
    //inputs: ['sheet'],
})
export class SheetReturnData { 
    public sheets: Sheet[];
    public chartOptions: any;
    public currentPeriod: ReturnPeriod = ReturnPeriod.lastMonth;
    public complexView: boolean = false;
    
    periodText: string;
    
    private _subscriptionToSheetCompositionChange: any;
        
    @Input('sheets') set setSheets(inSheets: Sheet[]) {
        this.sheets = inSheets;
        this.setLastMonthSeries();
        for (var i = 0; i < this.sheets.length; i++) {
            this._subscriptionToSheetCompositionChange = this.sheets[i].getChangeCompositionEvent().
                                                        subscribe(inSheet => this.updateReturnData(inSheet));
        }
    }
        
    constructor(
        private _sheetBackEnd: SheetBackEnd
    ) { }
    
    setLastMonthSeries() {
        let series = new Array<any>();
        for (var i = 0; i < this.sheets.length; i++) {
            let oneSheet = this.sheets[i];
            if (oneSheet.returnDataLastMonth.isEmpty()) {
                this._sheetBackEnd.fillReturnData(oneSheet, ReturnPeriod.lastMonth);
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
        this.currentPeriod = ReturnPeriod.lastMonth;
        this.periodText = 'Ultimo mese';
        this.setSeriesInChartOptions(series);
    }
    
    setLastYearSeries() {
        let series = new Array<any>();
        for (var i = 0; i < this.sheets.length; i++) {
            let oneSheet = this.sheets[i];
            if (oneSheet.returnDataLastYear.isEmpty()) {
                this._sheetBackEnd.fillReturnData(oneSheet, ReturnPeriod.lastYear);
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
        this.periodText = 'Ultimo anno';
        this.setSeriesInChartOptions(series);
    }
    
    setAllSeries() {
        let series = new Array<any>();
        for (var i = 0; i < this.sheets.length; i++) {
            let oneSheet = this.sheets[i];
            if (oneSheet.returnDataAll.isEmpty()) {
                this._sheetBackEnd.fillReturnData(oneSheet, ReturnPeriod.all);
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
        this.setSeriesInChartOptions(series);
    }
    
    createNewchartOptions() {
        return {
            title: {text: "Performance vs Benchmark (" + this.periodText + ")"},
            rangeSelector: {
                selected: 4},
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                labels: {
                    formatter: function () {
                        return (this.value > 0 ? ' + ' : '') + this.value + '%';}
                },
                plotLines: [{
                    value: 0,
                    width: 2,
                    color: 'silver'}]
            },
            plotOptions: {
                series: {
                    compare: 'percent'}
            },
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
                valueDecimals: 2}
        };
    }
    
    setSeriesInChartOptions(inSeries: Array<any>) {
        this.chartOptions = this.createNewchartOptions();
        this.chartOptions.series = inSeries;
    }
    
    updateReturnData(inSheet: Sheet) {
        this._sheetBackEnd.updateReturnData(inSheet, this.currentPeriod);
        switch(this.currentPeriod) {
            case ReturnPeriod.lastMonth:
                this.setLastMonthSeries();
                break;
            case ReturnPeriod.lastYear:
                this.setLastYearSeries();
                break;
            case ReturnPeriod.all:
                this.setAllSeries();
                break;                
        }
    }
    
    simpleComplexViewToggle() {
        this.complexView = !this.complexView;
        if (this.complexView) {
            let currentPeriodUsedBySimpleChart = this.currentPeriod;  // the following method prepares the data for the 'complex view' (all data) and changes the 'currentPeriod'; 
                                                                        // I want to keep the old current period since it is used only by the 'simple view' 
                                                                        // and I want to have the state unchanged when I switch back to the 'simple view'
            this.setAllSeries();  // with the complex view it makes sense to have the entire set of data
            this.currentPeriod = currentPeriodUsedBySimpleChart;
        }
    }
    
    getSimpleComplexViewText() {
        let text: string;
        if (this.complexView) {
            text = 'Grafico semplice';
        } else {
            text = 'Grafico sofisticato';
        }
        return text;
    }
    
    isLastMonthPeriod() {return this.currentPeriod == ReturnPeriod.lastMonth}
    isLastYearPeriod() {return this.currentPeriod == ReturnPeriod.lastYear}
    isAllPeriod() {return this.currentPeriod == ReturnPeriod.all}
}