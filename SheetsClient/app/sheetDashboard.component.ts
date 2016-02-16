import {Component} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import {SheetBackEnd} from './sheetBackEnd.service';
import {Sheet} from './sheet';
import {SheetCollection} from './sheetCollection.component';
import {SheetSearchCmp} from './sheetSearch.component';
import {UserLogged} from './userLogged';
//import {SheetSortCriteria} from './sheetSortCriteria';
//import {SheetSortCriteriaEnum} from './sheetSortCriteria';
//import {StringNumericConverter} from '../utilities/stringNumericConverter';

@Component({
    selector: 'sheet-dashboard',
	providers: [],
    templateUrl: '../templates/sheetDashboard.html',
    styleUrls: ['../styles/common.css', '../styles/app.css'],
	directives: [SheetCollection, SheetSearchCmp],
})

export class SheetDashboardComponent { 
	public title: string = 'Sheets';
	public sheets: Sheet[];
    public idOfFirstSheetToCompare: string;
    // the second sheet for comparison is the full object so that I can reset its selection state when a different selection is made
    public secondSheetToCompare: Sheet;
    
    public showPublicSheetsOnly = false;
    public showPersonalizedSheetsOnly = false;
    
    /*public sortCriteria = SheetSortCriteria.criteria;
    public selectedSortCriterium = SheetSortCriteriaEnum.OneMonthReturn;
    public sortAscending = false;
    public metricToShowInSheetSummary;
    public showGrid = true;*/
    
    public errorMessage;
    
    constructor(
        private _router: Router,
        private _routeParams: RouteParams,
        private _sheetBackEnd: SheetBackEnd,
        private _user: UserLogged
    ) { }
    
    ngOnInit() {
        this._sheetBackEnd.getAllSheets()
            .subscribe(
                sheets => {
                    this.sheets = sheets;
                    //this.sortSheets(this.selectedSortCriterium);
                    this.idOfFirstSheetToCompare = this._routeParams.get('idOfFirstSheetToCompare');
                    if (this.idOfFirstSheetToCompare != null) {
                        for (var i = 0; i < this.sheets.length; i++) {
                            let oneSheet = this.sheets[i];
                            if (oneSheet.id.toString() != this.idOfFirstSheetToCompare) {
                                this.sheets[i].isComparisonCheckboxToBeDisplayed = true;
                            }
                        }
                    }                    
                },
                error => this.errorMessage = <any>error
            );
    }
    
	getSheets() {
		return this.sheets;
	}

	updateSheets(searchResult: Sheet[]) {
		this.sheets = searchResult;
	}
    
    selectionCriteriaChanged(inSheet: Sheet) {
        if (inSheet.isSelectedForComparison) {
            // if the secondSheetToCompare is not null, then I reset it so that it is unchecked for comparison
            // if there is a secondSheetToCompare not null, then it means that a previous selection was made and this 
            // selection has to be reset
            if (this.secondSheetToCompare) {
                this.secondSheetToCompare.isSelectedForComparison = false;
            }
            this.secondSheetToCompare = inSheet;
        } else {
            this.secondSheetToCompare = null;
        }
    }
    
    isReadyToLaunchCompare() {
        // only if there are 2 sheets to compare we can launch compare
        let ret: boolean = false;
        if ((this.idOfFirstSheetToCompare !== null) && 
                (this.secondSheetToCompare != null) && 
                (this.secondSheetToCompare.isSelectedForComparison)) {
           ret = true;
        }
        return ret;
    }
        
    onCompareClick() {
        let firstSheetId = this.idOfFirstSheetToCompare;
        // clean the ids so that when we return to the dashboard it is not set for comparison (unless we want so)
        this.idOfFirstSheetToCompare = null;
        this.secondSheetToCompare.isSelectedForComparison = false;
        this._router.navigate( ['SheetComparator', { idSheetToCompare1: firstSheetId, idSheetToCompare2: this.secondSheetToCompare.id }]  );
    }
    
    onProposals() {
        this._router.navigate( ['ProposalCollection', { customerId: this._user.customerId }]  );
    }
    
    togglePublicSheetsOnly() {
        this.showPublicSheetsOnly = !this.showPublicSheetsOnly;
        this.showPersonalizedSheetsOnly = false;
        if (this.showPublicSheetsOnly) {
            this._sheetBackEnd.selectSheets(["Pubblici"], [], [], [])
                .subscribe(
                    sheets => this.sheets = sheets,
                    error => this.errorMessage = <any>error
                );            
        } else {
           this._sheetBackEnd.getAllSheets()
                .subscribe(
                    sheets => this.sheets = sheets,
                    error => this.errorMessage = <any>error
                ); 
        }
    }
    
    togglePerzonalizedSheetsOnly() {
        this.showPersonalizedSheetsOnly = !this.showPersonalizedSheetsOnly;
        this.showPublicSheetsOnly = false;
        if (this.showPersonalizedSheetsOnly) {
            this._sheetBackEnd.selectSheets([null, "Personalizzati"], [], [], [])
                .subscribe(
                    sheets => this.sheets = sheets,
                    error => this.errorMessage = <any>error
                );            
        } else {
           this._sheetBackEnd.getAllSheets()
                .subscribe(
                    sheets => this.sheets = sheets,
                    error => this.errorMessage = <any>error
                ); 
        }        
    }
    
    /*sortSheets(inSortCriterium: SheetSortCriteriaEnum) {
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
    }
    
    toggleSortDirection() {
        this.sortAscending = !this.sortAscending;
        this.sortSheets(this.selectedSortCriterium);
    }*/

}

