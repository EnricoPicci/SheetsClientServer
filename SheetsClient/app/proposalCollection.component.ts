import {Component} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import {Proposal} from './proposal';
import {UserLogged} from './userLogged';
import {SheetBackEnd} from './sheetBackEnd.service';

import {SheetSummaryComponent} from './sheetSummary.component';
import {ProposalComponent} from './proposal.component';

@Component({
    selector: 'proposalCollectionCmp',
	providers: [],
    templateUrl: '../templates/proposalCollection.html',
	styleUrls: ['../styles/common.css', '../styles/proposalCollection.css'],
    directives: [SheetSummaryComponent, ProposalComponent],
	inputs: ['sheet'],
})
export class ProposalCollectionComponent { 
    public proposals: Proposal[];
    public currentProposal: Proposal;
    
    public errorMessage: string;
    
    constructor(
        private _router: Router,
        private _routeParams: RouteParams,
        private _backEnd: SheetBackEnd
    ) { }
    
    ngOnInit() {
        let customerId = this._routeParams.get('customerId');
        this._backEnd.getProposalsForCustomer(customerId)
            .subscribe(
                proposals => this.proposals = proposals,
                error => this.errorMessage = <any>error
            );
    }
    
    onProposalSelected(inProposal: Proposal) {
        this.currentProposal = inProposal;
    }
    
}