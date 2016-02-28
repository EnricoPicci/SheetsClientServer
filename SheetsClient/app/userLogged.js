System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var UserLogged;
    return {
        setters:[],
        execute: function() {
            UserLogged = (function () {
                function UserLogged() {
                    this.pbId = null;
                    this.customerId = null;
                }
                UserLogged.prototype.isCustomer = function () {
                    return this.pbId == null || this.pbId.trim().length == 0;
                };
                return UserLogged;
            }());
            exports_1("UserLogged", UserLogged);
        }
    }
});
//# sourceMappingURL=userLogged.js.map