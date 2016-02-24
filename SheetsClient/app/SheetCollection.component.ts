import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {Router, RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';

import {Sheet} from './sheet';
import {SheetSummaryComponent} from './sheetSummary.component';
import {SheetBackEnd} from './sheetBackEnd.service';

import {SheetSortCriteria} from './sheetSortCriteria';
import {SheetSortCriteriaEnum} from './sheetSortCriteria';
import {StringNumericConverter} from '../utilities/stringNumericConverter';
import {HttpErrorManagerComponent} from '../utilities/httpErrorManager.component';

@Component({
    selector: 'sheetCollectionCmp',
	providers: [],
    templateUrl: '../templates/sheetCollection.html',
	styleUrls: ['../styles/sheetCollection.css'],
    directives: [SheetSummaryComponent, HttpErrorManagerComponent],
	//inputs: ['sheets'],
})
export class SheetCollection { 
    public sheets: Sheet[];
    @Input('sheets') set setSheets(inSheets: Sheet[]) {
        this.sheets = inSheets;
        if (this.sheets) {
            this.sortSheets(this.selectedSortCriterium);
        }
    }
    @Output() sheetSelectedChanged: EventEmitter<any> = new EventEmitter();
    
    public sortCriteria = SheetSortCriteria.criteria;
    public selectedSortCriterium = SheetSortCriteriaEnum.OneMonthReturn;
    public sortAscending = false;
    public metricToShowInSheetSummary;
    public showGrid = true;

    public httpErrorResponse: string;
    //public errorMessage: string;
    
    constructor(
        private _router: Router,
        private _routeParams: RouteParams,
        private _sheetBackEnd: SheetBackEnd
    ) { }
    
    ngOnInit() {
        let startId = +this._routeParams.get('startId');
        let maxNumOfSheets = +this._routeParams.get('maxNumOfSheets');
        console.log(startId);
        console.log(maxNumOfSheets);
        // only if the routeParameter maxNumOfSheets is not null (i.e. is greater than 0) we go to the service
        // this is because if the routeParameter is not null, it means we have been called via routing (or url on the browser)
        // if it is null it means we have been called within the single-page (and we hope we have been passed the full Sheet instance)
        if (maxNumOfSheets) {
            this._sheetBackEnd.getSomeSheets(startId, maxNumOfSheets)
            .subscribe(
                sheets => {
                        this.sheets = sheets;
                        this.sortSheets(this.selectedSortCriterium);
                    },
                error => this.httpErrorResponse = <any>error
            );
        } 
    }
    
    selectionCriteriaChanged(inSheet: Sheet) {
        console.log(inSheet);
        this.sheetSelectedChanged.next(inSheet);
    }
    
    sortSheets(inSortCriterium: SheetSortCriteriaEnum) {
        this.selectedSortCriterium = inSortCriterium;
        if (this.sortAscending) {
            if (inSortCriterium == SheetSortCriteriaEnum.OneMonthReturn) {
                this.metricToShowInSheetSummary = SheetSortCriteriaEnum.OneMonthReturn;
                this.sheets = this.sheets.sort(function(a, b){
                        return StringNumericConverter.getNumberFromPercentageString(a.oneMonthReturn)-StringNumericConverter.getNumberFromPercentageString(b.oneMonthReturn)
                    });
            } else if (inSortCriterium == SheetSortCriteriaEnum.OneYearReturn) {
                this.metricToShowInSheetSummary = SheetSortCriteriaEnum.OneYearReturn;
                this.sheets = this.sheets.sort(function(a, b){
                        return StringNumericConverter.getNumberFromPercentageString(a.oneYearReturn)-StringNumericConverter.getNumberFromPercentageString(b.oneYearReturn)
                    });
            } else if (inSortCriterium == SheetSortCriteriaEnum.DailyChange) {
                this.metricToShowInSheetSummary = SheetSortCriteriaEnum.DailyChange;
                this.sheets = this.sheets.sort(function(a, b){
                        return StringNumericConverter.getNumberFromPercentageString(a.dailyChange)-StringNumericConverter.getNumberFromPercentageString(b.dailyChange)
                    });
            } else if (inSortCriterium == SheetSortCriteriaEnum.Name) {
                this.sheets = this.sheets.sort(function(a, b){
                        let titleA = a.title.toUpperCase();
                        let titleB = b.title.toUpperCase();
                        return (titleA < titleB) ? -1 : (titleA > titleB) ? 1 : 0;
                    });
            }
        } else {
           if (inSortCriterium == SheetSortCriteriaEnum.OneMonthReturn) {
               this.metricToShowInSheetSummary = SheetSortCriteriaEnum.OneMonthReturn;
                this.sheets = this.sheets.sort(function(b, a){
                        return StringNumericConverter.getNumberFromPercentageString(a.oneMonthReturn)-StringNumericConverter.getNumberFromPercentageString(b.oneMonthReturn)
                    });
            } else if (inSortCriterium == SheetSortCriteriaEnum.OneYearReturn) {
                this.metricToShowInSheetSummary = SheetSortCriteriaEnum.OneYearReturn;
                this.sheets = this.sheets.sort(function(b, a){
                        return StringNumericConverter.getNumberFromPercentageString(a.oneYearReturn)-StringNumericConverter.getNumberFromPercentageString(b.oneYearReturn)
                    });
            } else if (inSortCriterium == SheetSortCriteriaEnum.DailyChange) {
                this.metricToShowInSheetSummary = SheetSortCriteriaEnum.DailyChange;
                this.sheets = this.sheets.sort(function(b, a){
                        return StringNumericConverter.getNumberFromPercentageString(a.dailyChange)-StringNumericConverter.getNumberFromPercentageString(b.dailyChange)
                    });
            } else if (inSortCriterium == SheetSortCriteriaEnum.Name) {
                this.sheets = this.sheets.sort(function(b, a){
                        let titleA = a.title.toUpperCase();
                        let titleB = b.title.toUpperCase();
                        return (titleA < titleB) ? -1 : (titleA > titleB) ? 1 : 0;
                    });
            } 
        }
        if (this.sheets.length > 1) {
            for (var i = 1; i < this.sheets.length; i = i+2) {
                this.sheets[i].isEven = true;
            }
        }
    }
    
    toggleSortDirection() {
        this.sortAscending = !this.sortAscending;
        this.sortSheets(this.selectedSortCriterium);
    }
}

