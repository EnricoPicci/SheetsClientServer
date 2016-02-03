import {Component} from 'angular2/core';

import {Sheet} from './sheet';

@Component({
    selector: 'sheet-info',
	providers: [],
    templateUrl: '../templates/sheetInfo.html',
    styleUrls: ['../styles/common.css', '../styles/sheetDetail.css'],
	directives: [],
    inputs: ['sheet'],
})
export class SheetInfoComponent { 
    public sheet: Sheet;
}