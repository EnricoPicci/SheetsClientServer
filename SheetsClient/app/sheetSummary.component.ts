import {Component, OnInit, Output, EventEmitter} from 'angular2/core';
import {Router, RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';

import {Sheet} from './sheet';
import {SheetBackEnd} from './sheetBackEnd.service';
import {SheetDetailComponent} from './sheetDetail.component';

@Component({
    selector: 'sheet-summary',
	providers: [],
    templateUrl: '../templates/sheetSummary.html',
    styleUrls: ['../styles/common.css', '../styles/sheetSummary.css'],
	directives: [ROUTER_DIRECTIVES],
    inputs: ['sheet', 'sheetId'],
})
export class SheetSummaryComponent implements OnInit { 
    public sheet: Sheet;
    public selected: boolean;
    @Output() selectionCriteriaChanged: EventEmitter<any> = new EventEmitter();
    
    constructor(
        private _router: Router,
        private _routeParams: RouteParams,
        private _sheetBackEnd: SheetBackEnd
    ) { }
    
    ngOnInit() {
        let id = +this._routeParams.get('id');
        console.log(id);
        // only if the routeParameter is not null we go to the service
        // this is because if the routeParameter is not null, it means we have been called via routing (or url on the browser)
        // if id is null it means we have been called within the single-page (and we hope we have been passed the full Sheet instance)
        if (id) {
            this.sheet = this._sheetBackEnd.getSomeSheets(id, 1)[0];
            console.log(this.sheet);
        }
    }
    
    /*onMouseDown() {
        console.log(this.sheet);
        this._router.navigate( ['SheetDetail', { id: this.sheet.id }]  );
    }*/
    
    onChangeSelection(inSelected: boolean) {
        console.log('selected? '+ inSelected + '  id: ' + this.sheet.id);
        this.sheet.isSelectedForComparison = inSelected;
        this.selectionCriteriaChanged.next(this.sheet);
    }

}