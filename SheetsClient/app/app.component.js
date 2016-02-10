System.register(['angular2/core', 'angular2/router', './sheetDashboard.component', './sheetCollection.component', './sheetSummary.component', './SheetComparator.component', './userLogin.component', './sheetOrProposalDetail.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, sheetDashboard_component_1, sheetCollection_component_1, sheetSummary_component_1, SheetComparator_component_1, userLogin_component_1, sheetOrProposalDetail_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (sheetDashboard_component_1_1) {
                sheetDashboard_component_1 = sheetDashboard_component_1_1;
            },
            function (sheetCollection_component_1_1) {
                sheetCollection_component_1 = sheetCollection_component_1_1;
            },
            function (sheetSummary_component_1_1) {
                sheetSummary_component_1 = sheetSummary_component_1_1;
            },
            function (SheetComparator_component_1_1) {
                SheetComparator_component_1 = SheetComparator_component_1_1;
            },
            function (userLogin_component_1_1) {
                userLogin_component_1 = userLogin_component_1_1;
            },
            function (sheetOrProposalDetail_component_1_1) {
                sheetOrProposalDetail_component_1 = sheetOrProposalDetail_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        providers: [],
                        template: "\n         <router-outlet></router-outlet>\n    ",
                        directives: [router_1.ROUTER_DIRECTIVES],
                    }),
                    router_1.RouteConfig([
                        { path: '/Login/', name: 'UserLogin', component: userLogin_component_1.UserLoginComponent, useAsDefault: true },
                        { path: '/Dashboard/', name: 'SheetDashboard', component: sheetDashboard_component_1.SheetDashboardComponent },
                        { path: '/SheetCollection/', name: 'SheetCollection', component: sheetCollection_component_1.SheetCollection },
                        { path: '/Sheet/:id', name: 'SheetSummary', component: sheetSummary_component_1.SheetSummaryComponent },
                        //{path: '/SheetDetail/:id', name: 'SheetDetail', component: SheetDetailComponent},
                        { path: '/SheetDetail/:id', name: 'SheetDetail', component: sheetOrProposalDetail_component_1.SheetOrProposalDetailComponent },
                        //{path: '/SheetDetailReload/:id', name: 'SheetDetailReload', component: SheetOrProposalDetailComponent},
                        { path: '/SheetComparator/', name: 'SheetComparator', component: SheetComparator_component_1.SheetComparatorComponent },
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map