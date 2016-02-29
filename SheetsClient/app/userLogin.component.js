System.register(['angular2/core', 'angular2/router', './userLogged'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, userLogged_1;
    var UserLoginComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (userLogged_1_1) {
                userLogged_1 = userLogged_1_1;
            }],
        execute: function() {
            UserLoginComponent = (function () {
                function UserLoginComponent(_router, _user, _routeParams) {
                    this._router = _router;
                    this._user = _user;
                    this._routeParams = _routeParams;
                }
                /*ngOnInit() {
                    let proposalId = +this._routeParams.get('proposalId');
                    if (proposalId) {
                        this._router.navigate(['Proposal']);
                    }
                }*/
                UserLoginComponent.prototype.onSubmit = function () {
                    console.log('pb id --- ' + this._user.pbId);
                    console.log('customer id --- ' + this._user.customerId);
                    this._router.navigate(['SheetDashboard']);
                };
                UserLoginComponent = __decorate([
                    core_1.Component({
                        selector: 'my-userLogin',
                        providers: [],
                        templateUrl: '../templates/userLogin.html',
                        styleUrls: ['../styles/common.css'],
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, userLogged_1.UserLogged, router_1.RouteParams])
                ], UserLoginComponent);
                return UserLoginComponent;
            })();
            exports_1("UserLoginComponent", UserLoginComponent);
        }
    }
});
//# sourceMappingURL=userLogin.component.js.map