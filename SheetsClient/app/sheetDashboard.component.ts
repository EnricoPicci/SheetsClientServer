import {Component} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import {SheetBackEnd} from './sheetBackEnd.service';
import {Sheet} from './sheet';
import {SheetCollection} from './sheetCollection.component';
import {SheetSearchCmp} from './sheetSearch.component';

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
    
    constructor(
        private _router: Router,
        private _routeParams: RouteParams,
        private _sheetBackEnd: SheetBackEnd
    ) { }
    
    ngOnInit() {
        this.sheets = this._sheetBackEnd.getSomeSheets(0, 17);
        this.idOfFirstSheetToCompare = this._routeParams.get('idOfFirstSheetToCompare');
        if (this.idOfFirstSheetToCompare != null) {
            for (var i = 0; i < this.sheets.length; i++) {
                let oneSheet = this.sheets[i];
                if (oneSheet.id.toString() != this.idOfFirstSheetToCompare) {
                    this.sheets[i].isComparisonCheckboxToBeDisplayed = true;
                }
            }
        }
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

}

