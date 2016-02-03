import {Component, Input, Output, EventEmitter} from 'angular2/core';

import {SearchCriteria} from './searchCriteria';
import {SearchSelection} from './searchSelection';

@Component({
    selector: 'searchCriteria',
	providers: [],
    templateUrl: '../templates/searchCriteria.html', 
	styleUrls: ['../styles/common.css', '../styles/searchCriteria.css'],
})
export class SearchCriteriaComponent { 
    @Input() searchCriteria: SearchCriteria;
   	@Output() selectionCriteriaChanged: EventEmitter<any> = new EventEmitter();
       
    public open: boolean = false;
       
    onChange(selected: boolean, selection: SearchSelection) {
        if (selection) {
            selection.selected = selected;
            this.selectionCriteriaChanged.next(this.searchCriteria);
        }
    }
    
    onClickOverHeader() {
        this.open = ! this.open;
    }
    
}