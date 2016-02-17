import {Component, OnInit, Output, EventEmitter} from 'angular2/core';
import {Router, RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';

import {Sheet} from './sheet';
import {SheetBackEnd} from './sheetBackEnd.service';
import {SheetDetailComponent} from './sheetDetail.component';

import {SheetSortCriteriaEnum} from './sheetSortCriteria';

import {StringNumericConverter} from '../utilities/stringNumericConverter';

@Component({
    selector: 'sheet-summary',
	providers: [],
    templateUrl: '../templates/sheetSummary.html',
    styleUrls: ['../styles/common.css', '../styles/sheetSummary.css'],
	directives: [ROUTER_DIRECTIVES],
    inputs: ['sheet', 'isIconized', 'metricToShowInSheetSummary'],
})
export class SheetSummaryComponent implements OnInit { 
    public sheet: Sheet;
    public selected: boolean;
    @Output() selectionCriteriaChanged: EventEmitter<any> = new EventEmitter();
    public isIconized = false;
    public metricToShowInSheetSummary = SheetSortCriteriaEnum.OneMonthReturn;
    
    public errorMessage: string;
    
    constructor(
        private _router: Router,
        private _routeParams: RouteParams,
        private _sheetBackEnd: SheetBackEnd
    ) { }
    
    ngOnInit() {
        let id = +this._routeParams.get('id');
        // only if the routeParameter is not null we go to the service
        // this is because if the routeParameter is not null, it means we have been called via routing (or url on the browser)
        // if id is null it means we have been called within the single-page (and we hope we have been passed the full Sheet instance)
        if (id) {
            this._sheetBackEnd.getSomeSheets(id, 1)
            .subscribe(
                sheets => this.sheet = sheets[0],
                error => this.errorMessage = <any>error
            );
        }
    }
    
    onChangeSelection(inSelected: boolean) {
        console.log('selected? '+ inSelected + '  id: ' + this.sheet.id);
        this.sheet.isSelectedForComparison = inSelected;
        this.selectionCriteriaChanged.next(this.sheet);
    }
    
    /*hasPositiveOneMonthReturn() {
        return this.hasPositiveReturn(this.sheet.oneMonthReturn);
    }*/
    
    hasPositiveReturn() {
        let ret = true;
        if(this.getMetricToShow()) {
            ret = StringNumericConverter.getNumberFromPercentageString(this.getMetricToShow()) >=0;
        }
        return ret;
    }
    
    getMetricToShow() {
        let metricToShow = this.sheet.oneMonthReturn;
        if (this.metricToShowInSheetSummary == SheetSortCriteriaEnum.OneYearReturn) {
            metricToShow = this.sheet.oneYearReturn;
        } else if (this.metricToShowInSheetSummary == SheetSortCriteriaEnum.DailyChange) {
            metricToShow = this.sheet.dailyChange;
        }
        return metricToShow;
    }
    
    getMetricNameToShow() {
        let metricNameToShow = SheetSortCriteriaEnum.OneMonthReturn;
        if (this.metricToShowInSheetSummary == SheetSortCriteriaEnum.OneYearReturn) {
            metricNameToShow = SheetSortCriteriaEnum.OneYearReturn;
        } else if (this.metricToShowInSheetSummary == SheetSortCriteriaEnum.DailyChange) {
            metricNameToShow = SheetSortCriteriaEnum.DailyChange;
        }
        return metricNameToShow;
    }

}