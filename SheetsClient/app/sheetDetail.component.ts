import {Component} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import {Sheet} from './sheet';
import {SheetBackEnd} from './sheetBackEnd.service';

import {ShortLongTextComponent} from '../utilities/shortLongText.component';
import {SheetReturnData} from './sheetReturnData.component'
import {SheetCompositionCharts} from './sheetCompositionCharts.component'
import {SheetAssetCompositionComponent} from './sheetAssetComposition.component';
import {SheetInfoComponent} from './sheetInfo.component';

@Component({
    selector: 'sheet-detail',
	providers: [],
    templateUrl: '../templates/sheetDetail.html',
    styleUrls: ['../styles/common.css', '../styles/sheetDetail.css'],
	directives: [ShortLongTextComponent, SheetAssetCompositionComponent, SheetReturnData, SheetCompositionCharts, SheetInfoComponent],
    inputs: ['sheet'],
})
export class SheetDetailComponent { 
    public sheet: Sheet;
    // the array is needed to feed the sheetReturnData component
    public sheets: Sheet[] = new Array<Sheet>();
    public shortDescriptionTextLength: number = 250;
    public errorMessage: string;
    
    constructor(
        private _router: Router,
        private _routeParams: RouteParams,
        private _sheetBackEnd: SheetBackEnd
    ) { }
    
    ngOnInit() {
        let id = +this._routeParams.get('id');
        this._sheetBackEnd.getSheetWithDetails(id)
            .subscribe(
                sheet => {this.sheet = sheet;
                            this.sheets[0] = this.sheet},
                error => this.errorMessage = <any>error
            );
        //this._sheetBackEnd.fillDetails(this.sheets[0]);
        //this.sheets[0] = this.sheet;
        /*let id = +this._routeParams.get('id');
        this.sheet = this._sheetBackEnd.getSheet(id);
        this._sheetBackEnd.fillDetails(this.sheet);
        this.sheets[0] = this.sheet;*/
    }
    
    setSheet(inSheet: Sheet) {
        this.sheet = inSheet;
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
}