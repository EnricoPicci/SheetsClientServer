  /*export class ReturnData { 
    public data:Array<any> = new Array<any>();
    
    public isEmpty() {
        return this.data.length == 0;
    }
  }*/
  
import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';

import {Sheet} from './sheet';
import {SheetBackEnd} from './sheetBackEnd.service';

import {SheetInfoComponent} from './sheetInfo.component'
import {SheetReturnData} from './sheetReturnData.component'
import {SheetCompositionCharts} from './sheetCompositionCharts.component'
import {SheetAssetCompositionComponent} from './sheetAssetComposition.component';

import {HttpErrorManagerComponent} from '../utilities/httpErrorManager.component';

@Component({
    selector: 'sheet-comparator',
	providers: [],
    templateUrl: '../templates/sheetComparator.html',
    styleUrls: ['../styles/common.css', '../styles/sheetDetail.css'],
	directives: [SheetAssetCompositionComponent, SheetReturnData, SheetCompositionCharts, 
        SheetInfoComponent, HttpErrorManagerComponent],
    inputs: ['sheet1', 'sheet2'],
})
export class SheetComparatorComponent { 
    public sheets: Sheet[] = new Array<Sheet>();
    
    public httpErrorResponse: string;
    //public errorMessage: string;
    
    constructor(
        private _routeParams: RouteParams,
        private _sheetBackEnd: SheetBackEnd
    ) { }    
        
    ngOnInit() {
        let id1 = +this._routeParams.get('idSheetToCompare1');
        let id2 = +this._routeParams.get('idSheetToCompare2');
        this._sheetBackEnd.getSheetWithDetails(id1)
            .subscribe(
                    sheet  => this.sheets[0] = sheet,
                    error =>  this.httpErrorResponse = <any>error);
        this._sheetBackEnd.getSheetWithDetails(id2)
            .subscribe(
                    sheet  => this.sheets[1] = sheet,
                    error =>  this.httpErrorResponse = <any>error);
    }
}