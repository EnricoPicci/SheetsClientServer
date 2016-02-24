import {Component, Input} from 'angular2/core';

import {Sheet} from './sheet';
import {SheetBackEnd} from './sheetBackEnd.service';
import {ReturnPeriod} from './returnPeriod';

import {Ng2Highcharts} from '../ng2Highcharts/src/directives/ng2-highcharts';
import {Ng2Highstocks} from '../ng2Highcharts/src/directives/ng2-highstocks';

import {HttpErrorManagerComponent} from '../utilities/httpErrorManager.component';

@Component({
    selector: 'sheet-returnData',
	providers: [],
    templateUrl: '../templates/sheetReturnData.html',
    styleUrls: ['../styles/common.css', '../styles/sheetReturnData.css'],
	directives: [Ng2Highstocks, Ng2Highcharts, HttpErrorManagerComponent],
    //inputs: ['sheet'],
})
export class SheetReturnData { 
    public sheets: Sheet[];
    public chartOptions: any;
    public currentPeriod: ReturnPeriod = ReturnPeriod.lastMonth;
    public complexView: boolean = false;
    
    public httpErrorResponse: string;
    
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
    
    ngOnDestroy() {
        for (var i = 0; i < this.sheets.length; i++) {
            this._subscriptionToSheetCompositionChange = this.sheets[i].getChangeCompositionEvent().unsubscribe();
        }
    }
    
    setLastMonthSeries() {
        var series = new Array<any>();
        var counter = 0;
        for (var i = 0; i < this.sheets.length; i++) {
            var oneSheet = this.sheets[i];
            if (oneSheet.returnDataLastMonth.isEmpty()) {
                this._sheetBackEnd.getReturnData(oneSheet, ReturnPeriod.lastMonth)
                    .subscribe(
                        returnData => {
                            oneSheet.returnDataLastMonth.data = returnData[0];
                            oneSheet.returnDataBenchmarkLastMonth.data = returnData[1];
                            counter = counter + 1;
                            this.pushChartDataLastMonth(series, oneSheet, counter);
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
                        },
                    error => this.httpErrorResponse = <any>error
                );
            } else {
                counter = counter + 1;
                this.pushChartDataLastMonth(series, oneSheet, counter);
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
            }
        }
    }
    
    private pushChartDataLastMonth(inSeries: Array<any>, inSheet: Sheet, inCounter: number) {
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
            this.currentPeriod = ReturnPeriod.lastMonth;
            this.periodText = 'Last month';
            this.setSeriesInChartOptions(inSeries);
        }
    }
    
    setLastYearSeries() {
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
        var series = new Array<any>();
        var counter = 0;
        for (var i = 0; i < this.sheets.length; i++) {
            var oneSheet = this.sheets[i];
            if (oneSheet.returnDataLastYear.isEmpty()) {
                this._sheetBackEnd.getReturnData(oneSheet, ReturnPeriod.lastYear)
                    .subscribe(
                        returnData => {
                            oneSheet.returnDataLastYear.data = returnData[0];
                            oneSheet.returnDataBenchmarkLastYear.data = returnData[1];
                            counter = counter + 1;
                            this.pushChartDataLastYear(series, oneSheet, counter);
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
                        },
                    error => this.httpErrorResponse = <any>error
                );
            } else {
                counter = counter + 1;
                this.pushChartDataLastYear(series, oneSheet, counter);
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
            }
        }
    }
    
    private pushChartDataLastYear(inSeries: Array<any>, inSheet: Sheet, inCounter: number) {
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
            this.currentPeriod = ReturnPeriod.lastYear;
            this.periodText = 'Last year';
            this.setSeriesInChartOptions(inSeries);
        }
    }
    
    setAllSeries() {
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
        var series = new Array<any>();
        var counter = 0;
        for (var i = 0; i < this.sheets.length; i++) {
            var oneSheet = this.sheets[i];
            if (oneSheet.returnDataAll.isEmpty()) {
                this._sheetBackEnd.getReturnData(oneSheet, ReturnPeriod.all)
                    .subscribe(
                        returnData => {
                            oneSheet.returnDataAll.data = returnData[0];
                            oneSheet.returnDataBenchmarkAll.data = returnData[1];
                            counter = counter + 1;
                            this.pushChartDataAll(series, oneSheet, counter);
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
                         },
                    error => this.httpErrorResponse = <any>error
                );
            } else {
                counter = counter + 1;
                this.pushChartDataAll(series, oneSheet, counter);
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
            }
        }
    }
    
    private pushChartDataAll(inSeries: Array<any>, inSheet: Sheet, inCounter: number) {
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
            this.currentPeriod = ReturnPeriod.all;
            this.periodText = 'Ab origine';
            this.setSeriesInChartOptions(inSeries);
        }
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
            text = 'Simple chart';
        } else {
            text = 'Sophisticated chart';
        }
        return text;
    }
    
    isLastMonthPeriod() {return this.currentPeriod == ReturnPeriod.lastMonth}
    isLastYearPeriod() {return this.currentPeriod == ReturnPeriod.lastYear}
    isAllPeriod() {return this.currentPeriod == ReturnPeriod.all}
}