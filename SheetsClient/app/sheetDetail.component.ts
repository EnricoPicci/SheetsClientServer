import {Component, Output, EventEmitter} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import {Sheet} from './sheet';
import {SheetBackEnd} from './sheetBackEnd.service';

import {ShortLongTextComponent} from '../utilities/shortLongText.component';
import {SheetReturnData} from './sheetReturnData.component'
import {SheetCompositionCharts} from './sheetCompositionCharts.component'
import {SheetAssetCompositionComponent} from './sheetAssetComposition.component';
import {SheetInfoComponent} from './sheetInfo.component';

import {HttpErrorManagerComponent} from '../utilities/httpErrorManager.component';

@Component({
    selector: 'sheet-detail',
	providers: [],
    templateUrl: '../templates/sheetDetail.html',
    styleUrls: ['../styles/common.css', '../styles/sheetDetail.css'],
	directives: [ShortLongTextComponent, SheetAssetCompositionComponent, SheetReturnData, 
        SheetCompositionCharts, SheetInfoComponent, HttpErrorManagerComponent],
    inputs: ['sheet', 'editMode'],
})
export class SheetDetailComponent { 
    public sheet: Sheet;
    // the array is needed to feed the sheetReturnData component
    public sheets: Sheet[] = new Array<Sheet>();
    public shortDescriptionTextLength: number = 250;
    
    public httpErrorResponse: string;
    //public errorMessage: string;

    @Output() sheetRetrieved: EventEmitter<any> = new EventEmitter();
    @Output() prepareProposal: EventEmitter<any> = new EventEmitter();
    
    public editMode = true;
    
    constructor(
        private _router: Router,
        private _routeParams: RouteParams,
        private _backEnd: SheetBackEnd
    ) { }
    
    ngOnInit() {
        let id = +this._routeParams.get('id');
        this._backEnd.getSheetWithDetails(id)
            .subscribe(
                sheet => {this.sheet = sheet;
                            this.sheets[0] = this.sheet;
                            this.sheetRetrieved.next(this.sheet);
                        },
                error => this.httpErrorResponse = <any>error
            );
    }
    
    setSheet(inSheet: Sheet) {
        this.sheet = inSheet;
        this.sheets = new Array<Sheet>();
        this.sheets[0] = this.sheet;
        console.log('inSheet --- ');
        console.log(inSheet);
        console.log('this.sheet --- ');
        console.log(this.sheet);
    }
    
    getSheetDescription() {
        let ret = '';
        if (this.sheet) {
            ret = this.sheet.description;
        }
        return ret;
    }
    
    onClickOverCompareButton() {
        this._router.navigate( ['SheetDashboard', { idOfFirstSheetToCompare: this.sheet.id }]  );
    }
    
    onPrepareProposal() {
        this.prepareProposal.next(this.sheet);
    }
    
    hasId() {
        return this.sheet.id != null;
    }
}