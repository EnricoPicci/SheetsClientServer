import {Component, Input, Output, EventEmitter} from 'angular2/core';

import {Sheet} from './sheet';
import {SheetSummaryComponent} from './sheetSummary.component';

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
    
    selectionCriteriaChanged(inSheet: Sheet) {
        console.log(inSheet);
        this.sheetSelectedChanged.next(inSheet);
    }
    
}

