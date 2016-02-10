import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {Router, RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';

import {Sheet} from './sheet';
import {SheetSummaryComponent} from './sheetSummary.component';
import {SheetBackEnd} from './sheetBackEnd.service';

@Component({
    selector: 'sheetCollectionCmp',
	providers: [],
    templateUrl: '../templates/sheetCollection.html',
	styleUrls: ['../styles/table.css'],
    directives: [SheetSummaryComponent],
	inputs: ['sheets'],
})
export class SheetCollection { 
	@Input() sheets: Sheet[];
    @Output() sheetSelectedChanged: EventEmitter<any> = new EventEmitter();
    
    public errorMessage: string;
    
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
                sheets => this.sheets = sheets,
                error => this.errorMessage = <any>error
            );
        }
    }
    
    selectionCriteriaChanged(inSheet: Sheet) {
        console.log(inSheet);
        this.sheetSelectedChanged.next(inSheet);
    }
    
}

