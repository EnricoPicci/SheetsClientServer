import {Component} from 'angular2/core';

import {Sheet} from './sheet';

import {StringNumericConverter} from '../utilities/stringNumericConverter';

@Component({
    selector: 'sheet-info',
	providers: [],
    templateUrl: '../templates/sheetInfo.html',
    styleUrls: ['../styles/common.css', '../styles/sheetDetail.css', '../styles/sheetSummary.css'],
	directives: [],
    inputs: ['sheet'],
})
export class SheetInfoComponent { 
    public sheet: Sheet;
        
    hasPositiveOneYearReturn() {
        return this.hasPositiveReturn(this.sheet.oneYearReturn);
    }
    
    hasPositiveOneMonthReturn() {
        return this.hasPositiveReturn(this.sheet.oneMonthReturn);
    }
    
    hasPositiveDailyChange() {
        return this.hasPositiveReturn(this.sheet.dailyChange);
    }
    
    hasPositiveReturn(inReturn: string) {
        return StringNumericConverter.getNumberFromPercentageString(inReturn) >=0;
    }
}