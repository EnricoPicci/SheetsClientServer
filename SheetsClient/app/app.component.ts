import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {SheetDashboardComponent} from './sheetDashboard.component';
import {SheetCollection} from './sheetCollection.component';
import {SheetSummaryComponent} from './sheetSummary.component';
import {SheetDetailComponent} from './sheetDetail.component';
import {SheetComparatorComponent} from './sheetComparator.component';
import {UserLoginComponent} from './userLogin.component';
import {SheetOrProposalDetailComponent} from './sheetOrProposalDetail.component';
import {ProposalComponent} from './proposal.component';
import {ProposalCollectionComponent} from './proposalCollection.component';

@Component({
    selector: 'my-app',
	providers: [],
    template: `
         <router-outlet></router-outlet>
    `,
	directives: [ROUTER_DIRECTIVES],
})
@RouteConfig([
    {path: '/Login/', name: 'UserLogin', component: UserLoginComponent, useAsDefault: true},
    {path: '/Dashboard/', name: 'SheetDashboard', component: SheetDashboardComponent},
    {path: '/SheetCollection/', name: 'SheetCollection', component: SheetCollection},
    {path: '/Sheet/:id', name: 'SheetSummary', component: SheetSummaryComponent},
    {path: '/SheetDetail/:id', name: 'SheetDetail', component: SheetOrProposalDetailComponent},
    {path: '/SheetComparator/', name: 'SheetComparator', component: SheetComparatorComponent},
    {path: '/Proposals/', name: 'ProposalCollection', component: ProposalCollectionComponent},
    {path: '/Proposal/', name: 'Proposal', component: ProposalComponent},
])
export class AppComponent { }