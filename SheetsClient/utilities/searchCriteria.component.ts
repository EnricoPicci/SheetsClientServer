import {Component, Input, Output, EventEmitter} from 'angular2/core';

import {SearchCriteria} from './searchCriteria';
import {SearchSelection} from './searchSelection';

@Component({
    selector: 'searchCriteria',
	providers: [],
    template: `
        <!-- Need to protect with the following *ngIf because back end services are async and
        there are situations when searchCriteria has not been fully loaded while the template gets evaluated;
        in these cases, if we do not protect with *ngIf the whole thing crashes since searchCriteria is still
        undefined-->
        <div *ngIf="searchCriteria">
            <div>
                <div class="sectionHeader" (click)="onClickOverHeader()">
                    <span class="arrow" [class.open]="open"></span>
                    <span>{{searchCriteria.name}}</span>
                </div>
                <div class="sectionBody" [style.display]="open ? 'block' : 'none'">
                    <ul *ngFor="#criterium of searchCriteria.selections">
                        <li>
                            <input #angularcb value={{criterium.name}} type="checkbox" 
                                (change)="onChange(angularcb.checked, criterium)">
                            <label>{{criterium.name}}</label>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `, 
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