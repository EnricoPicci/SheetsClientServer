import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {SheetDashboardComponent} from './sheetDashboard.component';
import {SheetCollection} from './sheetCollection.component';
import {SheetSummaryComponent} from './sheetSummary.component';
import {SheetDetailComponent} from './sheetDetail.component';
import {SheetComparatorComponent} from './SheetComparator.component';
import {UserLoginComponent} from './userLogin.component';

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
    {path: '/SheetDetail/:id', name: 'SheetDetail', component: SheetDetailComponent},
    {path: '/SheetComparator/', name: 'SheetComparator', component: SheetComparatorComponent},
])
export class AppComponent { }