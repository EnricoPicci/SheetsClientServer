System.register(['angular2/core', 'angular2/platform/browser', 'angular2/router', 'angular2/http', 'rxjs/Rx', './app.component', './sheetBackEnd.service', '../externalServicesRest/backEnd.restServer.service', './sheetWeightAdjuster.service', './userLogged', '../environmentSettings/environment.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, core_2, browser_1, router_1, http_1, app_component_1, sheetBackEnd_service_1, backEnd_restServer_service_1, sheetWeightAdjuster_service_1, userLogged_1, environment_service_1;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (sheetBackEnd_service_1_1) {
                sheetBackEnd_service_1 = sheetBackEnd_service_1_1;
            },
            function (backEnd_restServer_service_1_1) {
                backEnd_restServer_service_1 = backEnd_restServer_service_1_1;
            },
            function (sheetWeightAdjuster_service_1_1) {
                sheetWeightAdjuster_service_1 = sheetWeightAdjuster_service_1_1;
            },
            function (userLogged_1_1) {
                userLogged_1 = userLogged_1_1;
            },
            function (environment_service_1_1) {
                environment_service_1 = environment_service_1_1;
            }],
        execute: function() {
            core_2.enableProdMode();
            browser_1.bootstrap(app_component_1.AppComponent, [router_1.ROUTER_PROVIDERS, http_1.HTTP_PROVIDERS, core_1.provide(sheetBackEnd_service_1.SheetBackEnd, { useClass: backEnd_restServer_service_1.BackEndRest }),
                sheetWeightAdjuster_service_1.SheetWeightAdjuster, userLogged_1.UserLogged, environment_service_1.Environment]);
        }
    }
});
//# sourceMappingURL=boot.js.map