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
                function UserLoginComponent(_router, _user) {
                    this._router = _router;
                    this._user = _user;
                }
                UserLoginComponent.prototype.onSubmit = function () {
                    console.log('pb id --- ' + this._user.pbId);
                    console.log('customer id --- ' + this._user.customerId);
                    this._router.navigate(['SheetDashboard']);
                };
                UserLoginComponent = __decorate([
                    core_1.Component({
                        selector: 'my-userLogin',
                        providers: [],
                        /*template: `
                             <h2 width="100%">User name</h2>
                             <input type="text" [(ngModel)]="_user.name">
                             <button #button type="button" (click)="onClick(button)">LOGIN</button>
                             
                        `*/
                        template: "\n         <div class=\"container\" style=\"width: 30%;\">\n            <h1>Login Form</h1>\n            <form (ngSubmit)=\"onSubmit()\" #loginForm=\"ngForm\">\n            <div class=\"form-group\" style=\"width: 100%;\">\n                <label for=\"PBId\" style=\"width: 25%; float: left\">ID PB</label>\n                <input type=\"text\" class=\"form-control\"\n                    [(ngModel)]=\"_user.pbId\" ngControl=\"pbId\" #pbId=\"ngForm\" style=\"width: 50%;\">\n            </div>\n            <div [hidden]=\"pbId.valid || pbId.pristine\" class=\"alert alert-danger\" style=\"width: 100%;\">\n                Id PB obbligatorio\n            </div>\n            <div class=\"form-group\" style=\"width: 100%;\">\n                <label for=\"CustomerId\" style=\"width: 25%; float: left\">ID Cliente</label>\n                <input type=\"text\" class=\"form-control\" required\n                    [(ngModel)]=\"_user.customerId\" ngControl=\"customerId\" #customerId=\"ngForm\" style=\"width: 50%;\">\n            </div>\n            <div [hidden]=\"pbId.valid || pbId.pristine\" class=\"alert alert-danger\" style=\"width: 100%;\">\n                Id cliente obbligatorio\n            </div>\n            <button type=\"submit\" class=\"btn btn-default\" [disabled]=\"!loginForm.form.valid\">Invia</button>\n            </form>\n        </div>\n    ",
                        styleUrls: ['../styles/common.css'],
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, userLogged_1.UserLogged])
                ], UserLoginComponent);
                return UserLoginComponent;
            })();
            exports_1("UserLoginComponent", UserLoginComponent);
        }
    }
});
//# sourceMappingURL=userLogin.component.js.map