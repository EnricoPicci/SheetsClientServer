import {Component} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import {Sheet} from './sheet';
import {SheetBackEnd} from './sheetBackEnd.service';

import {SheetDetailComponent} from './sheetDetail.component';
import {ProposalComponent} from './proposal.component';

@Component({
    selector: 'sheet-detail',
	providers: [],
    templateUrl: '../templates/sheetOrProposalDetail.html',
    styleUrls: [],
	directives: [SheetDetailComponent, ProposalComponent],
    inputs: [],
})
export class SheetOrProposalDetailComponent { 
    public sheet: Sheet;
    public showProposal = false;
    public errorMessage: string;
    
    constructor(
        private _router: Router,
        private _routeParams: RouteParams,
        private _backEnd: SheetBackEnd
    ) { }
    
    /*ngOnInit() {
        let id = +this._routeParams.get('id');
        this._backEnd.getSheetWithDetails(id)
            .subscribe(
                sheet => this.sheet = sheet,
                error => this.errorMessage = <any>error
            );
    }*/
    
    sheetRetrieved(inSheet: Sheet) {
        this.sheet = inSheet;
    }
    
    switchToProposal() {
        this.showProposal = true;
    }
}